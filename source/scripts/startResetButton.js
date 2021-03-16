import * as Constants from './constants.js';
import { increaseTaskPomo, formatDate, toggleTaskButtonDisabled } from './taskButton.js';
import { updateStats } from './stats.js';

const startStopButton = document.getElementById(Constants.START_STOP_ID);
const countdownText = document.getElementById('countdownText');
const COLORED_POT_SOURCE = 'images/honey-pot-color.svg';
const GRAY_POT_SOURCE = 'images/honey-pot-gray.svg';

const yesButton = document.getElementById('reset-yes-button');
const noButton = document.getElementById('reset-no-button');

let pomoCount = 0; // # of pomos covered so far (orig. 0)
let pomoState = Constants.timerOptions.STOPPED;
let onBreak = false;
let interval;

if (startStopButton) {
  startStopButton.classList.toggle('break-button');
  startStopButton.addEventListener('click', startResetController);
}

// Toggles countdown text on click
if (countdownText) {
  countdownText.addEventListener('click', () => {
    if (pomoState !== Constants.timerOptions.STOPPED) {
      if (countdownText.classList.contains('hover-text')) {
        countdownText.classList.remove('hover-text');
      } else {
        countdownText.classList.add('hover-text');
      }
    }
  });
}

/**
 * The callback for events that trigger the start or stop of timer
 */
export function startResetController () {
  if (pomoState === Constants.timerOptions.STOPPED) {
    startTimer();
  } else {
    resetPrompt();
  }
}

/**
   * Begins the timer countdown for a cycle
   * @param {Number} duration The duration of the countdown
   * @param {Object} textDisplay The component on which the remaining time is outputted
   */
export function beginCountdown (duration, textDisplay) {
  let timer = duration; // minutes, seconds;
  currentTime(--timer, textDisplay);
  if (onBreak) {
    startStopButton.disabled = true;
    document.getElementById('base-timer-path-remaining').setAttribute('stroke', 'var(--green)');
  } else {
    document.getElementById('base-timer-path-remaining').setAttribute('stroke', 'var(--red)');
  }
  document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', `${(timeFraction(timer, pomoState) * 220)} 220`);
  interval = setInterval(function () {
    --timer;
    currentTime(timer, textDisplay);
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', `${(timeFraction(timer, pomoState) * 220)} 220`);
    if (timer < 0) {
      clearInterval(interval);
      document.getElementById('timer-sound').play();
      document.getElementById('countdownText').classList.remove('hover-text');
      startStopButton.innerHTML = Constants.BEGIN_BTN_TXT;
      pomoState = Constants.timerOptions.STOPPED;
      // Mutes timer color
      document.getElementById('base-timer-path-remaining').setAttribute('stroke', 'var(--grey)');
      if (!onBreak) {
        pomoCount++;
        updatePots();
        // Dispalys the next cycle without beginning it
        if (pomoCount === 4) {
          currentTime(Constants.LONG_BREAK, textDisplay);
          timerTypeIndicator(Constants.timerOptions.LONG);
        } else {
          currentTime(Constants.SHORT_BREAK, textDisplay);
          timerTypeIndicator(Constants.timerOptions.SHORT);
        }
        // current pomos cycles completed today
        const todayPomos = Number(window.localStorage.getItem(Constants.TODAY_POMO_ID));
        // Today's date
        const todayStorage = window.localStorage.getItem(Constants.TODAY_DATE_ID);
        // incrementing daily pomo cycle count

        updatePomoCount(todayPomos, todayStorage);
        updateDailyPomoCount();
        increaseTaskPomo();
        updateStats();
      } else {
        updatePots();
        startStopButton.disabled = false;
        // Dispalys the next cycle without beggining it
        currentTime(Constants.WORK_LENGTH, textDisplay);
        timerTypeIndicator(Constants.timerOptions.POMO);
        // Update total cycle count at end of cycle
        if (duration === Constants.LONG_BREAK) {
          updateTotalCycles();
        }
      }
      toggleTaskButtonDisabled(false);
      onBreak = togglePomoBreak(onBreak);
    }
  }, 1000);
}

/**
   * Update's pomo count for today in local storage
   * @param {Number} todayPomos The number of daily current pomos completed
   * @param {String} todayStorage updatePomoCount the local storage date for the current day
   * @return number of pomos completed today
   */
