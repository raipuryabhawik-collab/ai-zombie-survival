const express = require("express");
const cors = require("cors");
const client = require("prom-client");

const app = express();
app.use(cors());

<<<<<<< HEAD
const register = new client.Registry();

const activePlayers = new client.Gauge({
    name: "game_active_players",
    help: "Active players in game"
});

const totalScore = new client.Gauge({
    name: "game_total_score",
    help: "Total game score"
=======
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// ---- GAME METRICS ----
const activePlayers = new client.Gauge({
  name: "game_active_players",
  help: "Number of active players",
});

const zombieKills = new client.Counter({
  name: "game_zombies_killed_total",
  help: "Total zombies killed",
});

const aiLevel = new client.Gauge({
  name: "game_ai_level",
  help: "AI difficulty level",
});

// ---- GAME API ----
app.get("/join", (req, res) => {
  activePlayers.inc();
  res.send("Player joined");
});

app.get("/leave", (req, res) => {
  activePlayers.dec();
  res.send("Player left");
});

app.get("/kill", (req, res) => {
  zombieKills.inc();
  res.send("Zombie killed");
});

app.get("/ai/:level", (req, res) => {
  aiLevel.set(Number(req.params.level));
  res.send("AI level updated");
});

// ---- METRICS ----
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// ---- START SERVER ----
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Zombie Backend Running on ${PORT}`);
>>>>>>> 40c892a (Fix backend Dockerfile path + pipeline fix)
});

const zombiesSpawned = new client.Gauge({
    name: "game_zombies_spawned",
    help: "Zombies spawned"
});

register.registerMetric(activePlayers);
register.registerMetric(totalScore);
register.registerMetric(zombiesSpawned);

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

app.get("/metrics/update", (req, res) => {
    const players = parseInt(req.query.players || 0);
    const score = parseInt(req.query.score || 0);
    const zombies = parseInt(req.query.zombies || 0);

    activePlayers.set(players);
    totalScore.set(score);
    zombiesSpawned.set(zombies);

    res.send("Metrics updated");
});

app.listen(5000, () => console.log("Game Backend Running on 5000"));
