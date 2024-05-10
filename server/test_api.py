# test_api.py
import pytest
from main import app, db  # Make sure to import the Flask app from 'main' which has routes defined
from config import app, db
from models import User

@pytest.fixture(scope='module')
def test_client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.app_context():
        db.create_all()
        yield app.test_client()  # Use the actual app from main.py
        db.session.remove()
        db.drop_all()

def test_get_users(test_client):
    """Test that getting users works correctly."""
    response = test_client.get('/api/users')
    assert response.status_code == 200
    assert isinstance(response.json, list)  # Expecting a list of users

def test_create_user(test_client):
    """Test creating a user via API."""
    user_data = {'name': 'John Doe', 'email': 'john@example.com', 'picture': 'http://example.com/john.jpg'}
    response = test_client.post('/api/login', json=user_data)
    assert response.status_code == 200
    assert 'access_token' in response.json

def test_get_blogs(test_client):
    """Test getting all blogs."""
    response = test_client.get('/api/blogs')
    assert response.status_code == 200
    assert isinstance(response.json, list)  # Expecting a list of blogs



@pytest.fixture(scope='module')
def test_client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.app_context():
        db.create_all()

        # Hardcode user data
        hardcoded_user = User(
            username="Hiteesh Reddy",
            email="hiteesh789@gmail.com",
            profile_pic="https://lh3.googleusercontent.com/a/ACg8ocLnpxfEiUFqMPtTqJ0vuL_s-EsvKgPsrla39ecPJ6_0ZyHygg=s96-c"
        )
        db.session.add(hardcoded_user)
        db.session.commit()

        yield app.test_client()

        db.session.remove()
        db.drop_all()
        
def test_get_users(test_client):
    """Test that getting users retrieves the hardcoded user."""
    response = test_client.get('/api/users')
    assert response.status_code == 200
    users = response.get_json()
    assert len(users) == 1
    assert users[0]['username'] == "Hiteesh Reddy"
    assert users[0]['email'] == "hiteesh789@gmail.com"

def test_create_blog_for_user(test_client):
    """Test creating a blog for the hardcoded user."""
    blog_data = {
        'title': 'Testing for Hiteesh',
        'url': 'http://blogpost.com',
        'author': 'Hiteesh Reddy',
        'user_id': 1  # Assuming the hardcoded user gets this ID
    }
    response = test_client.post('/api/blogs', json=blog_data)
    assert response.status_code == 201
    assert 'Blog created' in response.get_json()['message']

    # Fetch blogs and inspect the structure
    response = test_client.get('/api/blogs')
    assert response.status_code == 200
    users = response.get_json()
    
    # Find the correct user and then the blog within that user's blogs list
    for user in users:
        if user['id'] == 1:  # Check for the hardcoded user ID
            assert user['blogs'][0]['title'] == 'Testing for Hiteesh'
            break
    else:
        raise AssertionError("User with ID 1 not found or no blogs posted.")
