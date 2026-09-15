// Kangoo: PC Scenario Tester Module
import { scenarios } from '../data/scenarios/scenarios.js?v=5';
import { stopSensors } from '../utils/sensors.js?v=5';
import { stopSpeech } from '../utils/audio.js?v=5';

export function renderPcTester(container, navigate, appState) {
  stopSensors();
  stopSpeech();

  container.innerHTML = `
    <div class="fade-in" style="padding: 1.5rem; max-width: 700px; margin: 0 auto; min-height: 100vh; background: #fdfbf7; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h2 style="color: var(--color-primary); margin: 0;">🧪 Szybki Tester Misji (PC)</h2>
          <button id="backToMapBtn" class="big-button" style="background: #e0e0e0; color: #333; padding: 0.4rem 0.8rem; font-size: 0.8rem; width: auto; margin:0;">⬅ Powrót do mapy</button>
        </div>
        <p style="font-size: 0.85rem; color: #555; margin-bottom: 1.2rem;">Wybierz dowolną misję z bazy i przetestuj ją natychmiast na komputerze (użyj Spacji lub przycisku na ekranie).</p>

        <div style="display: flex; flex-direction: column; gap: 0.8rem; max-height: 65vh; overflow-y: auto; padding-right: 0.4rem;">
          ${scenarios.map(s => `
            <div class="test-scenario-card" data-id="${s.id}" style="background: white; border: 2px solid var(--color-primary); border-radius: 12px; padding: 0.9rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: all 0.2s;">
              <div>
                <span style="font-size: 0.75rem; background: #eee; padding: 0.2rem 0.5rem; border-radius: 6px; font-weight: bold; text-transform: uppercase; color: #555;">${s.location}</span>
                <h4 style="color: var(--color-primary); font-size: 0.95rem; margin: 0.3rem 0 0.1rem 0;">${s.title}</h4>
                <p style="font-size: 0.75rem; color: #666; margin: 0;">${s.description} | <strong style="color: var(--color-success);">${s.reward}</strong></p>
              </div>
              <button class="big-button" style="font-size: 0.8rem; padding: 0.5rem 1rem; width: auto; background: var(--color-accent); color: white;">Testuj 🚀</button>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-top: 1rem; text-align: center; font-size: 0.75rem; color: #888;">
        Wskazówka: W trakcie misji możesz naciskać <strong>SPACJĘ</strong> na klawiaturze, aby symulować ruch.
      </div>
    </div>
  `;

  document.getElementById('backToMapBtn').addEventListener('click', () => navigate('map'));

  document.querySelectorAll('.test-scenario-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const scenarioId = Number(e.currentTarget.getAttribute('data-id'));
      navigate('mission', { scenarioId: scenarioId, stepIndex: 0 });
    });
  });
}