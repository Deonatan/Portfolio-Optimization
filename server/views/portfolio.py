from flask import Blueprint, request, jsonify
from controller.generate_portfolio import generate_portfolio

portfolio_bp = Blueprint('portfolio', __name__)


@portfolio_bp.route('/portfolio', methods=['POST'])
def portfolio():
    data = request.get_json()
    print(data)
    portfolio = generate_portfolio(
        portfolio_value=int(data['portfolio_value']),
        max_VaR_constraint_value=float(data['var'])
    )
    return jsonify(portfolio)
