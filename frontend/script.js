const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 600;

const socket = io("http://192.168.1.245:5000");

let player = { x:450, y:300 };
let players = {};

document.addEventListener("keydown", e=>{
 if(e.key==="ArrowUp") player.y-=10;
 if(e.key==="ArrowDown") player.y+=10;
 if(e.key==="ArrowLeft") player.x-=10;
 if(e.key==="ArrowRight") player.x+=10;

 socket.emit("move", player);
});

socket.on("players", data=>{
 players = data;
});

function update(){
 ctx.clearRect(0,0,canvas.width,canvas.height);

 for(let id in players){
  ctx.fillStyle = (id===socket.id) ? "blue" : "red";
  ctx.fillRect(players[id].x, players[id].y, 20,20);
 }

 requestAnimationFrame(update);
}
update();

