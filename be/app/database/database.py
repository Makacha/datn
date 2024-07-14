from cassandra.cluster import Cluster
from cassandra.query import dict_factory

from app.core import settings

cassandra_uri = (f'cassandra://{settings.CASSANDRA_USERNAME}:{settings.CASSANDRA_PASSWORD}'
                 f'@{settings.CASSANDRA_HOSTS}:{settings.CASSANDRA_PORT}/{settings.CASSANDRA_KEYSPACE}')

cluster = Cluster(settings.CASSANDRA_HOSTS)
session = cluster.connect(settings.CASSANDRA_KEYSPACE)
session.row_factory = dict_factory
