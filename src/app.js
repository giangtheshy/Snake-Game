import {update as updateSNAKE,draw as drawSNAKE,getSnakeHead,getSnakeIntersection} from './snake.js'
import {draw as drawFood,update as updateFood} from './food.js'
import {outSideGrid} from './grid.js'
import {SNAKE_SPEED,getUser} from './menu.js'
import {getScore} from './score.js'
import {saveUserLocalStorage,editUserLocalStorage} from './storage.js'


let lastRenderTime=0;
let gameOver = false;

const gameBoard = document.getElementById('game-board');
const scoreGameBoard  = document.querySelector(".score-game-board")

function main(currentTime) {
  if (gameOver){
    let user = getUser();
    user.score=getScore();
    saveUserLocalStorage(user);
    if (confirm("You Lost . Press OK to restart game.")){
      window.location='./';
    }
    return;
  }
  requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
  if (secondsSinceLastRender<(1/SNAKE_SPEED)) return;
  scoreGameBoard.innerHTML=getScore();
  lastRenderTime = currentTime;
  update();
  draw();
}
window.requestAnimationFrame(main);

function update(){
  updateSNAKE();
  updateFood();
  checkDeath();
}
function draw(){
  gameBoard.innerHTML="";
  drawSNAKE(gameBoard);
  drawFood(gameBoard);
}
function checkDeath(){
  gameOver = outSideGrid(getSnakeHead()) || getSnakeIntersection();
}