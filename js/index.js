// Get DOM
const listItems = document.querySelectorAll(".sideBar__listItem");
const contents = document.querySelectorAll(".content");

const startPlayButton = document.querySelector("#startPlay");
const startPlayButtonInOverlay = document.querySelector("#startPlayInOverlay");
const mainDefaultMode = document.querySelector(".main__container");
const mainPlayMode = document.querySelector(".main__container.playMode");

const logo = document.querySelector("#logo");
const playModeMenus = document.querySelectorAll(".playModeMenu");
const backToTopButtons = document.querySelectorAll(".backToTop");
const nextButtons = document.querySelectorAll(".next");

const testGenerate = document.querySelector("#testGenerate");
const playModePlaying = document.querySelector(".playMode__playing");
const playModeResult = document.querySelector(".playMode__result");

const toggleDarkMode = document.querySelector("#toggleDarkMode");
const html = document.querySelector("html");

const overlays = document.querySelectorAll(".overlay");

const gameTable = document.querySelector(".gameTable");
const startNewGameBtn = document.querySelector("#startNewGame");
const resetGameBtn = document.querySelector("#resetGame");
const swipeRight = document.querySelector("#swipeRight");

const resultText = document.querySelector("#resultText");
const totalScoreTextContent = document.querySelector("#totalScore");

let playModeMenuIndex = 0;
let totalScore = 0;

// Build out function
function handleSwitchMenu() {
  let counter = 0;
  while (counter < listItems.length) {
    if (listItems[counter].classList.contains("active")) {
      listItems[counter].classList.remove("active");
      contents[counter].classList.remove("active");
      break;
    }
    counter++;
  }
  this.classList.add("active");
  contents[this.id].classList.add("active");
}

function handleToggleMainContainer() {
  mainDefaultMode.classList.add("hidden");
  mainPlayMode.classList.remove("hidden");
}

function handleBackToTop() {
  mainDefaultMode.classList.remove("hidden");
  mainPlayMode.classList.add("hidden");
  playModeMenuIndex = 0;

  let counter = 0;
  while (counter < playModeMenus.length) {
    if (playModeMenus[counter].classList.contains("active")) {
      playModeMenus[counter].classList.remove("active");
      playModeMenus[0].classList.add("active");
      break;
    }
    counter++;
  }
}

function handleNextPlayMenu() {
  playModeMenus[playModeMenuIndex].classList.remove("active");
  playModeMenuIndex++;
  playModeMenus[playModeMenuIndex].classList.add("active");
}

function handleGenerateScore() {
  const randomScore = Math.floor(Math.random() * 100000) + 1;
  resultScore = randomScore;

  const showScore = document.createElement("p");
  showScore.classList.add("dark:text-white");
  showScore.textContent = `Your score is ${resultScore}!!`;
  playModePlaying.append(showScore);
}

function handleToggleDarkMode() {
  html.classList.toggle("dark");
}

function handleShowOverlay() {
  // console.log("hover now");
}

//
//
//
//
// js codes regarding 2048 game itself
// ↓
// ↓
// ↓
// ↓

let scoreArray = [];

// generate random index and apply that as the hash index
function generateRandomIndex(val) {
  const randomNum = Math.floor(Math.random() * (val * val));
  console.log(randomNum);
  if (scoreArray[randomNum].textContent == 0) {
    scoreArray[randomNum].textContent = 2;
    checkForLose();
  } else generateRandomIndex(val);
}

// create new game table
function handleCreateGameTable(num) {
  for (let i = 0; i < num * num; i++) {
    let td = document.createElement("div");
    td.textContent = 0;
    td.classList.add(`td`);
    td.classList.add("dark:text-slate-300");
    gameTable.append(td);
    scoreArray.push(td);
  }
}

// start game
function handleStartGame(num) {
  generateRandomIndex(num);
  totalScoreTextContent.textContent = 0;
}

// swipe right
function handleSwipeRight(num) {
  for (let i = 0; i < num * num; i++) {
    if (i % 4 === 0) {
      console.log(i);
      let totalOne = scoreArray[i].textContent;
      let totalTwo = scoreArray[i + 1].textContent;
      let totalThree = scoreArray[i + 2].textContent;
      let totalFour = scoreArray[i + 3].textContent;
      let row = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      console.log(row);

      let filteredRow = row.filter((num) => num);
      console.log(filteredRow);

      let missing = 4 - filteredRow.length;
      let zeros = Array(missing).fill(0);
      console.log(zeros);

      let newRow = zeros.concat(filteredRow);
      console.log(newRow);

      scoreArray[i].textContent = newRow[0];
      scoreArray[i + 1].textContent = newRow[1];
      scoreArray[i + 2].textContent = newRow[2];
      scoreArray[i + 3].textContent = newRow[3];
    }
  }
}

// swipe Left
function handleSwipeLeft(num) {
  for (let i = 0; i < num * num; i++) {
    if (i % 4 === 0) {
      console.log(i);
      let totalOne = scoreArray[i].textContent;
      let totalTwo = scoreArray[i + 1].textContent;
      let totalThree = scoreArray[i + 2].textContent;
      let totalFour = scoreArray[i + 3].textContent;
      let row = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      console.log(row);

      let filteredRow = row.filter((num) => {
        console.log(num);
        return num;
      });
      console.log(filteredRow);

      let missing = 4 - filteredRow.length;
      let zeros = Array(missing).fill(0);

      let newRow = filteredRow.concat(zeros);

      scoreArray[i].textContent = newRow[0];
      scoreArray[i + 1].textContent = newRow[1];
      scoreArray[i + 2].textContent = newRow[2];
      scoreArray[i + 3].textContent = newRow[3];
    }
  }
}

