let saveMode = false;

/**
 * Toggles the save feature
 *  While off/false it stores to session storage
 *  While on/true it stores to local storage
 */
export function toggleSave () {
    saveMode = !saveMode;
}

/**
 * Getter method for whether save mode is enabled
 * @returns {Boolean} true when save mode is on, false if off
 */
export function isSaveEnabled () {
    return saveMode;
}