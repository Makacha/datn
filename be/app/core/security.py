from datetime import datetime, timedelta
from uuid import UUID

import jwt
from fastapi import Depends
from fastapi.security import HTTPBearer

from app.core import settings
from app.helpers.exception_type import ExceptionType
from app.schemas.exception import AppException

reusable_oauth2 = HTTPBearer(
    scheme_name='Authorization'
)


def create_access_token(sub):
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    data = {
        "exp": expire,
        "sub": sub,
    }

    token_jwt = jwt.encode(data, settings.SECRET_KEY, algorithm=settings.HASH_ALGORITHM)

    return token_jwt


def read_access_token(token):
    try:
        data = jwt.decode(token.credentials, settings.SECRET_KEY, algorithms=settings.HASH_ALGORITHM)
    except Exception:
        raise AppException(ExceptionType.TOKEN_INVALID)
    if not data.get("exp") or not data.get("sub"):
        raise AppException(ExceptionType.TOKEN_INVALID)
    # if data.get("exp") < datetime.utcnow():
    #     raise AppException(ExceptionType.TOKEN_EXPIRED)
    return data


def get_user_info(token=Depends(reusable_oauth2)) -> UUID:

    data = read_access_token(token)

    user_id = data.get('sub')
    return UUID(user_id)
