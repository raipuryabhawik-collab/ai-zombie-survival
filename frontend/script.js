const API = "http://192.168.1.245:5000";

async function joinGame() {
  const res = await fetch(`${API}/join`, { method: "POST" });
  const data = await res.json();
  document.getElementById("players").innerText = data.players;
}

async function killZombie() {
  const res = await fetch(`${API}/kill`, { method: "POST" });
  const data = await res.json();
  document.getElementById("kills").innerText = data.kills;
}

