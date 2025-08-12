# GestionTienda

**Tienda – Angular 19 + Spring Boot 17 + MySQL (Docker Compose)**  
Sistema de gestión de productos y categorías desplegado con Docker Compose.  
Arquitectura: **Nginx (reverse proxy) → Frontend Angular → Gateway (Spring) → Microservicios (Spring) → MySQL**.

---

## Demo / Acceso

- **Frontend:** http://3.150.6.99/
- **APIs (vía gateway):**
  - Productos: http://3.150.6.99/api/products
  - Categorías: http://3.150.6.99/api/categories

---

## Arquitectura de contenedores

- **test-db2** → MySQL 8 con volumen `db-data` y healthcheck.
- **app-categories** → Microservicio Spring Boot (categorías), conectado a `test-db2`.
- **app-products** → Microservicio Spring Boot (productos), conectado a `test-db2`.
- **frontend** → Angular 19 (build producción).
- **edge** → Nginx (reverse proxy, expone en puerto 80):
  - Sirve el frontend en `/`
  - Redirige `/api/**` a microservicios

Todos los contenedores se comunican en la red `test-network`.  
Solo **edge** expone puertos hacia afuera.

---

## ✅ Requisitos

- **Docker Engine 25+**
- **Docker Compose v2+**
- Ubuntu 22.04+ (probado en x86_64)

---

## 🚀 Guía de despliegue

### Paso 1: Clonar repositorio en Ubuntu

```bash
git clone https://github.com/Ypz22/SistemProductsCategories2
cd tu_repositorio
```

---

### Paso 2: Instalar Docker y Docker Compose

```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

⚠️ Cierra y vuelve a iniciar sesión para que el grupo `docker` se aplique.

---

### Paso 3: Desplegar con Docker Compose

```bash
docker-compose up --build -d
```

Esto:
1. Levanta MySQL (`test-db2`) con usuario y contraseña definidos.
2. Espera que MySQL esté listo antes de arrancar microservicios (`app-categories` y `app-products`).
3. Construye el frontend Angular en producción.
4. Publica todo a través de Nginx (`edge`) en el puerto 80.

---

### Paso 4: Acceder a la aplicación

Abre en tu navegador:

```
http://3.150.6.99/
```

---

## 📦 Estructura del `docker-compose.yml`

```yaml
version: '3.8'

networks:
  test-network:
    driver: bridge

volumes:
  db-data:

services:
  test-db2:
    image: mysql:8.0
    container_name: test-db2
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: admin
      MYSQL_DATABASE: test
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - db-data:/var/lib/mysql
    networks:
      - test-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-uroot", "-padmin"]
      interval: 5s
      timeout: 3s
      retries: 10

  app-categories:
    build:
      context: ./backend/categories
      dockerfile: Dockerfile
    container_name: c-app-categories
    restart: always
    environment:
      DB_HOST: test-db2
      DB_USER: user
      DB_PASSWORD: password
      DB_NAME: test
    depends_on:
      test-db2:
        condition: service_healthy
    networks:
      - test-network

  app-products:
    build:
      context: ./backend/products
      dockerfile: Dockerfile
    container_name: c-app-products
    restart: always
    environment:
      DB_HOST: test-db2
      DB_USER: user
      DB_PASSWORD: password
      DB_NAME: test
    depends_on:
      test-db2:
        condition: service_healthy
    networks:
      - test-network

  frontend:
    build:
      context: ./frontend/app-product-categories
      dockerfile: Dockerfile
    container_name: c-sistema
    restart: always
    depends_on:
      - app-categories
      - app-products
    networks:
      - test-network

  edge:
    image: nginx:alpine
    container_name: edge
    restart: always
    ports:
      - "80:80"
    volumes:
      - ./edge.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - frontend
      - app-categories
      - app-products
    networks:
      - test-network
```

---

## 📄 Archivos importantes

- **docker-compose.yml** → Orquesta todos los servicios.
- **edge.conf** → Configuración de Nginx para servir frontend y enrutar APIs.

---

## 🔗 Recursos

- [Documentación Angular CLI](https://angular.io/cli)
- [Documentación Docker Compose](https://docs.docker.com/compose/)

---
