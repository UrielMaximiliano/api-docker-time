# API de Hora Actual (Express + Docker)

Este proyecto expone una API mínima con Express que devuelve la hora actual en formato ISO a través de `GET /api/time`. Incluye `Dockerfile` y `docker-compose.yml` para construir y ejecutar en contenedores.

## Endpoints
- `GET /api/time`: retorna `{ "time": "<ISO>" }`
- `GET /` o `GET /health`: healthcheck `{ "status": "ok" }`

## Ejecutar desde cero (Windows PowerShell)
```powershell
cd 'C:\Users\Uriel Sabugo\Desktop\docker\docker'
docker compose up -d --build
curl.exe -s http://localhost:3000/api/time
```

Para detener:
```powershell
docker compose down
```

## Estructura
- `server.js`: servidor Express con las rutas.
- `package.json`: metadatos y dependencias (Express).
- `Dockerfile`: instrucciones para empaquetar la app en una imagen.
- `docker-compose.yml`: orquesta el contenedor y mapea puertos.

## ¿Qué hace cada archivo?
- `server.js`: inicia Express, define `/api/time`, `/` y `/health`, maneja 404 y escucha en `PORT`.
- `Dockerfile`:
  - Usa `node:20-alpine` (imagen ligera).
  - Define `WORKDIR /app`.
  - Copia `package.json` e instala dependencias de producción.
  - Copia `server.js`.
  - Expone `PORT=3000` y ejecuta `npm start`.
- `docker-compose.yml`:
  - Construye la imagen localmente.
  - Mapea `3000:3000` para acceder desde el host.
  - Pasa `PORT=3000` al contenedor.
  - Configura reinicio `unless-stopped`.

## Notas
- Puedes abrir el navegador en `http://localhost:3000/api/time` para ver el JSON.
- Si cambias el puerto, ajusta `ports` y la variable `PORT` en el compose.

## Despliegue en Render (Blueprint)
Puedes desplegar con un clic usando el archivo `render.yaml` en la raíz. Pasos:

1. Haz push del repo a GitHub.
2. Entra a `https://dashboard.render.com/`, clic en New → Blueprint → Conecta el repo.
3. Render detectará `render.yaml` (con `rootDir: docker`) y creará un Web Service Node.
4. Variables preconfiguradas:
   - `TIMEZONE=America/Argentina/Buenos_Aires` (ajústala a gusto)
   - `PORT` lo define Render (ya usamos `process.env.PORT`). En la blueprint está en 10000 por compatibilidad.
5. Crear servicio. Al terminar, visitar `https://<tu-app>.onrender.com/api/time`.
