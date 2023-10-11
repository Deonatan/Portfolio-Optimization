from datetime import datetime

def format_datetime(datetime: datetime):
    return datetime.strftime("%Y-%m-%d %H:%M:%S") if datetime else ""