from flask import request, jsonify
from config import app, db
from models import User,Blog

@app.route("/api/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_json() for user in users])


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

@app.route('/api/create_blog', methods=['POST'])
def create_blog():
    title = request.json.get('title')
    url = request.json.get('url')
    author = request.json.get('author')
    likes = request.json.get('likes')
    user_id = request.json.get('user_id')

    if title is None or author is None or likes is None or url is None or user_id is None:
        return jsonify({'message': 'You must include a title, author, likes, url, and user_id'}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    new_blog = Blog(title=title, url=url, author=author, likes=likes, user_id=user_id)
    db.session.add(new_blog)
    db.session.commit()

    return jsonify({'message': 'Blog created'}), 201

@app.route("/api/blogs", methods=["GET"])
def get_blogs():
    blogs = Blog.query.all()
    return jsonify([{'title': blog.title, 'url': blog.url, 'author': blog.author, 'likes': blog.likes, 'user': blog.user.to_json()} for blog in blogs])

@app.route("/api/users/<int:user_id>/blogs", methods=["GET"])
def get_user_blogs(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify([blog.to_json() for blog in user.blogs])

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