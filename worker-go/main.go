package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/streadway/amqp"
)

type WeatherData struct {
	Temperature   float64 `json:"temperature"`
	WindSpeed     float64 `json:"windspeed"`
	WindDirection int     `json:"winddirection"`
	Time          string  `json:"weather_time"`
}

func main() {

	rmqURL := os.Getenv("RABBITMQ_URL")
	if rmqURL == "" {
		rmqURL = "amqp://guest:guest@rabbitmq:5672/"
	}

	// Conexão RabbitMQ
	conn, err := amqp.Dial(rmqURL)
	if err != nil {
		log.Fatalf("Erro ao conectar no RabbitMQ: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Erro ao abrir canal: %v", err)
	}
	defer ch.Close()

	// Garantir que a fila existe
	q, err := ch.QueueDeclare(
		"weather-data",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Erro ao declarar a fila: %v", err)
	}

	msgs, err := ch.Consume(
		q.Name,
		"",
		true, // auto-ack
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Erro ao consumir fila: %v", err)
	}

	log.Println("Worker Go iniciado... aguardando mensagens.")

	// Loop infinito
	for msg := range msgs {
		var weather WeatherData
		if err := json.Unmarshal(msg.Body, &weather); err != nil {
			log.Printf("Erro ao parsear mensagem: %v", err)
			continue
		}

		log.Printf("🔥 Dados recebidos: %+v\n", weather)

		resp, err := http.Post(apiURL+"/weather", "application/json", bytes.NewBuffer(body))
		if err != nil {
			log.Println("❌ Erro ao enviar para API:", err)
			return
		}
	}

	fmt.Println("Worker finalizado.")
}
