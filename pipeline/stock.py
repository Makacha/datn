from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, LongType

spark = (SparkSession
         .builder
         .appName("Realtime")
         .config("spark.cassandra.connection.host", "172.18.0.6")
         .config("spark.cassandra.connection.port", "9042")
         .config("spark.cores.max", 2)
         .config("spark.driver.memory", "512m")
         .config("spark.executor.memory", "512m")
         .getOrCreate()
         )

df = (spark.readStream.format("kafka").option("kafka.bootstrap.servers", "172.18.0.3:9092")
      .option("failOnDataLoss", False)
      .option("subscribe", "stock").load())

schema = StructType([
    StructField("symbol", StringType(), False),
    StructField("price", DoubleType(), False),
    StructField("volume", DoubleType(), False),
    StructField("open", DoubleType(), False),
    StructField("high", DoubleType(), False),
    StructField("low", DoubleType(), False),
    StructField("floor", DoubleType(), False),
    StructField("ceiling", DoubleType(), False),
    StructField("time", LongType(), False)
])

stock_df = (df.withColumn("jsonData", from_json(col("value").cast("string"), schema))
            .select(col("jsonData.symbol").alias("symbol"),
                    col("jsonData.price").alias("close"),
                    col("jsonData.open").alias("open"),
                    col("jsonData.high").alias("high"),
                    col("jsonData.low").alias("low"),
                    col("jsonData.time").alias("time"),
                    ))

(stock_df.writeStream.format("org.apache.spark.sql.cassandra")
 .option("checkpointLocation", "/tmp/checkpoint")
 .option("keyspace", "stock")
 .option("table", "stock")
 .outputMode("append")
 .start().awaitTermination())
