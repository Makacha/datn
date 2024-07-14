# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import json
from datetime import datetime

from cassandra.cluster import Cluster
from cassandra.query import dict_factory
# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from kafka import KafkaProducer

from main import connect_cassandra


class KafkaPipeline(object):

    def __init__(self, server, historical_topic, cassandra_hosts, cassandra_keyspace,):
        self.producer = None
        self.server = server
        self.historical_topic = historical_topic
        self.cassandra_hosts = cassandra_hosts.split(',')
        self.cassandra_keyspace = cassandra_keyspace
        self.session = None

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            server=crawler.settings.get('KAFKA_SERVER'),
            historical_topic=crawler.settings.get('KAFKA_HISTORICAL_TOPIC'),
            cassandra_hosts=crawler.settings.get('CASANDRA_HOSTS'),
            cassandra_keyspace=crawler.settings.get('CASANDRA_KEYSPACE'),
        )

    def open_spider(self, spider):
        self.producer = KafkaProducer(
            bootstrap_servers=[self.server],
            value_serializer=lambda v: json.dumps(v).encode('utf-8')
        )
        # self.session = Cluster(self.cassandra_hosts).connect(self.cassandra_keyspace)
        # self.session.row_factory = dict_factory

    def process_item(self, item, spider):
        if spider.name == 'historical' or spider.name == 'daily':
            self.producer.send(self.historical_topic, item)
            # self.send_db(item)
        return item

    def send_db(self, item):
        print("send db symbol: ", item['symbol'])
        query = (f"insert into historical "
                 f"(symbol, time, open, high, low, close, volume, value, match_volume, match_value, change)"
                 f" values ('{item['symbol']}', '{datetime.strptime(item['Ngay'], '%d/%m/%Y')}', "
                 f"{item['GiaMoCua']}, {item['GiaCaoNhat']}, "
                 f"{item['GiaThapNhat']},"
                 f" {item['GiaDongCua']}, {item['KhoiLuongKhopLenh']}, {item['GiaTriKhopLenh']}, "
                 f"{item['KLThoaThuan']}, {item['GtThoaThuan']},"
                 f" {item['GiaDieuChinh']})")
        self.session.execute(query)
