// Get DOM
const listItems = document.querySelectorAll(".sideBar__listItem");
const contents = document.querySelectorAll(".content");

const startPlayButton = document.querySelector("#startPlay");
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
console.log(html);

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

// Hook up the event
listItems.forEach((listItem) =>
  listItem.addEventListener("click", handleSwitchMenu)
);

startPlayButton.addEventListener("click", handleToggleMainContainer);

backToTopButtons.forEach((button) =>
  button.addEventListener("click", handleBackToTop)
);
logo.addEventListener("click", handleBackToTop);

nextButtons.forEach((button) =>
  button.addEventListener("click", handleNextPlayMenu)
);

testGenerate.addEventListener("click", handleGenerateScore);

toggleDarkMode.addEventListener("click", handleToggleDarkMode);
