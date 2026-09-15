// assets/js/mission.js - Bezpieczna obsługa misji (brak błędów 404 dla brakujących wideo)
import { scenarios } from './data/scenarios/scenarios.js';
import { updateUserData } from './data/profilesData.js';

export function renderMission(container, navigate, appState, missionId) {
  const user = appState?.currentUser || { resources: {} };
  const mission = scenarios.find(s => String(s.id) === String(missionId)) || scenarios[0];

  if (!mission || !mission.steps || mission.steps.length === 0) {
    container.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: sans-serif;">
        <h3 style="color: #c0392b;">Nie znaleziono kroków dla tej misji!</h3>
        <p style="color: #666; font-size: 14px;">ID misji: ${missionId}</p>
        <button id="backToMap" class="big-button" style="margin-top: 1rem; background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">⬅ Powrót do mapy</button>
      </div>
    `;
    document.getElementById('backToMap').addEventListener('click', () => navigate('map'));
    return;
  }

  let currentStepIndex = 0;

  function renderStep() {
    const step = mission.steps[currentStepIndex];

    if (!step) {
      container.innerHTML = `
        <div class="fade-in" style="padding: 2rem; text-align: center; max-width: 500px; margin: 4rem auto; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: sans-serif;">
          <h2 style="color: #27ae60;">🎉 Misja ukończona pomyślnie!</h2>
          <p style="color: #555; margin: 10px 0 20px 0;">Zdobyto nagrodę: <strong>${mission.reward || 'Surowce'}</strong></p>
          <button id="finishMission" class="big-button" style="background: #27ae60; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold;">Odbierz nagrodę i wróć</button>
        </div>
      `;

      document.getElementById('finishMission').addEventListener('click', () => {
        if (!user.resources) user.resources = { drewno: 0, skora: 0, kamien: 0, zboze: 0, ryba: 0 };
        
        if (mission.location === 'forest') user.resources.drewno = (user.resources.drewno || 0) + 3;
        else if (mission.location === 'mountains') user.resources.kamien = (user.resources.kamien || 0) + 3;
        else if (mission.location === 'river') user.resources.ryba = (user.resources.ryba || 0) + 3;
        else if (mission.location === 'field') user.resources.zboze = (user.resources.zboze || 0) + 3;
        else user.resources.skora = (user.resources.skora || 0) + 2;

        updateUserData(user);
        navigate('map');
      });
      return;
    }

    const stepName = step.name || 'Ćwiczenie ruchowe';
    const stepInstruction = step.instruction || 'Wykonaj zadane powtórzenia.';
    const stepTarget = step.target || 5;
    
    // Sprawdzamy TYLKO czy w kroku jawnie podano właściwość "video"
    const videoSrc = step.video || '';

    // Jeśli jest ścieżka do wideo, renderujemy odtwarzacz. Jeśli nie ma - od razu ładny placeholder.
    const stepVideoHtml = videoSrc ? `
      <div style="margin-bottom: 1rem; position: relative;">
        <video autoplay loop muted playsinline style="max-width: 100%; height: 180px; object-fit: contain; border-radius: 8px; background: #000; width: 100%; display: block;"
               onerror="this.parentElement.style.display='none'; this.parentElement.nextElementSibling.style.display='flex';">
          <source src="${videoSrc}" type="video/mp4">
          Twoja przeglądarka nie obsługuje wideo.
        </video>
      </div>
      <div style="display: none; background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px; height: 180px; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 1rem; color: #64748b;">
        <span style="font-size: 2rem; margin-bottom: 0.3rem;">🎬 ⚠️</span>
        <span style="font-size: 0.85rem; font-weight: bold;">Brak filmiku</span>
      </div>
    ` : `
      <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px; height: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 1rem; color: #64748b;">
        <span style="font-size: 2rem; margin-bottom: 0.3rem;">🎬 ⚠️</span>
        <span style="font-size: 0.85rem; font-weight: bold;">Brak filmiku</span>
      </div>
    `;

    container.innerHTML = `
      <div class="fade-in" style="padding: 1.2rem; max-width: 600px; margin: 0 auto; width: 100%; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; background: #fdfbf7; font-family: sans-serif;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span style="font-size: 0.85rem; color: #666; font-weight: bold;">${mission.title}</span>
            <span style="font-size: 0.85rem; background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: bold;">Krok ${currentStepIndex + 1} / ${mission.steps.length}</span>
          </div>

          <div style="background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 1.2rem; text-align: center; margin-bottom: 1.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 0.5rem;">${stepName}</h3>
            <p style="font-size: 0.9rem; color: #555; margin-bottom: 1rem;">${stepInstruction}</p>
            
            ${stepVideoHtml}

            <div style="font-size: 1.1rem; font-weight: bold; color: #e67e22; margin-bottom: 1.2rem;">
              Cel: ${stepTarget} powtórzeń
            </div>

            <button id="nextStepBtn" style="background: #27ae60; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; width: 100%;">✅ Zaliczyłem ten krok!</button>
          </div>
        </div>

        <div>
          <button id="cancelMission" style="background: #e0e0e0; color: #333; border: none; padding: 10px; border-radius: 8px; font-size: 0.9rem; font-weight: bold; cursor: pointer; width: 100%;">⬅ Przerwij misję</button>
        </div>
      </div>
    `;

    document.getElementById('nextStepBtn').addEventListener('click', () => {
      currentStepIndex++;
      renderStep();
    });

    document.getElementById('cancelMission').addEventListener('click', () => {
      navigate('map');
    });
  }

  renderStep();
}