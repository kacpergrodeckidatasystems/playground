// Kangoo: Pure Map Module with Riding Knight
import { isMobileDevice, stopSpeech } from '../utils/audio.js';
import { stopSensors } from '../utils/sensors.js';
import { speakText } from '../utils/voiceControl.js';

setTimeout(() => {
  speakText("Którą lokację wybierasz?");
}, 600);

export function renderMap(container, navigate, appState) {
  stopSensors(); stopSpeech();
  const user = appState?.currentUser || { name: 'Gracz', resources: { drewno: 0, skora: 0, kamien: 0, zboze: 0, ryba: 0 }, inventory: {} };

  // Pobieranie zapamiętanej pozycji rycerza lub domyślnie koło Zamku (51%, 45%)
  let knightPos = JSON.parse(localStorage.getItem('kplay_knight_pos')) || { x: 51, y: 45 };

  container.innerHTML = `
    <div id="mapContainer" class="map-container fade-in" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 100; background: url('assets/images/start.png?v=3') no-repeat center center; background-size: 100% 100%; cursor: crosshair;">
      
      <!-- Górny panel stanu z klikalnym awatarem -->
      <div style="position: absolute; top: 15px; left: 15px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(5px); padding: 0.5rem 0.9rem; border-radius: 12px; display: flex; align-items: center; gap: 0.8rem; z-index: 110; border: 1px solid rgba(0,0,0,0.15); cursor: default;">
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

      <!-- Chodzący Rycerz na koniu -->
      <div id="knightAvatar" style="position: absolute; left: ${knightPos.x}%; top: ${knightPos.y}%; transform: translate(-50%, -50%); transition: left 0.8s ease-in-out, top 0.8s ease-in-out; z-index: 108; pointer-events: none; text-align: center;">
        <div style="font-size: 2.8rem; filter: drop-shadow(0 6px 8px rgba(0,0,0,0.4)); animation: bounceKnight 0.8s infinite alternate;">🏇</div>
        <div style="background: rgba(15, 23, 42, 0.85); color: white; padding: 1px 6px; border-radius: 8px; font-size: 0.65rem; font-weight: bold; white-space: nowrap; margin-top: -4px; border: 1px solid rgba(255,255,255,0.3);">${user.name}</div>
      </div>

      <!-- Hotspoty lokacji -->
      <button id="btnMountains" class="map-hotspot" data-x="24" data-y="22" style="top: 22%; left: 24%; transform: translate(-50%, -50%);"><span class="hotspot-icon">⛰️</span><span class="hotspot-label">Góry</span></button>
      <button id="btnForest" class="map-hotspot" data-x="8" data-y="40" style="top: 40%; left: 8%; transform: translate(-50%, -50%);"><span class="hotspot-icon">🌲</span><span class="hotspot-label">Las</span></button>
      <button id="btnCastle" class="map-hotspot" data-x="51" data-y="45" style="top: 45%; left: 51%; transform: translate(-50%, -50%);"><span class="hotspot-icon">🏰</span><span class="hotspot-label">Zamek Królewski</span></button>
      <button id="btnRiver" class="map-hotspot" data-x="32" data-y="60" style="top: 60%; left: 32%; transform: translate(-50%, -50%);"><span class="hotspot-icon">🌊</span><span class="hotspot-label">Rzeka</span></button>
      <button id="btnField" class="map-hotspot" data-x="25" data-y="80" style="top: 80%; left: 25%; transform: translate(-50%, -50%);"><span class="hotspot-icon">🌾</span><span class="hotspot-label">Pole</span></button>
      
      <button id="btnMarket" class="map-hotspot" data-x="70" data-y="75" style="top: 75%; left: 70%; transform: translate(-50%, -50%);"><span class="hotspot-icon">🛒</span><span class="hotspot-label">Targ</span></button>
      <button id="btnForge" class="map-hotspot" data-x="82" data-y="85" style="top: 85%; left: 82%; transform: translate(-50%, -50%);"><span class="hotspot-icon">⚒️</span><span class="hotspot-label">Kuźnia</span></button>
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
      @keyframes bounceKnight {
        from { transform: translate(-50%, -50%) translateY(0); }
        to { transform: translate(-50%, -50%) translateY(-5px); }
      }
    `;
    document.head.appendChild(styleEl);
  }

  // Funkcja animująca ruch rycerza na wskazane współrzędne procentowe
  function moveKnightTo(x, y, onArrival = null) {
    const knight = document.getElementById('knightAvatar');
    if (knight) {
      knight.style.left = `${x}%`;
      knight.style.top = `${y}%`;
    }
    knightPos = { x, y };
    localStorage.setItem('kplay_knight_pos', JSON.stringify(knightPos));

    if (onArrival) {
      setTimeout(onArrival, 800); // czeka aż animacja jazdy dobiegnie końca (0.8s)
    }
  }

  // Kliknięcie w dowolne miejsce na mapie powoduje, że rycerz tam jedzie
  document.getElementById('mapContainer').addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('#bossCardBtn')) return; // jeśli kliknięto przycisk, ignorujemy zwykły ruch
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    moveKnightTo(x, y);
  });

  // Obsługa przycisków nawigacyjnych systemu
  document.getElementById('logoutBtn').addEventListener('click', () => navigate('auth'));
  document.getElementById('testerBtn').addEventListener('click', () => navigate('tester'));
  document.getElementById('adminBtn').addEventListener('click', () => navigate('admin'));
  document.getElementById('profileBtn').addEventListener('click', () => navigate('profile'));
  document.getElementById('bossCardBtn').addEventListener('click', () => navigate('boss', { id: 'bandit' }));

  // Konfiguracja lokacji: po kliknięciu rycerz najpierw jedzie na miejsce, a potem otwiera widok
  const locations = [
    { id: 'btnMountains', x: 24, y: 22, route: 'location', params: { key: 'mountains', title: '⛰️ Wysokie Góry' } },
    { id: 'btnForest', x: 8, y: 40, route: 'location', params: { key: 'forest', title: '🌲 Mroczny Las' } },
    { id: 'btnRiver', x: 32, y: 60, route: 'location', params: { key: 'river', title: '🌊 Szybka Rzeka' } },
    { id: 'btnField', x: 25, y: 80, route: 'location', params: { key: 'field', title: '🌾 Pola Uprawne' } },
    { id: 'btnMarket', x: 70, y: 75, route: 'market', params: {} },
    { id: 'btnForge', x: 82, y: 85, route: 'forge', params: {} },
    { id: 'btnCastle', x: 51, y: 45, route: 'castle', params: {} }
  ];

  locations.forEach(loc => {
    const btn = document.getElementById(loc.id);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // zapobiega podwójnemu wywołaniu kliknięcia mapy
        // Rycerz jedzie pod ikonę lokacji, a po dojechaniu otwiera widok
        moveKnightTo(loc.x, loc.y, () => {
          navigate(loc.route, loc.params);
        });
      });
    }
  });
}