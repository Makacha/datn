import json
from time import time_ns

import scrapy


class RealtimeSpider(scrapy.Spider):
    name = 'realtime'
    start_urls = ['https://bgapidatafeed.vps.com.vn/getliststockdata/ACB,BCM,BID,BVH,CTG,FPT,GAS,GVR,HDB,HPG,MBB,MSN,'
                  'MWG,PLX,POW,SAB,SHB,SSB,SSI,STB,TCB,TPB,VCB,VHM,VIB,VIC,VJC,VNM,VPB,VRE']

    def parse(self, response):
        json_response = json.loads(response.text)
        raw_stock_list = json_response
        stock_list = []

        for stock in raw_stock_list:
            stock_list.append({
                'symbol': stock['sym'],
                'price': stock['lastPrice'],
                'volume': stock['lastVolume'],
                'open': stock['r'],
                'high': stock['highPrice'],
                'low': stock['lowPrice'],
                'floor': stock['f'],
                'ceiling': stock['c'],
                'time': time_ns()
            })
        return stock_list
