"use strict";

// pre form
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("button01");
  const longText = document.getElementById("long-text3");
  const contentArea = document.getElementById("form-wrapper-two");
  const form = document.getElementById("form-wrapper");

  let clickCount = 0;

  button.addEventListener("click", () => {
    if (clickCount === 0) {
      button.textContent = "Bekreft";
      longText.style.display = 'block'
      clickCount++;
    } else if (clickCount === 1) {
      form.style.display = "block";
      contentArea.style.display = "none";
    }
  });
});

// pre form


// timer

const FULL_DASH_ARRAY = 283;
const RESET_DASH_ARRAY = `-57 ${FULL_DASH_ARRAY}`;

//All buttons
// let startBtn = document.querySelector(".start");
// let stopBtn = document.querySelector(".stop");
// let resetBtn = document.querySelector(".reset");

//DOM elements
let timer = document.querySelector("#base-timer-path-remaining");
let timeLabel = document.getElementById("base-timer-label");
const nextButton = document.getElementById("nextButton");

//Time related vars
const TIME_LIMIT = 10; //in seconds
let timePassed = -1;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

function reset() {
  clearInterval(timerInterval);
  resetVars();
  startBtn.innerHTML = "Start";
  timer.setAttribute("stroke-dasharray", RESET_DASH_ARRAY);
}

function start(withReset = false) {
  // setDisabled(startBtn);
  // removeDisabled(stopBtn);
  nextButton.classList.add("disabled")
  if (withReset) {
    resetVars();
  }
  startTimer();
}

function stop() {
  // setDisabled(stopBtn);
  // removeDisabled(startBtn);
  startBtn.innerHTML = "Continue";
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    timeLabel.innerHTML = formatTime(timeLeft);
    setCircleDasharray();

    if (timeLeft === 0) {
      timeIsUp();
    }
  }, 1000);
}

window.addEventListener("load", () => {
  timeLabel.innerHTML = formatTime(TIME_LIMIT);
  // setDisabled(stopBtn);
});

//---------------------------------------------
//HELPER METHODS
//---------------------------------------------
// function setDisabled(button) {
//   button.setAttribute("disabled", "disabled");
// }

// function removeDisabled(button) {
//   button.removeAttribute("disabled");
// }
function timeIsUp() {
  // setDisabled(startBtn);
  // removeDisabled(stopBtn);
  clearInterval(timerInterval);
  timeLabel.textContent = 'Klar'
  nextButton.textContent = 'Fullfør identifisering'
  timeLabel.style.fontSize = '24px'
  nextButton.classList.remove("disabled")
  // let confirmReset = confirm("Time is UP! Wanna restart?");
  // if (confirmReset) {
  //   reset();
  //   startTimer();
  // } else {
  //   reset();
  // }
}

function resetVars() {
  // removeDisabled(startBtn);
  // setDisabled(stopBtn);
  timePassed = -1;
  timeLeft = TIME_LIMIT;
  console.log(timePassed, timeLeft);
  timeLabel.innerHTML = formatTime(TIME_LIMIT);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  console.log("setCircleDashArray: ", circleDasharray);
  timer.setAttribute("stroke-dasharray", circleDasharray);
}

