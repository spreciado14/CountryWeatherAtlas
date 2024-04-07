from flask import request, jsonify
from config import app, db
from models import User


@app.route("/api/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))
    return jsonify({"user": json_users})


@app.route("/api/create_users", methods=["POST"])
def create_users():
    username = request.json.get("username")
    email = request.json.get("email")

    if not username or not email:
        return (
            jsonify({"message": "You must include a first name, last name and email"}),
            400,
        )

    new_contact = User(username=username, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!"}), 201




if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)