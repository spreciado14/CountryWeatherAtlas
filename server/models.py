from config import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), nullable=False)
    profile_pic = db.Column(db.String(120), nullable=True)
    blogs = db.relationship('Blog', backref='user', lazy='dynamic')

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "profile_pic": self.profile_pic,
            "blogs": [blog.id for blog in self.blogs.all()]
        }
    
class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(100), nullable=False)
    likes = db.Column(db.Integer, nullable=False, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'url': self.url,
            'likes': self.likes,
            'user_id': self.user_id,
            'user': self.user.to_json() if self.user else None
        }