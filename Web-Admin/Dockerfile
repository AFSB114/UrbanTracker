# Usar una imagen base de Node.js
FROM node:20-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Usar una imagen más ligera para producción
FROM node:20-alpine AS production

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos construidos desde la etapa de construcción
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.* ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Exponer el puerto 3001
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]