# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class TutorialItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass


class Stock(scrapy.Item):
    avgPrice = scrapy.Field()
    best1Bid = scrapy.Field()
    best1BidVol = scrapy.Field()
    best1Offer = scrapy.Field()
    best1OfferVol = scrapy.Field()
    best2Bid = scrapy.Field()
    best2BidVol = scrapy.Field()
    best2Offer = scrapy.Field()
    best2OfferVol = scrapy.Field()
    best3Bid = scrapy.Field()
    best3BidVol = scrapy.Field()
    best3Offer = scrapy.Field()
    best3OfferVol = scrapy.Field()
    caStatus = scrapy.Field()
    ceiling = scrapy.Field()
    corporateEvents = scrapy.Field()
    coveredWarrantType = scrapy.Field()
    exchange = scrapy.Field()
    exercisePrice = scrapy.Field()
    exerciseRatio = scrapy.Field()
    floor = scrapy.Field()
    highest = scrapy.Field()
    issuerName = scrapy.Field()
    lastTradingDate = scrapy.Field()
    lastVol = scrapy.Field()
    lowest = scrapy.Field()
    matchedPrice = scrapy.Field()
    maturityDate = scrapy.Field()
    nmTotalTradedValue = scrapy.Field()
    openPrice = scrapy.Field()
    priorClosePrice = scrapy.Field()
    refPrice = scrapy.Field()
    securityName = scrapy.Field()
    stockSymbol = scrapy.Field()
    stockType = scrapy.Field()
    totalShare = scrapy.Field()
    tradingStatus = scrapy.Field()
    tradingUnit = scrapy.Field()
    underlyingSymbol = scrapy.Field()
    companyNameEn = scrapy.Field()
    companyNameVi = scrapy.Field()
    oddSession = scrapy.Field()
    session = scrapy.Field()
    buyForeignQtty = scrapy.Field()
    remainForeignQtty = scrapy.Field()
    sellForeignQtty = scrapy.Field()
    matchedVolume = scrapy.Field()
    priceChange = scrapy.Field()
    priceChangePercent = scrapy.Field()
    lastMatchedPrice = scrapy.Field()
    lastMatchedVolume = scrapy.Field()
    lastPriceChange = scrapy.Field()
    lastPriceChangePercent = scrapy.Field()
    nmTotalTradedQty = scrapy.Field()
    stockNo = scrapy.Field()
