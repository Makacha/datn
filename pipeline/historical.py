import os

from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, to_date, to_timestamp
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, LongType, DateType

cassandra_host = os.getenv("CASSANDRA_HOST", "cassandra")
cassandra_port = os.getenv("CASSANDRA_PORT", "9042")
kafka_server = os.getenv("KAFKA_SERVER", "kafka:9092")
core_max = os.getenv("SPARK_CORES_MAX", "4")
driver_memory = os.getenv("SPARK_DRIVER_MEMORY", "128m")
executor_memory = os.getenv("SPARK_EXECUTOR_MEMORY", "512m")

spark = (SparkSession
         .builder
         .appName("Realtime")
         .config("spark.cassandra.connection.host", cassandra_host)
         .config("spark.cassandra.connection.port", cassandra_port)
         .config("spark.cores.max", core_max)
         .config("spark.driver.memory", driver_memory)
         .config("spark.executor.memory", executor_memory)
         .getOrCreate()
         )

df = (spark.readStream.format("kafka")
      .option("kafka.bootstrap.servers", kafka_server)
      .option("failOnDataLoss", False)
      .option("subscribe", "historical").load())
schema = StructType([
    StructField("Ngay", StringType(), False),
    StructField("GiaDieuChinh", DoubleType(), False),
    StructField("GiaDongCua", DoubleType(), False),
    StructField("ThayDoi", StringType(), False),
    StructField("KhoiLuongKhopLenh", LongType(), False),
    StructField("GiaTriKhopLenh", LongType(), False),
    StructField("KLThoaThuan", LongType(), False),
    StructField("GtThoaThuan", LongType(), False),
    StructField("GiaMoCua", DoubleType(), False),
    StructField("GiaCaoNhat", DoubleType(), False),
    StructField("GiaThapNhat", DoubleType(), False),
    StructField("symbol", StringType(), False),
])

stock_df = (df.withColumn("jsonData", from_json(col("value").cast("string"), schema))
            .select(col("jsonData.symbol").alias("symbol"),
                    to_timestamp(col("jsonData.Ngay"), "dd/MM/yyyy").alias("time"),
                    col("jsonData.GiaDongCua").alias("close"),
                    col("jsonData.GiaMoCua").alias("open"),
                    col("jsonData.GiaThapNhat").alias("low"),
                    col("jsonData.GiaCaoNhat").alias("high"),
                    col("jsonData.KhoiLuongKhopLenh").alias("volume"),
                    col("jsonData.GiaTriKhopLenh").alias("value"),
                    col("jsonData.KLThoaThuan").alias("match_volume"),
                    col("jsonData.GtThoaThuan").alias("match_value"),
                    col("jsonData.GiaDieuChinh").alias("change"),
                    # col("jsonData.ThayDoi").alias("change_percent"),
                    ))

(stock_df.writeStream.format("org.apache.spark.sql.cassandra")
 .option("checkpointLocation", "/tmp/checkpoint")
 .option("keyspace", "stock")
 .option("table", "historical")
 .outputMode("append")
 .start().awaitTermination())
