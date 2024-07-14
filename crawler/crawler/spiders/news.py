import json
from time import time_ns

import scrapy


class NewsSpider(scrapy.Spider):
    name = 'news'
    start_urls = ['https://www.tinnhanhchungkhoan.vn/chung-khoan/']

    def parse(self, response):
        list_news = []

        list_raw_news = response.css('div.category-highlight div.rank-1 article.story')
        for raw_news in list_raw_news:
            list_news.append({
                'image_url': raw_news.css('figure a img::attr(src)').get(),
                'link': raw_news.css('h2 a::attr(href)').get(),
                'title': raw_news.css('h2 a::attr(title)').get(),
                'time': raw_news.css('div time::attr(data-time)').get(),
            })

        list_raw_news = response.css('div.category-highlight div.rank-2 article.story')
        for raw_news in list_raw_news:
            list_news.append({
                'image_url': raw_news.css('figure a img::attr(src)').get(),
                'link': raw_news.css('h2 a::attr(href)').get(),
                'title': raw_news.css('h2 a::attr(title)').get(),
                'time': raw_news.css('div time::attr(data-time)').get(),
            })
        return list_news
