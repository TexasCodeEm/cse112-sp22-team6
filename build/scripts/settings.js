import*as Stats from"./stats.js";import*as Constants from"./constants.js";import{toggleAccessibility,toggleKeystroke}from"./accessibility.js";export const settingsPane=document.getElementById("settings-container");export const settingsOpenButton=document.getElementById("settings-open-button");export const settingsCloseButton=document.getElementById("settings-close-button");export const settingsColorButton=document.getElementById("colors-switch");export const settingsKeysButton=document.getElementById("keystroke-switch");settingsOpenButton.onclick=openSettingsPane,settingsCloseButton.onclick=closeSettingsPane,settingsColorButton.onclick=toggleAccessibility,settingsKeysButton.onclick=toggleKeystroke;export let settingsPaneIsOpen=!1;export function openSettingsPane(){removeAll(),Stats.statsPane.classList.contains(Constants.SLIDE_OPEN)?(Stats.closeStatsPane(),Stats.timerBlock.classList.remove(Constants.SLIDE_CLOSE),Stats.timerBlock.classList.add(Constants.SLIDE_ACROSS_RIGHT)):Stats.timerBlock.classList.add(Constants.SLIDE_OPEN_SETTINGS),settingsPane.classList.add(Constants.SLIDE_OPEN_SETTINGS),settingsPaneIsOpen=!0,toggleButtons()}export function closeSettingsPane(){Stats.timerBlock.classList.remove(Constants.SLIDE_OPEN_SETTINGS),settingsPane.classList.remove(Constants.SLIDE_OPEN_SETTINGS),Stats.timerBlock.classList.remove(Constants.SLIDE_ACROSS_RIGHT),Stats.timerBlock.classList.add(Constants.SLIDE_CLOSE_SETTINGS),settingsPane.classList.add(Constants.SLIDE_CLOSE_SETTINGS),settingsPaneIsOpen=!1,toggleButtons()}export function toggleButtons(){settingsOpenButton.disabled=settingsPaneIsOpen,settingsCloseButton.disabled=!settingsPaneIsOpen,settingsColorButton.disabled=!settingsPaneIsOpen,settingsKeysButton.disabled=!settingsPaneIsOpen}export function removeAll(){Stats.timerBlock.classList.remove(Constants.SLIDE_CLOSE),Stats.statsPane.classList.remove(Constants.SLIDE_CLOSE),Stats.timerBlock.classList.remove(Constants.SLIDE_CLOSE_SETTINGS),settingsPane.classList.remove(Constants.SLIDE_CLOSE_SETTINGS)}