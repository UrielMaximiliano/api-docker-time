// API en Express que expone una ruta /api/time devolviendo la hora actual (UTC e interpretada en una zona horaria configurable)
const express = require('express');

const app = express();
// Puerto configurable por variable de entorno (por defecto 3000)
const PORT = process.env.PORT || 3000;
// Zona horaria configurable: usa TIMEZONE o TZ; por defecto UTC
const TIMEZONE = process.env.TIMEZONE || process.env.TZ || 'UTC';

// GET /api/time -> devuelve la hora actual
app.get('/api/time', (_req, res) => {
  const now = new Date();
  const isoUtc = now.toISOString();
  const local = new Intl.DateTimeFormat('es-AR', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);

  res.json({
    time: isoUtc,            // ISO en UTC (estable para integraciones)
    time_local: local,       // Hora local formateada segun TIMEZONE
    timezone: TIMEZONE,
    epoch_ms: now.getTime(),
  });
});

// Endpoints de healthcheck y raíz
app.get(['/', '/health'], (_req, res) => {
  res.json({ status: 'ok' });
});

// Manejador 404 para rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Time API (Express) escuchando en puerto ${PORT}`);
});


