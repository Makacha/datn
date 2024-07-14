from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, to_date
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, LongType, DateType

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
      .option("subscribe", "news").load())
schema = StructType([
    StructField("image_url", StringType(), False),
    StructField("link", StringType(), False),
    StructField("title", StringType(), False),
    StructField("time", LongType(), False),
])

stock_df = (df.withColumn("jsonData", from_json(col("value").cast("string"), schema))
            .select(col("jsonData.image_url").alias("image_url"),
                    col("jsonData.link").alias("link"),
                    col("jsonData.title").alias("title"),
                    col("jsonData.time").alias("time"),
                    )
            .filter(col("link").isNotNull(), )
            )

(stock_df.writeStream.format("org.apache.spark.sql.cassandra")
 .option("checkpointLocation", "/tmp/checkpoint")
 .option("keyspace", "stock")
 .option("table", "news")
 .outputMode("append")
 .start().awaitTermination())
