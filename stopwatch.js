const time = document.getElementById("timer"); 
const startButton = document.getElementById('start'); 
const resetButton = document.getElementById('reset');


let milliseconds = 0; 
let seconds = 0; 
let minutes = 0; 
let currentTime = 0;
let watchStatus = "off"; 



//increment function 

function stopwatch () { 
    milliseconds++; 

    if (milliseconds / 100 === 1) {
        seconds++; 
        milliseconds =0;

        if (seconds / 60 === 1) {
            minutes ++; 
            seconds = 0;
        }
    } 

   time.innerHTML = "0" + minutes + ":" + "0" + seconds + ":"  + milliseconds;
}

function calculateLap () {
    console.log("lap Calculated")
}




 //execute function when start button is pressed. 
 function startTime() {
    if (watchStatus === "off") { 
       myInterval = window.setInterval(stopwatch, 10);
        watchStatus = "on"; 

        resetButton.innerHTML = "Lap"; 
        startButton.innerHTML = "Stop"
     } else if (watchStatus === "on") {

        window.clearInterval(stopwatch);
        watchStatus = "off"; 
        resetButton.innerHTML = "Reset"; 
        startButton.innerHTML = "Start"  
        clearInterval(myInterval)
    }
 } 

 document.getElementById("start").addEventListener("click", startTime);
 

 //when reset is pressed, reset the timer to the default value 
function resetTimeLapToggle() {
    if (resetButton.innerHTML === "Reset") { 
        milliseconds = 0; 
        seconds  = 0; 
        minutes = 0
        watchStatus = "off"
        clearInterval(myInterval) 
        time.innerHTML = "0" + minutes + ":" + "0" + seconds + ":"  + "0" + milliseconds;
        console.log("pressed reset")
        
    } else {
        console.log("calculated Lap")
    }
       
    
}
resetButton.addEventListener('click', resetTimeLapToggle)



//if lap is pressed, execute lap calculation















