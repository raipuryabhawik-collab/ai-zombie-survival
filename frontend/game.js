/* ================= CANVAS ================= */
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 500;

/* FORCE FOCUS FOR KEYBOARD */
canvas.setAttribute("tabindex", "0");
canvas.focus();

/* ================= GAME STATE ================= */
let running = false;
let score = 0;
let health = 100;

/* ================= PLAYER ================= */
let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 3
};

/* ================= INPUT ================= */
let keys = {};

document.addEventListener("keydown", function(e) {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function(e) {
  keys[e.key.toLowerCase()] = false;
});

/* ================= ZOMBIES ================= */
let zombies = [];

function spawnZombie() {
  zombies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 12,
    speed: 1
  });
}

/* ================= START GAME ================= */
function startGame() {
  running = true;
  score = 0;
  health = 100;
  zombies = [];
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;

  for (let i = 0; i < 6; i++) spawnZombie();

  requestAnimationFrame(loop);
}

/* ================= UPDATE ================= */
function update() {
  /* PLAYER MOVE */
  if (keys["w"]) player.y -= player.speed;
  if (keys["s"]) player.y += player.speed;
  if (keys["a"]) player.x -= player.speed;
  if (keys["d"]) player.x += player.speed;

  /* LIMITS */
  player.x = Math.max(0, Math.min(canvas.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height, player.y));

  /* ZOMBIE AI */
  zombies.forEach(z => {
    let dx = player.x - z.x;
    let dy = player.y - z.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    z.x += (dx / dist) * z.speed;
    z.y += (dy / dist) * z.speed;

    /* HIT PLAYER */
    if (dist < player.size + z.size) {
      health -= 0.1;
      if (health <= 0) running = false;
    }
  });

  /* UPDATE HUD */
  document.getElementById("health").innerText = Math.floor(health);
  document.getElementById("score").innerText = score;
}

/* ================= DRAW ================= */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* GRID */
  ctx.strokeStyle = "#111";
  for (let i = 0; i < canvas.width; i += 25) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let j = 0; j < canvas.height; j += 25) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(canvas.width, j);
    ctx.stroke();
  }

  /* PLAYER */
  ctx.fillStyle = "#00ffcc";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fill();

  /* ZOMBIES */
  ctx.fillStyle = "red";
  zombies.forEach(z => {
    ctx.fillRect(z.x, z.y, z.size, z.size);
  });
}

/* ================= LOOP ================= */
function loop() {
  if (!running) return;
  update();
  draw();
  requestAnimationFrame(loop);
}

