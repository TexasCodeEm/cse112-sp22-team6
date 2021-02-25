/* Constants */
const START_STOP_ID = "start-stop-button";
const RESET_BTN_TXT = "✖ Reset";
const BEGIN_BTN_TXT = "▶ Begin";
const TASK_BTN_ID = "task";
const TOTAL_TASK_ID = "total-task-count";
const TODAY_TASK_ID = "today-task-count";
const WEEK_TASK_ID = "week-task-count";
const TODAY_DATE_ID = "today";
const WEEK_START_ID = "week-start";
const LENGTH_OF_WEEK = 7;
const stdWork = 1500;    //# of seconds in a work pomo (orig. 1500)
const stdBreak = 300;    //# of seconds in a short break (orig. 300)
const stdExtBreak = 900; //# of seconds in a long break (orig. 900)


// Variables
var onBreak = false;
var pomoCount = 0;     //# of pomos covered so far (orig. 0)

/**
 * Enumerated timer states
 * @enum {string}
 */
const timerOptions = {
    STOPPED: "stopped",
    POMO: "pomo",
    SHORT: "short break",
    LONG: "long break"
}

/***********  Task Button ***********/
let taskButton = document.getElementById(TASK_BTN_ID);
let localStorage = window.localStorage;

if (taskButton) {
    taskButton.addEventListener("click", taskComplete); // upon click
}

/* istanbul ignore next */
/**
 * Task is completed upon button click
 */
function taskComplete() {
    let date1 = new Date();
    let date2 = new Date();
    let date3 = new Date();
    updateLocalStorage(false, date1, date2, date3);
}

/**
 * Reformat Date() variable to mm:dd:yyyy
 * @param Date() variable
 * @returns formatted string
 */
function format_date(to_format) {
    let dd = String(to_format.getDate()).padStart(2, "0"); // date
    let mm = String(to_format.getMonth() + 1).padStart(2, "0"); // month
    let yyyy = to_format.getFullYear(); // year
    let formatted = mm + "/" + dd + "/" + yyyy;
    return formatted;
}

/**
 * Update local storage with finished task information
 * @param boolean to clear storage or not for debugging
 * @param date1 input date object
 * @param date2 input date object
 * @param date3 input date object
 * @returns localStorage
 */
function updateLocalStorage(clear_storage = false, date1, date2, date3) {
    // date information
    let today = date1;
    let curr_date = date2;
    let temp = date3;

    let today_format = format_date(today);
    let weekStartDate;

    // storage variables
    let storage_total_task;
    let storage_today_task;
    let storage_week_task;
    let storage_today_date;
    let storage_week_start;

    if (clear_storage) {
        localStorage.clear();
    }
    
    // check if local storage is empty
    if (localStorage.length == 0) {

        // first "weekStartDate" in storage history
        if (today.getDay() == 1) { // It is Monday
            weekStartDate = today_format;
        } else { // get closest previous Monday
            if(curr_date.getDay() == 0) { // Sunday
                curr_date.setDate(curr_date.getDate() - (LENGTH_OF_WEEK - 1));
            } else {
                curr_date.setDate(curr_date.getDate() - (curr_date.getDay() - 1));
            }
            weekStartDate = format_date(curr_date);
        }

        // set local storage variables
        storage_total_task = "1";
        storage_today_task = "1";
        storage_week_task = "1";
        storage_today_date = today_format;
        storage_week_start = weekStartDate;
        

    } else {
        storage_total_task = localStorage.getItem(TOTAL_TASK_ID);
        storage_today_task = localStorage.getItem(TODAY_TASK_ID);
        storage_week_task = localStorage.getItem(WEEK_TASK_ID);
        storage_today_date = localStorage.getItem(TODAY_DATE_ID);
        storage_week_start = localStorage.getItem(WEEK_START_ID);

        if (today_format != storage_today_date) { // check if it's the same day

            // get the date difference
            let difference = 0;

            // condition: curr_date > storage_today_date
            // check for new week
            while (format_date(curr_date) != storage_week_start) { 
                curr_date.setDate(curr_date.getDate() - 1); // previous day
                if (++difference == LENGTH_OF_WEEK) break;
            }

            if (difference == LENGTH_OF_WEEK) { // CASE 1: different day, different week
                curr_date = temp;
                if(curr_date.getDay() == 0) { // Sunday
                    curr_date.setDate(curr_date.getDate() - (LENGTH_OF_WEEK - 1));
                } else {
                    curr_date.setDate(curr_date.getDate() - (curr_date.getDay() - 1));
                }
                weekStartDate = format_date(curr_date);

                // set local storage variables
                storage_total_task = String(Number(storage_total_task) + 1);
                storage_today_task = "1";
                storage_week_task = "1";
                storage_today_date = today_format;
                storage_week_start = weekStartDate;
                
            } else { // CASE 2: different day, same week

                // set local storage variables
                storage_total_task = String(Number(storage_total_task) + 1);
                storage_today_task = "1";
                storage_week_task = String(Number(storage_week_task) + 1);
                storage_today_date = today_format;
                
            }
        } else { // CASE 3: same day

            // set local storage variables
            storage_total_task = String(Number(storage_total_task) + 1);
            storage_today_task = String(Number(storage_today_task) + 1);
            storage_week_task = String(Number(storage_week_task) + 1);

        }
    }

    // update local storage
    localStorage.setItem(TOTAL_TASK_ID, storage_total_task);
    localStorage.setItem(TODAY_TASK_ID, storage_today_task);
    localStorage.setItem(WEEK_TASK_ID, storage_week_task);
    localStorage.setItem(TODAY_DATE_ID, storage_today_date);
    localStorage.setItem(WEEK_START_ID, storage_week_start);
    
    // console.log(localStorage); // for debugging

    return localStorage;
}

