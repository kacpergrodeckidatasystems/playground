// assets/js/profile.js - Karta Postaci i wizualny ekwipunek rycerza
export function renderProfile(container, navigate, appState) {
  const user = appState?.currentUser || {
    name: 'Gracz',
    title: 'Pachołek Grodu',
    resources: { drewno: 0, skora: 0, kamien: 0, zboze: 0, ryba: 0 },
    inventory: {}
  };

  const inv = user.inventory || {};

  // Sprawdzamy, jakie elementy ekwipunku są założone
  const hasHelmet = inv['helm'] || inv['helmet'] ? '🪖 Założony Hełm' : 'Brak hełmu';
  const hasWeapon = inv['miecz'] || inv['siekiera'] ? '⚔️ Oręż w ręku' : 'Brak oręża';
  const hasShield = inv['tarcza'] ? '🛡️ Założona Tarcza' : 'Brak tarczy';
  const hasArmor = inv['zbroja'] ? '✨ Pełna Zbroja Rycerska' : 'Zwykłe odzienie';

  container.innerHTML = `
    <div class="fade-in" style="padding: 1.5rem; max-width: 600px; margin: 0 auto; width: 100%; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; background: #fdfbf7; font-family: sans-serif;">
      <div>
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <h2 style="color: #2c3e50; margin-bottom: 0.2rem;">🛡️ Karta Postaci</h2>
          <p style="font-size: 0.85rem; color: #666;">Zarządzaj swoim bohaterem i sprawdzaj założony rynsztunek</p>
        </div>

        <!-- Wizualizacja awatara i założonego ekwipunku -->
        <div style="background: white; border: 2px solid #cbd5e1; border-radius: 16px; padding: 1.5rem; text-align: center; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <div style="position: relative; width: 120px; height: 120px; margin: 0 auto 1rem auto; background: #e0f2fe; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3.5rem; border: 3px solid #0284c7;">
             knight
            <!-- Ikony dynamicznie nakładane na awatar w zależności od ekwipunku -->
            <div style="position: absolute; top: -5px; right: -5px; font-size: 1.5rem;" title="${hasHelmet}">${inv['helm'] || inv['helmet'] ? '🪖' : ''}</div>
            <div style="position: absolute; bottom: 0; left: -10px; font-size: 1.5rem;" title="${hasShield}">${inv['tarcza'] ? '🛡️' : ''}</div>
            <div style="position: absolute; bottom: 0; right: -10px; font-size: 1.5rem;" title="${hasWeapon}">${inv['miecz'] || inv['siekiera'] ? '⚔️' : ''}</div>
          </div>

          <h3 style="margin: 0; color: #1e293b; font-size: 1.2rem;">${user.name}</h3>
          <p style="margin: 4px 0 12px 0; color: #0284c7; font-weight: bold; font-size: 0.9rem;">Tytuł: ${user.title || 'Pachołek'}</p>
          
          <div style="background: #f8fafc; padding: 10px; border-radius: 8px; font-size: 0.85rem; color: #475569; display: inline-block;">
            Stan pancerza: <strong>${inv['zbroja'] ? 'Pełna Zbroja (III Tier)' : (inv['tarcza'] ? 'Częściowy pancerz (II Tier)' : 'Podstawowe odzienie')}</strong>
          </div>
        </div>

        <!-- Slotowy podgląd rynsztunku -->
        <div style="background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 1.2rem; margin-bottom: 1.5rem;">
          <h4 style="margin-top: 0; color: #334155; border-bottom: 1px solid #eaeaea; padding-bottom: 8px;">🎒 Założony Ekwipunek i Narzędzia</h4>
          <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem; color: #334155;">
            <li style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between;">
              <span>🪖 Głowa (Hełm):</span> <strong>${hasHelmet}</strong>
            </li>
            <li style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between;">
              <span>⚔️ Ręka (Oręż / Broń):</span> <strong>${hasWeapon}</strong>
            </li>
            <li style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between;">
              <span>🛡️ Lewa Ręka (Tarcza):</span> <strong>${hasShield}</strong>
            </li>
            <li style="padding: 8px 0; display: flex; justify-content: space-between;">
              <span>✨ Korpus (Zbroja):</span> <strong>${hasArmor}</strong>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <button id="backToMap" class="big-button" style="background: #3498db; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; width: 100%;">⬅ Powrót do Mapy Świata</button>
      </div>
    </div>
  `;

  document.getElementById('backToMap').addEventListener('click', () => navigate('map'));
}