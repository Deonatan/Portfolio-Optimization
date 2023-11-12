import pickle
from sklearn.preprocessing import MinMaxScaler
import numpy as np


def get_long_term_return(last_price,model):
    scaler = MinMaxScaler()
    lst_output=[]
    prices_scaled = scaler.fit_transform(last_price.values.reshape(-1, 1))
    n_steps=60
    i=0
    train_ratio = 0.7
    validation_ratio = 0.1

    # Calculate split indices
    total_len = len(prices_scaled)
    validation_split = int(total_len * (train_ratio + validation_ratio))
    x_input = prices_scaled[validation_split:][-60:].reshape(1,-1)
    temp_input=list(x_input)
    temp_input=temp_input[0].tolist()

    while(i<1):
        if(len(temp_input)>60):
            x_input=np.array(temp_input[1:])
            print("{} day input {}".format(i,x_input))
            x_input=x_input.reshape(1,-1)
            x_input = x_input.reshape((1, n_steps, 1))
            #print(x_input)
            yhat = model.predict(x_input, verbose=0)
            print("{} day output {}".format(i,yhat))
            temp_input.extend(yhat[0].tolist())
            temp_input=temp_input[1:]
            #print(temp_input)
            lst_output.extend(yhat.tolist())
            i=i+1
        else:
            x_input = x_input.reshape((1, n_steps,1))
            yhat = model.predict(x_input, verbose=0)
            print(yhat[0])
            temp_input.extend(yhat[0].tolist())
            print(len(temp_input))
            lst_output.extend(yhat.tolist())
            i=i+1

    lst_output = scaler.inverse_transform(np.array(lst_output))
    return lst_output[-1][-1]

def get_predicted_return(ticker,last_date):
    if ticker == "SPY":
        spy_model = pickle.load(open("SPY_model.pkl","rb"))
        return get_long_term_return(last_date,spy_model)
    if ticker == "NDAQ":
        ndaq_model = pickle.load(open("NDAQ_model.pkl","rb"))
        return get_long_term_return(last_date,ndaq_model)
    if ticker == "BOND":
        bond_model = pickle.load(open("BOND_model.pkl","rb"))
        return get_long_term_return(last_date,bond_model)
    if ticker == "VGIT":
        vgit_model = pickle.load(open("VGIT_model.pkl","rb"))
        return get_long_term_return(last_date,vgit_model)
    if ticker == "XLE":
        xle_model = pickle.load(open("XLE_model.pkl","rb"))
        return get_long_term_return(last_date,xle_model)
    if ticker == "IAU":
        iau_model = pickle.load(open("IAU_model.pkl","rb"))
        return get_long_term_return(last_date,iau_model)
    if ticker == "BTC-USD":
        btc_model = pickle.load(open("BITCOIN_model.pkl","rb"))
        return get_long_term_return(last_date,btc_model)
    if ticker == "ETH-USD":
        eth_model = pickle.load(open("ETM_model.pkl","rb"))
        return get_long_term_return(last_date,eth_model)
    
