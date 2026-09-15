// Kangoo: Motion Sensors (Aktywne tylko na telefonie)

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

let lastCheck = 0;
let jumpCooldown = 0;
let slashCooldown = 0;
let squatState = 'up';
let squatCooldown = 0;
let activeListener = null;

export function initSensors(expectedStepId, onMovementDetected) {
  stopSensors();

  // Jeśli to komputer (Desktop), nie uruchamiamy sensorów w ogóle
  if (!isMobileDevice()) {
    return;
  }

  if (window.DeviceMotionEvent) {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission().then(response => {
        if (response === 'granted') {
          startListening(expectedStepId, onMovementDetected);
        }
      }).catch(() => {});
    } else {
      startListening(expectedStepId, onMovementDetected);
    }
  }
}

function startListening(expectedStepId, callback) {
  activeListener = (event) => {
    const acc = event.accelerationIncludingGravity || event.acceleration;
    const rot = event.rotationRate;
    if (!acc) return;

    const now = Date.now();
    if (now - lastCheck < 80) return;
    lastCheck = now;

    const detected = analyzeMovement(acc, rot, expectedStepId);
    if (detected) {
      if (navigator.vibrate) navigator.vibrate(100);
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
  if (stepId === 'swings-jump' || stepId === 'cave-approach') {
    const verticalAcc = Math.abs(acc.z || acc.y || 0);
    if (verticalAcc > 13.5 && now > jumpCooldown) {
      jumpCooldown = now + 600;
      return true;
    }
  }
  if (rot && (stepId === 'slide-slash' || stepId === 'dragon-roar')) {
    const rotSpeed = Math.abs(rot.alpha || 0) + Math.abs(rot.beta || 0) + Math.abs(rot.gamma || 0);
    if (rotSpeed > 280 && now > slashCooldown) {
      slashCooldown = now + 500;
      return true;
    }
  }
  if (stepId === 'bench-squat') {
    const fwd = acc.y || acc.x || 0;
    if (fwd < 3.5 && squatState === 'up') squatState = 'down';
    else if (fwd > 8.5 && squatState === 'down') {
      squatState = 'up';
      squatCooldown = now + 700;
      return true;
    }
  }
  return false;
}