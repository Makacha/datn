import hashlib
from uuid import UUID

from app.core.security import create_access_token
from app.database import session
from app.helpers.exception_type import ExceptionType
from app.schemas.exception import AppException
from app.schemas.user_schemas import UserCreate, LoginRequest, AccessResponse, SearchUserParams


class UserService:

    @classmethod
    def login(cls, login_request: LoginRequest):
        query = f"SELECT * FROM user WHERE username = '{login_request.username}' ALLOW FILTERING"
        user = session.execute(query).one()
        if not user:
            raise AppException(ExceptionType.LOGIN_FAILED)
        login_request.password = hashlib.sha256(login_request.password.encode()).hexdigest()
        if user['password'] != login_request.password:
            raise AppException(ExceptionType.LOGIN_FAILED)
        return AccessResponse(**{
            'token': create_access_token(user['id'].hex)
        })

    @classmethod
    def create_user(cls, user_form: UserCreate):
        query = f"SELECT * FROM user WHERE username = '{user_form.username}' ALLOW FILTERING"
        user = session.execute(query).one()
        if user:
            raise AppException(ExceptionType.USERNAME_EXISTED)
        query = f"SELECT * FROM user WHERE email = '{user_form.email}'  ALLOW FILTERING"
        user = session.execute(query).one()
        if user:
            raise AppException(ExceptionType.EMAIL_EXISTED)
        user_form.password = hashlib.sha256(user_form.password.encode()).hexdigest()
        query = (f"INSERT INTO user (id, username, password, email, fullname, phone) "
                 f"VALUES (uuid(), '{user_form.username}', '{user_form.password}', '{user_form.email}', '{user_form.fullname}', '{user_form.phone}')")
        session.execute(query)
        user = session.execute(f"SELECT * FROM user WHERE username = '{user_form.username}' ALLOW FILTERING").one()
        return user

    @classmethod
    def get_current_user_info(cls, user_id: UUID):
        query = f"SELECT * FROM user WHERE id = {user_id}"
        user = session.execute(query).one()
        if not user:
            raise AppException(ExceptionType.TOKEN_INVALID)
        return user
