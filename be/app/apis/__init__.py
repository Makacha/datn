from fastapi import APIRouter
from app.apis.endpoints import stock, user, chart

router = APIRouter()
router.include_router(stock.router, prefix="/stock", tags=["stock"])
router.include_router(user.router, prefix="/user", tags=["user"])
router.include_router(chart.router, prefix="/chart", tags=["chart"])
