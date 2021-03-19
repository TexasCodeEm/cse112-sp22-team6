import * as Constants from './constants.js';
import * as Storage from './util/storage.js';
import { increaseTaskPomo, toggleTaskButtonDisabled } from './tasks.js';
import { updateStats } from './stats.js';

/* Constants */
const STOP_TIMER_COLOR = 'var(--grey)';
const WORK_TIMER_COLOR = 'var(--red)';
const BREAK_TIMER_COLOR = 'var(--green)';
const COLORED_POT_SOURCE = 'images/honey-pot-color.svg';
const GRAY_POT_SOURCE = 'images/honey-pot-gray.svg';
const DASH_STROKE_VAL = 220;
const MINUTES = 60;
const BASE_10 = 10;

const startStopButton = document.getElementById(Constants.START_STOP_ID);
const timerRing = document.getElementById('base-timer-path-remaining');
const countdownText = document.getElementById('countdownText');
const yesButton = document.getElementById('reset-yes-button');
const noButton = document.getElementById('reset-no-button');
const timerAudio = document.getElementById('timer-sound');

const workIndicator = document.getElementById('work-indicator');
const longBreakIndicator = document.getElementById('long-break-indicator');
const shortBreakIndicator = document.getElementById('short-break-indicator');

const timeWorker = (window.Worker && !window.Cypress) ? new Worker('./scripts/timeWorker.js') : null;

/* Class List */
const HOVER_TEXT = 'hover-text';
const BREAK_BUTTON = 'break-button';
const HIGHLIGHT = 'highlight';

let pomoCount = 0; // # of pomos covered so far (orig. 0)
let pomoState = Constants.timerOptions.STOPPED;
let onBreak = false;
let legacyInterval;
let firstReset = true; // Is rest being clicked for the first time

/* Event listeners */
if (startStopButton) {
  startStopButton.classList.toggle(BREAK_BUTTON);
  startStopButton.addEventListener('click', startResetController);
}

// Toggles countdown text on click
if (countdownText) {
  countdownText.addEventListener('click', () => {
    if (pomoState !== Constants.timerOptions.STOPPED) {
      if (countdownText.classList.contains(HOVER_TEXT)) {
        countdownText.classList.remove(HOVER_TEXT);
      } else {
        countdownText.classList.add(HOVER_TEXT);
      }
    }
  });
}

/**
 * Callback for events that trigger the start or stop of timer
 */
export function startResetController () {
  if (pomoState === Constants.timerOptions.STOPPED) {
    startTimer();
  } else {
    resetPrompt();
  }
}

/* istanbul ignore next */
/**
 * Begins the timer countdown for a cycle
 * @param {Number} duration - The duration of the countdown
 */
export function beginCountdown (duration) {
  duration--;
  displayTime(duration);
  const timerRingColor = (onBreak) ? BREAK_TIMER_COLOR : WORK_TIMER_COLOR;
  timerRing.setAttribute('stroke', timerRingColor);
  timerRing.setAttribute('stroke-dasharray', `${(timeFraction(duration, pomoState) * DASH_STROKE_VAL)} ${DASH_STROKE_VAL}`);

  if (timeWorker) {
    timeWorker.onmessage = (e) => {
      if (pomoState === Constants.timerOptions.STOPPED) return;

      const { timeLeft } = e.data;
      displayTime(timeLeft);
      timerRing.setAttribute('stroke-dasharray', `${(timeFraction(timeLeft, pomoState) * DASH_STROKE_VAL)} ${DASH_STROKE_VAL}`);
      if (timeLeft < 0) {
        stopTimer();
        hidePrompt();
        timeWorker.onmessage = undefined;
      }
    };

    const message = { start: true, duration: duration };
    timeWorker.postMessage(message);
  } else {
    setCountdownInterval(duration);
  }
}

/* istanbul ignore next */
/**
 * Begins the timer countdown for a cycle within the main thread for
 * browsers that do not support web-workers
 * @param {Number} duration - The duration of the countdown
 */
export function setCountdownInterval (duration) {
  let timer = duration;
  legacyInterval = setInterval(() => {
    --timer;
    displayTime(timer);
    timerRing.setAttribute('stroke-dasharray', `${(timeFraction(timer, pomoState) * DASH_STROKE_VAL)} ${DASH_STROKE_VAL}`);
    if (timer < 0) {
      clearInterval(legacyInterval);
      stopTimer();
    }
  }, 1000);
}

/**
   * Toggles break styling in start-stop-button
   * @param {Boolean} onBreak - Boolean to check if the timer is on break
   * @returns {Boolean} Negation of onBreak
   */
export function togglePomoBreak (onBreak) {
  if (startStopButton) {
    startStopButton.classList.toggle(BREAK_BUTTON);
  }
  return !onBreak;
}

/**
 * Starts timer upon button click
 * @param {Boolean} localOnBreak - Boolean to check if the timer is on break
 * @param {Number} localPomoCount - Number storing which pomo the timer is ons
 * @returns {Array} An array containing the pomoState and the pomoCount
 */
export function startTimer (localOnBreak = onBreak, localPomoCount = pomoCount) {
  toggleTaskButtonDisabled(true);

  if (!timerAudio.paused) {
    timerAudio.pause();
    timerAudio.currentTime = 0;
  }
  if (startStopButton) {
    startStopButton.innerHTML = Constants.RESET_BTN_TXT;

    if (!localOnBreak) {
      pomoState = Constants.timerOptions.POMO;
      beginCountdown(Constants.WORK_LENGTH);
    } else {
      if (localPomoCount === 4) {
        localPomoCount = 0;
        pomoCount = 0;
        pomoState = Constants.timerOptions.LONG;
        beginCountdown(Constants.LONG_BREAK);
      } else {
        localPomoCount++;
        pomoState = Constants.timerOptions.SHORT;
        beginCountdown(Constants.SHORT_BREAK);
      }
    }
  }
  return [pomoState, localPomoCount];
}

