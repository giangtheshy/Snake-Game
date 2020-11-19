import {getInputDirection} from './input.js';


const snakeBody = [{
  x: 11,
  y: 11
}]
let newSegments = 0;



export function update() {
  addSegments();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = {
      ...snakeBody[i]
    }
  }
  const inputDirection = getInputDirection();
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}
export function draw(gameBoard) {
  snakeBody.forEach(segment => {
    const elementSnake = document.createElement('div');
    elementSnake.classList.add('snake');
    elementSnake.style.gridColumnStart = segment.x;
    elementSnake.style.gridRowStart = segment.y;
    gameBoard.appendChild(elementSnake);
  })
}
export function onSnake(position,{ignoreHead = false}= {}){
  return snakeBody.some((segment,index)=>{
    if (ignoreHead && index === 0) return false;
    return equalsPosition(segment,position);
  })
}
export function equalsPosition(pos1,pos2){
  return pos1.x===pos2.x && pos1.y===pos2.y;
}
export function expandSnake(amount){
  newSegments+=amount;
}
function addSegments(){
  for(let i=0;i<newSegments;i++){
    snakeBody.push({...snakeBody[snakeBody.length-1]});
  }
  newSegments=0;
}
export function getSnakeHead(){
  return snakeBody[0];
}
export function getSnakeIntersection(){
  return onSnake(snakeBody[0],{ignoreHead:true});
}