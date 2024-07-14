from pydantic import BaseModel


class Price(BaseModel):
    price: float
    forecast: float
    time: int


class StockPrice(BaseModel):
    symbol: str
    prices: list[Price]


class FullStockPrice(BaseModel):
    symbol: str
    price: float
    open: float
    time: int


class PriceChartRequest(BaseModel):
    symbol: list[str]
    start: str
    end: str
    interval: str


class PriceChartResponse(BaseModel):
    prices: list[StockPrice]


class PriceBoardRequest(BaseModel):
    pass


class PriceBoardResponse(BaseModel):
    prices: list[FullStockPrice]
