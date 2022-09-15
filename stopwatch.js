const time = document.getElementById("timer")



let milliseconds = 0; 
let seconds = 0; 
let minutes = 0; 


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

 window.setInterval(stopwatch, 10); 

 //execute function when start button is pressed. 

 
 //when start button is pressed, change the value of start to stop


 //when reset is pressed, reset the timer to the default value 


 //when reset is pressed, change value of reset to lap 











