# Etapa 1: Construcción
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli

COPY . .
RUN ng build --configuration production

# Etapa 2: Servidor Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/app-product-categories /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
