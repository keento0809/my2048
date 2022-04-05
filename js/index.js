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

const playModePlaying = document.querySelector(".playMode__playing");
const playModeResult = document.querySelector(".playMode__result");

const toggleDarkMode = document.querySelector("#toggleDarkMode");
const html = document.querySelector("html");

const overlays = document.querySelectorAll(".overlay");

const gameTable = document.querySelector(".gameTable");
const startNewGameBtn = document.querySelector("#startNewGame");
const resetGameBtn = document.querySelector("#resetGame");

const swipeLeftBtn = document.querySelector("#swipeLeft");
const swipeRightBtn = document.querySelector("#swipeRight");
const swipeUpBtn = document.querySelector("#swipeUp");
const swipeDownBtn = document.querySelector("#swipeDown");

const resultText = document.querySelector("#resultText");
const totalScoreTextContent = document.querySelector("#totalScore");

// global variables
let allTds;
let playModeMenuIndex = 0;
let totalScore = 0;
const lengthOfSquare = 4;

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
    td.classList.add("td", "dark:text-slate-300", "tdStyle");
    gameTable.append(td);
    scoreArray.push(td);
  }
}

// start game
function handleStartGame(num) {
  console.log("handle start ...!!");
  generateRandomIndex(num);
  totalScoreTextContent.textContent = 0;
  allTds = document.querySelectorAll(".td");
}

// swipe right
function handleSwipeRight(num) {
  for (let i = 0; i < num * num; i++) {
    if (i % num === 0) {
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

      // return the number if it's true (not 0)
      let filteredRow = row.filter((number) => {
        return number;
      });

      let numberOfZeroInRow = num - filteredRow.length;
      let zeros = Array(numberOfZeroInRow).fill(0);
      console.log(zeros, filteredRow);

      // create new array combining two arrays (zeros,filteredRow) without changing original ones
      let newRow = zeros.concat(filteredRow);

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

      let filteredRow = row.filter((number) => {
        console.log(number);
        return number;
      });

      let numberOfZeroInRow = lengthOfSquare - filteredRow.length;
      let zeros = Array(numberOfZeroInRow).fill(0);

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

    let filteredColumn = column.filter((number) => number);
    let numberOfZeroInRow = lengthOfSquare - filteredColumn.length;
    let zeros = Array(numberOfZeroInRow).fill(0);
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

    let filteredColumn = column.filter((number) => {
      console.log(number);
      return number;
    });
    let numberOfZeroInRow = lengthOfSquare - filteredColumn.length;
    let zeros = Array(numberOfZeroInRow).fill(0);
    let newColumn = filteredColumn.concat(zeros);

    scoreArray[i].textContent = newColumn[0];
    scoreArray[i + num].textContent = newColumn[1];
    scoreArray[i + num * 2].textContent = newColumn[2];
    scoreArray[i + num * 3].textContent = newColumn[3];
  }
}

function togglePop(index, isRow) {
  if (isRow) {
    scoreArray[index + 1].classList.add("pop");
    setTimeout(() => {
      console.log("Time is up ...");
      scoreArray[index + 1].classList.remove("pop");
    }, 2000);
  }
  if (!isRow) {
    scoreArray[index + lengthOfSquare].classList.add("pop");
    setTimeout(() => {
      console.log("Time is up ...");
      scoreArray[index + lengthOfSquare].classList.remove("pop");
    }, 2000);
  }
}

// combine each rows
function combineRow(direction) {
  for (let i = 0; i < 15; i++) {
    if (scoreArray[i].textContent === scoreArray[i + 1].textContent) {
      let combinedTotal =
        parseInt(scoreArray[i].textContent) +
        parseInt(scoreArray[i + 1].textContent);
      if (combinedTotal != 0 && direction === "right") togglePop(i, true);
      else if (combinedTotal != 0 && direction === "left")
        togglePop(i - 1, true);
      scoreArray[i].textContent = combinedTotal;
      scoreArray[i + 1].textContent = 0;
      totalScore += combinedTotal;
      totalScoreTextContent.textContent = totalScore;
    }
  }
}

// combine each columns
function combineColumn(num) {
  for (let i = 0; i < 12; i++) {
    // next three of them ??
    // next two of them
    if (scoreArray[i].textContent === scoreArray[i + num].textContent) {
      let combinedTotal =
        parseInt(scoreArray[i].textContent) +
        parseInt(scoreArray[i + num].textContent);
      if (combinedTotal != 0) togglePop(i, false);
      scoreArray[i].textContent = combinedTotal;
      scoreArray[i + num].textContent = 0;
      totalScore += combinedTotal;
      totalScoreTextContent.textContent = totalScore;
    }
  }
}

// commands
function keyRight(num) {
  handleSwipeRight(num);
  combineRow("right");
  handleSwipeRight(num);
  generateRandomIndex(num);
}

function keyLeft(num) {
  handleSwipeLeft(num);
  combineRow("left");
  handleSwipeLeft(num);
  generateRandomIndex(num);
}

function keyUp(num) {
  handleSwipeUp(num);
  combineColumn(num);
  handleSwipeUp(num);
  generateRandomIndex(num);
}

function keyDown(num) {
  handleSwipeDown(num);
  combineColumn(num);
  handleSwipeDown(num);
  generateRandomIndex(num);
}

// check for the number 2048 in the squares to win
function checkForWin() {
  for (let i = 0; i < scoreArray.length; i++) {
    if (scoreArray[i].textContent == 2048) {
      resultText.textContent = "You win the game!";
    }
  }
}

// check for the status if you lose the game or not
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
  console.log("WTF");
  for (let i = 0; i < num * num; i++) {
    if (scoreArray[i].textContent != 0) scoreArray[i].textContent = 0;
  }
  totalScore = 0;
  totalScoreTextContent.textContent = totalScore;
  resultText.textContent = "";
  startNewGameBtn.setAttribute("enabled", "enabled");
  console.log(startNewGameBtn);
  // resetGameBtn.setAttribute("disabled", "true");
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

toggleDarkMode.addEventListener("click", handleToggleDarkMode);

overlays.forEach((overlay) =>
  overlay.addEventListener("mousemove", handleShowOverlay)
);

startNewGameBtn.addEventListener("click", () =>
  handleStartGame(lengthOfSquare)
);
resetGameBtn.addEventListener("click", () => handleResetGame(lengthOfSquare));
// temporary changing code
swipeRightBtn.addEventListener("click", () => keyRight(lengthOfSquare));
swipeLeftBtn.addEventListener("click", () => keyLeft(lengthOfSquare));
swipeUpBtn.addEventListener("click", () => keyUp(lengthOfSquare));
swipeDownBtn.addEventListener("click", () => keyDown(lengthOfSquare));

//
//
// Youtube Player API
//
//

// const stopBtn = document.querySelector("#stop");
// const pauseBtn = document.querySelector("#pause");
// const playBtn = document.querySelector("#play");

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "200",
    width: "400",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onClick: onPlayerReady,
    },
    playerVars: {
      loop: 1,
      rel: 0,
    },
    videoId: "G4TUmkg4ojg",
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //   event.target.mute();
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {}
function stopVideo() {
  player.stopVideo();
}

// pauseBtn.addEventListener("click", () => player.pauseVideo());
startNewGameBtn.addEventListener("click", () => player.playVideo());
resetGameBtn.addEventListener("click", () => player.stopVideo());
