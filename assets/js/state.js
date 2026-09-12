// Kangoo: SPA State Management with Audio Narration, Cooldown & Safe Flow
import { scenarios } from './data/scenarios.js';
import { initSensors, stopSensors } from './sensors.js';
import { speak, stopSpeech } from './audio.js';

export function initApp() {
  stopSensors();
  stopSpeech();
  showLandingScreen();
}

function showLandingScreen() {
  stopSensors();
  stopSpeech();
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="landing-screen fade-in" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 1.5rem; text-align: center;">
      <div style="margin-bottom: 1.5rem; height: 130px; display: flex; align-items: center; justify-content: center;">
        <img src="assets/gifs/bieg.gif" alt="Biegnący bohater" style="max-height: 120px; max-width: 100%; object-fit: contain;" onerror="this.src='assets/images/rycerz.jpg'" />
      </div>
      <h1 style="color: var(--color-primary); margin: 0.5rem 0;">KPlayground</h1>
      <p style="color: var(--color-text); margin-bottom: 2rem;">Bezpieczna gra ruchowa na placu zabaw!</p>
      <button id="startGameBtn" class="big-button">Zaczynamy przygodę!</button>
    </div>
  `;
  
  document.getElementById('startGameBtn').addEventListener('click', () => {
    speak("Witaj młody rycerzu! Sprawdźmy zasady bezpieczeństwa.", showSafetyScreen);
  });
}

function showSafetyScreen() {
  stopSensors();
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="safety-screen fade-in" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 1.5rem; text-align: center;">
      <div style="font-size: 4rem; margin-bottom: 1rem;" class="animated-icon">🛡️</div>
      <h2 style="color: var(--color-primary); margin-bottom: 1rem;">Bezpieczna Baza</h2>
      <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 2rem; color: var(--color-text);">
        Młody Rycerzu! Upewnij się, że opaska stabilnie trzyma telefon na dłoni. Gramy bezpiecznie i spokojnie.
      </p>
      <button id="acceptSafetyBtn" class="big-button" style="background: var(--color-success);">
        Opaska gotowa, ruszamy!
      </button>
    </div>
  `;

  speak("Upewnij się, że opaska stabilnie trzyma telefon na dłoni. Gramy bezpiecznie.");

  document.getElementById('acceptSafetyBtn').addEventListener('click', () => {
    speak("Wybierz misję, dowódco!", startNewSession);
  });
}

function startNewSession() {
  stopSensors();
  stopSpeech();
  
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
  stopSensors();
  stopSpeech();
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
        <div class="welcome-msg" style="font-size: 0.9rem; text-align: center; width: 100%;">
          Tryb przyjazny i przewidywalny <span class="badge" style="background: var(--color-success);">Aktywny</span>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('.scenario-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const scenarioId = Number(e.currentTarget.getAttribute('data-id'));
      const chosen = scenarios.find(s => s.id === scenarioId);
      if (chosen && chosen.steps && chosen.steps.length > 0) {
        speak(`Rozpoczynamy misję: ${chosen.title}`, () => {
          showScenarioScreen(sessionId, scenarioId, 0);
        });
      } else {
        speak("Ta misja jest jeszcze w budowie. Wybierz pierwszą misję ze smokiem.");
      }
    });
  });
}

