import os
import json
from time import time
import pika
import requests

RABBITMQ_URL = "amqp://rabbitmq:5672"
QUEUE_NAME = "data_queue"
def connect_rabbit():
  params = pika.URLParameters(RABBITMQ_URL)
  connection = pika.BlockingConnection(params)
  channel = connection.channel()
  channel.queue_declare(queue="weather-data")
  return connection, channel

def fetch_weather():
    url = ("https://api.open-meteo.com/v1/forecast?latitude=-5&longitude=-42.41&current_weather=true&timezone=America%2FSao_Paulo")
    response = requests.get(url)
    return response.json()["current_weather"]

def main():
    connection, channel = connect_rabbit()
    print("Collector iniciado...")

    while True:
        weather = fetch_weather()

        payload = {
            "temperature": weather["temperature"],
            "windspeed": weather["windspeed"],
            "winddirection": weather["winddirection"],
            "time": weather["time"],
        }

        channel.basic_publish(
            exchange="",
            routing_key="weather-data",
            body=json.dumps(payload),
        )

        print("Enviado para a fila:", payload)

        time.sleep(5000)

if __name__ == "__main__":
    main()