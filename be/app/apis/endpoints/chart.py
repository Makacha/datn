from fastapi import APIRouter, Depends

from app.schemas import PagingDataResponse, Symbol
from app.schemas.chart import SearchIndicatorParam, Indicator
from app.services.chart import ChartService

router = APIRouter()


@router.get("/indicator", response_model=PagingDataResponse[Indicator])
def get_indicator(params=Depends(SearchIndicatorParam)):
    result, metadata = ChartService.get_indicator(params)
    return PagingDataResponse().success_response(result, metadata)
