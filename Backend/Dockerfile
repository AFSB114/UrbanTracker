# Usar una imagen base con Maven y JDK 17 para construir la aplicación
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo pom.xml y descargar dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el código fuente
COPY src ./src

# Construir la aplicación
RUN mvn clean package -Dmaven.test

# Usar una imagen base más ligera para ejecutar la aplicación
FROM eclipse-temurin:17-jre

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el JAR construido desde la etapa de construcción
COPY --from=build /app/target/*.jar app.jar

# Exponer el puerto 8080
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]