// Sets the color of the timer
document.getElementById("base-timer-path-remaining").setAttribute("stroke", "#DB2E2E");

/***********  Start/Reset button ***********/
let startStopButton = document.getElementById(START_STOP_ID);
let pomoState = timerOptions.STOPPED;

if (startStopButton) {
    startStopButton.classList.toggle("break-button");
    startStopButton.addEventListener("click", function() {
        if (pomoState == timerOptions.STOPPED) {
            startTimer();
        } else {
            resetTimer();
        }
    });
}

/**
 * A demo function for frontend testing
 */
function testDom(){
    let titleEl = document.querySelector("title");
    titleEl.innerText = "Test Text";
}

/* istanbul ignore next */
/**
 * Begins the countdown for a break cycle
 * @param {*} duration The duration of the countdown 
 * @param {*} textDisplay The component on which the remaining time is outputted
 */
function beginBreak(duration, textDisplay) {
	let timer = duration; // minutes, seconds;
    let interval = setInterval(function() {
    currentTime(timer, textDisplay);
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", `${(timeFraction(timer, pomoState) * 220)} 220`);
    
    // Press break in middle of countdown.
    if (pomoState == timerOptions.STOPPED) {
        clearInterval(interval);
        pomoCount = 0;
        onBreak = false;
        currentTime(stdWork, textDisplay);
        document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", `220 220`);
        //Changes the color of the timer
        document.getElementById("base-timer-path-remaining").setAttribute("stroke", "#DB2E2E");
    }

    if (--timer < -1) {
        clearInterval(interval);
        document.getElementById("timer-sound").play();
        startStopButton.innerHTML = BEGIN_BTN_TXT; 
        pomoState = timerOptions.STOPPED;
        onBreak = false;
        //Changes the color of the timer
        document.getElementById("base-timer-path-remaining").setAttribute("stroke", "#DB2E2E");
        currentTime(stdWork, textDisplay);
    }
  }, 1000);
}

/* istanbul ignore next */
/**
 * Begins the countdown for a work cycle
 * @param {*} duration The duration of the countdown 
 * @param {*} textDisplay The component on which the remaining time is outputted
 */
function beginCountdown(duration, textDisplay) {
	let timer = duration; // minutes, seconds;

    var interval = setInterval(function() {
    currentTime(timer, textDisplay);
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", `${(timeFraction(timer, pomoState) * 220)} 220`);
   
    // Press break in middle of countdown.
    if (pomoState == timerOptions.STOPPED) {
        clearInterval(interval);
        pomoCount = 0;
        onBreak = false;
        currentTime(stdWork, textDisplay);
        document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", `220 220`);
    }    
    
    if (--timer < -1) { 
        document.getElementById("base-timer-path-remaining").setAttribute("stroke", "#34DBB3");
        clearInterval(interval);
        document.getElementById("timer-sound").play();
        onBreak = true;
        startStopButton.innerHTML = BEGIN_BTN_TXT; 
        pomoState = timerOptions.STOPPED;
        if(pomoCount == 3) {
            currentTime(stdExtBreak, textDisplay);
        }
        else {
            currentTime(stdBreak, textDisplay);
        }
    }
  }, 1000);
}

