let startTime;
let running = false;
let laps = [];

function startStopwatch() {
  if (!running) {
    startTime = Date.now() - (laps.length > 0 ? laps[laps.length - 1].time : 0);
    running = true;
    updateStopwatch();
  }
}

function pauseStopwatch() {
  if (running) {
    running = false;
    updateLapList();
  }
}

function resetStopwatch() {
  if (!running) {
    startTime = undefined;
    laps = [];
    updateStopwatch();
    updateLapList();
  }
}

function lap() {
  if (running) {
    laps.push({ lap: laps.length + 1, time: Date.now() - startTime });
    updateLapList();
  }
}

function updateStopwatch() {
  const display = document.getElementById('display');
  if (running) {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    display.textContent = formattedTime;
    requestAnimationFrame(updateStopwatch);
  } else {
    display.textContent = '00:00:00';
  }
}

function updateLapList() {
  const lapList = document.getElementById('lapList');
  lapList.innerHTML = '';
  laps.forEach((lap) => {
    const li = document.createElement('li');
    li.textContent = `Lap ${lap.lap}: ${formatTime(lap.time)}`;
    lapList.appendChild(li);
  });
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millis = Math.floor((milliseconds % 1000) / 10);

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(millis).padStart(2, '0')}`;
}
