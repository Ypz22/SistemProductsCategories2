# Etapa 1: Build de Angular
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compilamos Angular en producción
RUN npx ng build --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:1.25-alpine

# Copiamos la carpeta exacta del build
COPY --from=builder /app/dist/app-product-categories /usr/share/nginx/html

# Copiamos configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
