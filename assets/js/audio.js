// Kangoo: Audio & Text-to-Speech Module (Lektor dla dziecka)

export function speak(text, onComplete) {
  if (!('speechSynthesis' in window)) {
    console.warn("Synteza mowy nie jest wspierana w tej przeglądarce.");
    if (onComplete) onComplete();
    return;
  }

  // Przerywamy poprzednią wypowiedź, żeby komunikaty się nie nakładały
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pl-PL'; // Język polski
  utterance.pitch = 1.15;   // Lekko wyższy, bardziej przyjazny ton głosu
  utterance.rate = 0.95;    // Delikatnie wolniejsze tempo, idealne dla dzieci

  if (onComplete) {
    utterance.onend = () => {
      // Małe opóźnienie dla stabilności
      setTimeout(onComplete, 150);
    };
  }

  utterance.onerror = (err) => {
    console.error("Błąd syntezy mowy:", err);
    if (onComplete) onComplete();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}