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
const startNewGame = document.querySelector("#startNewGame");
const resetGame = document.querySelector("#resetGame");
const swipeRight = document.querySelector("#swipeRight");
console.log(swipeRight);

let playModeMenuIndex = 0;
let resultScore = 0;

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

let scoreArray = [];

function generateRandomIndex(val) {
  const randomNum = Math.floor(Math.random() * (val * val)) + 1;
  return randomNum;
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
  const firstNum = generateRandomIndex(num);
  if (scoreArray[firstNum].textContent == 0)
    scoreArray[firstNum].textContent = 2;
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

      let filteredRow = row.filter((num) => num);
      console.log(filteredRow);

      let missing = 4 - filteredRow.length;
      let zeros = Array(missing).fill(0);
      console.log(zeros);

      let newRow = filteredRow.concat(zeros);
      console.log(newRow);

      scoreArray[i].textContent = newRow[0];
      scoreArray[i + 1].textContent = newRow[1];
      scoreArray[i + 2].textContent = newRow[2];
      scoreArray[i + 3].textContent = newRow[3];
    }
  }
}

function combineRow() {
  for (let i = 0; i < 15; i++) {
    if (scoreArray[i].textContent === scoreArray[i + 1].textContent) {
      let combinedTotal =
        parseInt(scoreArray[i].textContent) +
        parseInt(scoreArray[i + 1].textContent);
      scoreArray[i].textContent = combinedTotal;
      scoreArray[i + 1].textContent = 0;
    }
  }
}

function control(e) {
  if (e.keyCode === 39) {
    keyRight();
  }
}

function keyRight() {
  handleSwipeRight();
  combineRow();
  handleSwipeRight();
  handleCreateGameTable();
}

// handleSwipeRight(4);

function handleInitialization(num) {
  handleCreateGameTable(num);
}

function handleResetGame(num) {
  for (let i = 0; i < num * num; i++) {
    if (scoreArray[i].textContent != 0) scoreArray[i].textContent = 0;
  }
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

startNewGame.addEventListener("click", () => handleStartGame(4));
resetGame.addEventListener("click", () => handleResetGame(4));
// temporary changing code
swipeRight.addEventListener("click", () => handleSwipeLeft(4));
