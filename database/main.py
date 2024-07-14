import os
from cassandra.cluster import Cluster
from dotenv import load_dotenv

load_dotenv(verbose=True, encoding='utf8')
hosts = os.getenv('CASSANDRA_HOSTS').split(',')
keyspace = os.getenv('CASSANDRA_KEYSPACE')

if __name__ == '__main__':
    cluster = Cluster(hosts)
    session = cluster.connect()

    session.execute(f"create keyspace if not exists {keyspace} "
                    f"with replication = {{'class': 'SimpleStrategy', 'replication_factor': 3}}")

    session.set_keyspace(keyspace)

    session.execute("create table if not exists symbol ("
                    "symbol varchar primary key, "
                    "name varchar, "
                    "category varchar, "
                    "exchange varchar)")

    session.execute("create table if not exists user ("
                    "id UUID, "
                    "username varchar, "
                    "password varchar, "
                    "fullname varchar, "
                    "email varchar, "
                    "phone varchar, "
                    "primary key (id, username, email))")

    session.execute("create table if not exists interest_stock ("
                    "user_id UUID, "
                    "symbol varchar, "
                    "primary key (user_id, symbol))")

    session.execute("create table if not exists historical ("
                    "symbol varchar, "
                    "time timestamp, "
                    "open double, "
                    "high double, "
                    "low double, "
                    "close double, "
                    "volume double, "
                    "value double, "
                    "match_volume double, "
                    "match_value double, "
                    "change double, "
                    "change_percent double, "
                    "primary key (symbol, time))")

    session.execute("create table if not exists indicator ("
                    "id bigint, "
                    "name varchar, "
                    "description varchar, "
                    "formula varchar, "
                    "primary key (id))")

    session.execute("create table if not exists indicator_data ("
                    "indicator_id bigint, "
                    "symbol varchar, "
                    "time timestamp, "
                    "data varchar, "
                    "primary key (indicator_id, symbol, time))")
