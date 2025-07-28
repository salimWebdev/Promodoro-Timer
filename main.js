const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const cards = document.querySelectorAll('.card');
const selectsection = document.getElementById('selectsection');
const activity = document.getElementById('activity');

// Audio for notifications
const timerSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
const breakSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3');

// Timer states
const TimerState = {
    STOPPED: 'stopped',
    RUNNING: 'running',
    PAUSED: 'paused',
    BREAK: 'break'
};

let state = TimerState.STOPPED;
let leftTime = 1500;
let finalleftTime = 1500;
let interval = null;
let restInterval = null;
let restTime = 300; // 5 minutes break by default

// Update time selection
selectsection.addEventListener('change', (event) => {
    if (state === TimerState.RUNNING || state === TimerState.BREAK) return;
    
    finalleftTime = parseInt(event.target.value);
    leftTime = finalleftTime;
    updateDisplay();
    resetTimerColors();
});

function updateDisplay() {
    const mins = Math.floor(leftTime / 60).toString().padStart(2, "0");
    const secs = (leftTime % 60).toString().padStart(2, "0");
    minutes.textContent = mins;
    seconds.textContent = secs;
}

function updateBreakDisplay() {
    const mins = Math.floor(restTime / 60).toString().padStart(2, "0");
    const secs = (restTime % 60).toString().padStart(2, "0");
    minutes.textContent = mins;
    seconds.textContent = secs;
}

function resetTimerColors() {
    cards.forEach(card => {
        card.style.backgroundColor = '#ffffff';
        card.style.color = '#000000';
    });
}

function setWarningColors() {
    cards.forEach(card => {
        card.style.backgroundColor = '#ff0000b8';
        card.style.color = '#ffffff';
    });
}

function startTimer() {
    if (state === TimerState.RUNNING || state === TimerState.BREAK) return;
    
    if (state === TimerState.PAUSED) {
        // Resume from paused state
        state = TimerState.RUNNING;
    } else {
        // Start fresh timer
        state = TimerState.RUNNING;
        leftTime = finalleftTime;
    }
    
    activity.textContent = "Work";
    activity.style.color = 'green';
    
    clearInterval(interval);
    interval = setInterval(() => {
        leftTime--;
        updateDisplay();
        
        if (leftTime <= 180) { // 3 minutes warning
            setWarningColors();
        }
        
        if (leftTime <= 0) {
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
    restTime = 300; // 5 minutes break
    
    clearInterval(restInterval);
    restInterval = setInterval(() => {
        restTime--;
        updateBreakDisplay();
        
        if (restTime <= 60) { // 1 minute warning
            setWarningColors();
        }
        
        if (restTime <= 0) {
            clearInterval(restInterval);
            breakSound.play();
            resetTimer();
        }
    }, 1000);
}

function stopTimer() {
    if (state === TimerState.STOPPED || state === TimerState.BREAK) return;
    
    clearInterval(interval);
    state = TimerState.PAUSED;
    activity.textContent = "Paused";
    activity.style.color = 'orange';
}

function resetTimer() {
    clearInterval(interval);
    clearInterval(restInterval);
    
    state = TimerState.STOPPED;
    leftTime = finalleftTime;
    updateDisplay();
    resetTimerColors();
    
    activity.textContent = "---";
    activity.style.color = 'white';
}

// Event listeners
start.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
reset.addEventListener('click', resetTimer);

// Initialize
updateDisplay();