/**
 * Stops the timer and refreshes user interface
 */
function stopTimer () {
  pomoState = Constants.timerOptions.STOPPED;
  timerAudio.play();
  // Mutes timer color
  timerRing.setAttribute('stroke', STOP_TIMER_COLOR);
  countdownText.classList.remove(HOVER_TEXT);
  startStopButton.innerHTML = Constants.BEGIN_BTN_TXT;
  if (!onBreak) {
    pomoCount++;
    // Dispalys the next cycle without beginning it
    if (pomoCount === Constants.POMO_CYCLE_LENGTH) {
      displayTime(Constants.LONG_BREAK);
      timerTypeIndicator(Constants.timerOptions.LONG);
    } else {
      displayTime(Constants.SHORT_BREAK);
      timerTypeIndicator(Constants.timerOptions.SHORT);
    }

    // incrementing daily pomo cycle count
    Storage.incrPomoCount();
    increaseTaskPomo();
    updateStats();
  } else {
    // Displays the next cycle without beggining it
    displayTime(Constants.WORK_LENGTH);
    timerTypeIndicator(Constants.timerOptions.POMO);
  }
  updatePots();
  toggleTaskButtonDisabled(false);
  onBreak = togglePomoBreak(onBreak);
}

/**
 * Updates pot icons to show number of pomos completed for the cycle
 */
export function updatePots () {
  for (let i = 1; i < pomoCount + 1; i++) {
    document.getElementById('pot' + i).src = COLORED_POT_SOURCE;
  }

  for (let i = pomoCount + 1; i <= Constants.POMO_CYCLE_LENGTH; i++) {
    document.getElementById('pot' + i).src = GRAY_POT_SOURCE;
  }
}

/**
   * Resets timer upon button click
   * @returns {Array} An array containing the stopped timer state and begin button text
   */
export function resetTimer () {
  pomoState = Constants.timerOptions.STOPPED;
  toggleTaskButtonDisabled(true);

  if (startStopButton) {
    startStopButton.innerHTML = Constants.BEGIN_BTN_TXT;
    if (timeWorker) timeWorker.postMessage({ start: false });
    if (legacyInterval) clearInterval(legacyInterval);
    if (onBreak) onBreak = togglePomoBreak(onBreak);
    countdownText.classList.remove(HOVER_TEXT);
    timerRing.setAttribute('stroke', STOP_TIMER_COLOR);
    timerRing.setAttribute('stroke-dasharray', `${DASH_STROKE_VAL} ${DASH_STROKE_VAL}`);
    displayTime(Constants.WORK_LENGTH);
    timerTypeIndicator(Constants.WORK_LENGTH);
  }

  Storage.incrInterruptions();
  updateStats();
  return [pomoState, Constants.BEGIN_BTN_TXT];
}

/*
 * Checks if the reset button has been pressed before and resets automatically if so
 */
export function resetPrompt () {
  if (!firstReset) {
    resetTimer();
    return;
  }
  startStopButton.style.display = 'none';
  document.getElementById('prompt').style.display = 'flex';
  yesButton.disabled = false;
  noButton.disabled = false;
  yesButton.addEventListener('click', () => {
    resetConfirm(true);
  });
  noButton.addEventListener('click', () => {
    resetConfirm(false);
  });
}

/**
 * Hides reset prompt whenever prompt is answered or timer ends
 */
export function hidePrompt () {
  startStopButton.style.display = '';
  document.getElementById('prompt').style.display = 'none';
  yesButton.disabled = true;
  noButton.disabled = true;
}

/**
 * Resets the timer if confirmation is received
 * @param {Boolean} isConfirm - True to reset timer, False otherwise
 */
export function resetConfirm (isConfirm) {
  hidePrompt();
  if (isConfirm) {
    resetTimer();
  }
  firstReset = false;
}

/**
 * Displays the amount of time remaining
 * @param {Number} time - The time to be displayed
 * @returns {String} text displayed in the countdown
 */
export function displayTime (time) {
  let minutes, seconds;
  minutes = parseInt(time / MINUTES, BASE_10);
  seconds = parseInt(time % MINUTES, BASE_10);
  minutes = minutes < BASE_10 ? '0' + minutes : minutes;
  seconds = seconds < BASE_10 ? '0' + seconds : seconds;
  countdownText.textContent = minutes + ':' + seconds;
  return countdownText.textContent;
}

/**
 * Calculates the fraction of the time remaining for the current countdown
 * @param {Number} timer The amont of time on the timer
 * @param {String} pomoState The current state of the pomodoro
 * @returns {Number} amount of time remaining
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

/* istanbul ignore next */
/**
 * Displays the textual indicator of the current timer type
 * @param {String} type - Timer enum type indicating work, long break, or short break
 */
export function timerTypeIndicator (type) {
  workIndicator.classList.remove();
  longBreakIndicator.classList.remove(HIGHLIGHT);
  shortBreakIndicator.classList.remove(HIGHLIGHT);
  if (type === Constants.timerOptions.LONG) {
    longBreakIndicator.classList.add(HIGHLIGHT);
  } else if (type === Constants.timerOptions.SHORT) {
    shortBreakIndicator.classList.add(HIGHLIGHT);
  } else {
    workIndicator.classList.add(HIGHLIGHT);
  }
}
