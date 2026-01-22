"""
Security utilities for production
"""
from fastapi import HTTPException, status
from functools import wraps
import hashlib
import secrets


def verify_api_key(api_key: str, valid_key: str) -> bool:
    """Securely compare API keys"""
    return secrets.compare_digest(api_key, valid_key)


def hash_password(password: str) -> str:
    """Hash password using PBKDF2"""
    salt = secrets.token_hex(32)
    hash_obj = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
    return f"{salt}${hash_obj.hex()}"


def verify_password(password: str, hashed: str) -> bool:
    """Verify hashed password"""
    try:
        salt, hash_value = hashed.split('$')
        hash_obj = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
        return secrets.compare_digest(hash_obj.hex(), hash_value)
    except:
        return False


def rate_limit_decorator(max_calls: int, time_window: int):
    """Rate limiting decorator"""
    def decorator(func):
        calls = {}
        
        @wraps(func)
        async def wrapper(*args, **kwargs):
            import time
            caller_id = kwargs.get('user_id', 'anonymous')
            now = time.time()
            
            if caller_id not in calls:
                calls[caller_id] = []
            
            # Remove old calls outside time window
            calls[caller_id] = [call for call in calls[caller_id] if now - call < time_window]
            
            if len(calls[caller_id]) >= max_calls:
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Rate limit exceeded"
                )
            
            calls[caller_id].append(now)
            return await func(*args, **kwargs)
        
        return wrapper
    return decorator
