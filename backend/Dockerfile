FROM node:20-slim

WORKDIR /app

# dependências do sistema (CORRIGE OpenSSL)
RUN apt-get update -y && apt-get install -y openssl ca-certificates

COPY package*.json ./
RUN npm install

COPY . .

# garante Prisma limpo
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]