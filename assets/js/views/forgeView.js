// assets/js/views/forgeView.js - Magiczna Kuźnia z natychmiastową aktualizacją surowców i widoku
import { updateUserData } from '../data/profilesData.js';

export function renderForge(container, navigate, appState) {
  const user = appState.currentUser;
  
  const craftRecipes = JSON.parse(localStorage.getItem('kplay_craft_recipes')) || [
    { id: 'siekiera', name: 'Siekiera Drwala', icon: '🪓', cost: { drewno: 3, kamien: 1, ryba: 0, zboze: 0, skora: 0 } },
    { id: 'lina', name: 'Lina Wspinaczkowa', icon: '🪢', cost: { drewno: 1, kamien: 1, ryba: 0, zboze: 1, skora: 1 } },
    { id: 'mlot', name: 'Kowalski Młot', icon: '🔨', cost: { drewno: 1, kamien: 3, ryba: 3, zboze: 0, skora: 0 } },
    { id: 'miecz', name: 'Miecz Rycerski', icon: '🗡️', cost: { drewno: 3, kamien: 3, ryba: 0, zboze: 0, skora: 3 } },
    { id: 'helm', name: 'Żelazny Hełm', icon: '🪖', cost: { drewno: 3, kamien: 3, ryba: 3, zboze: 0, skora: 0 } },
    { id: 'tarcza', name: 'Drewniana Tarcza', icon: '🛡️', cost: { drewno: 3, kamien: 3, ryba: 0, zboze: 3, skora: 0 } },
    { id: 'zbroja', name: 'Pełna Zbroja', icon: '🛡️✨', cost: { drewno: 3, kamien: 3, ryba: 3, zboze: 3, skora: 3 } }
  ];

  const iconMap = { drewno: '🪵', kamien: '🪨', ryba: '🐟', zboze: '🌾', skora: '🦌' };

  container.innerHTML = `
    <div class="fade-in" style="padding: 1.2rem; max-width: 600px; margin: 0 auto; width: 100%; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; background: #fdfbf7; font-family: sans-serif;">
      <div>
        <h2 style="color: #1e293b; text-align: center; margin-bottom: 0.3rem;">⚒️ Magiczna Kuźnia</h2>
        <p style="text-align: center; font-size: 0.85rem; color: #666; margin-bottom: 1.2rem;">Wykuwaj narzędzia, oręż i elementy zbroi.</p>
        
        <!-- Powiększone ikony zasobów u góry -->
        <div style="background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 1rem; margin-bottom: 1.2rem; text-align: center;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.9rem; color: #334155;">Zasoby w kuźni:</h4>
          <p style="font-size: 1.5rem; color: #0f172a; margin: 0; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
            <span>🪵${user.resources.drewno}</span>
            <span>🪨${user.resources.kamien}</span>
            <span>🐟${user.resources.ryba}</span>
            <span>🌾${user.resources.zboze}</span>
            <span>🦌${user.resources.skora}</span>
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.8rem;" id="forge-items-container">
          ${craftRecipes.map(recipe => {
            const isOwned = user.inventory[recipe.id];
            
            // Sprawdzenie czy gracza stać na przedmiot
            let canAfford = true;
            for (let [res, amount] of Object.entries(recipe.cost)) {
              if ((user.resources[res] || 0) < amount) {
                canAfford = false;
                break;
              }
            }

            // Stylizacja tła i ramki (zielone / czerwone / neutralne dla posiadanych)
            let cardStyle = "";
            if (isOwned) {
              cardStyle = "background: #ffffff; border: 2px solid #cbd5e1; opacity: 0.85;";
            } else if (canAfford) {
              cardStyle = "background: rgba(34, 197, 94, 0.18); border: 2px solid #22c55e;"; // Zielone przejrzyste tło
            } else {
              cardStyle = "background: rgba(239, 68, 68, 0.18); border: 2px solid #ef4444;"; // Czerwone przejrzyste tło
            }

            // Ukrywanie kosztów surowców dla przedmiotów już wykutych
            let detailsHtml = '';
            if (!isOwned) {
              const costHtml = Object.entries(recipe.cost)
                .filter(([k, v]) => v > 0)
                .map(([k, v]) => `<span style="display: inline-flex; align-items: center; gap: 3px; margin-right: 10px; font-size: 1.1rem; font-weight: bold; color: #334155;"><span style="font-size: 1.3rem;">${iconMap[k]}</span>${v}</span>`)
                .join('');
              detailsHtml = `<div style="display: flex; align-items: center; flex-wrap: wrap; margin-top: 2px;"><span style="font-size: 0.8rem; color: #64748b; margin-right: 6px;">Koszt:</span> ${costHtml}</div>`;
            } else {
              detailsHtml = `<div style="font-size: 0.85rem; color: #16a34a; font-weight: bold; margin-top: 2px;">✅ Przedmiot wykuty</div>`;
            }

            return `
              <div style="${cardStyle} border-radius: 12px; padding: 0.8rem 1rem; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s;">
                <div style="display: flex; gap: 1rem; align-items: center;">
                  <span style="font-size: 2.2rem;">${recipe.icon}</span>
                  <div>
                    <h4 style="color: var(--color-primary); font-size: 1rem; margin: 0 0 4px 0;">${recipe.name}</h4>
                    ${detailsHtml}
                  </div>
                </div>
                ${!isOwned ? `<button data-craft-id="${recipe.id}" class="forge-btn big-button" style="font-size: 0.85rem; padding: 0.5rem 1rem; width: auto; background: ${canAfford ? '#16a34a' : '#94a3b8'}; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Kuj!</button>` : '<span style="color: #16a34a; font-weight: bold; font-size: 0.9rem; background: rgba(22, 163, 74, 0.1); padding: 0.3rem 0.6rem; border-radius: 6px;">Posiadane</span>'}
              </div>`;
          }).join('')}
        </div>
      </div>
      <div style="margin-top: 1.5rem;"><button id="backToMap" class="big-button" style="background: #e2e8f0; color: #333; font-weight: bold; border-radius: 8px; padding: 0.8rem; width: 100%; border: none; cursor: pointer;">⬅ Powrót do mapy świata</button></div>
    </div>
  `;

  document.getElementById('backToMap').addEventListener('click', () => navigate('map'));

  // Obsługa przycisków wykuwania
  document.querySelectorAll('.forge-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = e.currentTarget.getAttribute('data-craft-id');
      const recipe = craftRecipes.find(r => r.id === itemId);
      if (!recipe) return;

      let canAfford = true;
      for (let [res, amount] of Object.entries(recipe.cost)) {
        if ((user.resources[res] || 0) < amount) {
          canAfford = false;
          break;
        }
      }

      if (canAfford) {
        // Odjęcie surowców i oznaczenie przedmiotu jako posiadany
        for (let [res, amount] of Object.entries(recipe.cost)) {
          user.resources[res] -= amount;
        }
        user.inventory[itemId] = 1;

        // Natychmiastowy zapis stanu do localStorage oraz bazy danych
        localStorage.setItem('kplay_current_user', JSON.stringify(user));
        if (typeof updateUserData === 'function') {
          updateUserData(user);
        }

        // Natychmiastowe ponowne wyrenderowanie widoku bez przeładowywania strony
        renderForge(container, navigate, appState);
      } else {
        alert('Za mało surowców, aby wykuć ten przedmiot!');
      }
    });
  });
}