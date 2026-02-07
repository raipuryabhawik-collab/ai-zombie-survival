const express = require("express");
const cors = require("cors");
const client = require("prom-client");

const app = express();
app.use(cors());
app.use(express.json());

let activePlayers = 0;
let zombiesKilled = 0;

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const playersGauge = new client.Gauge({
  name: "game_active_players",
  help: "Current active players",
});

const zombieCounter = new client.Counter({
  name: "game_zombies_killed_total",
  help: "Total zombies killed",
});

register.registerMetric(playersGauge);
register.registerMetric(zombieCounter);

app.post("/join", (req, res) => {
  activePlayers++;
  playersGauge.set(activePlayers);
  res.json({ players: activePlayers });
});

app.post("/kill", (req, res) => {
  zombiesKilled++;
  zombieCounter.inc();
  res.json({ kills: zombiesKilled });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(5000, () => console.log("Game running on port 5000"));

