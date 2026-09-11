// Kangoo: SPA State Management & View Logic with GIF & Sensor support
import { scenarios } from './data/scenarios.js';
import { initSensors, stopSensors } from './sensors.js';

export function initApp() {
  stopSensors();
  showLandingScreen();
}

function showLandingScreen() {
  stopSensors();
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="landing-screen fade-in" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 1.5rem; text-align: center;">
      <div style="margin-bottom: 1.5rem; height: 130px; display: flex; align-items: center; justify-content: center;">
        <img src="assets/gifs/bieg.gif" alt="Biegnący bohater" style="max-height: 120px; max-width: 100%; object-fit: contain;" onerror="this.src='assets/images/rycerz.jpg'" />
      </div>
      <h1 style="color: var(--color-primary); margin: 0.5rem 0;">KPlayground</h1>
      <p style="color: var(--color-text); margin-bottom: 2rem;">Aktywna gra ruchowa dla młodych rycerzy na placu zabaw!</p>
      <button id="startGameBtn" class="big-button">Zaczynamy grę!</button>
    </div>
  `;
  document.getElementById('startGameBtn').addEventListener('click', showSafetyScreen);
}

function showSafetyScreen() {
  stopSensors();
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="safety-screen fade-in" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 1.5rem; text-align: center;">
      <div style="font-size: 4rem; margin-bottom: 1rem;" class="animated-icon">⚠️</div>
      <h2 style="color: var(--color-primary); margin-bottom: 1rem;">Zasada Bezpieczeństwa</h2>
      <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 2rem; color: var(--color-text);">
        Młody Rycerzu! Zanim ruszysz w teren, upewnij się, że masz założoną <strong>bezpieczną opaskę na dłoń</strong> trzymającą telefon. Dbamy o sprzęt!
      </p>
      <button id="acceptSafetyBtn" class="big-button" style="background: var(--color-success);">
        Mam opaskę, ruszamy!
      </button>
    </div>
  `;
  document.getElementById('acceptSafetyBtn').addEventListener('click', startNewSession);
}

function startNewSession() {
  stopSensors();
  
  // Bezpieczne generowanie ID (działa też na HTTP w sieci lokalnej)
  let sessionId;
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    sessionId = crypto.randomUUID();
  } else {
    sessionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  localStorage.setItem('kangoo_session', sessionId);
  localStorage.setItem('kangoo_score', '0');
  showDashboard(sessionId);
}

function showDashboard(sessionId) {
  stopSensors(); // Zatrzymujemy czujniki w menu głównym
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="dashboard fade-in" style="padding: 1.5rem; display: flex; flex-direction: column; min-height: 100vh; justify-content: space-between;">
      <div>
        <h2 style="text-align: center; color: var(--color-primary); margin-bottom: 1.5rem;">Wybierz Misję</h2>
        <div class="scenarios-grid">
          ${scenarios.map(s => 
            `<div class="scenario-card" tabindex="0" data-id="${s.id}">
              <div class="scenario-icon">${s.mainGif ? `<img src="${s.mainGif}" alt="${s.title}" style="max-height: 50px; max-width: 50px; object-fit: contain;" onerror="this.outerHTML='${s.icon}'">` : s.icon}</div>
              <div class="scenario-title">${s.title}</div>
            </div>`
          ).join('')}
        </div>
      </div>
      
      <div class="status-bar" style="margin-top: 2rem;">
        <div class="character-drawing" style="width: 45px; height: 45px; display: flex; align-items: center; justify-content: center;">
          <img src="assets/gifs/bieg.gif" alt="Rycerz" style="max-height: 40px; max-width: 40px; object-fit: contain;" onerror="this.src='assets/images/rycerz.jpg'" />
        </div>
        <div class="welcome-msg" style="font-size: 0.9rem;">
          Rycerz gotowy! <span class="badge">Aktywny</span>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('.scenario-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const scenarioId = Number(e.currentTarget.getAttribute('data-id'));
      showScenarioScreen(sessionId, scenarioId, 0);
    });
  });
}

