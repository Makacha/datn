from typing import Optional

from pydantic import BaseModel

from app.schemas import PaginationParams


class Indicator(BaseModel):
    id: int
    name: str
    description: Optional[str]


class SearchIndicatorParam(PaginationParams):
    keyword: str

