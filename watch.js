let display = document.getElementById("time");
let timer = null;
let starttime = 0;
let elapsedtime = 0;
let isrunning = false;

function start() {
    if (!isrunning) {
        starttime = Date.now() - elapsedtime;
        timer = setInterval(update, 10);
        isrunning = true;
    }
}

function stop() {
    if (isrunning) {
        clearInterval(timer);
        elapsedtime = Date.now() - starttime;
        isrunning = false;
    }
}
function reset() {
    clearInterval(timer);
    timer = null;
    isrunning = false;
    starttime = 0;
    elapsedtime = 0;
    display.textContent = "00:00:00:00";
}
