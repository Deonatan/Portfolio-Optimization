from marshmallow import Schema, fields
from marshmallow.validate import Length

class LoginRequest(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=Length(min=6))