function showScenarioScreen(sessionId, scenarioId, stepIndex) {
  stopSensors(); // Zawsze czyścimy stare czujniki przed przejściem do nowego kroku
  const scenario = scenarios.find(s => s.id === scenarioId) || scenarios[0];
  const app = document.getElementById('app');

  if (scenario.steps && scenario.steps.length > 0) {
    if (stepIndex < scenario.steps.length) {
      const currentStep = scenario.steps[stepIndex];
      const mediaSrc = currentStep.gif || 'assets/gifs/bieg.gif';

      if (currentStep.type === 'story') {
        app.innerHTML = `
          <div class="story-screen fade-in" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh; padding: 1.5rem; text-align: center;">
            <div>
              <div style="margin: 1rem 0; height: 140px; display: flex; align-items: center; justify-content: center;">
                <img src="${mediaSrc}" alt="Ilustracja fabularna" style="max-height: 130px; max-width: 100%; object-fit: contain;" onerror="this.src='assets/gifs/bieg.gif'" />
              </div>
              <h3 style="color: var(--color-accent); font-size: 1rem; text-transform: uppercase;">Dziennik Przygody</h3>
              <h2 style="color: var(--color-primary); margin: 0.3rem 0 1rem; font-size: 1.2rem;">${currentStep.name}</h2>
              <div style="background: rgba(255, 193, 7, 0.15); padding: 1.2rem; border-radius: var(--border-radius); border-left: 5px solid var(--color-accent); text-align: left;">
                <p style="font-size: 1rem; color: var(--color-text); line-height: 1.5; margin: 0;">${currentStep.text}</p>
              </div>
            </div>

            <div style="margin-top: auto; display: flex; flex-direction: column; gap: 0.8rem; padding-bottom: 1rem;">
              <button id="nextStoryBtn" class="big-button" style="background: var(--color-primary);">
                Dalej w drogę! ➡️
              </button>
              <button id="backToDashboardBtn" class="big-button" style="background: #e0e0e0; color: #333; font-size: 1rem; padding: 0.8rem;">
                ⬅ Powrót do menu
              </button>
            </div>
          </div>
        `;

        document.getElementById('nextStoryBtn').addEventListener('click', () => {
          showScenarioScreen(sessionId, scenarioId, stepIndex + 1);
        });

      } else {
        // Ekran ćwiczenia fizycznego z obsługą sensorów oraz przyciskiem awaryjnym (do testów na PC)
        app.innerHTML = `
          <div class="scenario-screen fade-in" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh; padding: 1.5rem; text-align: center;">
            <div>
              <div style="margin: 0.5rem 0; height: 130px; display: flex; align-items: center; justify-content: center;">
                <img src="${mediaSrc}" alt="Akcja ćwiczenia" style="max-height: 120px; max-width: 100%; object-fit: contain;" onerror="this.src='assets/gifs/bieg.gif'" />
              </div>
              <h2 style="color: var(--color-primary); margin: 0.2rem 0; font-size: 1.1rem;">${scenario.title}</h2>
              <div style="background: rgba(66, 165, 245, 0.1); padding: 0.3rem 0.8rem; border-radius: 1rem; display: inline-block; margin-bottom: 0.5rem; font-weight: bold; font-size: 0.8rem;">
                Krok ${stepIndex + 1} z ${scenario.steps.length}
              </div>
              <p style="font-size: 1rem; font-weight: 600; color: var(--color-text); margin: 0.3rem 0;">${currentStep.name}</p>
              <p style="font-size: 0.9rem; color: #555; line-height: 1.4; margin-bottom: 0.5rem;">${currentStep.instruction}</p>
            </div>

            <div style="background: #f8f9fa; border: 2px dashed var(--color-primary); border-radius: var(--border-radius); padding: 1rem; margin: 0.5rem 0;">
              <p style="font-size: 0.9rem; font-weight: bold; color: var(--color-primary); margin-bottom: 0.2rem;">Zliczono ruchy (Opaska na dłoni):</p>
              <div id="counter-display" style="font-size: 2.8rem; font-weight: bold; color: var(--color-success); margin: 0.2rem 0;">0 / ${currentStep.target}</div>
              <button id="simStepBtn" class="big-button" style="margin-top: 0.5rem; font-size: 0.95rem; height: 3rem; background: var(--color-accent); color: var(--color-text);">
                [Test / Kliknij myszką] Zaliczenie ruchu
              </button>
            </div>

            <div style="padding-bottom: 1rem;">
              <button id="backToDashboardBtn" class="big-button" style="background: #e0e0e0; color: #333; font-size: 1rem; padding: 0.8rem;">
                ⬅ Powrót do wyboru misji
              </button>
            </div>
          </div>
        `;

        let currentCount = 0;
        const targetCount = currentStep.target;

        const handleProgress = () => {
          currentCount++;
          const display = document.getElementById('counter-display');
          if (display) {
            display.textContent = `${currentCount} / ${targetCount}`;
          }
          if (currentCount >= targetCount) {
            stopSensors(); // Wyłączamy sensory po wykonaniu celu
            setTimeout(() => {
              showScenarioScreen(sessionId, scenarioId, stepIndex + 1);
            }, 400);
          }
        };

        // 1. Uruchomienie nasłuchu akcelerometru/żyroskopu w telefonie
        initSensors(currentStep.id, () => {
          handleProgress();
        });

        // 2. Obsługa kliknięcia myszką (przydatne do debugowania na komputerzie)
        document.getElementById('simStepBtn').addEventListener('click', () => {
          handleProgress();
        });
      }

    } else {
      stopSensors();
      app.innerHTML = `
        <div class="mission-complete fade-in" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 1.5rem; text-align: center;">
          <div style="margin-bottom: 1rem; height: 140px; display: flex; align-items: center; justify-content: center;">
            <img src="assets/gifs/rycerz-walczacy.gif" alt="Sukces" style="max-height: 130px; max-width: 100%; object-fit: contain;" />
          </div>
          <h2 style="color: var(--color-success); margin-bottom: 0.5rem;">Misja Ukończona!</h2>
          <p style="font-size: 1rem; margin-bottom: 1.5rem;">Zdobyto nagrodę: <strong>${scenario.reward}</strong></p>
          <button id="finishMissionBtn" class="big-button" style="background: var(--color-success);">
            Wróć do bazy (Misje)
          </button>
        </div>
      `;
      document.getElementById('finishMissionBtn').addEventListener('click', () => {
        showDashboard(sessionId);
      });
    }
  }

  document.getElementById('backToDashboardBtn')?.addEventListener('click', () => {
    stopSensors();
    showDashboard(sessionId);
  });
}