from cassandra.cluster import Cluster
from settings import settings

cluster = Cluster(settings.CASSANDRA_HOSTS)
session = cluster.connect(settings.CASSANDRA_KEYSPACE)
