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

// moving lines
function movelines() {
  let roadlines = document.querySelectorAll(".line");
  roadlines.forEach(function (item) {
    if (item.y >= 700) {
      item.y = item.y - 750;
    }
    item.y = item.y + player.step;
    item.style.top = item.y + "px";
  });
}

//moving cloud
function moveClouds(playerRocket) {
  let cloud = document.querySelectorAll(".cloud");
  let playerBoun = playerRocket.getBoundingClientRect();

  cloud.forEach(function (item) {
    console.log("playerBoun", playerBoun);
    // check if player collide
    let cloudBoun = item.getBoundingClientRect();
    if (
      !(
        playerBoun.bottom < cloudBoun.top ||
        playerBoun.top > cloudBoun.bottom ||
        playerBoun.left > cloudBoun.right ||
        playerBoun.right < cloudBoun.left
      )
    ) {
      //Player Fail
      player.start = false;
    }

    if (item.y > 750) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y = item.y + player.step;
    item.style.top = item.y + "px";
  });
}

//Player Moving 제한
function playarea() {
  let playerRocket = document.querySelector(".rocket");
  let road = roadarea.getBoundingClientRect();

  // 플레이어가 road area를 벗어나지 않도록 하기 위함
  if (player.start) {
    movelines();
    moveClouds(playerRocket);
    if (keys.ArrowUp & (player.y > road.top + 20)) {
      player.y = player.y - player.step;
    }
    if (keys.ArrowDown && player.y < road.bottom - 80) {
      player.y = player.y + player.step;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x = player.x - player.step;
    }
    if (keys.ArrowRight && player.x < road.width - 64) {
      // width(50) + border(2*7)
      player.x = player.x + player.step;
    }
    playerRocket.style.top = player.y + "px";
    playerRocket.style.left = player.x + "px";
    window.requestAnimationFrame(playarea);
  }
}

//Main
function init() {
  player.start = true;
  window.requestAnimationFrame(playarea);

  let playerRocket = document.createElement("div");
  playerRocket.setAttribute("class", "rocket");
  roadarea.appendChild(playerRocket);

  player.x = playerRocket.offsetLeft;
  player.y = playerRocket.offsetTop;

  for (x = 0; x < 5; x++) {
    // let roadlines = document.createElement("div");
    // roadlines.setAttribute("class", "line");
    // roadlines.y = x * 150;
    // roadlines.style.top = roadlines.y + "px";
    // roadarea.appendChild(roadlines);
  }

  for (x = 0; x < 5; x++) {
    let clouds = document.createElement("div");
    clouds.setAttribute("class", "cloud");
    clouds.y = (x + 1) * 300 * -1;
    clouds.style.top = clouds.y + "px";
    clouds.style.left = Math.floor(Math.random() * 350) + "px";
    roadarea.appendChild(clouds);
  }
}

init();