/**
 * Toggles break styling in start-stop-button
 */
function togglePomoBreak(onBreak) {
    if (startStopButton) {
        startStopButton.classList.toggle("break-button");
    }
    return !onBreak;
}

/**
 * Starts timer upon button click
 */
function startTimer(on_break = onBreak, pomo_count = pomoCount) {
    let timerAudio = document.getElementById("timer-sound");
    if(!timerAudio.paused){
        timerAudio.pause();
        timerAudio.currentTime = 0;
    }
    if (startStopButton) { 
        startStopButton.innerHTML = RESET_BTN_TXT;

        // Copied from buttonTest
        var display = document.querySelector('#countdownText');
        if (!on_break) {
            pomoState = timerOptions.POMO;
            beginCountdown(stdWork, display);
        }
        else {
            if(pomo_count == 3) {
                pomoCount = 0;
                pomo_count = 0;
                pomoState = timerOptions.LONG;
                beginBreak(stdExtBreak, display);
            }
            else {
                pomoCount++;
                pomo_count++;
                pomoState = timerOptions.SHORT;
                beginBreak(stdBreak, display);
            }
        }
        //
    }
    return [pomoState, pomo_count];
}

/**
 * Resets timer upon button click
 */
function resetTimer() {
    pomoState = timerOptions.STOPPED;
    if (startStopButton) {
        startStopButton.innerHTML = BEGIN_BTN_TXT;
    }
    return [pomoState, pomoCount, BEGIN_BTN_TXT];
}

/**
 * Displays the amount of time remaining 
 * @param {*} timer The time to be displayed 
 * @param {*} textDisplay The component on which the remaining time is displayed
 */
function currentTime(timer, textDisplay) {
    let minutes, seconds;
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    textDisplay.textContent = minutes + ":" + seconds;
    return textDisplay.textContent;
}

/**
 * Returns the fraction of the time remaining for the current countdown
 * @param {*} timer The amont of time on the timer 
 * @param {*} pomoState The current state of the pomodoro
 */
function timeFraction(timer, pomoState){
    if (pomoState == timerOptions.POMO){
        return timer/stdWork;
    }
    else if(pomoState == timerOptions.LONG){
        return timer/stdExtBreak;
    }
    else{
        return timer/stdBreak;
    }
}

/**************  Statistics Frontend ***************/
const timerBlock = document.getElementsByClassName('center-container')[0];
const statsPane = document.getElementById('stats-container');
const statsOpenButton = document.getElementById('stats-open-button');
const statsCloseButton = document.getElementById('stats-close-button');

const timerSlideAnim = {
    keys: [
        { transform: 'translate(0, 0)' },
        { transform: 'translate(-15vw, 0)' },
    ],
    timing: {
        duration: 500,
        easing: 'ease-out',
        fill: 'both',
    },
};

const statsSlideAnim = {
    keys: [
        { right: '0' },
    ],
    timing: {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards',
    },
};

const statsSlide = statsPane.animate(statsSlideAnim.keys, statsSlideAnim.timing);
statsSlide.cancel();
statsOpenButton.onclick = openStatsPane;
statsCloseButton.onclick = closeStatsPane;

/* istanbul ignore next */
/**
 * Opens the statistics pane.
 */
function openStatsPane() {
    timerBlock.animate(timerSlideAnim.keys, timerSlideAnim.timing);
    statsSlide.playbackRate = 1;
    statsSlide.play();
}

/* istanbul ignore next */
/**
 * Closes the statistics pane.
 */
function closeStatsPane() {
    timerBlock.animate(timerSlideAnim.keys, timerSlideAnim.timing).reverse();
    statsSlide.playbackRate = -1;
    statsSlide.play();
}

module.exports = { 
    togglePomoBreak, 
    startTimer, 
    resetTimer, 
    beginBreak, 
    currentTime, 
    timerOptions, 
    beginCountdown, 
    timeFraction,
    format_date, 
    updateLocalStorage,
    testDom
};
