from flask import request, jsonify
from config import app, db
from models import User,Blog
from flask_jwt_extended import create_access_token

@app.route("/api/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_json() for user in users])

@app.route("/api/login", methods=["POST"])
def create_users():
    name = request.json.get("name")
    email = request.json.get("email")
    picture = request.json.get("picture")

    if not name or not email or not picture:
        return (
            jsonify({"message": "You must include a name, email, and picture"}),
            400,
        )

    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(username=name, email=email, profile_pic=picture)
        try:
            db.session.add(user)
            db.session.commit()
        except Exception as e:
            return jsonify({"message": str(e)}), 400

    access_token = create_access_token(identity=user.id, additional_claims={"user_id": user.id})
    return jsonify(access_token=access_token), 200



@app.route('/api/blogs', methods=['POST'])
def create_blog():
    title = request.json.get('title')
    url = request.json.get('url')
    author = request.json.get('author')
    user_id = request.json.get('user_id')

    if not title or not author or not url or not user_id:
        return jsonify({'message': 'You must include a non-empty title, author, url, and user_id'}), 400

    user = db.session.get(User, user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    new_blog = Blog(title=title, url=url, author=author, user_id=user_id)
    db.session.add(new_blog)
    db.session.commit()

    return jsonify({'message': 'Blog created'}), 201

@app.route("/api/blogs", methods=["GET"])
def get_blogs():
    # Get all users
    users = User.query.all()

    # Create a list to hold the results
    results = []

    # For each user, add their information to the results
    for user in users:
        results.append(user.to_json())

    return jsonify(results)

@app.route("/api/blogs/<int:id>/", methods=["GET"])
def get_blog(id):
    blog = Blog.query.get(id)
    if not blog:
        return jsonify({'message': 'Blog not found'}), 404
    return jsonify(blog.to_json())

@app.route("/api/blogs/<int:blog_id>", methods=["DELETE"])
def delete_blog(blog_id):
    blog = Blog.query.get(blog_id)
    if not blog:
        return jsonify({'message': 'Blog not found'}), 404
    db.session.delete(blog)
    db.session.commit()
    return jsonify({'message': 'Blog deleted'}), 200

@app.route("/api/blogs/<int:blog_id>", methods=["PUT"])
def update_blog(blog_id):
    blog = Blog.query.get(blog_id)
    if not blog:
        return jsonify({'message': 'Blog not found'}), 404
    title = request.json.get('title')
    author = request.json.get('author')
    url = request.json.get('url')
    if title is not None:
        blog.title = title
    if author is not None:
        blog.author = author
    if url is not None:
        blog.url = url
    db.session.commit()
    return jsonify({'message': 'Blog updated'}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)