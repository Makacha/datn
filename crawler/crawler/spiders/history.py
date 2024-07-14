import json
from time import time_ns

import scrapy

from main import scrapyd


class HistorySpider(scrapy.Spider):
    name = 'historical'

    def __init__(self, symbol='', page=1, **kwargs):
        super().__init__(**kwargs)
        self.symbol = symbol
        self.page = int(page)
        self.start_urls = [(f'https://s.cafef.vn/Ajax/PageNew/DataHistory/PriceHistory.ashx?'
                            f'Symbol={symbol}&StartDate=&EndDate=&PageIndex={page}&PageSize=100')]

    def parse(self, response):
        json_response = json.loads(response.text)
        data = json_response['Data']
        total = int(data['TotalCount'])
        if total > self.page * 100:
            try:
                scrapyd.schedule('default', 'historical', symbol=self.symbol, page=self.page + 1)
            except Exception as e:
                print(e)
        records = data['Data']
        for item in records:
            item.__setitem__('symbol', self.symbol)
        return records
