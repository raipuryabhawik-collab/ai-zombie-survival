// AI Difficulty System

let difficulty = "easy";

function updateDifficulty(score) {
  if (score > 30) difficulty = "hard";
  else if (score > 15) difficulty = "medium";
  else difficulty = "easy";
}

function getZombieSpeed(score) {
  updateDifficulty(score);

  if (difficulty === "easy") return 0.5;
  if (difficulty === "medium") return 1.0;
  if (difficulty === "hard") return 1.5;
}

