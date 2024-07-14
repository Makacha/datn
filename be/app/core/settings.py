import os

from dotenv import load_dotenv


load_dotenv(verbose=True, encoding='utf8')


class Settings:
    SECRET_KEY: str = os.getenv('SECRET_KEY')
    HASH_ALGORITHM: str = os.getenv('HASH_ALGORITHM')
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # token expired after 8 days

    CASSANDRA_HOSTS: list[str] = os.getenv('CASSANDRA_HOSTS').split(',')
    CASSANDRA_PORT: str = os.getenv('CASSANDRA_PORT')
    CASSANDRA_USERNAME: str = os.getenv('CASSANDRA_USERNAME')
    CASSANDRA_PASSWORD: str = os.getenv('CASSANDRA_PASSWORD')
    CASSANDRA_KEYSPACE: str = os.getenv('CASSANDRA_KEYSPACE')


settings = Settings()
