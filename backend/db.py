import motor.motor_asyncio
from os import getenv
from dotenv import load_dotenv
load_dotenv()
MONGO_URL = getenv("MONGO_URL", "mongodb://localhost:27017")
MONGO_DB  = getenv("MONGO_DB", "marketdemo")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client[MONGO_DB]
