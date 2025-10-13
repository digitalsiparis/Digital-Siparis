from datetime import datetime, timedelta
from typing import Optional
from jose import jwt
from os import getenv
JWT_SECRET = getenv("JWT_SECRET", "CHANGE_ME")
JWT_ALG = getenv("JWT_ALG", "HS256")
def create_token(user_id: str, role: str = "customer", exp_minutes=60*24*7):
    payload = {"sub": user_id, "role": role, "exp": datetime.utcnow() + timedelta(minutes=exp_minutes)}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)
def decode_token(token: str) -> Optional[dict]:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except Exception:
        return None
