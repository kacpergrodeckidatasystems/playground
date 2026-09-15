// Kangoo: Pure Map Module
import { isMobileDevice, stopSpeech } from '../utils/audio.js';
import { stopSensors } from '../utils/sensors.js';
import { speakText } from '../utils/voiceControl.js';

// Wewnątrz funkcji renderMap (np. raz po otwarciu mapy):
setTimeout(() => {
  speakText("Którą lokację wybierasz?");
}, 600);

export function renderMap(container, navigate, appState) {
  stopSensors(); stopSpeech();
  const user = appState?.currentUser || { name: 'Gracz', resources: { drewno: 0, skora: 0, kamien: 0, zboze: 0, ryba: 0 }, inventory: {} };

  container.innerHTML = `
    <div class="map-container fade-in" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 100; background: url('assets/images/start.png?v=3') no-repeat center center; background-size: 100% 100%;">
      
      <!-- Górny panel stanu z klikalnym awatarem -->
      <div style="position: absolute; top: 15px; left: 15px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(5px); padding: 0.5rem 0.9rem; border-radius: 12px; display: flex; align-items: center; gap: 0.8rem; z-index: 110; border: 1px solid rgba(0,0,0,0.15);">
        <button id="profileBtn" style="background: #e0f2fe; border: 2px solid #0284c7; border-radius: 50%; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; cursor: pointer; transition: transform 0.2s;" title="Karta Postaci">
          🛡️
        </button>
        <div>
          <span style="font-weight: bold; color: var(--color-primary); font-size: 0.85rem; display: block; line-height: 1.1;">${user.name}</span>
          <span style="font-size: 1.1rem;" title="Zasoby">🪵${user.resources.drewno} | 🪨${user.resources.kamien} | 🐟${user.resources.ryba} | 🌾${user.resources.zboze} | 🦌${user.resources.skora}</span>
        </div>
        <button id="testerBtn" style="background: var(--color-accent); color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 8px; font-size: 0.75rem; font-weight: bold; cursor: pointer; margin-left: 0.4rem;">🧪 Tester</button>
        <button id="adminBtn" style="background: #34495e; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 8px; font-size: 0.75rem; font-weight: bold; cursor: pointer; margin-left: 0.2rem;">🛠️ Admin</button>
        <button id="logoutBtn" style="background: none; border: none; color: #c62828; font-size: 0.7rem; font-weight: bold; cursor: pointer; margin-left: 0.3rem;">[Wyloguj]</button>
      </div>

      <!-- Kafel fabularny: Zagrożenie -->
      <div style="position: absolute; top: 15px; right: 15px; background: rgba(254, 226, 226, 0.95); border: 2px solid #ef4444; padding: 0.5rem 0.9rem; border-radius: 12px; z-index: 110; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2);" id="bossCardBtn">
        <span style="font-size: 0.8rem; font-weight: bold; color: #991b1b; display: block;">⚔️ Zagrożenie: Leśny Zbir</span>
        <span style="font-size: 0.65rem; color: #7f1d1d;">Kliknij, aby stoczyć bitwę!</span>
      </div>

      <button id="btnMountains" class="map-hotspot" style="top: 22%; left: 24%; transform: translate(-50%, -50%);"><span class="hotspot-icon">⛰️</span><span class="hotspot-label">Góry</span></button>
      <button id="btnForest" class="map-hotspot" style="top: 40%; left: 8%; transform: translate(-50%, -50%);"><span class="hotspot-icon">🌲</span><span class="hotspot-label">Las</span></button>
      <button id="btnCastle" class="map-hotspot" style="top: 45%; left: 51%; transform: translate(-50%, -50%);"><span class="hotspot-icon">🏰</span><span class="hotspot-label">Zamek Królewski</span></button>
      <button id="btnRiver" class="map-hotspot" style="top: 60%; left: 32%; transform: translate(-50%, -50%);"><span class="hotspot-icon">🌊</span><span class="hotspot-label">Rzeka</span></button>
      <button id="btnField" class="map-hotspot" style="top: 80%; left: 25%; transform: translate(-50%, -50%);"><span class="hotspot-icon">🌾</span><span class="hotspot-label">Pole</span></button>
      
      <button id="btnMarket" class="map-hotspot" style="top: 75%; left: 70%; transform: translate(-50%, -50%);"><span class="hotspot-icon">🛒</span><span class="hotspot-label">Targ</span></button>
      <button id="btnForge" class="map-hotspot" style="top: 85%; left: 82%; transform: translate(-50%, -50%);"><span class="hotspot-icon">⚒️</span><span class="hotspot-label">Kuźnia</span></button>
    </div>
  `;

  if (!document.getElementById('mapStyles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'mapStyles';
    styleEl.innerHTML = `
      .map-hotspot { position: absolute; background: rgba(255, 255, 255, 0.92); border: 2px solid var(--color-primary); border-radius: 30px; padding: 0.4rem 0.9rem; display: flex; align-items: center; gap: 0.4rem; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.4); transition: all 0.2s ease; z-index: 105; }
      .map-hotspot:hover { transform: translate(-50%, -50%) scale(1.1) !important; background: #ffffff; box-shadow: 0 6px 16px rgba(0,0,0,0.5); border-color: var(--color-accent); }
      .hotspot-icon { font-size: 1.2rem; }
      .hotspot-label { font-weight: bold; font-size: 0.9rem; color: var(--color-primary); white-space: nowrap; }
      #profileBtn:hover { transform: scale(1.1); }
    `;
    document.head.appendChild(styleEl);
  }

  document.getElementById('logoutBtn').addEventListener('click', () => navigate('auth'));
  document.getElementById('testerBtn').addEventListener('click', () => navigate('tester'));
  document.getElementById('adminBtn').addEventListener('click', () => navigate('admin'));
  document.getElementById('profileBtn').addEventListener('click', () => navigate('profile'));
  document.getElementById('bossCardBtn').addEventListener('click', () => navigate('boss', { id: 'bandit' }));
  
  document.getElementById('btnMountains').addEventListener('click', () => navigate('location', { key: 'mountains', title: '⛰️ Wysokie Góry' }));
  document.getElementById('btnForest').addEventListener('click', () => navigate('location', { key: 'forest', title: '🌲 Mroczny Las' }));
  document.getElementById('btnRiver').addEventListener('click', () => navigate('location', { key: 'river', title: '🌊 Szybka Rzeka' }));
  document.getElementById('btnField').addEventListener('click', () => navigate('location', { key: 'field', title: '🌾 Pola Uprawne' }));
  
  document.getElementById('btnMarket').addEventListener('click', () => navigate('market'));
  document.getElementById('btnForge').addEventListener('click', () => navigate('forge'));
  document.getElementById('btnCastle').addEventListener('click', () => navigate('castle'));
}