const express = require("express");
const cors = require("cors");
const client = require("prom-client");

const app = express();
app.use(cors());

const register = new client.Registry();

const activePlayers = new client.Gauge({
    name: "game_active_players",
    help: "Active players in game"
});

const totalScore = new client.Gauge({
    name: "game_total_score",
    help: "Total game score"
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