function showScenarioScreen(sessionId, scenarioId, stepIndex) {
  stopSensors();
  stopSpeech();
  const scenario = scenarios.find(s => s.id === scenarioId) || scenarios[0];
  const app = document.getElementById('app');

  if (scenario.steps && scenario.steps.length > 0) {
    if (stepIndex < scenario.steps.length) {
      const currentStep = scenario.steps[stepIndex];
      const mediaSrc = currentStep.gif || 'assets/gifs/bieg.gif';

      // 1. KROK FABULARNY (STORY)
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

        speak(currentStep.text);

        document.getElementById('nextStoryBtn').addEventListener('click', () => {
          stopSpeech();
          showScenarioScreen(sessionId, scenarioId, stepIndex + 1);
        });

      } 
      // 2. KROK WYCISZENIA / ODDECHU (COOLDOWN)
      else if (currentStep.type === 'cooldown') {
        app.innerHTML = `
          <div class="cooldown-screen fade-in" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 100vh; padding: 1.5rem; text-align: center; background: rgba(76, 175, 80, 0.05);">
            <div>
              <div style="margin: 1rem 0; height: 130px; display: flex; align-items: center; justify-content: center;">
                <img src="${mediaSrc}" alt="Wyciszenie" style="max-height: 120px; max-width: 100%; object-fit: contain;" />
              </div>
              <h2 style="color: var(--color-success); margin: 0.2rem 0; font-size: 1.2rem;">${currentStep.name}</h2>
              <p style="font-size: 0.95rem; color: #555; line-height: 1.4; margin-bottom: 1rem;">${currentStep.instruction}</p>
            </div>

            <div style="background: #ffffff; border: 2px solid var(--color-success); border-radius: var(--border-radius); padding: 1.2rem; margin: 0.5rem 0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              <p style="font-size: 0.9rem; font-weight: bold; color: var(--color-success); margin-bottom: 0.3rem;">Spokojny Oddech:</p>
              <div id="cooldown-display" style="font-size: 2.8rem; font-weight: bold; color: var(--color-success); margin: 0.3rem 0;">0 / ${currentStep.target}</div>
              <button id="nextBreathBtn" class="big-button" style="margin-top: 0.8rem; font-size: 1rem; height: 3.2rem; background: var(--color-success); color: #fff;">
                Wdech i wydech (Kliknij po oddechu) 🌿
              </button>
            </div>

            <div style="padding-bottom: 1rem;">
              <button id="backToDashboardBtn" class="big-button" style="background: #e0e0e0; color: #333; font-size: 1rem; padding: 0.8rem;">
                ⬅ Przerwij i wróć do menu
              </button>
            </div>
          </div>
        `;

        speak(currentStep.text);

        let breathCount = 0;
        const targetBreaths = currentStep.target;

        const handleBreath = () => {
          breathCount++;
          const display = document.getElementById('cooldown-display');
          if (display) {
            display.textContent = `${breathCount} / ${targetBreaths}`;
          }

          if (breathCount < targetBreaths) {
            speak("Bardzo dobrze. Jeszcze jeden głęboki wdech i powolny wydech.");
          }

          if (breathCount >= targetBreaths) {
            speak("Świetnie! Twój organizm jest w pełni zrelaksowany. Kończymy misję!", () => {
              setTimeout(() => {
                showScenarioScreen(sessionId, scenarioId, stepIndex + 1);
              }, 400);
            });
          }
        };

        document.getElementById('nextBreathBtn').addEventListener('click', handleBreath);

      } 
      // 3. STANDARDOWY KROK ĆWICZENIA (EXERCISE)
      else {
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
                [Bezpieczna Pomoc / Zaliczenie] 🟢
              </button>
            </div>

            <div style="padding-bottom: 1rem;">
              <button id="backToDashboardBtn" class="big-button" style="background: #e0e0e0; color: #333; font-size: 1rem; padding: 0.8rem;">
                ⬅ Powrót do wyboru misji
              </button>
            </div>
          </div>
        `;

        speak(currentStep.instruction);

        let currentCount = 0;
        const targetCount = currentStep.target;

        const handleProgress = () => {
          currentCount++;
          const display = document.getElementById('counter-display');
          if (display) {
            display.textContent = `${currentCount} / ${targetCount}`;
          }

          if (currentCount < targetCount) {
            speak(String(currentCount));
          }

          if (currentCount >= targetCount) {
            stopSensors();
            speak("Super robota! Idziemy dalej.", () => {
              setTimeout(() => {
                showScenarioScreen(sessionId, scenarioId, stepIndex + 1);
              }, 300);
            });
          }
        };

        // Uruchamiamy sensory z opaski
        initSensors(currentStep.id, () => {
          handleProgress();
        });

        // Przycisk "Bezpieczna Pomoc" – eliminuje frustrację, gdyby czujnik nie zarejestrował ruchu
        document.getElementById('simStepBtn').addEventListener('click', () => {
          handleProgress();
        });
      }

    } else {
      // EKRAN UKOŃCZENIA MISJI
      stopSensors();
      app.innerHTML = `
        <div class="mission-complete fade-in" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 1.5rem; text-align: center;">
          <div style="margin-bottom: 1rem; height: 140px; display: flex; align-items: center; justify-content: center;">
            <img src="assets/gifs/rycerz-walczacy.gif" alt="Sukces" style="max-height: 130px; max-width: 100%; object-fit: contain;" />
          </div>
          <h2 style="color: var(--color-success); margin-bottom: 0.5rem;">Misja Ukończona Wzorowo!</h2>
          <p style="font-size: 1rem; margin-bottom: 1.5rem;">Zdobyto nagrodę: <strong>${scenario.reward}</strong></p>
          <button id="finishMissionBtn" class="big-button" style="background: var(--color-success);">
            Wróć do bazy (Wybór Misji)
          </button>
        </div>
      `;
      speak(`Misja ukończona wzorowo! Zdobyto nagrodę: ${scenario.reward}`);

      document.getElementById('finishMissionBtn').addEventListener('click', () => {
        showDashboard(sessionId);
      });
    }
  }

  document.getElementById('backToDashboardBtn')?.addEventListener('click', () => {
    stopSensors();
    stopSpeech();
    showDashboard(sessionId);
  });
}