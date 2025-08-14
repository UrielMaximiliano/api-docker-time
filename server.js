// API en Express que expone una ruta /api/time devolviendo la hora actual (UTC e interpretada en una zona horaria configurable)
const express = require('express');

const app = express();
// Puerto configurable por variable de entorno (por defecto 3000)
const PORT = process.env.PORT || 3000;
// Zona horaria configurable: usa TIMEZONE o TZ; por defecto UTC
const TIMEZONE = process.env.TIMEZONE || process.env.TZ || 'UTC';

// Evita que clientes o proxies cacheen la respuesta: siempre hora actual
app.use((_req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Habilita CORS para permitir que el HTML (en otro contenedor) consuma la API
app.use((_req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  if (_req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

function buildTimePayload() {
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

  return {
    time: isoUtc,
    time_local: local,
    timezone: TIMEZONE,
    epoch_ms: now.getTime(),
  };
}

// GET /api/time -> devuelve la hora actual
app.get('/api/time', (_req, res) => {
  res.json(buildTimePayload());
});

// Endpoints de healthcheck y raíz devuelven la hora
app.get(['/', '/health'], (_req, res) => {
  res.json(buildTimePayload());
});

// Manejador 404 para rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Time API (Express) escuchando en puerto ${PORT}`);
});


