# Imports for the backend
# Flask is the main framework for the backend
# SQLAlchemy is the ORM for the database
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

# This file initializes the Flask app, sets the database URL, and creates the database object
# we have the complete CRUD operations for user management using Flask, SQLAlchemy, and PostgreSQL
app = Flask(__name__)
CORS(app)  # enable cross origin resource sharing for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')  # set the database URL from the environment
db = SQLAlchemy(app)  # create the database object

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def json(self):
        return {'id': self.id, 'name': self.name, 'email': self.email}
    
db.create_all()  # create the tables in the database

# create test route for backend
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Hello, World!'})

# CRUD - Create, a user route
@app.route('/api/flask/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        new_user = User(name=data['name'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            'id': new_user.id,
            'name': new_user.name,
            'email': new_user.email
        }), 201

    except Exception as e:
        return jsonify({'message': 'Error creating user', 'error': str(e)}), 500

# CRUD - Read, get all users
@app.route('/api/flask/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        users_data = [{'id': user.id, 'name': user.name, 'email': user.email} for user in users]
        return jsonify(users_data), 200
    except Exception as e:
        return jsonify({'message': 'Error getting users', 'error': str(e)}), 500


# CRUD - Read, get a user by id
@app.route('/api/flask/users/<id>', methods=['GET'])
def get_user(id):
    try:
        user = User.query.get(id=id).first()  # get the first user by id
        if user:
            return make_response(jsonify({'user': user.json()}), 200)
        else:
            return make_response(jsonify({'message': 'User not found'}), 404)
    except Exception as e:
        return jsonify({'message': 'Error getting user', 'error': str(e)}), 500

# CRUD - Update, a user by id
@app.route('/api/flask/users/<id>', methods=['PUT'])
def update_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            data = request.get_json()
            user.name = data['name']
            user.email = data['email']
            db.session.commit()
            return jsonify({
                'id': user.id,
                'name': user.name,
                'email': user.email
            }), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'message': 'Error updating user', 'error': str(e)}), 500

# CRUD - Delete, a user by id
@app.route('/api/flask/users/<id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response(jsonify({'message': 'User deleted'}), 200)
        else:
            return make_response(jsonify({'message': 'User not found'}), 404)
    except Exception as e:
        return jsonify({'message': 'Error deleting user', 'error': str(e)}), 500