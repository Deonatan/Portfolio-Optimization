from functools import wraps
from flask import request, jsonify

def validate_file_upload(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if 'file' not in request.files:
            error = {
                "status": "error",
                "message": "No file part in the request"
            }
            return jsonify(error), 400
        
        file = request.files['file']
        
        if file.filename == '':
            error = {
                "status": "error",
                "message": "No selected file"
            }
            return jsonify(error), 400
        
        if file.filename[-3:] != 'csv':
            error = {
                "status" : "error",
                "message" : "Wrong file format"
            }
            return jsonify(error), 400
        
        return func(*args, **kwargs)
    
    return wrapper