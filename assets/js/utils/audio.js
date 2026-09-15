// Kangoo: Audio, Text-to-Speech & Device Detection Module

export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function speak(text, onComplete) {
  // Jeśli to komputer (Desktop), całkowicie blokujemy gadanie
  if (!isMobileDevice()) {
    if (onComplete) onComplete();
    return;
  }

  if (!('speechSynthesis' in window)) {
    if (onComplete) onComplete();
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pl-PL';
  utterance.pitch = 1.15;
  utterance.rate = 0.95;

  if (onComplete) {
    utterance.onend = () => {
      setTimeout(onComplete, 150);
    };
  }

  utterance.onerror = () => {
    if (onComplete) onComplete();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}