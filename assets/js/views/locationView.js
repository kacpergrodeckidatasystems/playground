// Kangoo: Location Challenge Module
import { scenarios } from '../data/scenarios/scenarios.js';
import { speakText } from '../utils/voiceControl.js';

// Wewnątrz funkcji renderLocation:
setTimeout(() => {
  speakText("Co robimy w tej lokacji? Wybierz wyzwanie lub powiedz wróć.");
}, 600);

export function renderLocation(container, navigate, appState, locationKey, locationTitle) {
  const user = appState.currentUser;
  const locScenarios = scenarios.filter(s => s.location === locationKey);

  container.innerHTML = `
    <div class="fade-in" style="padding: 1.2rem; max-width: 600px; margin: 0 auto; width: 100%; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; background: #fdfbf7;">
      <div>
        <h2 style="color: var(--color-primary); text-align: center; margin-bottom: 0.5rem;">${locationTitle}</h2>
        <p style="text-align: center; font-size: 0.85rem; color: #666; margin-bottom: 1.2rem;">Wybierz wyzwanie terenowe i zdobądź surowce!</p>
        <div class="scenarios-grid" style="display: flex; flex-direction: column; gap: 0.8rem;">
          ${locScenarios.map(s => {
            const isLocked = s.requiredItem && !user.inventory[s.requiredItem];
            return `
            <div class="scenario-card" data-id="${s.id}" style="${isLocked ? 'opacity: 0.6; border-style: dashed;' : ''}">
              <div class="scenario-icon">🏰</div>
              <div style="flex: 1;">
                <div class="scenario-title" style="font-size: 0.95rem;">${s.title}</div>
                <div style="font-size: 0.75rem; color: ${isLocked ? '#c62828' : '#555'};">${isLocked ? `🔒 Wymaga narzędzia: <strong>${s.requiredItem}</strong>` : s.description}</div>
                <div style="font-size: 0.7rem; color: var(--color-success); font-weight: bold; margin-top: 0.2rem;">Nagroda: ${s.reward}</div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div style="margin-top: 1.5rem;"><button id="backToMap" class="big-button" style="background: #e0e0e0; color: #333;">⬅ Powrót do mapy świata</button></div>
    </div>
  `;

  document.getElementById('backToMap').addEventListener('click', () => navigate('map'));
  document.querySelectorAll('.scenario-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const scenarioId = Number(e.currentTarget.getAttribute('data-id'));
      const chosen = scenarios.find(s => s.id === scenarioId);
      if (chosen.requiredItem && !user.inventory[chosen.requiredItem]) {
        alert(`Musisz najpierw wykuć przedmiot "${chosen.requiredItem}" w Kuźni!`);
        return;
      }
      navigate('mission', { scenarioId: scenarioId, stepIndex: 0 });
    });
  });
}