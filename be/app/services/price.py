from app.database import session
from datetime import datetime, date, time


class PriceService:

    @classmethod
    def get_chart_price(cls):
        today = datetime.combine(date.today(), time())
        print(today)
        rs = session.execute(f"SELECT * FROM stock where symbol = 'VCB'")
        map_prices = {}
        for row in rs:
            if row['symbol'] not in map_prices:
                map_prices[row['symbol']] = []
            map_prices.get(row['symbol']).append({
                'price': row['close'],
                'forecast': row['open'],
                'time': row['time']
            })
        return {'prices': [{'symbol': symbol, 'prices': prices} for symbol, prices in map_prices.items()]}

    @classmethod
    def get_board_price(cls):
        rs = session.execute(f"SELECT * FROM stock")
        map_prices = {}
        prices = []
        for row in rs:
            if row['symbol'] not in map_prices:
                map_prices[row['symbol']] = True
                prices.append({
                    'symbol': row['symbol'],
                    'price': row['close'],
                    'open': row['open'],
                    # 'floor': row['floor'],
                    # 'ceiling': row['ceiling'],
                    'low': row['low'],
                    'high': row['high'],
                    # 'volume': row['volume'],
                    # 'value': row['value'],
                    'time': row['time']
                })
        return {'prices': prices}
