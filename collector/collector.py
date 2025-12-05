import os
import json
import time
import pika
import requests

RABBITMQ_URL = os.getenv("RABBITMQ_URL", "amqp://guest:guest@rabbitmq:5672/")
QUEUE_NAME = "weather-data"


def connect_rabbit():
    try:
        print(f"🔌 Tentando conectar ao RabbitMQ: {RABBITMQ_URL}")
        
        params = pika.URLParameters(RABBITMQ_URL)
        connection = pika.BlockingConnection(params)
        channel = connection.channel()
        channel.queue_declare(queue=QUEUE_NAME, durable=True)

        print("✔ Conectado ao RabbitMQ")
        return connection, channel

    except Exception as e:
        print(f"❌ Falha ao conectar ao RabbitMQ: {e}")
        print("⏳ Tentando novamente em 5s...")
        time.sleep(5)


def fetch_weather():
    url = (
        "https://api.open-meteo.com/v1/forecast?"
        "latitude=-5&longitude=-42.41&current_weather=true&timezone=America%2FSao_Paulo"
    )
    response = requests.get(url)
    return response.json()["current_weather"]


def main():
    print("Collector iniciado...")

    connection, channel = connect_rabbit()

    while True:
        try:
            weather = fetch_weather()

            payload = json.dumps(weather)

            channel.basic_publish(
                exchange="",
                routing_key=QUEUE_NAME,
                body=payload,
            )

            print("✔ Mensagem enviada:", weather)

            time.sleep(120)

        except (pika.exceptions.AMQPConnectionError, pika.exceptions.StreamLostError):
            print("⚠ Conexão perdida! Tentando reconectar...")
            connection, channel = connect_rabbit()

        except Exception as e:
            print(f"❌ Erro inesperado: {e}")
            time.sleep(5)


if __name__ == "__main__":
    main()
