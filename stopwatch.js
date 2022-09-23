const time = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const lapTimeDiv = document.getElementById("lapTimes");
const lapTable = document.getElementById('laps-table')

let milliseconds = 0;
let watchStatus = "off";
let totalElapsedTime = 0;
let lapTime = 0;
let lapsArray = [];
let lapRowContent = "";
let lapNumber = 0;

//increment function

const stopwatch = () => {
  time.innerText = formatTime(milliseconds);
  lapTimeDiv.innerText = ` Lap ${lapNumber + 1} is ${formatTime(lapTime)}`

  milliseconds++;
  lapTime++;
};

const calculateLap = () => {
  //add laptime to div
  lapsArray.push(lapTime);

  for (let i = 0; i < lapsArray.length; i++) {
    lapNumber = i + 1;
  }
 

lapRowContent = `Lap ${lapNumber}:  ${formatTime(lapTime)}`; 
//get table and insert content

const row = lapTable.insertRow(0); 
const cell = row.insertCell(0); 
cell.innerHTML = lapRowContent;



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

const resetTime = () =>{
    milliseconds = 0;

    watchStatus = "off";
    clearInterval(myInterval);
    time.innerText = formatTime(milliseconds);
    
    totalElapsedTime = 0;
    lapTime = 0;
    lapTimeDiv.innerText = formatTime(lapTime);
    lapNumber = 0;
    lapsArray = [];
    lapTable.innerText = '';
    resetButton.innerText = 'Lap'  
}

//when reset is pressed, reset the timer to the default value
const resetTimeLapToggle = () => {
  if (resetButton.innerText === "Reset") {
  resetTime();
    
  } else if (resetButton.innerText === "Lap" && (milliseconds > 0)) {
    calculateLap(milliseconds);
  }
};
resetButton.addEventListener("click", resetTimeLapToggle);
("");

const formatTime = (time) => {
  let formattedMilliseconds = 0;
  let formattedSeconds = 0;
  let formattedMinutes = 0;

  formattedMilliseconds = time % 100;
  formattedSeconds = Math.floor(time / 100);
  formattedMinutes = Math.floor(formattedSeconds / 60);

  formattedSeconds = formattedSeconds % 60;
  formattedMinutes = formattedMinutes % 60;

//   const padNumber =  (timeInCentiseconds) => { 
//     Math.floor(timeInCentiseconds).toString().padStart(2, '0')
// }



  return `${formattedMinutes} : ${formattedSeconds} : ${formattedMilliseconds}`;
};


