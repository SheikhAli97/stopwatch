const time = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const lapTimeDiv = document.getElementById("lapTimes");
const lapTable = document.getElementById("laps-table");

let milliseconds = 0;
let watchStatus = "off"; //can have on and off status.
let lapTime = 0;
let lapsArray = [];
let finalTime = 0;

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
  lapTimeDiv.innerText = ''
};

const padNumber = (time) => {
  return time.toString().padStart(2, "0");
};

//increment function

const stopwatch = () => {
  time.innerText = formatTime(milliseconds);
  const lapNumber = lapsArray.length;
  lapTimeDiv.innerText = ` Lap ${lapNumber + 1} is ${formatTime(lapTime)}`;

  milliseconds++;
  lapTime++;
};

const calculateLap = () => {
  //add laptime to div

  lapsArray.push(lapTime);
  const lapNumber = lapsArray.length;

  //get table and insert content

  const row = lapTable.insertRow(0);
  const cell = row.insertCell(0);
  cell.innerHTML = `Lap ${lapNumber}:  ${formatTime(lapTime)}`;

  lapTime = 0;
};

//write function that loops through lap times and returns new array with the differences

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

const findFastestandSlowestLaps = () => {

  //finds slowest and fastest laps in array
  //add colour to those laps
};
