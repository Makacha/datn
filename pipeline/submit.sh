#!/bin/bash

nohup spark-submit --master spark://spark-master:7077 --packages org.apache.spark:spark-sql-kafka-0-10_2.12:3.0.0,com.datastax.spark:spark-cassandra-connector_2.12:3.0.0 historical.py > log_historical.out &

nohup spark-submit --master spark://172.18.0.4:7077 --packages org.apache.spark:spark-sql-kafka-0-10_2.12:3.0.0,com.datastax.spark:spark-cassandra-connector_2.12:3.0.0 stock.py > log_stock.out &

nohup spark-submit --master spark://172.18.0.4:7077 --packages org.apache.spark:spark-sql-kafka-0-10_2.12:3.0.0,com.datastax.spark:spark-cassandra-connector_2.12:3.0.0 news.py > log_news.out &


kubectl run dns-test --image=busybox:1.28 --restart=Never -it --rm -- nslookup kafka.kafka.svc.cluster.local
