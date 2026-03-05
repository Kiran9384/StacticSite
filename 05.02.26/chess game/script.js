const score = document.querySelector(".score");
const level = document.querySelector(".level");
const highscoreText = document.querySelector(".highscore");

const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

const engine = document.getElementById("engineSound");
const crash = document.getElementById("crashSound");

let player = { speed:5, score:0, level:1 };

let highscore = localStorage.getItem("highscore") || 0;
highscoreText.innerText = "High Score: " + highscore;

let keys = { ArrowLeft:false, ArrowRight:false };

startScreen.addEventListener("click", startGame);

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

document.getElementById("left").ontouchstart = () => keys.ArrowLeft = true;
document.getElementById("left").ontouchend = () => keys.ArrowLeft = false;

document.getElementById("right").ontouchstart = () => keys.ArrowRight = true;
document.getElementById("right").ontouchend = () => keys.ArrowRight = false;

function startGame(){

gameArea.innerHTML="";
startScreen.style.display="none";

player.start=true;
player.score=0;
player.level=1;
player.speed=5;

engine.play();

for(let i=0;i<5;i++){
let line=document.createElement("div");
line.classList.add("line");
line.y=i*120;
line.style.top=line.y+"px";
gameArea.appendChild(line);
}

let car=document.createElement("div");
car.classList.add("car");
car.style.background="red";        
gameArea.appendChild(car);

player.x=130;
player.y=400;

window.requestAnimationFrame(gamePlay);
}

function gamePlay(){

let car=document.querySelector(".car");

if(player.start){

moveLines();
moveEnemy(car);

if(keys.ArrowLeft && player.x>0){
player.x -= player.speed;
}

if(keys.ArrowRight && player.x<260){
player.x += player.speed;
}

car.style.left=player.x+"px";
car.style.top=player.y+"px";

player.score++;

if(player.score % 500 === 0){
player.level++;
player.speed++;
}

score.innerText="Score: "+player.score;
level.innerText="Level: "+player.level;

window.requestAnimationFrame(gamePlay);
}
}

function moveLines(){
document.querySelectorAll(".line").forEach(line=>{
if(line.y>=550) line.y -= 550;
line.y += player.speed;
line.style.top=line.y+"px";
});
}

function moveEnemy(car){

document.querySelectorAll(".enemy").forEach(enemy=>{

if(isCollide(car,enemy)){
endGame();
}

if(enemy.y >= 550){
enemy.y = -120;
enemy.style.left=Math.floor(Math.random()*260)+"px";
}

enemy.y += player.speed;
enemy.style.top=enemy.y+"px";

});
}

function isCollide(a,b){

let aRect=a.getBoundingClientRect();
let bRect=b.getBoundingClientRect();

return !(
aRect.bottom < bRect.top ||
aRect.top > bRect.bottom ||
aRect.right < bRect.left ||
aRect.left > bRect.right
);
}

function endGame(){

player.start=false;
engine.pause();
crash.play();

if(player.score > highscore){
localStorage.setItem("highscore",player.score);
}

startScreen.style.display="block";
startScreen.innerHTML="Game Over<br>Click to Restart";
}

setInterval(()=>{

if(player.start){

let enemy=document.createElement("div");
enemy.classList.add("enemy");

enemy.style.background="yellow";
enemy.y=-120;

enemy.style.left=Math.floor(Math.random()*260)+"px";
enemy.style.top=enemy.y+"px";

gameArea.appendChild(enemy);

}

},2000);