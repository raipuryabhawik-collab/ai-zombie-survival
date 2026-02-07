const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
app.use(cors());

let startTime = Date.now();
let totalRequests = 0;
let gameScore = 0;

// =======================
// ROOT ENDPOINT
// =======================
app.get('/', (req, res) => {
  totalRequests++;
  res.send("🔥 AI Zombie Backend Running");
});

// =======================
// FAKE GAME SCORE (demo)
// =======================
app.get('/score', (req, res) => {
  totalRequests++;
  gameScore += Math.floor(Math.random() * 5);
  res.json({ score: gameScore });
});

// =======================
// 🔥 PROMETHEUS METRICS
// =======================
app.get('/metrics', (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  const cpuLoad = os.loadavg()[0];
  const memoryUsage = process.memoryUsage().rss / 1024 / 1024;

  res.set('Content-Type', 'text/plain');
  res.send(`
# HELP backend_requests_total Total HTTP Requests
# TYPE backend_requests_total counter
backend_requests_total ${totalRequests}

# HELP backend_uptime_seconds Backend Uptime
# TYPE backend_uptime_seconds gauge
backend_uptime_seconds ${uptime}

# HELP backend_cpu_load CPU Load
# TYPE backend_cpu_load gauge
backend_cpu_load ${cpuLoad}

# HELP backend_memory_mb Memory Usage in MB
# TYPE backend_memory_mb gauge
backend_memory_mb ${memoryUsage.toFixed(2)}

# HELP game_score Current Game Score
# TYPE game_score gauge
game_score ${gameScore}
  `);
});

// =======================
app.listen(5000, '0.0.0.0', () => {
  console.log("🚀 Backend running on port 5000");
});

