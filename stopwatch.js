const time = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const lapTimeDiv = document.getElementById("lapTimes");
const lapTable = document.getElementById("laps-table");
const tableRows = document.getElementsByTagName("table")[0].rows;

let milliseconds = 0;
let watchStatus = "off"; //can have on and off status.
let lapTime = 0;
let lapsArray = [];
let finalTime = 0;
let fastestLapIndex = 0;
let slowestLapIndex = 0;

let slowestLap = -1;
let fastestLap = Infinity;

//console.log(formattedTime[0]);

const resetTime = () => {
  milliseconds = 0;
  watchStatus = "off";
  clearInterval(myInterval);
  time.innerText = formatTime(milliseconds);
  lapTime = 0;
  lapTimeDiv.innerText = formatTime(lapTime);

  lapsArray = [];
  lapTable.innerText = "";
  resetButton.innerText = "Lap";
  lapTimeDiv.innerText = "";
  slowestLap = -1;
  fastestLap = Infinity;
};

const padNumber = (time) => {
  return time.toString().padStart(2, "0");
};

//increment function

const stopwatch = () => {
  time.innerText = formatTime(milliseconds);
  const lapNumber = lapsArray.length;
  lapTimeDiv.innerText = ` Lap ${lapNumber + 1}: ${formatTime(lapTime)}`;

  milliseconds++;
  lapTime++;
};

const calculateLap = () => {
  //add laptime to div
  lapsArray.push(lapTime);
  const lapNumber = lapsArray.length;


  if (lapsArray.length === 2) {
    const row = lapTable.insertRow(0);
    const cell = row.insertCell(0);
    cell.innerHTML = `Lap ${lapNumber}:  ${formatTime(lapTime)}`;

    if (lapsArray[0] > lapsArray[1]) {
      tableRows[0].classList.add("slowest-lap");
      tableRows[1].classList.add("fastest-lap");

      slowestLap = lapsArray[0];
      fastestLap = lapsArray[1];
    } else {
      tableRows[0].classList.add("fastest-lap");
      tableRows[1].classList.add("slowest-lap");

      slowestLap = lapsArray[1];
      fastestLap = lapsArray[0];
    }
  } else {
    if (lapTime > slowestLap && lapsArray.length > 2) {
      removePreviousSlowestLap();
      slowestLap = lapTime;
      const row = lapTable.insertRow(0);
      const cell = row.insertCell(0);

      row.classList.add("slowest-lap");
      cell.innerHTML = `Lap ${lapNumber}:  ${formatTime(lapTime)}`;
     
    } else if (lapTime < fastestLap && lapsArray.length > 1) {
      //find previous fastest lap. Remove class
      fastestLap = lapTime;

      removePreviousFastestLap();
      const row = lapTable.insertRow(0);
      const cell = row.insertCell(0);
      row.classList.add("fastest-lap");
      cell.innerHTML = `Lap ${lapNumber}:  ${formatTime(lapTime)}`;
     
    } else {
      const row = lapTable.insertRow(0);
      const cell = row.insertCell(0);
      cell.innerHTML = ` Lap ${lapNumber}:  ${formatTime(lapTime)}`; 
      
      
    }
  }

  lapTime = 0;
};

//execute function when start button is pressed.
const startTime = () => {
  if (watchStatus === "off") {
    myInterval = window.setInterval(stopwatch, 10);
    watchStatus = "on";

    resetButton.innerText = "Lap"; //use inner text
    startButton.innerText = "Stop";
  } else if (watchStatus === "on") {
    //window.clearInterval(stopwatch);
    watchStatus = "off";
    resetButton.innerText = "Reset";
    startButton.innerText = "Start";
    clearInterval(myInterval);
  }
};

document.getElementById("start").addEventListener("click", startTime);

//when reset is pressed, reset the timer to the default value
const resetTimeLapToggle = () => {
  if (resetButton.innerText === "Reset") {
    //rethink this
    resetTime();
  } else if (resetButton.innerText === "Lap" && milliseconds > 0) {
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
