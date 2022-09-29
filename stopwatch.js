const time = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const lapTable = document.getElementById("laps-table");
const tableRows = document.getElementsByTagName("table")[0].rows;
const runningTimer = document.getElementById("running-timer");

let milliseconds = 0;
let watchStatus = "off"; //can have on and off status.
let lapTime = 0;
let lapsArray = [];
let finalTime = 0;
let fastestLapIndex = 0;
let slowestLapIndex = 0;
let lapNumber = lapsArray.length + 1;

let slowestLap = -1;
let fastestLap = Infinity;

const resetTime = () => {
  milliseconds = 0;
  watchStatus = "off";
  clearInterval(myInterval);
  lapTime = 0;

  time.innerHTML = formatTime(milliseconds);
  lapsArray = [];
  lapNumber = 1;
  lapTable.innerText = "";
  resetButton.innerText = "Lap";
  slowestLap = -1;
  fastestLap = Infinity;
};

const padNumber = (time) => {
  return time.toString().padStart(2, "0");
};

const stopwatch = () => {
  time.innerText = formatTime(milliseconds);

  milliseconds++;
  lapTime++;
};

//execute function when start button is pressed.
const startTime = () => {
  if (watchStatus === "off" && milliseconds === 0) {
    myInterval = window.setInterval(stopwatch, 10);
    watchStatus = "on";

    if (lapNumber === 1) {
      createRow();
    }

    resetButton.innerText = "Lap"; //add lap button classlist
    startButton.innerText = "Stop"; //add stop class
  } else if (watchStatus === "off" && milliseconds > 0) {
    //window.clearInterval(stopwatch);
    watchStatus = "on";

    myInterval = window.setInterval(stopwatch, 10);
    resetButton.innerText = "Lap"; //add lap button classlist
    startButton.innerText = "Stop"; //add stop class // add start class
  } else if (watchStatus === "on") {
    //window.clearInterval(stopwatch);
    watchStatus = "off";
    resetButton.innerText = "Reset"; //add reset class
    startButton.innerText = "Start"; // add start class
    clearInterval(myInterval);
  }
};

const calculateLap = () => {
  //add laptime to div
  lapsArray.push(lapTime);
  lapNumber = lapsArray.length;

  if (lapsArray.length === 2) {
    createRow();

    if (lapsArray[0] > lapsArray[1]) {
      tableRows[0].classList.add("fastest-lap");
      tableRows[1].classList.add("slowest-lap");

      slowestLap = lapsArray[0];
      fastestLap = lapsArray[1];
    } else {
      tableRows[0].classList.add("slowest-lap");
      tableRows[1].classList.add("fastest-lap");

      slowestLap = lapsArray[1];
      fastestLap = lapsArray[0];
    }
  } else {
    if (lapTime > slowestLap && lapsArray.length > 2) {
      removePreviousSlowestLap();
      slowestLap = lapTime;

      createRow();

      tableRows[0].classList.add("slowest-lap");
    } else if (lapTime < fastestLap && lapsArray.length > 2) {
      removePreviousFastestLap();
      fastestLap = lapTime;
      createRow();
      tableRows[0].classList.add("fastest-lap");
    } else {
      lapNumber = lapsArray.length;
      createRow();
    }
  }

  lapTime = 0;
};

document.getElementById("start").addEventListener("click", startTime);

//when reset is pressed, reset the timer to the default value
const resetTimeLapToggle = () => {
  if (resetButton.innerText === "Reset") {
    //add initial classes
    resetTime();
  } else if (resetButton.innerText === "Lap" && milliseconds > 0) {
    //add classes for running timer
    calculateLap(milliseconds);
  }
};
resetButton.addEventListener("click", resetTimeLapToggle);

const formatTime = (time) => {
  let formattedMilliseconds = 0;
  let formattedSeconds = 0;
  let formattedMinutes = 0;

  formattedMilliseconds = time % 100;
  formattedSeconds = Math.floor(time / 100);
  formattedMinutes = Math.floor(formattedSeconds / 60);

  formattedSeconds = formattedSeconds % 60;
  formattedMinutes = formattedMinutes % 60;

  //timesArray = [];
  formattedTime = [
    formattedMinutes,
    formattedSeconds,
    formattedMilliseconds,
  ].map(padNumber);
  finalTime = `${formattedTime[0]}:${formattedTime[1]}.${formattedTime[2]}`;
  return finalTime;
};

const removePreviousSlowestLap = () => {
  let slowestLaps = document.getElementsByClassName("slowest-lap");
  slowestLaps[0].classList.remove("slowest-lap");
};

const removePreviousFastestLap = () => {
  let fastestLaps = document.getElementsByClassName("fastest-lap");
  fastestLaps[0].classList.remove("fastest-lap");
};

const createRow = () => {
  const row = lapTable.insertRow(0);
  const firstCell = row.insertCell(0);
  const secondCell = row.insertCell(1);
  firstCell.innerHTML = `Lap ${lapNumber}:`;
  secondCell.innerHTML = formatTime(lapTime);
};
