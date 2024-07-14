from contextvars import ContextVar
from typing import Optional, Type, Sequence, TypeVar, Generic

from pydantic import BaseModel, model_validator
from pydantic.generics import GenericModel

T = TypeVar("T")
C = TypeVar("C")


class Pagination(BaseModel):
    current_page: int
    page_size: int
    total_items: int

    class Config:
        populate_by_name = True


class Page(GenericModel, Generic[T]):
    items: Sequence[T]
    metadata: Pagination

    @classmethod
    def create(cls, items: Sequence[T], metadata: Pagination) -> "Page[T]":
        return cls(
            items=items,
            metadata=metadata
        )


PageType: ContextVar[Type[Page]] = ContextVar("PageType", default=Page)


class PaginationParams(BaseModel):
    page_size: Optional[int] = 10
    page: Optional[int] = 1
    sort_by: Optional[str] = 'id'
    direction: Optional[str] = 'desc'


class SearchingPaginationParams(PaginationParams):
    field_values: str = ""
    operators: str = ""
    values: str = ""

    class Config:
        populate_by_name = True

    @model_validator(mode='after')
    def validate_data(self):
        field_values = self.get("field_values").split("|") if self.get("field_values") else []
        operators = self.get("operators").split("|") if self.get("operators") else []
        values = self.get("values").split("|") if self.get("values") else []
        return self

