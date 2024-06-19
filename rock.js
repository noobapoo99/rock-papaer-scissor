let score = JSON.parse(localStorage.getItem("score"));
if (score === null) {
  score = {
    wins: 0,
    loss: 0,
    tie: 0,
  };
}
updateScore();

let isAutoPlay = false;
let intervalID;

function autoplay() {
  if (!isAutoPlay) {
    intervalID = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlay = true;
  } else {
    clearInterval(intervalID);
    isAutoPlay = false;
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissor");
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === `scissor`) {
    if (computerMove === "rock") {
      result = "you lose";
    } else if (computerMove === "scissor") {
      result = `it's a tie`;
    } else if (computerMove === "paper") {
      result = "you win";
    }
  } else if (playerMove === `paper`) {
    if (computerMove === "rock") {
      result = "you win";
    } else if (computerMove === "scissor") {
      result = "you lose";
    } else if (computerMove === "paper") {
      result = `it's a tie`;
    }
  } else if (playerMove === `rock`) {
    if (computerMove === "rock") {
      result = `it's a tie`;
    } else if (computerMove === "scissor") {
      result = "you win";
    } else if (computerMove === "paper") {
      result = "you lose";
    }
  }
  if (result === "you win") {
    score.wins += 1;
  } else if (result === "you lose") {
    score.loss += 1;
  }
  if (result === `it's a tie`) {
    score.tie += 1;
  }
  updateScore();
  localStorage.setItem("score", JSON.stringify(score));
  document.querySelector(".js-result").innerHTML = `${result}`;
  document.querySelector(
    ".js-moves"
  ).innerHTML = `you ${playerMove} - ${computerMove} computer`;
}
function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `wins : ${score.wins} losses : ${score.loss} tie : ${score.tie}`;
}

let computerMove = "";
function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
    //alert(`it's a tie`);
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
    //alert(`you lose computer chose paper`);
  } else if (randomNumber >= 2 / 3 && randomNumber <= 1) {
    computerMove = "scissor";
    // alert(`you won computer chose scissor`);
  }
  return computerMove;
}
