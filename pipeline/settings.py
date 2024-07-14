import os

from dotenv import load_dotenv


load_dotenv(verbose=True, encoding='utf8')


class Settings:
    CASSANDRA_HOSTS: list[str] = os.getenv('CASSANDRA_HOSTS', 'localhost').split(',')
    CASSANDRA_KEYSPACE: str = os.getenv('CASSANDRA_KEYSPACE', 'test_key_space')


settings = Settings()
