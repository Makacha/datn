from fastapi import APIRouter, Depends

from app.core.security import get_user_info
from app.schemas import PagingDataResponse, Stock, StockHistoryParam, Symbol, SearchSymbolParam, ResponseBase, \
    StockInfo, StockDetailInfo, DataResponse
from app.services.stock import StockService

router = APIRouter()


@router.get("/search", response_model=PagingDataResponse[Symbol])
def search_stock(params=Depends(SearchSymbolParam)):
    result, metadata = StockService.search_symbol(params)
    return PagingDataResponse().success_response(result, metadata)


@router.get("/history", response_model=PagingDataResponse[Stock])
def get_stock_history(history_request=Depends(StockHistoryParam)):
    result, metadata = StockService.get_history(history_request)
    return PagingDataResponse().success_response(result, metadata)


@router.get("/info/{symbol}", response_model=DataResponse[StockDetailInfo])
def get_stock_info(symbol: str):
    result = StockService.get_stock_info(symbol)
    return DataResponse().success_response(result)


@router.get("/interest", response_model=PagingDataResponse[StockInfo])
async def get_interest_stock(user_id=Depends(get_user_info)):
    result, metadata = await StockService.get_interest_stock(user_id)
    return PagingDataResponse().success_response(result, metadata)


@router.post("/interest/{symbol}", response_model=ResponseBase)
def add_interest_stock(symbol: str, user_id=Depends(get_user_info)):
    StockService.add_interest_stock(user_id, symbol)
    return ResponseBase().success_response()


@router.delete("/interest/{symbol}", response_model=ResponseBase)
def remove_interest_stock(symbol: str, user_id=Depends(get_user_info)):
    StockService.remove_interest_stock(user_id, symbol)
    return ResponseBase().success_response()
