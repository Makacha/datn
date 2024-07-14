FROM python:3.11

COPY . /opt/bitnami/spark/

ENV SPARK_MASTER=spark://spark-master:7077

CMD ["/bin/bash", "-c", "spark-submit --master ${SPARK_MASTER} --packages org.apache.spark:spark-sql-kafka-0-10_2.12:3.0.1,com.datastax.spark:spark-cassandra-connector_2.12:3.0.0 /opt/bitnami/spark/historical.py"]
