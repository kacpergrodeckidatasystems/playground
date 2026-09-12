// Kangoo: Motion Sensors & Exercise Detection Logic with Live Debug

let lastCheck = 0;
let jumpCooldown = 0;
let slashCooldown = 0;
let squatState = 'up';
let squatCooldown = 0;
let activeListener = null;

export function initSensors(expectedStepId, onMovementDetected) {
  stopSensors();

  if (window.DeviceMotionEvent) {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            startListening(expectedStepId, onMovementDetected);
          } else {
            if (window.showAppError) window.showAppError("Brak zgody użytkownika na dostęp do czujników ruchu (iOS).");
          }
        })
        .catch(err => {
          if (window.showAppError) window.showAppError("Błąd uprawnień sensorów: " + err.message);
        });
    } else {
      startListening(expectedStepId, onMovementDetected);
    }
  } else {
    if (window.showAppError) window.showAppError("Błąd: DeviceMotionEvent nie jest wspierany.");
  }
}

function updateSensorDebug(acc) {
  const consoleEl = document.getElementById('error-console');
  const contentEl = document.getElementById('error-logs-content');
  if (consoleEl && contentEl) {
    consoleEl.style.display = 'block';
    let liveLog = document.getElementById('sensor-live-data');
    if (!liveLog) {
      liveLog = document.createElement('div');
      liveLog.id = 'sensor-live-data';
      liveLog.style.color = '#ffeb3b';
      contentEl.prepend(liveLog);
    }
    const x = acc.x ? acc.x.toFixed(1) : '0';
    const y = acc.y ? acc.y.toFixed(1) : '0';
    const z = acc.z ? acc.z.toFixed(1) : '0';
    liveLog.innerHTML = `📡 [Żywe odczyty czujników] X: ${x} | Y: ${y} | Z: ${z}<br>`;
  }
}

function startListening(expectedStepId, callback) {
  activeListener = (event) => {
    const acc = event.accelerationIncludingGravity || event.acceleration;
    const rot = event.rotationRate;

    if (!acc) return;

    updateSensorDebug(acc);

    const now = Date.now();
    if (now - lastCheck < 80) return;
    lastCheck = now;

    const detected = analyzeMovement(acc, rot, expectedStepId);
    if (detected) {
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
      callback(detected);
    }
  };

  window.addEventListener('devicemotion', activeListener);
}

export function stopSensors() {
  if (activeListener) {
    window.removeEventListener('devicemotion', activeListener);
    activeListener = null;
  }
}

function analyzeMovement(acc, rot, stepId) {
  const now = Date.now();

  if (stepId === 'swings-jump' || stepId === 'cave-approach' || stepId === 'deep-bend') {
    const verticalAcc = Math.abs(acc.z || acc.y || 0);
    if (verticalAcc > 13.5 && now > jumpCooldown) {
      jumpCooldown = now + 600;
      return true;
    }
  }

  if (rot && (stepId === 'slide-slash' || stepId === 'dragon-roar' || stepId === 'bridge-stretch')) {
    const rotationSpeed = Math.abs(rot.alpha || 0) + Math.abs(rot.beta || 0) + Math.abs(rot.gamma || 0);
    if (rotationSpeed > 280 && now > slashCooldown) {
      slashCooldown = now + 500;
      return true;
    }
  }

  if (stepId === 'bench-squat' || stepId === 'split-pose') {
    const forwardAcc = acc.y || acc.x || 0;
    if (forwardAcc < 3.5 && squatState === 'up' && now > squatCooldown) {
      squatState = 'down';
    } else if (forwardAcc > 8.5 && squatState === 'down') {
      squatState = 'up';
      squatCooldown = now + 700;
      return true;
    }
  }

  return false;
}