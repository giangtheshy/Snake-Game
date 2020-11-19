import {SCORE_RATE} from './menu.js'



export let SCORE = 0;

export function update(){
  SCORE+=SCORE_RATE;
}
export function getScore(){
  return SCORE;
}