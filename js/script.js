const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const restartButton = document.querySelector(".button");
const score = document.querySelector(".score");

const gameOverAudio = new Audio("../music/game-over.mp3");
const jumpAudio = new Audio("../music/jump.mp3");

const jump = () => {
  mario.classList.add("jump");
  jumpAudio.play();

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const reload = () => {
  window.location.reload();
};

let points = 0;

const scoreUp = setInterval(() => {
  ++points;
  score.innerHTML = `Pontos : <span id="score">${points}</span>`;
}, 2000);

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;
    mario.src = "./images/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "41px";

    gameOverAudio.play();

    restartButton.innerHTML =
      '<button onclick="reload()" class="restart">Reiniciar</button>';

    clearInterval(loop);
    clearInterval(scoreUp);
  }
}, 1);

document.addEventListener("touchstart", jump);
document.addEventListener("keydown", jump);
