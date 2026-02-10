const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const client = require("prom-client");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

/* ---------- MONGODB ---------- */
mongoose.connect("mongodb://mongodb:27017/zombie", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Score = mongoose.model("Score", {
  name: String,
  score: Number,
  date: { type: Date, default: Date.now }
});

/* ---------- HEALTH ---------- */
app.get("/health", (req, res) => res.send("OK"));

/* ---------- METRICS ---------- */
client.collectDefaultMetrics();
const kills = new client.Counter({
  name: "zombie_kills_total",
  help: "Total zombie kills"
});

app.get("/kill", (req, res) => {
  kills.inc();
  res.send("Kill added");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

/* ---------- LEADERBOARD (DB) ---------- */
app.post("/score", async (req, res) => {
  await Score.create(req.body);
  res.send("Saved");
});

app.get("/leaderboard", async (req, res) => {
  const top = await Score.find().sort({ score: -1 }).limit(10);
  res.json(top);
});

/* ---------- MULTIPLAYER ---------- */
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

let players = {};

io.on("connection", socket => {
  players[socket.id] = { x: 400, y: 300 };

  socket.on("move", data => {
    players[socket.id] = data;
    io.emit("players", players);
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("players", players);
  });
});

/* ---------- START ---------- */
server.listen(5000, () => console.log("Backend running on 5000"));

