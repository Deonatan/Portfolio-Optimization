import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE_PATH = BASE_DIR / ".env"
load_dotenv(ENV_FILE_PATH)

# AWS region
AWS_REGION = os.environ.get("AWS_REGION", "ap-southeast-1")

# DB Config
DB_USER = os.environ.get("DB_USER", "")
DB_PASS = os.environ.get("DB_PASS", "")
DB_ENDPOINT = os.environ.get("DB_ENDPOINT", "")
DB_PORT = os.environ.get("DB_PORT", "")
DB_NAME = os.environ.get("DB_NAME", "")
DB_URI = 'mysql+pymysql://'+ DB_USER + ':' + DB_PASS + '@' + DB_ENDPOINT + ':' + DB_PORT + '/' + DB_NAME

# Anthropic Config
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

# Kendra Config
KENDRA_INDEX_ID = os.environ.get("KENDRA_INDEX_ID", "")

# Cache config
CACHE_ENDPOINT = os.environ.get("REDIS_ENDPOINT", "")
CACHE_URL = 'redis://' + CACHE_ENDPOINT + ':6379/0'
CACHE_TYPE = 'redis'

class Config:
    SQL_ALCHEMY_DATABSE_URI = DB_URI
    ANTHROPIC_API_KEY = ANTHROPIC_API_KEY
    KENDRA_INDEX_ID = KENDRA_INDEX_ID
    CACHE_REDIS_URL = CACHE_URL
    CACHE_TYPE = CACHE_TYPE
    AWS_REGION = AWS_REGION