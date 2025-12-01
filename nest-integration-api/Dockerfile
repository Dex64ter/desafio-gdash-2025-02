# Dockerfile para API NestJS (conecta ao MongoDB e recebe dados de um worker Go)
# Multi-stage build: build + runtime

FROM node:18-alpine AS builder
WORKDIR /nest-integration-api

# instalar dependências de build
COPY package*.json package-lock.json ./
RUN npm ci

# copiar código e compilar
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build

# Imagem final enxuta
FROM node:18-alpine AS runner
WORKDIR /nest-integration-api
ENV NODE_ENV=production
ENV PORT=3000
ENV MONGO_URI=mongodb://mongo:27015/GDASH

# instalar só dependências de produção
COPY package*.json package-lock.json ./
RUN npm ci --only=production --no-audit --prefer-offline

# copiar artefatos de build
COPY --from=builder /nest-integration-api/dist ./dist
# se existir assets/public estáticos
COPY --from=builder /nest-integration-api/public ./public

# rodar como usuário não-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

# comando de inicialização (ajuste se usar ts-node ou outra entrada)
CMD ["node", "dist/main.js"]