export function updatePomoCount (todayPomos, todayStorage) {
  // update pomo cycle day count
  const today = formatDate(new Date());
  // case if we are on same day
  if (today === todayStorage) {
    todayPomos++;
  } else { // case if we are on different day
    todayPomos = 1;
    window.localStorage.setItem(Constants.TODAY_DATE_ID, today);
  }
  window.localStorage.setItem(Constants.TODAY_POMO_ID, String(todayPomos));
  window.localStorage.setItem(Constants.TOTAL_POMO_ID, String(Number(window.localStorage.getItem(Constants.TOTAL_POMO_ID)) + 1));
  if (Number(window.localStorage.getItem(Constants.BEST_DAILY_POMO_ID)) < todayPomos) {
    window.localStorage.setItem(Constants.BEST_DAILY_POMO_ID, todayPomos);
  }

  return todayPomos;
}

/**
 * Updates the pomo count for the current day of the week in local storage.
 */
export function updateDailyPomoCount () {
  const dayIdx = ((new Date()).getDay() - 1) % Constants.LENGTH_OF_WEEK;
  const weekHistory = JSON.parse(window.localStorage.getItem(Constants.WEEK_HISTORY)) || [0, 0, 0, 0, 0, 0, 0];

  weekHistory[dayIdx]++;
  window.localStorage.setItem(Constants.WEEK_HISTORY, JSON.stringify(weekHistory));
}

/**
   * Toggles break styling in start-stop-button
   * @param {Boolean} onBreak Boolean to check if the timer is on break
   * @return Negation of onBreak
   */
export function togglePomoBreak (onBreak) {
  if (startStopButton) {
    startStopButton.classList.toggle('break-button');
  }
  return !onBreak;
}

/**
   * Starts timer upon button click
   * @param {Boolean} localOnBreak Boolean to check if the timer is on break
   * @param {Number} localPomoCount Number storing which pomo the timer is ons
   * @return An array containing the pomoState and the pomoCount
   */
export function startTimer (localOnBreak = onBreak, localPomoCount = pomoCount) {
  toggleTaskButtonDisabled(true);

  const timerAudio = document.getElementById('timer-sound');
  if (!timerAudio.paused) {
    timerAudio.pause();
    timerAudio.currentTime = 0;
  }
  if (startStopButton) {
    startStopButton.innerHTML = Constants.RESET_BTN_TXT;

    const display = document.querySelector('#countdownText');
    if (!localOnBreak) {
      pomoState = Constants.timerOptions.POMO;
      beginCountdown(Constants.WORK_LENGTH, display);
    } else {
      if (localPomoCount === 4) {
        localPomoCount = 0;
        pomoCount = 0;
        pomoState = Constants.timerOptions.LONG;
        beginCountdown(Constants.LONG_BREAK, display);
      } else {
        localPomoCount++;
        pomoState = Constants.timerOptions.SHORT;
        beginCountdown(Constants.SHORT_BREAK, display);
      }
    }
  }
  return [pomoState, localPomoCount];
}

/**
 * Update pot icons to show number of pomos completed for the cycle
 */
export function updatePots () {
  for (let i = 1; i < pomoCount + 1; i++) { document.getElementById('pot' + i).src = COLORED_POT_SOURCE; }

  for (let i = pomoCount + 1; i <= 4; i++) { document.getElementById('pot' + i).src = GRAY_POT_SOURCE; }
}

/**
   * Resets timer upon button click
   * @return An array containing the stopped timer state and begin button text
   */
export function resetTimer () {
  document.getElementById('countdownText').classList.remove('hover-text');
  pomoState = Constants.timerOptions.STOPPED;
  toggleTaskButtonDisabled(true);

  if (startStopButton) {
    startStopButton.innerHTML = Constants.BEGIN_BTN_TXT;
    clearInterval(interval);
    if (onBreak) onBreak = togglePomoBreak(onBreak);
    currentTime(Constants.WORK_LENGTH, document.querySelector('#countdownText'));
    document.getElementById('base-timer-path-remaining').setAttribute('stroke', 'var(--grey)');
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', '220 220');
    timerTypeIndicator(Constants.WORK_LENGTH);
  }
  const todayInterruptions = Number(window.localStorage.getItem(Constants.TODAY_INTERRUPTION));
  const todayStorage = window.localStorage.getItem(Constants.TODAY_DATE_ID);
  updateInterruptions(todayInterruptions, todayStorage);
  updateStats();

  return [pomoState, Constants.BEGIN_BTN_TXT];
}

