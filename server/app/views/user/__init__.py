# Flask modules import
from flask import Blueprint, request, make_response, jsonify
from flask_login import login_user, login_required, logout_user, current_user

# Local modules import
from app.models import User
from app.extensions import db, cache
from app.middleware import validate_json
from app.objects.user import LoginRequest

# Other modules import
from werkzeug.security import generate_password_hash, check_password_hash
from http import HTTPStatus

user_bp = Blueprint('user', __name__, url_prefix='/user')

@user_bp.route('/login', methods=['POST'])
@validate_json(LoginRequest())
@cache.cached(timeout=20, query_string = True)
def login():    
    email = request.form.get('email')
    password = request.form.get('password')

    user = User.query.filter_by(email=email).first()
    if user:
        if check_password_hash(user.password, password):
            login_user(user, remember=True)
            return make_response(jsonify(
                    {"message": "Success!"}
                ), HTTPStatus.OK)
        else:
            return make_response(jsonify(
                    {"message": "Invalid password!"}
                ), HTTPStatus.BAD_REQUEST)
    
    return make_response(jsonify(
                {"message": "Invalid email!"}
            ), HTTPStatus.BAD_REQUEST)

@user_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@user_bp.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already exists.', category='error')
        elif len(email) < 4:
            flash('Email must be greater than 3 characters.', category='error')
        elif len(first_name) < 2:
            flash('First name must be greater than 1 character.', category='error')
        elif password1 != password2:
            flash('Passwords don\'t match.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters.', category='error')
        else:
            new_user = User(email=email, first_name=first_name, password=generate_password_hash(
                password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            return redirect(url_for('views.index'))

    return render_template("sign_up.html", user=current_user)