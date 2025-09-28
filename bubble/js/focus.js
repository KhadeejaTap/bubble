let timer;
let totalSeconds = 0;
let remainingSeconds = 0;
let running = false;

const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const minutesInput = document.getElementById('minutes');

function updateDisplay(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${m}:${s}`;
}

function tick() {
  if (remainingSeconds > 0) {
    remainingSeconds--;
    updateDisplay(remainingSeconds);
  } else {
    clearInterval(timer);
    running = false;
    updateDisplay(0);
    if (Notification.permission === "granted") {
      new Notification("Focus Bubble", { body: "Time's up! Take a break." });
    } else {
      alert("Time's up! Take a break.");
    }
  }
}

function saveSession(secondsWorked) {
    const today = new Date().toISOString().split('T')[0]; // current date
    fetch('../php/focus.php', {      // adjust path if needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            date: today,
            seconds: secondsWorked    // use the argument!
        })
    })
    .then(res => res.json())          // if you also change focus.php to return JSON
    .then(data => console.log('Saved:', data))
    .catch(err => console.error('Save error:', err));
}

// Call this when timer ends
function notifyEnd() {
  alert("Time's up! Take a break.");
  // Example: send completed session to PHP
  let goalName = "Default Goal"; // Replace with selected goal if implemented
  saveSession(totalSeconds);
}

startBtn.addEventListener('click', () => {
  if (!running) {
    let mins = parseInt(minutesInput.value);
    if (!remainingSeconds) remainingSeconds = mins * 60;
    totalSeconds = remainingSeconds;
    updateDisplay(remainingSeconds);
    timer = setInterval(tick, 1000);
    running = true;
  }
});

pauseBtn.addEventListener('click', () => {
  clearInterval(timer);
  running = false;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  remainingSeconds = totalSeconds;
  updateDisplay(remainingSeconds || 0);
  running = false;
});

// Request notification permission
if ("Notification" in window) {
  Notification.requestPermission();
}

updateDisplay(0);
