# Etapa 1: Construcción
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Usar Angular CLI local desde node_modules
RUN npx ng build --configuration production

# Etapa 2: Servidor Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/app-product-categories /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
