import json
from time import time_ns

import scrapy


class HistorySpider(scrapy.Spider):
    name = 'daily'

    def __init__(self, symbol='', date='', **kwargs):
        super().__init__(**kwargs)
        self.symbol = symbol
        self.start_urls = [(f'https://s.cafef.vn/Ajax/PageNew/DataHistory/PriceHistory.ashx?'
                            f'Symbol={symbol}&StartDate={date}&EndDate={date}&PageIndex=1&PageSize=1')]

    def parse(self, response):
        json_response = json.loads(response.text)
        data = json_response['Data']['Data']
        for item in data:
            item.__setitem__('symbol', self.symbol)
        return data
