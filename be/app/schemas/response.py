from typing import TypeVar, Generic, Optional, Sequence

from pydantic import BaseModel

from app.schemas.pagination import Pagination

T = TypeVar("T")


class ResponseSchemaBase(BaseModel):
    __abstract__ = True

    code: str = ""
    message: str = ""


class ResponseBase(ResponseSchemaBase):

    def success_response(self):
        self.code = '000'
        self.message = 'Thành công'
        return self

    def fail_response(self, code: str, message: str):
        self.code = code
        self.message = message
        return self


class DataResponse(ResponseSchemaBase, Generic[T]):
    data: Optional[T] = None

    class Config:
        arbitrary_types_allowed = True

    def success_response(self, data: Optional[T]):
        self.code = '000'
        self.message = 'Thành công'
        self.data = data
        return self

    def fail_response(self, code: str, message: str, data: T = None):
        self.code = code
        self.message = message
        self.data = data
        return self


class PagingDataResponse(ResponseSchemaBase, Generic[T]):
    data: Optional[Sequence[T]] = None
    metadata: Optional[Pagination] = None

    def success_response(self, data: Sequence[T], metadata: Pagination):
        self.code = "000"
        self.message = "Thành công"
        self.data = data
        self.metadata = metadata
        return self

