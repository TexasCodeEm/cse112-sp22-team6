import*as Constants from"./constants.js";import*as Storage from"./util/storage.js";import{increaseTaskPomo,toggleTaskButtonDisabled}from"./tasks.js";import{updateStats}from"./stats.js";const STOP_TIMER_COLOR="var(--grey)",WORK_TIMER_COLOR="var(--red)",BREAK_TIMER_COLOR="var(--green)",COLORED_POT_SOURCE="images/honey-pot-color.svg",GRAY_POT_SOURCE="images/honey-pot-gray.svg",DASH_STROKE_VAL=220,MINUTES=60,BASE_10=10,FINAL_POMO=4,startStopButton=document.getElementById(Constants.START_STOP_ID),timerRing=document.getElementById("base-timer-path-remaining"),countdownText=document.getElementById("countdownText"),yesButton=document.getElementById("reset-yes-button"),noButton=document.getElementById("reset-no-button"),timerAudio=document.getElementById("timer-sound"),workIndicator=document.getElementById("work-indicator"),longBreakIndicator=document.getElementById("long-break-indicator"),shortBreakIndicator=document.getElementById("short-break-indicator"),timeWorker=window.Worker&&!window.Cypress?new Worker("./scripts/timeWorker.js"):null,HOVER_TEXT="hover-text",BREAK_BUTTON="break-button",HIGHLIGHT="highlight";let legacyInterval,pomoCount=0,pomoState=Constants.timerOptions.STOPPED,onBreak=!1,firstReset=!0;startStopButton&&(startStopButton.classList.toggle(BREAK_BUTTON),startStopButton.addEventListener("click",startResetController)),countdownText&&countdownText.addEventListener("click",(()=>{pomoState!==Constants.timerOptions.STOPPED&&(countdownText.classList.contains(HOVER_TEXT)?countdownText.classList.remove(HOVER_TEXT):countdownText.classList.add(HOVER_TEXT))}));export function startResetController(){pomoState===Constants.timerOptions.STOPPED?startTimer():resetPrompt()}export function beginCountdown(t){displayTime(--t);const e=onBreak?"var(--green)":"var(--red)";if(timerRing.setAttribute("stroke",e),timerRing.setAttribute("stroke-dasharray",220*timeFraction(t,pomoState)+" 220"),timeWorker){timeWorker.onmessage=t=>{if(pomoState===Constants.timerOptions.STOPPED)return;const{timeLeft:e}=t.data;displayTime(e),timerRing.setAttribute("stroke-dasharray",220*timeFraction(e,pomoState)+" 220"),e<0&&(stopTimer(),hidePrompt(),timeWorker.onmessage=void 0)};const e={start:!0,duration:t};timeWorker.postMessage(e)}else setCountdownInterval(t)}export function setCountdownInterval(t){let e=t;legacyInterval=setInterval((()=>{--e,displayTime(e),timerRing.setAttribute("stroke-dasharray",220*timeFraction(e,pomoState)+" 220"),e<0&&(clearInterval(legacyInterval),stopTimer())}),1e3)}export function togglePomoBreak(t){return startStopButton&&startStopButton.classList.toggle(BREAK_BUTTON),!t}export function startTimer(t=onBreak,e=pomoCount){return toggleTaskButtonDisabled(!0),timerAudio.paused||(timerAudio.pause(),timerAudio.currentTime=0),startStopButton&&(startStopButton.innerHTML=Constants.RESET_BTN_TXT,t?4===e?(e=0,pomoCount=0,pomoState=Constants.timerOptions.LONG,beginCountdown(Constants.LONG_BREAK)):(e++,pomoState=Constants.timerOptions.SHORT,beginCountdown(Constants.SHORT_BREAK)):(pomoState=Constants.timerOptions.POMO,beginCountdown(Constants.WORK_LENGTH))),[pomoState,e]}function stopTimer(){pomoState=Constants.timerOptions.STOPPED,timerAudio.play(),timerRing.setAttribute("stroke","var(--grey)"),countdownText.classList.remove(HOVER_TEXT),startStopButton.innerHTML=Constants.BEGIN_BTN_TXT,onBreak?(displayTime(Constants.WORK_LENGTH),timerTypeIndicator(Constants.timerOptions.POMO)):(pomoCount++,pomoCount===Constants.POMO_CYCLE_LENGTH?(displayTime(Constants.LONG_BREAK),timerTypeIndicator(Constants.timerOptions.LONG)):(displayTime(Constants.SHORT_BREAK),timerTypeIndicator(Constants.timerOptions.SHORT)),Storage.incrPomoCount(),increaseTaskPomo(),updateStats()),updatePots(),toggleTaskButtonDisabled(!1),onBreak=togglePomoBreak(onBreak)}export function updatePots(){for(let t=1;t<pomoCount+1;t++)document.getElementById("pot"+t).src=COLORED_POT_SOURCE;for(let t=pomoCount+1;t<=Constants.POMO_CYCLE_LENGTH;t++)document.getElementById("pot"+t).src=GRAY_POT_SOURCE}export function resetTimer(){return pomoState=Constants.timerOptions.STOPPED,toggleTaskButtonDisabled(!0),startStopButton&&(startStopButton.innerHTML=Constants.BEGIN_BTN_TXT,timeWorker&&timeWorker.postMessage({start:!1}),legacyInterval&&clearInterval(legacyInterval),onBreak&&(onBreak=togglePomoBreak(onBreak)),countdownText.classList.remove(HOVER_TEXT),timerRing.setAttribute("stroke","var(--grey)"),timerRing.setAttribute("stroke-dasharray","220 220"),displayTime(Constants.WORK_LENGTH),timerTypeIndicator(Constants.WORK_LENGTH)),Storage.incrInterruptions(),updateStats(),[pomoState,Constants.BEGIN_BTN_TXT]}export function resetPrompt(){firstReset?(startStopButton.style.display="none",document.getElementById("prompt").style.display="flex",yesButton.disabled=!1,noButton.disabled=!1,yesButton.addEventListener("click",(()=>{resetConfirm(!0)})),noButton.addEventListener("click",(()=>{resetConfirm(!1)}))):resetTimer()}export function hidePrompt(){startStopButton.style.display="",document.getElementById("prompt").style.display="none",yesButton.disabled=!0,noButton.disabled=!0}export function resetConfirm(t){hidePrompt(),t&&resetTimer(),firstReset=!1}export function displayTime(t){let e,o;return e=parseInt(t/60,10),o=parseInt(t%60,10),e=e<10?"0"+e:e,o=o<10?"0"+o:o,countdownText.textContent=e+":"+o,countdownText.textContent}export function timeFraction(t,e){return e===Constants.timerOptions.POMO?t/Constants.WORK_LENGTH:e===Constants.timerOptions.LONG?t/Constants.LONG_BREAK:t/Constants.SHORT_BREAK}export function timerTypeIndicator(t){workIndicator.classList.remove(HIGHLIGHT),longBreakIndicator.classList.remove(HIGHLIGHT),shortBreakIndicator.classList.remove(HIGHLIGHT),t===Constants.timerOptions.LONG?longBreakIndicator.classList.add(HIGHLIGHT):t===Constants.timerOptions.SHORT?shortBreakIndicator.classList.add(HIGHLIGHT):workIndicator.classList.add(HIGHLIGHT)}