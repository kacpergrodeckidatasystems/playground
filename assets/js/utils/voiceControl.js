// assets/js/utils/voiceControl.js - Kontrola głosem na żądanie (brak ciągłego nasłuchu)
let recognition = null;
let isListening = false;

export function initVoiceAssistant(navigate, appState, getCurrentContext) {
  // Sprawdzenie wsparcia przeglądarki dla mowy
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.log("Przeglądarka nie wspiera rozpoznawania mowy.");
    return;
  }

  // Tworzenie pływającego przycisku mikrofonu w rogu ekranu
  if (!document.getElementById('voiceMicBtn')) {
    const micBtn = document.createElement('button');
    micBtn.id = 'voiceMicBtn';
    micBtn.innerHTML = '🎤';
    micBtn.title = 'Włącz asystenta głosowego';
    micBtn.style.cssText = `
      position: fixed; bottom: 20px; left: 20px; width: 56px; height: 56px;
      background: #0284c7; color: white; border: none; border-radius: 50%;
      font-size: 1.6rem; cursor: pointer; z-index: 9999;
      box-shadow: 0 6px 20px rgba(0,0,0,0.3); display: flex;
      align-items: center; justify-content: center; transition: all 0.2s;
    `;
    document.body.appendChild(micBtn);

    micBtn.addEventListener('click', () => {
      if (isListening) {
        stopVoiceAssistant();
        micBtn.style.background = '#0284c7';
        micBtn.innerHTML = '🎤';
      } else {
        startVoiceAssistant(navigate, appState, getCurrentContext);
        micBtn.style.background = '#dc2626'; // czerwony = nagrywanie
        micBtn.innerHTML = '🔴';
      }
    });
  }
}

function startVoiceAssistant(navigate, appState, getCurrentContext) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;

  recognition = new SpeechRecognition();
  recognition.lang = 'pl-PL';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    isListening = true;
    speakText("Słucham...");
  };

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    console.WykrytaKomenda ? null : console.log("Usłyszano:", command);
    processVoiceCommand(command, navigate, appState, getCurrentContext);
  };

  recognition.onerror = (event) => {
    console.error("Błąd rozpoznawania mowy:", event.error);
    stopVoiceAssistant();
    resetMicButton();
  };

  recognition.onend = () => {
    stopVoiceAssistant();
    resetMicButton();
  };

  try {
    recognition.start();
  } catch (e) {
    console.error(e);
  }
}

function stopVoiceAssistant() {
  if (recognition) {
    try { recognition.stop(); } catch(e) {}
    recognition = null;
  }
  isListening = false;
}

function resetMicButton() {
  const micBtn = document.getElementById('voiceMicBtn');
  if (micBtn) {
    micBtn.style.background = '#0284c7';
    micBtn.innerHTML = '🎤';
  }
}

export function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL';
    window.speechSynthesis.speak(utterance);
  }
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function processVoiceCommand(cmd, navigate, appState, getCurrentContext) {
  if (cmd.includes('mapa') || cmd.includes('wróć')) {
    navigate('map');
  } else if (cmd.includes('kuźnia') || cmd.includes('kuj')) {
    navigate('forge');
  } else if (cmd.includes('targ') || cmd.includes('sklep')) {
    navigate('market');
  } else if (cmd.includes('zamek')) {
    navigate('castle');
  } else if (cmd.includes('profil') || cmd.includes('postać')) {
    navigate('profile');
  } else {
    speakText("Nie zrozumiałem polecenia.");
  }
}