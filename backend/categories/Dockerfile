FROM openjdk:17-jdk-slim as builder

WORKDIR /app

# Copiar archivos necesarios para bajar dependencias
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Descargar dependencias antes (cache)
RUN ./mvnw dependency:go-offline

# Copiar código fuente
COPY src src

# Construir jar (sin tests para acelerar)
RUN ./mvnw clean package -DskipTests

# Stage final: imagen ligera con solo JRE y jar
FROM openjdk:17-jdk-slim

WORKDIR /app
RUN mkdir -p logs

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
