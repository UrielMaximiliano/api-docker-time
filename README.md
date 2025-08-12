# Comandos para ejecutar la API (Windows PowerShell)

API: Express que devuelve la hora actual en `GET /api/time`.

## Requisitos
- Docker Desktop instalado y corriendo.

## Pasos rápidos
```powershell
# 1) Ir a la carpeta del proyecto
cd 'C:\Users\Uriel Sabugo\Desktop\docker\docker'

# 2) Limpiar por si hay algo previo
docker compose down -v

# 3) Construir y levantar en segundo plano
docker compose up -d --build

# 4) Probar endpoints
curl.exe -s http://localhost:3000/health
curl.exe -s http://localhost:3000/api/time

# 5) Abrir en el navegador
start http://localhost:3000/api/time

# 6) Ver estado y logs (opcional)
docker ps
docker logs time-api --tail 100

# 7) Detener cuando termines
docker compose down
```

## Variables útiles
- La zona horaria local que se usa para `time_local` se configura con `TIMEZONE` en `docker/docker-compose.yml` (por defecto `America/Argentina/Buenos_Aires`).
- El servicio escucha en `PORT` (por defecto `3000`).

## Despliegue en Render (opcional)
Hay un `render.yaml` en la raíz (Blueprint). Flujo sugerido:
1. Subí el repo a GitHub.
2. En Render: New → Blueprint → seleccioná el repo.
3. Crear el servicio y abrir `https://<tu-servicio>.onrender.com/api/time`.
