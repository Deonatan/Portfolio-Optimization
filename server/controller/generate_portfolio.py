import numpy as np
import pandas as pd
import datetime as dt
import yfinance as yf
from scipy.optimize import minimize

# Calculate the daily log returns and drop any NAs


def log_returns(adj_close_df):
    log_returns = np.log(adj_close_df/adj_close_df.shift(1))
    log_returns = log_returns.dropna()
    return log_returns

# Create a function that will be used to calculate portfolio expected return


def expected_return(weights, log_returns):
    return np.sum(log_returns.mean() * weights)

# Create a function that will be used to calculate portfolio standard deviation


def standard_deviation(weights, cov_matrix):
    variance = weights.T @ cov_matrix @ weights
    return np.sqrt(variance)


def random_z_score():
    return np.random.normal(0, 1)


def e_returns(weights, expt_returns):
    port_return = np.sum(weights * expt_returns)
    return port_return


def weight_sum_constraint(weights):
    return np.sum(weights) - 1

# Create a function to calculate scenarioGainLoss


def scenario_gain_loss(portfolio_value, portfolio_std_dev, z_score, days, portfolio_expected_return):
    return portfolio_value * portfolio_expected_return * days + portfolio_value * portfolio_std_dev * z_score * np.sqrt(days)


def VaR(weights, cov_matrix, log_returns, portfolio_value, days, confidence_interval):
    portfolio_expected_return = expected_return(weights, log_returns)
    portfolio_std_dev = standard_deviation(weights, cov_matrix)
    simulations = 20000
    scenarioReturn = []
    for i in range(simulations):
        z_score = random_z_score()
        scenarioReturn.append(scenario_gain_loss(
            portfolio_value, portfolio_std_dev, z_score, days, portfolio_expected_return))
    Var = -np.percentile(scenarioReturn, 100 * (1 - confidence_interval))
    VaR = Var/portfolio_value

    return VaR


def VaRFinal(weights, cov_matrix, expt_returns, portfolio_value, days, confidence_interval):
    portfolio_expected_return = e_returns(weights, expt_returns)/days
    portfolio_std_dev = standard_deviation(weights, cov_matrix)
    simulations = 200
    scenarioReturn = []
    for i in range(simulations):
        z_score = random_z_score()
        scenarioReturn.append(scenario_gain_loss(
            portfolio_value, portfolio_std_dev, z_score, days, portfolio_expected_return))
    Var = -np.percentile(scenarioReturn, 100 * (1 - confidence_interval))
    VaR = Var/portfolio_value

    return VaR


def optimize_portfolio(expt_returns, cov_matrix, portfolio_value, days, confidence_interval, log_returns, max_VaR_constraint_value):
    n_assets = len(expt_returns)
    initial_weights = np.ones(n_assets) / n_assets
    bounds = ((0.1, 1),) * n_assets
    constraints = [{'type': 'eq', 'fun': weight_sum_constraint},
                   {'type': 'eq', 'fun': lambda weights: VaRFinal(weights, cov_matrix, expt_returns, portfolio_value, days, confidence_interval) - max_VaR_constraint_value}]
    options = {'maxiter': 200}
    result = minimize(lambda weights, expt_returns, cov_matrix, portfolio_value, days, confidence_interval, log_returns, max_VaR_constraint_value: -e_returns(weights, expt_returns), initial_weights,
                      args=(expt_returns, cov_matrix, portfolio_value, days, confidence_interval, log_returns, max_VaR_constraint_value), method='SLSQP', constraints=constraints, bounds=bounds, options=options)
    return result


def generate_portfolio(portfolio_value, max_VaR_constraint_value):
    # Set number of years
    years = 15

    endDate = dt.datetime.now()
    startDate = endDate - dt.timedelta(days=365*years)

    # List of tickers for portfolio
    tickers = ['SPY', 'NDAQ', 'BOND', 'VGIT',
               'XLE', 'IAU', 'BTC-USD', 'ETH-USD']

    confidence_interval = 0.95
    # Days of Historic Data for VaR Calculation
    days = 365
    weights = np.array([0.125, 0.125, 0.125, 0.125,
                       0.125, 0.125, 0.125, 0.125])

    # -> input from lstm
    expt_returns = [0.11, 0.17, 0.03, 0.07, 0.079, 0.0543, 0.18, 0.19]

    # Download the daily adjusted close prices for the tickers
    adj_close_df = pd.DataFrame()

    for ticker in tickers:
        data = yf.download(ticker, start=startDate, end=endDate)
        adj_close_df[ticker] = data['Adj Close']

    # Download the daily adjusted close prices for the tickers
    adj_close_df = pd.DataFrame()

    for ticker in tickers:
        data = yf.download(ticker, start=startDate, end=endDate)
        adj_close_df[ticker] = data['Adj Close']

    lg_returns = log_returns(adj_close_df)
    print(lg_returns)

    # Create a covariance matrix for all the securities
    cov_matrix = lg_returns.cov()

    data = {ticker: [expt_returns[i]] for i, ticker in enumerate(tickers)}

    # Create a DataFrame from the dictionary
    df1 = pd.DataFrame(data)

    # Calculate the covariance matrix from the expected returns
    co_matrix = np.cov(df1.values, rowvar=False)

    print("Expected Returns DataFrame:")
    print(df1)
    print("\nCovariance Matrix:")
    print(co_matrix)

    print(e_returns(weights, expt_returns)/365)

    VarFinal = VaRFinal(weights, cov_matrix, expt_returns,
                        portfolio_value, days, confidence_interval)
    print(VarFinal)

    result = optimize_portfolio(expt_returns, cov_matrix, portfolio_value,
                                days, confidence_interval, lg_returns, max_VaR_constraint_value)

    # Print the optimization result
    print("Optimization Result:")
    print(result)

    # Extract and print optimized weights
    optimized_weights = result.x
    print("\nOptimized Weights:")
    print(optimized_weights)

    final = e_returns(optimized_weights, expt_returns)
    print("\nOptimized Returns:")
    optimized_return = f"{final*100:.4}%"
    print(optimized_return)

    print("\nPortfolio Value:")
    final_portfolio_value = (final+1)*portfolio_value
    print(final_portfolio_value)

    print("\nValue-at-Risk:")
    Final_VaR = VaRFinal(optimized_weights, cov_matrix,
                         expt_returns, portfolio_value, days, confidence_interval)
    print(Final_VaR)

    return {
        "weight":optimized_weights.tolist(),
        "return":optimized_return,
        "final_value": final_portfolio_value,
    }