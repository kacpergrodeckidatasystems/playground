// Kangoo: Market Resource Trading Module
import { updateUserData } from '../data/profilesData.js';

export function renderMarket(container, navigate, appState) {
  const user = appState.currentUser;
  
  container.innerHTML = `
    <div class="fade-in" style="padding: 1.2rem; max-width: 600px; margin: 0 auto; width: 100%; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; background: #fdfbf7;">
      <div>
        <h2 style="color: #b45309; text-align: center; margin-bottom: 0.3rem;">🛒 Targ Królestwa</h2>
        <p style="text-align: center; font-size: 0.85rem; color: #666; margin-bottom: 1.2rem;">Wymieniaj zgromadzone surowce z handlarzami.</p>
        
        <div style="background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 1rem; margin-bottom: 1.2rem; text-align: center;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.9rem; color: #334155;">Posiadane zasoby:</h4>
          <p style="font-size: 1.4rem; color: #0f172a; margin: 0;">🪵${user.resources.drewno} | 🪨${user.resources.kamien} | 🐟${user.resources.ryba} | 🌾${user.resources.zboze} | 🦌${user.resources.skora}</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.8rem;">
          <div style="background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
            <div><strong>Wymień 3 🌾 na 1 🪵</strong></div>
            <button id="trade-z-d" class="big-button" style="font-size: 0.8rem; padding: 0.4rem 0.8rem; width: auto; background: #d97706;">Wymień</button>
          </div>
          <div style="background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
            <div><strong>Wymień 3 🪵 na 1 🪨</strong></div>
            <button id="trade-d-k" class="big-button" style="font-size: 0.8rem; padding: 0.4rem 0.8rem; width: auto; background: #d97706;">Wymień</button>
          </div>
          <div style="background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
            <div><strong>Wymień 3 🪨 na 1 🐟</strong></div>
            <button id="trade-k-r" class="big-button" style="font-size: 0.8rem; padding: 0.4rem 0.8rem; width: auto; background: #d97706;">Wymień</button>
          </div>
        </div>
      </div>
      <div style="margin-top: 1.5rem;"><button id="backToMap" class="big-button" style="background: #e0e0e0; color: #333;">⬅ Powrót do mapy świata</button></div>
    </div>
  `;

  document.getElementById('backToMap').addEventListener('click', () => navigate('map'));

  document.getElementById('trade-z-d').addEventListener('click', () => {
    if (user.resources.zboze >= 3) {
      user.resources.zboze -= 3;
      user.resources.drewno += 1;
      updateUserData(user);
      alert('Wymieniono pomyślnie!');
      navigate('market');
    } else { alert('Za mało zboża!'); }
  });

  document.getElementById('trade-d-k').addEventListener('click', () => {
    if (user.resources.drewno >= 3) {
      user.resources.drewno -= 3;
      user.resources.kamien += 1;
      updateUserData(user);
      alert('Wymieniono pomyślnie!');
      navigate('market');
    } else { alert('Za mało drewna!'); }
  });

  document.getElementById('trade-k-r').addEventListener('click', () => {
    if (user.resources.kamien >= 3) {
      user.resources.kamien -= 3;
      user.resources.ryba += 1;
      updateUserData(user);
      alert('Wymieniono pomyślnie!');
      navigate('market');
    } else { alert('Za mało kamienia!'); }
  });
}