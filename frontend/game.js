const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let keys = {};
let bullets = [];
let zombies = [];
let score = 0;

let player = {
  x: 450,
  y: 250,
  size: 20,
  speed: 3,
  health: 100
};

document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

canvas.addEventListener("click", e => {
  bullets.push({
    x: player.x,
    y: player.y,
    dx: e.offsetX - player.x,
    dy: e.offsetY - player.y
  });
});

function spawnZombie() {
  zombies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 20,
    speed: getZombieSpeed(score)
  });
}

setInterval(spawnZombie, 2000);

function movePlayer() {
  if (keys["w"]) player.y -= player.speed;
  if (keys["s"]) player.y += player.speed;
  if (keys["a"]) player.x -= player.speed;
  if (keys["d"]) player.x += player.speed;
}

function moveBullets() {
  bullets.forEach(b => {
    b.x += b.dx * 0.02;
    b.y += b.dy * 0.02;
  });
}

function moveZombies() {
  zombies.forEach(z => {
    z.x += (player.x - z.x) * z.speed * 0.01;
    z.y += (player.y - z.y) * z.speed * 0.01;

    if (Math.abs(z.x - player.x) < 15 && Math.abs(z.y - player.y) < 15) {
      player.health -= 0.1;
    }
  });
}

function detectHits() {
  bullets.forEach((b, bi) => {
    zombies.forEach((z, zi) => {
      if (Math.abs(b.x - z.x) < 15 && Math.abs(b.y - z.y) < 15) {
        zombies.splice(zi, 1);
        bullets.splice(bi, 1);
        score++;
      }
    });
  });
}

function drawUI() {
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Health: " + Math.floor(player.health), 10, 20);
  ctx.fillText("Score: " + score, 10, 40);
  ctx.fillText("Difficulty: " + difficulty, 10, 60);
}

function drawPlayer() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawZombies() {
  ctx.fillStyle = "red";
  zombies.forEach(z => ctx.fillRect(z.x, z.y, z.size, z.size));
}

function drawBullets() {
  ctx.fillStyle = "yellow";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, 5, 5));
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (player.health <= 0) {
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", 350, 250);
    return;
  }

  movePlayer();
  moveBullets();
  moveZombies();
  detectHits();

  drawPlayer();
  drawZombies();
  drawBullets();
  drawUI();

  requestAnimationFrame(gameLoop);
}

gameLoop();

