const time = document.getElementById("timer"); 
const startButton = document.getElementById('start'); 
const resetButton = document.getElementById('reset');


let milliseconds = 0; 
let watchStatus = "off"; 



//increment function 

const stopwatch = () => {  
 time.innerHTML =  formatTime(milliseconds);
// console.log(milliseconds)
; 
milliseconds++;
    

}

const calculateLap = () => {
    console.log("lap Calculated")
}




 //execute function when start button is pressed. 
 const startTime = () => {
     if (watchStatus === "off") { 
        myInterval = window.setInterval(stopwatch, 10);
        watchStatus = "on"; 
        
        resetButton.innerHTML = "Lap"; 
        startButton.innerHTML = "Stop"
     } else if (watchStatus === "on") {

        //window.clearInterval(stopwatch);
        watchStatus = "off"; 
        resetButton.innerHTML = "Reset"; 
        startButton.innerHTML = "Start"  
        clearInterval(myInterval) 
    }
 } 

 document.getElementById("start").addEventListener("click", startTime);
 

 //when reset is pressed, reset the timer to the default value 
const resetTimeLapToggle = () => {
    if (resetButton.innerHTML === "Reset") { 
        milliseconds = 0; 
    
        watchStatus = "off"
        clearInterval(myInterval) 
        time.innerHTML = milliseconds //use backticks
        console.log("pressed reset")
        
    } else {
        console.log("calculated Lap")
    }
       
    
}
resetButton.addEventListener('click', resetTimeLapToggle)
''

const formatTime = (time) =>{ 

    let formattedMilliseconds = 0;
    let formattedSeconds = 0; 
    let formattedMinutes = 0; 
    
        

    formattedMilliseconds = time % 100; 
    formattedSeconds = Math.floor(time/100);
    formattedMinutes= Math.floor((formattedSeconds/60)) 


    formattedSeconds = formattedSeconds % 60; 
    formattedMinutes = formattedMinutes % 60;

   


    return `${formattedMinutes} : ${ formattedSeconds} : ${formattedMilliseconds}`

  
    
    } 




//if lap is pressed, execute lap calculation














