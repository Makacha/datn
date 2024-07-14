from fastapi import APIRouter, Depends

from app.core.security import get_user_info
from app.schemas.response import DataResponse
from app.schemas.user_schemas import UserCreate, LoginRequest, UserResponse, AccessResponse
from app.services.user import UserService

router = APIRouter()


@router.post("/signup", response_model=DataResponse[UserResponse])
def create_user(*, user_form: UserCreate):
    result = UserService.create_user(user_form=user_form)

    return DataResponse().success_response(result)


@router.post("/login", response_model=DataResponse[AccessResponse])
def login(*, login_request: LoginRequest):
    result = UserService.login(login_request=login_request)

    return DataResponse().success_response(result)


@router.get("/info", response_model=DataResponse[UserResponse])
def get_user_info(*, user_id=Depends(get_user_info)):
    result = UserService.get_current_user_info(user_id=user_id)
    return DataResponse().success_response(result)
