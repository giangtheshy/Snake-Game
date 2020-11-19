



export function getUserLocalStorage() {
  return localStorage.getItem("users")?JSON.parse(localStorage.getItem("users")):[];
}
export function saveUserLocalStorage(user) {
  let usersList = getUserLocalStorage();
  usersList = usersList.filter(item=>{
    if (user.id!==item.id){
      return true;
    }
  })
  usersList.push(user);
  localStorage.setItem("users", JSON.stringify(usersList));
}
export function editUserLocalStorage(user) {
  let usersList = getUserLocalStorage();
  usersList = usersList.map(item=>{
    if (user.id===item.id){
      item.score = user.score;
    }
  })
  localStorage.setItem("users", JSON.stringify(usersList));
}
