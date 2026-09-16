// assets/js/views/scenarioView.js - Misje z czytelnym licznikiem wykonanych ćwiczeń i obsługą multimediów
import { scenarios } from '../data/scenarios/scenarios.js';
import { updateUserData } from '../data/profilesData.js';
import { stopSpeech } from '../utils/audio.js';

export function renderMission(container, navigate, appState, scenarioId) {
  stopSpeech();
  const user = appState.currentUser;
  
  const scenario = scenarios.find(s => s.id === Number(scenarioId)) || scenarios[0];

  let currentStepIndex = 0;
  const steps = scenario.steps && scenario.steps.length > 0 ? scenario.steps : [
    { title: 'Rozgrzewka', instruction: 'Przygotuj się do wysiłku!', video: 'videos/default.mp4' },
    { title: 'Główne Wyzwanie', instruction: 'Wykonaj serię ćwiczeń z pełnym zaangażowaniem!', video: 'videos/default.mp4' }
  ];

  function renderStep() {
    if (currentStepIndex >= steps.length) {
      if (scenario.rewardRes) {
        for (let [res, amt] of Object.entries(scenario.rewardRes)) {
          user.resources[res] = (user.resources[res] || 0) + amt;
        }
        updateUserData(user);
      }

      container.innerHTML = `
        <div class="fade-in" style="padding: 2rem; max-width: 500px; margin: 0 auto; text-align: center; font-family: sans-serif; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; background: #fdfbf7;">
          <span style="font-size: 4rem; display: block; margin-bottom: 0.5rem;">🏆</span>
          <h2 style="color: #16a34a; margin-bottom: 0.5rem;">Misja Ukończona!</h2>
          <p style="color: #475569; margin-bottom: 1.5rem;">Gratulacje! Pomyślnie ukończyłeś wyzwanie: <strong>${scenario.title}</strong></p>
          
          <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 1.2rem; margin-bottom: 1.5rem; text-align: left;">
            <h4 style="margin: 0 0 0.5rem 0; color: #1e293b;">Zdobyte nagrody:</h4>
            <p style="font-size: 1.1rem; margin: 0; color: #0f172a; font-weight: bold;">🎁 ${scenario.reward || 'Surowce i chwała!'}</p>
          </div>

          <button id="finishMissionBtn" class="big-button" style="background: #0284c7; color: white; border: none; padding: 0.9rem; border-radius: 10px; font-size: 1rem; font-weight: bold; cursor: pointer; width: 100%;">Powrót do mapy świata</button>
        </div>
      `;
      document.getElementById('finishMissionBtn').addEventListener('click', () => navigate('map'));
      return;
    }

    const step = steps[currentStepIndex];
    const mediaSrc = step.video || step.gif || '';
    const isGif = mediaSrc.toLowerCase().endsWith('.gif');

    let mediaHtml = '';
    if (mediaSrc) {
      if (isGif) {
        mediaHtml = `
          <img src="${mediaSrc}" alt="Animacja ćwiczenia" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div style="display:none; width:100%; height:100%; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:0.9rem; flex-direction:column; gap:8px;">
            <span style="font-size: 2rem;">🤸‍♂️</span>
            <span>Ćwiczenie ruchowe</span>
          </div>
        `;
      } else {
        mediaHtml = `
          <video src="${mediaSrc}" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"></video>
          <div style="display:none; width:100%; height:100%; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:0.9rem; flex-direction:column; gap:8px;">
            <span style="font-size: 2rem;">🎬</span>
            <span>Wideo instruktażowe</span>
          </div>
        `;
      }
    } else {
      mediaHtml = `
        <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:0.9rem; flex-direction:column; gap:8px;">
          <span style="font-size: 2rem;">⭐</span>
          <span>Wykonaj zadanie</span>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="fade-in" style="padding: 1.2rem; max-width: 600px; margin: 0 auto; width: 100%; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; background: #fdfbf7; font-family: sans-serif;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
            <h3 style="color: #1e293b; margin: 0; font-size: 1rem;">${scenario.title}</h3>
            <span style="font-size: 0.85rem; font-weight: bold; background: #e0f2fe; color: #0284c7; padding: 0.3rem 0.8rem; border-radius: 20px;">Krok ${currentStepIndex + 1} z ${steps.length}</span>
          </div>

          <!-- WIDOCZNY LICZNIK WYKONANYCH ĆWICZEŃ -->
          <div style="background: #f1f5f9; border: 2px solid #cbd5e1; border-radius: 10px; padding: 0.6rem 1rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.85rem; font-weight: bold; color: #475569;">Wykonane ćwiczenia w serii:</span>
            <span style="font-size: 1.1rem; font-weight: 900; color: #16a34a; background: white; padding: 0.2rem 0.8rem; border-radius: 8px; border: 1px solid #cbd5e1;">🔥 ${currentStepIndex} / ${steps.length}</span>
          </div>

          <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 1rem; margin-bottom: 1rem; text-align: center;">
            <h4 style="color: #0f172a; margin-top: 0; margin-bottom: 0.4rem; font-size: 1.1rem;">${step.title || 'Zadanie ruchowe'}</h4>
            <p style="font-size: 0.95rem; color: #475569; margin-bottom: 1rem; line-height: 1.4;">${step.instruction || step.desc || ''}</p>
            
            <div style="background: #000; border-radius: 8px; overflow: hidden; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; position: relative;">
              ${mediaHtml}
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <button id="backToMapBtn" class="big-button" style="flex: 1; background: #e2e8f0; color: #333; font-weight: bold; border-radius: 8px; padding: 0.8rem; border: none; cursor: pointer;">Przerwij</button>
          <button id="nextStepBtn" class="big-button" style="flex: 2; background: #16a34a; color: white; font-weight: bold; border-radius: 8px; padding: 0.8rem; border: none; cursor: pointer;">Zaliczone / Dalej ➔</button>
        </div>
      </div>
    `;

    document.getElementById('backToMapBtn').addEventListener('click', () => navigate('map'));
    document.getElementById('nextStepBtn').addEventListener('click', () => {
      currentStepIndex++;
      renderStep();
    });
  }

  renderStep();
}