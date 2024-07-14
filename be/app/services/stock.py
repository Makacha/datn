import asyncio
from typing import List
from uuid import UUID

from app.database import session
from app.helpers import convert_vietnamese_to_english
from app.helpers.exception_type import ExceptionType
from app.schemas import StockHistoryParam, Pagination, SearchSymbolParam, StockInfo, Stock, Symbol, StockDetailInfo
from cassandra.util import Date

from app.schemas.exception import AppException


class StockService:

    @classmethod
    def search_symbol(cls, params: SearchSymbolParam):
        query = f"SELECT * FROM symbol"
        rs = session.execute(query)
        result = []
        count = 0
        keyword = params.keyword.lower()
        latin_keyword = convert_vietnamese_to_english(keyword)
        for row in rs:
            if row['symbol'].lower().find(keyword) == -1:
                latin_name = convert_vietnamese_to_english(row['name'].lower())
                if latin_name.find(latin_keyword) == -1:
                    continue
            count += 1
            if (count < params.page * params.page_size) and (count >= (params.page - 1) * params.page_size):
                result.append(
                    Symbol(
                        symbol=row['symbol'],
                        name=row['name'],
                        exchange=row['exchange'],
                        category=row['category'],
                    )
                )

        metadata = Pagination(
            current_page=params.page,
            page_size=params.page_size,
            total_items=count
        )

        return result, metadata

    @classmethod
    def get_history(cls, history_request: StockHistoryParam):

        query = f"SELECT * FROM historical WHERE symbol = '{history_request.symbol}'"
        if history_request.start and history_request.end:
            query += f" AND time >= {history_request.start} AND time <= {history_request.end}"

        limit = history_request.page_size * history_request.page
        offset = (history_request.page - 1) * history_request.page_size
        query += f" ORDER BY time desc LIMIT {limit}"
        rs = session.execute(query)
        result = []
        for row in rs:
            offset -= 1
            if offset >= 0:
                continue
            result.append(
                Stock(
                    symbol=row['symbol'],
                    time=int(round(row['time'].timestamp())),
                    open=row['open'],
                    high=row['high'],
                    low=row['low'],
                    close=row['close'],
                    volume=row['volume'],
                    value=row['value'] if row['value'] else 0,
                    match_volume=row['match_volume'],
                    match_value=row['match_value'],
                    change=row['change'],
                )
            )

        result.reverse()

        query = f"SELECT count(*) FROM historical WHERE symbol = '{history_request.symbol}'"
        if history_request.start and history_request.end:
            query += f" AND date >= {history_request.start} AND date <= {history_request.end}"
        rs = session.execute(query)
        total = 0
        for row in rs:
            total = row['count']
            break

        metadata = Pagination(
            current_page=history_request.page,
            page_size=history_request.page_size,
            total_items=total
        )
        return result, metadata

    @classmethod
    async def get_interest_stock(cls, user_id: UUID) -> List[StockInfo]:
        query = f"SELECT * FROM interest_stock WHERE user_id = {user_id}"
        rs = session.execute(query)
        list_symbol = []
        for row in rs:
            list_symbol.append(f"'{row['symbol']}'")

        query = f"SELECT * FROM symbol WHERE symbol IN ({','.join(list_symbol)})"
        rs = session.execute(query)
        result = []
        count = 0
        for row in rs:
            count += 1
            result.append(
                StockInfo(
                    symbol=row['symbol'],
                    name=row['name'],
                    exchange=row['exchange'],
                    category=row['category'],
                )
            )

        result = await asyncio.gather(*[cls.get_price_info(stock) for stock in result])

        metadata = Pagination(
            current_page=1,
            page_size=count,
            total_items=count
        )

        return result, metadata

    @classmethod
    def add_interest_stock(cls, user_id: UUID, symbol: str):
        if not session.execute(f"SELECT * FROM symbol WHERE symbol = '{symbol}'").one():
            raise AppException(ExceptionType.SYMBOL_NOT_FOUND)
        query = f"INSERT INTO interest_stock (user_id, symbol) VALUES ({user_id}, '{symbol}')"
        session.execute(query)

    @classmethod
    def remove_interest_stock(cls, user_id: UUID, symbol: str):
        if not session.execute(f"SELECT * FROM symbol WHERE symbol = '{symbol}'").one():
            raise AppException(ExceptionType.SYMBOL_NOT_FOUND)
        query = f"DELETE FROM interest_stock WHERE user_id = {user_id} AND symbol = '{symbol}'"
        session.execute(query)

    @classmethod
    def get_stock_info(cls, symbol: str) -> StockDetailInfo:
        query = f"SELECT * FROM symbol WHERE symbol = '{symbol}'"
        symbol = session.execute(query).one()
        if not symbol:
            raise AppException(ExceptionType.SYMBOL_NOT_FOUND)

        stock_info = StockInfo(
            symbol=symbol['symbol'],
            name=symbol['name'],
            exchange=symbol['exchange'],
            category=symbol['category'],
        )

        return asyncio.run(cls.get_price_info(stock_info))

    @classmethod
    async def get_price_info(cls, stock: StockInfo):
        query = f"SELECT * FROM historical WHERE symbol = '{stock.symbol}'"
        price = session.execute(query).one()
        return StockInfo(
            symbol=stock.symbol,
            name=stock.name,
            exchange=stock.exchange,
            category=stock.category,
            price=price['close'] if price else 0,
            change=round(price['close']-price['open'], 2) if price else 0,
        )
