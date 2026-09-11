// TTS and sound effects using Web Speech API for Kangoo
export function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}
