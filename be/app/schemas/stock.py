import datetime

from pydantic import BaseModel, model_validator
from typing import Optional

from app.schemas.pagination import PaginationParams


class Symbol(BaseModel):
    symbol: str
    name: str
    category: Optional[str]
    exchange: str


class StockInfo(Symbol):
    price: Optional[float] = None
    change: Optional[float] = None


class StockDetailInfo(StockInfo):
    pass


class SearchSymbolParam(PaginationParams):
    keyword: str


class Stock(BaseModel):
    symbol: str
    time: int
    open: float
    high: float
    low: float
    close: float
    volume: float
    value: float
    match_volume: float
    match_value: float
    change: float


class StockHistoryParam(PaginationParams):
    symbol: str
    start: Optional[str] = None
    end: Optional[str] = None

    @model_validator(mode='before')
    def validate_date(self):
        print(self)
        return self