let first = true;

/*
 * Checks if the reset button has been pressed before. If yes then resets the timer directly, otherwise asks for confirmation.
 */
export function resetPrompt () {
  if (!first) {
    resetTimer();
    return;
  }
  startStopButton.style.display = 'none';
  document.getElementById('prompt').style.display = 'flex';
  yesButton.disabled = false;
  noButton.disabled = false;
  yesButton.addEventListener('click', resetConfirm);
  noButton.addEventListener('click', resetConfirm);
}

/*
 * Resets the timer if yes button is clicked, and continues the cycle otherwise.
 */
export function resetConfirm (event) {
  startStopButton.style.display = '';
  document.getElementById('prompt').style.display = 'none';
  document.getElementById('reset-yes-button');
  yesButton.disabled = true;
  noButton.disabled = true;
  if (event.target.innerText === 'Yes') {
    resetTimer();
    first = false;
  } else {
    first = false;
  }
}

/**
   * Updates interruptions in local storage
   * @param {Number} todayInterruptions The number of interruptions today
   * @param {String} todayStorage Today's date currently in window.localStorage
   * @return The updated number of interruptions
   */
export function updateInterruptions (todayInterruptions, todayStorage) {
  // Total interruptions
  const interruptions = Number(window.localStorage.getItem(Constants.TOTAL_INTERRUPTION));
  window.localStorage.setItem(Constants.TOTAL_INTERRUPTION, String(interruptions + 1));

  // Today's interruptions
  const today = formatDate(new Date());
  if (today === todayStorage) {
    todayInterruptions++;
  } else {
    // Update
    todayInterruptions = 1;
    window.localStorage.setItem(Constants.TODAY_DATE_ID, today);
  }
  window.localStorage.setItem(Constants.TODAY_INTERRUPTION, String(todayInterruptions));

  return todayInterruptions;
}

/**
   * Displays the amount of time remaining
   * @param {Number} timer The time to be displayed
   * @param {Object} textDisplay The component on which the remaining time is displayed
   */
export function currentTime (timer, textDisplay) {
  let minutes, seconds;
  minutes = parseInt(timer / 60, 10);
  seconds = parseInt(timer % 60, 10);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  textDisplay.textContent = minutes + ':' + seconds;
  return textDisplay.textContent;
}

/**
   * Returns the fraction of the time remaining for the current countdown
   * @param {Number} timer The amont of time on the timer
   * @param {String} pomoState The current state of the pomodoro
   */
export function timeFraction (timer, pomoState) {
  if (pomoState === Constants.timerOptions.POMO) {
    return timer / Constants.WORK_LENGTH;
  } else if (pomoState === Constants.timerOptions.LONG) {
    return timer / Constants.LONG_BREAK;
  } else {
    return timer / Constants.SHORT_BREAK;
  }
}

/**
 * Updates total cycles in local storage
 * @returns the updated number of total cycles
 */
export function updateTotalCycles () {
  const totalCycles = Number(window.localStorage.getItem(Constants.TOTAL_CYCLE_ID)) + 1;
  window.localStorage.setItem(Constants.TOTAL_CYCLE_ID, String(totalCycles));
  return window.localStorage.getItem(Constants.TOTAL_CYCLE_ID);
}

/**
 * Displays the textual indicator of the current timer type
 * @param {String} type the timer type indicating work, long break, or short break
 */
export function timerTypeIndicator (type) {
  document.getElementById('work-indicator').classList.remove('highlight');
  document.getElementById('long-break-indicator').classList.remove('highlight');
  document.getElementById('short-break-indicator').classList.remove('highlight');
  if (type === Constants.timerOptions.LONG) {
    document.getElementById('long-break-indicator').classList.add('highlight');
  } else if (type === Constants.timerOptions.SHORT) {
    document.getElementById('short-break-indicator').classList.add('highlight');
  } else {
    document.getElementById('work-indicator').classList.add('highlight');
  }
}