// swipe down
function handleSwipeDown(num) {
  for (let i = 0; i < num; i++) {
    let totalOne = scoreArray[i].textContent;
    let totalTwo = scoreArray[i + num].textContent;
    let totalThree = scoreArray[i + num * 2].textContent;
    let totalFour = scoreArray[i + num * 3].textContent;

    let column = [
      parseInt(totalOne),
      parseInt(totalTwo),
      parseInt(totalThree),
      parseInt(totalFour),
    ];

    let filteredColumn = column.filter((num) => {
      console.log(num);
      return num;
    });
    let missing = 4 - filteredColumn.length;
    let zeros = Array(missing).fill(0);
    let newColumn = zeros.concat(filteredColumn);

    scoreArray[i].textContent = newColumn[0];
    scoreArray[i + num].textContent = newColumn[1];
    scoreArray[i + num * 2].textContent = newColumn[2];
    scoreArray[i + num * 3].textContent = newColumn[3];
  }
}

// swipe up
function handleSwipeUp(num) {
  for (let i = 0; i < num; i++) {
    let totalOne = scoreArray[i].textContent;
    let totalTwo = scoreArray[i + num].textContent;
    let totalThree = scoreArray[i + num * 2].textContent;
    let totalFour = scoreArray[i + num * 3].textContent;

    let column = [
      parseInt(totalOne),
      parseInt(totalTwo),
      parseInt(totalThree),
      parseInt(totalFour),
    ];

    let filteredColumn = column.filter((num) => {
      console.log(num);
      return num;
    });
    let missing = 4 - filteredColumn.length;
    let zeros = Array(missing).fill(0);
    let newColumn = filteredColumn.concat(zeros);

    scoreArray[i].textContent = newColumn[0];
    scoreArray[i + num].textContent = newColumn[1];
    scoreArray[i + num * 2].textContent = newColumn[2];
    scoreArray[i + num * 3].textContent = newColumn[3];
  }
}

// combine each rows
function combineRow() {
  for (let i = 0; i < 15; i++) {
    if (scoreArray[i].textContent === scoreArray[i + 1].textContent) {
      let combinedTotal =
        parseInt(scoreArray[i].textContent) +
        parseInt(scoreArray[i + 1].textContent);
      scoreArray[i].textContent = combinedTotal;
      scoreArray[i + 1].textContent = 0;
      totalScore += combinedTotal;
      totalScoreTextContent.textContent = totalScore;
    }
  }
}

function combineColumn() {
  for (let i = 0; i < 15; i++) {
    if (scoreArray[i].textContent === scoreArray[i + 1].textContent) {
      let combinedTotal =
        parseInt(scoreArray[i].textContent) +
        parseInt(scoreArray[i + 1].textContent);
      scoreArray[i].textContent = combinedTotal;
      scoreArray[i + 1].textContent = 0;
      totalScore += combinedTotal;
      totalScoreTextContent.textContent = totalScore;
    }
  }
}

function control(e, num) {
  if (e.keyCode === 39) {
    keyRight(num);
  } else if (e.keyCode === 37) {
    keyLeft(num);
  }
}

// control(4);

function keyRight(num) {
  handleSwipeRight(num);
  combineRow();
  handleSwipeRight(num);
  generateRandomIndex(num);
}

function keyLeft(num) {
  handleSwipeLeft(num);
  combineRow();
  handleSwipeLeft(num);
  generateRandomIndex(num);
}

// handleSwipeRight(4);

// check for the number 2048 in the squares to win
function checkForWin() {
  for (let i = 0; i < scoreArray.length; i++) {
    if (scoreArray[i].textContent == 2048) {
      resultText.textContent = "You win the game!";
    }
  }
}

function checkForLose() {
  let numOfZeros = 0;
  for (let i = 0; i < scoreArray.length; i++) {
    if (scoreArray[i].textContent == 0) numOfZeros++;
  }
  if (numOfZeros === 0) {
    resultText.textContent = "You lose the game...";
  }
}

function handleInitialization(num) {
  handleCreateGameTable(num);
}

function handleResetGame(num) {
  for (let i = 0; i < num * num; i++) {
    if (scoreArray[i].textContent != 0) scoreArray[i].textContent = 0;
  }
  totalScore = 0;
  totalScoreTextContent.textContent = totalScore;
  resultText.textContent = "";
}

// Hook up the event
window.addEventListener("DOMContentLoaded", () => handleInitialization(4));

listItems.forEach((listItem) =>
  listItem.addEventListener("click", handleSwitchMenu)
);

startPlayButton.addEventListener("click", handleToggleMainContainer);
startPlayButtonInOverlay.addEventListener("click", handleToggleMainContainer);

backToTopButtons.forEach((button) =>
  button.addEventListener("click", handleBackToTop)
);
logo.addEventListener("click", handleBackToTop);

nextButtons.forEach((button) =>
  button.addEventListener("click", handleNextPlayMenu)
);

testGenerate.addEventListener("click", handleGenerateScore);

toggleDarkMode.addEventListener("click", handleToggleDarkMode);

overlays.forEach((overlay) =>
  overlay.addEventListener("mousemove", handleShowOverlay)
);

startNewGameBtn.addEventListener("click", () => handleStartGame(4));
resetGameBtn.addEventListener("click", () => handleResetGame(4));
// temporary changing code
swipeRight.addEventListener("click", () => keyRight(4));
