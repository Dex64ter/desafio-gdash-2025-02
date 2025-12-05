FROM golang:1.25-alpine

WORKDIR /app

RUN apk add --no-cache git

# instala o Air (hot reload)
RUN go install github.com/cosmtrek/air@v1.40

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Expõe a porta da aplicação
EXPOSE 8080

# Air precisa do PATH do Go bin
ENV PATH="/go/bin:${PATH}"

CMD ["air"]