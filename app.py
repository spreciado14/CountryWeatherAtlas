import os
import pathlib
import requests
import google.auth.transport.requests
from flask import Flask, render_template, jsonify, request, redirect, abort, session
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from flask_sqlalchemy import SQLAlchemy
from pip._vendor import cachecontrol
from dotenv import load_dotenv


load_dotenv()
app = Flask("CountryWeatherAtlas")
app.secret_key =  os.environ.get("GOOGLE_SECRET_KEY") # make sure this matches with that's in client_secret.json
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" # to allow Http traffic for local dev

GOOGLE_CLIENT_ID = "1007570093052-1a3c3javvarcof080j4d34f3v07iakiv.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")


flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://127.0.0.1:5000/callback"
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)

@app.errorhandler(404)
def page_not_found(error):
    return jsonify({"error": "Not Found"}), 404

@app.route("/api/users", methods=["GET"])
def user_list():
    users = db.session.execute(db.select(User).order_by(User.username)).scalars()
    user_data = [{"id": user.id, "username": user.username, "email": user.email} for user in users]
    return jsonify(user_data)

@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"})


@app.route("/view")
def view():
    return render_template("view.html",values = User.query.all())


def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function()
    return wrapper


@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@app.route('/weather', methods=['GET'])
def get_weather():
    # Get the capital city from the request (you can hardcode it for now)
    capital_city = 'London'  # Replace with the capital city you want to use

    # API key (you can use the one you have)
    api_key = os.environ.get('WEATHER_KEY')

    # API URL
    url = f'http://api.openweathermap.org/data/2.5/weather?q={capital_city}&units=metric&APPID={api_key}'

    # Make the API request
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        weather_data = response.json()

        # Extract the relevant data from the API response
        temperature = weather_data.get('main', {}).get('temp')
        feels_like = weather_data.get('main', {}).get('feels_like')
        wind_speed = weather_data.get('wind', {}).get('speed')
        humidity = weather_data.get('main', {}).get('humidity')
        description = weather_data.get('weather', [])[0].get('description', '')
        icon = weather_data.get('weather', [])[0].get('icon', '')
        icon_url = f"http://openweathermap.org/img/wn/{icon}@4x.png"

        # Render a template with the weather data
        return render_template('weather.html', capital_city=capital_city, description=description,
                               icon_url=icon_url, temperature=temperature, feels_like=feels_like,
                               wind_speed=wind_speed, humidity=humidity)
    else:
        # Handle the error case
        return f'Error: {response.status_code}'
    
@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)

    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    session["picture"] = id_info.get("picture")
    return redirect("/protected_area")


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/")
def index():
    return "Hello World <a href='/login'><button>Login</button></a>"

@app.route("/protected_area")
@login_is_required
def protected_area():
    return f"Hello {session['name']}! <br/> <a href='/logout'><button>Logout</button></a>"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)