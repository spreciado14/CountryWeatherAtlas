from config import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), nullable=False)
    blogs = db.relationship('Blog', backref='user', lazy='dynamic')


    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "blogs": [blog.to_json() for blog in self.blogs.all()]
            }

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(100), nullable=False)
    likes = db.Column(db.Integer, nullable=False, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_json(self):
      return {
          "id": self.id, 
          "title": self.title,
          "user_id": self.user_id,
          "author": self.author,
          "url": self.url,
          "likes": self.likes
      }