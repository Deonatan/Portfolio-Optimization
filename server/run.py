from flask import Flask
from flask_cors import CORS
from views.portfolio import portfolio_bp


app = Flask(__name__)
CORS(app)
app.register_blueprint(portfolio_bp)

if __name__ == '__main__':
    app.run(debug=True)
