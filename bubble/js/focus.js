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

function saveSession(goal, seconds) {
  fetch('save_session.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `goal=${encodeURIComponent(goal)}&seconds=${seconds}`
  });
}

// Call this when timer ends
function notifyEnd() {
  alert("Time's up! Take a break.");
  // Example: send completed session to PHP
  let goalName = "Default Goal"; // Replace with selected goal if implemented
  saveSession(goalName, totalSeconds);
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
