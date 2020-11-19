import {
  getUserLocalStorage
} from './storage.js'


const levelBtn = document.querySelector(".btn-level")
const historyBtn = document.querySelector(".score-btn")
const levelContainer = document.querySelector(".level-container")
const historyScore = document.querySelector(".history-score")
const newGameBtn = document.querySelector(".btn-new-game");
const newUser = document.querySelector(".new-user");
const userName = document.getElementById("user-name");
const password = document.getElementById("password");




export let EXPANSION_RATE = 0;
export let SNAKE_SPEED = 0;
export let SCORE_RATE = 0;
let createUserName = {};
let flagSignIn = false;

levelBtn.addEventListener("click", () => {
  setUpDefaultSignUp();
  alert("Please select or create Account !!");
})

function showLevelContainer() {
  if (levelContainer.classList.contains("show-level")) {
    levelContainer.classList.remove("show-level");
  } else {
    levelContainer.classList.add("show-level");

  }
}
let userTemp ;
historyBtn.addEventListener("click", () => {
  setDefault();
  setUpDefaultSignUp();
  if (historyScore.classList.contains("show-history")) {

    historyScore.classList.remove("show-history");
  } else {
    displayOldUser();
    historyScore.classList.add("show-history");
    const oldUserBtn = document.querySelectorAll(".old-user");
    oldUserBtn.forEach(btn => {
      btn.addEventListener("click", e => {
        let button = e.currentTarget;
        let idBtn = button.dataset.id;

        let userList = getUserLocalStorage();
        userTemp = userList.filter(item => item.id === idBtn);
        userTemp = userTemp[0];
        const {id,username,password} = userTemp;
        userTemp ={id,username,password};
        
        flagSignIn = true;
        if (flagSignIn === true) {
          newGameBtn.innerHTML = "Sign In";
          setDefault();
          newUser.classList.add("show-user");
          userName.value =userTemp.username;
        }
      })
    })

  }
})
const btnLevels = document.querySelectorAll(".btn")
const gameBar = document.querySelector(".game-bar")

function setUpDefaultSignUp(){
  newGameBtn.innerHTML = "Sign Up";
  flagSignIn=false;
}
newGameBtn.addEventListener("click", () => {
  if (!flagSignIn) {
    setDefault();
    let id = new Date().getTime().toString();
    if (userName.value === "" || password.value === "") {
      if (newUser.classList.contains("show-user")) {
        newUser.classList.remove("show-user");
      } else {
        newUser.classList.add("show-user");
      }

    } else {
      selectLevel();
      let tempObj = {id:id, username:userName.value, password:password.value}
      setUser(tempObj);

    }
  }else{
    
    if (userName.value === "" || password.value === "") {
      if (newUser.classList.contains("show-user")) {
        setUpDefaultSignUp();
        newUser.classList.remove("show-user");
      } else {
        newUser.classList.add("show-user");
      }

    }else{
      
      if (userName.value==userTemp.username&&password.value==userTemp.password){
        setDefault();
        selectLevel();
        setUser(userTemp);
      }else{
        alert("Incorrect username or password!!");
      }
    }
  }

})

function selectLevel() {
  showLevelContainer();
  btnLevels.forEach(btn => {
    btn.addEventListener("click", e => {
      let value = e.currentTarget.dataset.level;
      EXPANSION_RATE = Math.floor(value / 2);
      SNAKE_SPEED = value * 2;
      SCORE_RATE = value * 10;
      gameBar.style.display = "none";
    })
  })
}

function displayOldUser() {
  let listUsers = getUserLocalStorage();
  let result = "";
  listUsers.map(item => {
    result += `<button class="old-user" data-id=${item.id}><span class="old-user-name">${item.username}</span> : <span class="old-score">${item.score} </span> </button>`
  })
  historyScore.innerHTML = result;
}


function setUser(obj) {
  createUserName.id = obj.id;
  createUserName.username = obj.username;
  createUserName.password = obj.password;
}
export function getUser() {
  return createUserName;
}

function setDefault() {
  newUser.classList.remove("show-user");
  levelContainer.classList.remove("show-level");
  historyScore.classList.remove("show-history");
}