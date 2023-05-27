const roadarea = document.querySelector(".road");
let player = { step: 5 };
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

//Player Key
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
function keyDown(ev) {
  keys[ev.key] = true;
}
function keyUp(ev) {
  keys[ev.key] = false;
}

//Player Moving 제한
function playarea() {
  let playerCar = document.querySelector(".car");
  let road = roadarea.getBoundingClientRect();

  // 플레이어가 road area를 벗어나지 않도록 하기 위함
  if (player.start) {
    if (keys.ArrowUp & (player.y > road.top + 80)) {
      // 80 is car height
      player.y = player.y - player.step;
    }
    if (keys.ArrowDown && player.y < road.top - 80) {
      player.y = player.y + player.step;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x = player.x - player.step;
    }
    if (keys.ArrowRight && player.x < road.width - 64) {
      // width(50) + border(2*7)
      player.x = player.x + player.step;
    }

    playerCar.style.top = player.y + "px";
    playerCar.style.left = player.x + "px";
    window.requestAnimationFrame(playarea);
  }
}

//Main
function init() {
  player.start = true;
  let playerCar = document.createElement("div");
  playerCar.setAttribute("class", "car");
  roadarea.appendChild(playerCar);
}

init();
