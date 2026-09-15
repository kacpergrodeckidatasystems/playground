// assets/js/voiceControl.js - Asystent głosowy (działa WYŁĄCZNIE na telefonie komórkowym)
import { isMobileDevice } from './audio.js';

// Funkcja lektora (mówi tylko na komórce)
export function speakText(text, callback) {
  if (!isMobileDevice()) return; // Ignoruj na desktopie
  if (!('speechSynthesis' in window)) return;
  
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pl-PL';
  utterance.rate = 0.95;
  utterance.pitch = 1.1;
  
  if (callback) {
    utterance.onend = callback;
  }
  window.speechSynthesis.speak(utterance);
}

// Inicjowanie nasłuchu mowy (tylko na komórce)
export function initVoiceAssistant(navigate, appState, getCurrentContext) {
  // KLUCZOWY WARUNEK: Jeśli to nie jest urządzenie mobilne, wychodzimy od razu!
  if (!isMobileDevice()) {
    console.log("🖥️ Tryb desktopowy: asystent głosowy jest wyłączony.");
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn("Przeglądarka mobilna nie obsługuje rozpoznawania mowy.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'pl-PL';
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
    console.log("🗣️ Usłyszano komendę (mobilnie):", transcript);

    const context = getCurrentContext ? getCurrentContext() : 'map';

    // 1. Komendy na mapie głównej
    if (context === 'map') {
      if (transcript.includes('góry') || transcript.includes('gora')) {
        speakText("Wchodzimy w wysokie góry!", () => navigate('location', { key: 'mountains', title: '⛰️ Wysokie Góry' }));
      } 
      else if (transcript.includes('las') || transcript.includes('mroczny las')) {
        speakText("Wchodzimy do mrocznego lasu.", () => navigate('location', { key: 'forest', title: '🌲 Mroczny Las' }));
      } 
      else if (transcript.includes('rzeka') || transcript.includes('szybka rzeka')) {
        speakText("Idziemy nad szybką rzekę.", () => navigate('location', { key: 'river', title: '🌊 Szybka Rzeka' }));
      } 
      else if (transcript.includes('pole') || transcript.includes('pola')) {
        speakText("Wkraczamy na pola uprawne.", () => navigate('location', { key: 'field', title: '🌾 Pola Uprawne' }));
      } 
      else if (transcript.includes('targ')) {
        speakText("Odwiedzamy targ królestwa.", () => navigate('market'));
      } 
      else if (transcript.includes('kuźnia') || transcript.includes('kuznia')) {
        speakText("Wchodzimy do magicznej kuźni.", () => navigate('forge'));
      } 
      else if (transcript.includes('zamek')) {
        speakText("Wchodzimy do zamku królewskiego.", () => navigate('castle'));
      } 
      else if (transcript.includes('profil') || transcript.includes('postać') || transcript.includes('rycerz')) {
        speakText("Otwieram kartę postaci.", () => navigate('profile'));
      } 
      else {
        speakText("Nie zrozumiałem. Powtórz: góry, las, targ lub zamek.");
      }
    } 
    // 2. Komendy wewnątrz lokacji
    else if (context === 'location') {
      if (transcript.includes('wróć') || transcript.includes('mapa') || transcript.includes('cofnij')) {
        speakText("Wracamy na mapę główną. Którą lokację wybierasz?", () => navigate('map'));
      } 
      else {
        speakText("Powiedz: wróc na mapę.");
      }
    }
  };

  recognition.onerror = (event) => {
    console.error("Błąd mowy:", event.error);
  };

  recognition.onend = () => {
    try { recognition.start(); } catch (e) {}
  };

  try {
    recognition.start();
    console.log("📱 Mobilny asystent głosowy i lektor aktywny.");
  } catch (e) {
    console.error("Nie udało się uruchomić mikrofonu:", e);
  }

  return recognition;
}