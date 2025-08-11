FROM openjdk:17-jdk-slim as builder

WORKDIR /app

# Copiar pom y archivos para descargar dependencias
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Descargar dependencias (cacheo)
RUN ./mvnw dependency:go-offline

# Copiar código fuente
COPY src src

# Construir el jar (sin tests)
RUN ./mvnw clean package -DskipTests

# Imagen final
FROM openjdk:17-jdk-slim

WORKDIR /app
RUN mkdir -p logs

COPY --from=builder /app/target/products-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
