# Flask modules import
from flask import request, jsonify

# Other modules import
from marshmallow import ValidationError
from functools import wraps

def validate_json(schema):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                schema.load(request.get_json())
            except ValidationError as err:
                error = {
                    "status": "error",
                    "messages": err.messages
                }
                return jsonify(error), 400
            return func(*args, **kwargs)
        return wrapper
    return decorator