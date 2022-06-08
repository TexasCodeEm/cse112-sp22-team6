/**
 * Checks for service worker support
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .catch(error => {
            console.log('SW Registration Failed!');
            console.log(error);
        });
}