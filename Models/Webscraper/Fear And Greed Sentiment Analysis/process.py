import pandas as pd

csv_file_path = 'fear-and-greed-history.csv'

df = pd.read_csv(csv_file_path)

df['Date'] = pd.to_datetime(df['Date'])

mask = df['Date'].dt.is_month_start

# Use the mask to filter the DataFrame
filtered_df = df[mask]

filtered_df['Date'] = filtered_df['Date'].dt.strftime('%Y-%m-%d')

data_dict = filtered_df.set_index('Date')['Fear Greed'].to_dict()

formated_fg = []
for key,value in data_dict.items():
    formated_fg.append({
        'date':key,
        'value':value
    })

print(formated_fg)
print(len(formated_fg))