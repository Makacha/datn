import os

import requests
import schedule
import asyncio
import datetime
from dotenv import load_dotenv
from scrapyd_api import ScrapydAPI

load_dotenv(verbose=True, encoding='utf8')
scrapyd_server = os.getenv('SCRAPYD_SERVER')
scrapyd = ScrapydAPI(scrapyd_server)


def connect_cassandra():
    from cassandra.cluster import Cluster
    from cassandra.query import dict_factory

    hosts = os.getenv('CASSANDRA_HOSTS').split(',')
    keyspace = os.getenv('CASSANDRA_KEYSPACE')
    cluster = Cluster(hosts)
    session = cluster.connect(keyspace)
    session.row_factory = dict_factory
    return session


async def init_job():
    session = connect_cassandra()

    async def execute(query):
        print(query)
        session.execute(query)

    params = {'take': 2000}
    response = requests.post(url='https://s.cafef.vn/ajax/pagenew/databusiness/congtyniemyet.ashx', params=params,
                             verify=False)
    data = response.json()["Data"]
    executeList = [
        "INSERT INTO symbol (symbol, name, exchange, category) VALUES ('VNINDEX', 'VN-INDEX', 'HSX', '')",
        "INSERT INTO symbol (symbol, name, exchange, category) VALUES ('HNXINDEX', 'HN-INDEX', 'HNX', '')",
        "INSERT INTO symbol (symbol, name, exchange, category) VALUES ('UPCOMINDEX', 'UPCOM-INDEX', 'UpCOM', '')",
        "INSERT INTO symbol (symbol, name, exchange, category) VALUES ('VN30INDEX', 'VN30-INDEX', 'HSX', '')",
        "INSERT INTO symbol (symbol, name, exchange, category) VALUES ('VN100INDEX', 'VN100-INDEX', 'HSX', '')",
        "INSERT INTO symbol (symbol, name, exchange, category) VALUES ('HNX30INDEX', 'HNX30-INDEX', 'HNX', '')",
    ]
    for item in data:
        symbol = item["Symbol"]
        name = item["CompanyName"]
        category = item["CategoryName"]
        center_id = item["TradeCenterId"]
        if center_id not in [1, 2, 9]:
            continue
        center = 'HSX' if center_id == 1 else 'HNX' if center_id == 2 else 'UpCOM'
        executeList.append(
            f"INSERT INTO symbol (symbol, name, exchange, category) "
            f"VALUES ('{symbol}', '{name}', '{center}', '{category}')"
        )

    await asyncio.gather(*[execute(query) for query in executeList])


def realtime_job():
    scrapyd.schedule('default', 'realtime', priority=2)


def historical_job():
    print('Start historical job')
    session = connect_cassandra()
    print('Connected to cassandra')
    rs = session.execute("select symbol from symbol")
    for row in rs:
        print(f'Schedule historical job for {row["symbol"]}')
        scrapyd.schedule('default', 'historical', symbol=row['symbol'])


def daily_job():
    session = connect_cassandra()
    rs = session.execute('select symbol from symbol')
    today = datetime.datetime.now(tz=datetime.timezone(datetime.timedelta(hours=7))).strftime('%m/%d/%Y')
    for row in rs:
        scrapyd.schedule('default', 'daily', priority=1, symbol=row['symbol'], date=today)


schedule.every(15).seconds.do(realtime_job)
schedule.every().day.at("21:00").do(daily_job)

if __name__ == '__main__':
    job_type = os.getenv('JOB_TYPE')
    if job_type == 'init':
        asyncio.run(init_job())
    elif job_type == 'historical':
        historical_job()
    elif job_type == 'daily':
        daily_job()
    else:
        print('Invalid job type')