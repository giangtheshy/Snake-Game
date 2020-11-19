import {onSnake,expandSnake} from './snake.js'
import {randomGridPosition} from './grid.js'
import {EXPANSION_RATE} from './menu.js'
import {update as updateScore} from './score.js';

let food = getRandomFoodPosition();

export function update() {
  if (onSnake(food)){
    updateScore();
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}
export function draw(gameBoard) {
  
    const foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    gameBoard.appendChild(foodElement);
  
}

function getRandomFoodPosition(){
  let newFoodPosition;
  while (newFoodPosition ==null || onSnake(newFoodPosition)){
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}