const socketUrl = "http://localhost:5000";

let score = 0;
let players = 1;
let zombies = 0;

function updateGame() {
    zombies += Math.floor(Math.random() * 2);
    score += Math.floor(Math.random() * 5);

    document.getElementById("score").innerText = score;
    document.getElementById("zombies").innerText = zombies;

    fetch(`${socketUrl}/metrics/update?players=${players}&score=${score}&zombies=${zombies}`);
}

setInterval(updateGame, 2000);
