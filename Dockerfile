## Imagen base mínima de Node.js (alpine = ligera)
FROM node:20-alpine

## Directorio de trabajo dentro del contenedor
WORKDIR /app

## Copiamos solo package.json para aprovechar la cache de capas
COPY package.json ./
## Instalamos dependencias de producción
RUN npm ci --omit=dev || npm install --omit=dev

## Copiamos el código fuente de la API
COPY server.js ./

## Puerto de la aplicación (variable y exposición de puerto)
ENV PORT=3000
EXPOSE 3000

## Comando por defecto para iniciar la API
CMD ["npm", "start"]


