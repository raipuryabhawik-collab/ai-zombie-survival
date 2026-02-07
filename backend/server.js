const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = 5000;

/* ---------------- Prometheus Metrics Setup ---------------- */

// Collect default Node.js metrics (CPU, memory, event loop, etc.)
client.collectDefaultMetrics();

// Custom HTTP request counter
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

// Middleware to count requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode
    });
  });
  next();
});

/* ---------------- Routes ---------------- */

// Test route
app.get('/', (req, res) => {
  res.send('AI Zombie Backend Running 🚀');
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

/* ---------------- Start Server ---------------- */

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

