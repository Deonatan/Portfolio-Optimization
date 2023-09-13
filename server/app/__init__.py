#Flask modules
from flask import Flask

#Other modules
from os import path

def create_app(debug: bool = False):
    # Create the Flask application instance
    app = Flask(__name__)

    # Set current_app context
    app.app_context().push()
    
    if debug:
        # To use local database
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
    else:
        from app.config.config import Config
        app.config.from_object(Config)

    # Initialize extensions
    from app.extensions import db
    db.init_app(app)
    

    # Import all models and Create database tables
    db.create_all()

    # Register blueprint or routes
    from app.views import user_bp, ingestor_bp

    app.register_blueprint(user_bp)
    app.register_blueprint(ingestor_bp)

    return app