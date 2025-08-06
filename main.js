const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const selectSection = document.getElementById('selectsection');
const activity = document.getElementById('activity');
const timerCards = document.querySelectorAll('.card');

const timerSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
const breakSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3');

const TimerState = {
    STOPPED: 'stopped',
    RUNNING: 'running',
    PAUSED: 'paused',
    BREAK: 'break'
};

let state = TimerState.STOPPED;
let workDuration = 1500;
let timeLeft = workDuration;
let breakDuration = 300;
let interval = null;

selectSection.addEventListener('change', (e) => {
    if (state === TimerState.RUNNING || state === TimerState.BREAK) return;
    workDuration = parseInt(e.target.value);
    timeLeft = workDuration;
    updateDisplay(timeLeft);
    resetColors();
});

function updateDisplay(time) {
    const mins = Math.floor(time / 60).toString().padStart(2, '0');
    const secs = (time % 60).toString().padStart(2, '0');
    minutes.textContent = mins;
    seconds.textContent = secs;
}

function resetColors() {
    timerCards.forEach(card => {
        card.style.backgroundColor = '#ffffff';
        card.style.color = '#000000';
    });
}

function setWarningColors() {
    timerCards.forEach(card => {
        card.style.backgroundColor = '#ff4b2b';
        card.style.color = '#ffffff';
    });
}

function startTimer() {
    if (state === TimerState.RUNNING || state === TimerState.BREAK) return;

    state = TimerState.RUNNING;
    activity.textContent = "Work";
    activity.style.color = 'green';

    clearInterval(interval);
    interval = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft <= 180) {
            setWarningColors();
        }

        if (timeLeft <= 0) {
            clearInterval(interval);
            timerSound.play();
            startBreak();
        }
    }, 1000);
}

function startBreak() {
    state = TimerState.BREAK;
    activity.textContent = "Break Time!";
    activity.style.color = 'red';
    timeLeft = breakDuration;
    resetColors();

    interval = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft <= 60) {
            setWarningColors();
        }

        if (timeLeft <= 0) {
            clearInterval(interval);
            breakSound.play();
            resetTimer();
        }
    }, 1000);
}

function stopTimer() {
    if (state === TimerState.RUNNING || state === TimerState.BREAK) {
        clearInterval(interval);
        state = TimerState.PAUSED;
        activity.textContent = "Paused";
        activity.style.color = 'orange';
    }
}

function resetTimer() {
    clearInterval(interval);
    state = TimerState.STOPPED;
    timeLeft = workDuration;
    updateDisplay(timeLeft);
    resetColors();
    activity.textContent = "---";
    activity.style.color = 'white';
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay(timeLeft);
