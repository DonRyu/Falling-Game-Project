const roadares = document.querySelector(".road");
function init() {
  let playerCar = document.createElement("div");
  playerCar.setAttribute("class", "car");
  roadares.appendChild(playerCar);
}

init();