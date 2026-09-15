// assets/js/views/authView.js - Ekran logowania i autoryzacji gracza
import { updateUserData } from '../data/profilesData.js';

export function renderAuth(container, navigate, appState) {
  container.innerHTML = `
    <div class="fade-in" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #fdfbf7; padding: 1.5rem; font-family: sans-serif;">
      <div style="background: white; border: 2px solid #e0e0e0; border-radius: 16px; padding: 2rem; max-width: 400px; width: 100%; box-shadow: 0 6px 20px rgba(0,0,0,0.08); text-align: center;">
        <span style="font-size: 3.5rem; display: block; margin-bottom: 0.5rem;">🛡️</span>
        <h2 style="color: #1e293b; margin-bottom: 0.5rem;">Gra Terenowa Królestwa</h2>
        <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1.5rem;">Zidentyfikuj się, szlachetny wędrowcze.</p>
        
        <div style="margin-bottom: 1.2rem; text-align: left;">
          <label style="display: block; font-size: 0.8rem; font-weight: bold; color: #334155; margin-bottom: 0.4rem;">Imię Bohatera:</label>
          <input type="text" id="usernameInput" value="${appState.currentUser?.name || 'Kacper'}" style="width: 100%; padding: 0.8rem; border: 2px solid #cbd5e1; border-radius: 8px; font-size: 1rem; box-sizing: border-box;" />
        </div>

        <div style="margin-bottom: 1.5rem; text-align: left;">
          <label style="display: block; font-size: 0.8rem; font-weight: bold; color: #334155; margin-bottom: 0.4rem;">Tytuł / Ranga:</label>
          <input type="text" id="usertitleInput" value="${appState.currentUser?.title || 'Pachołek Grodu'}" style="width: 100%; padding: 0.8rem; border: 2px solid #cbd5e1; border-radius: 8px; font-size: 1rem; box-sizing: border-box;" />
        </div>

        <button id="loginSubmitBtn" class="big-button" style="width: 100%; background: #0284c7; color: white; border: none; padding: 0.9rem; border-radius: 10px; font-size: 1rem; font-weight: bold; cursor: pointer;">Wejdź do Grodu ⚔️</button>
      </div>
    </div>
  `;

  document.getElementById('loginSubmitBtn').addEventListener('click', () => {
    const nameVal = document.getElementById('usernameInput').value.trim() || 'Gracz';
    const titleVal = document.getElementById('usertitleInput').value.trim() || 'Wędrowiec';

    // Aktualizacja stanu aplikacji
    appState.currentUser.name = nameVal;
    appState.currentUser.title = titleVal;

    // Zapis do localStorage i bazy profilu
    localStorage.setItem('kplay_current_user', JSON.stringify(appState.currentUser));
    if (typeof updateUserData === 'function') {
      updateUserData(appState.currentUser);
    }

    // Przejście do mapy świata
    navigate('map');
  });
}