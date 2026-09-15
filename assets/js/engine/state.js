// assets/js/engine/state.js - Główny ruter SPA i zarządzanie stanem aplikacji
import { renderAuth } from '../views/authView.js';
import { renderMap } from '../views/mapView.js';
import { renderLocation } from '../views/locationView.js';
import { renderMarket } from '../views/marketView.js';
import { renderForge } from '../views/forgeView.js';
import { renderCastlePC } from '../views/castleView.js';
import { renderMission } from '../views/scenarioView.js';
import { renderProfile } from '../views/profileView.js';
import { renderBossBattle } from '../views/bossBattleView.js';
import { renderPcTester } from '../views/testerView.js';
import { renderAdmin } from '../views/adminView.js';
import { initVoiceAssistant } from '../utils/voiceControl.js';

export function initApp() {
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error("Nie znaleziono głównego kontenera #app w dokumencie HTML!");
    return;
  }

  // Stan aplikacji (zsynchronizowany z localStorage lub domyślny)
  const appState = {
    currentUser: JSON.parse(localStorage.getItem('kplay_current_user')) || {
      name: 'Kacper',
      title: 'Pachołek Grodu',
      resources: { drewno: 5, skora: 2, kamien: 3, zboze: 4, ryba: 2 },
      inventory: {}
    }
  };

  // Uruchomienie mobilnego asystenta głosowego (działa tylko na smartfonach)
  initVoiceAssistant(navigate, appState, () => {
    const hash = window.location.hash || '#map';
    if (hash.startsWith('#location')) return 'location';
    return 'map';
  });

  // Globalna funkcja nawigacji obsługująca zmiany tras (hashy w URL)
  function navigate(route, params = {}) {
    if (route === 'map') {
      window.location.hash = '#map';
    } else if (route === 'tester') {
      window.location.hash = '#tester';
    } else if (route === 'admin') {
      window.location.hash = '#admin';
    } else if (route === 'market') {
      window.location.hash = '#market';
    } else if (route === 'forge') {
      window.location.hash = '#forge';
    } else if (route === 'profile') {
      window.location.hash = '#profile';
    } else if (route === 'castle') {
      window.location.hash = '#castle';
    } else if (route === 'location') {
      window.location.hash = `#location?key=${params.key}&title=${encodeURIComponent(params.title)}`;
    } else if (route === 'mission') {
      window.location.hash = `#mission?id=${params.scenarioId}`;
    } else if (route === 'boss') {
      window.location.hash = `#boss?id=${params.id}`;
    } else if (route === 'auth') {
      window.location.hash = '#auth';
    }
  }

  // Główna funkcja routingu SPA
  function handleRoute() {
    const hash = window.location.hash || '#map';
    appContainer.innerHTML = ''; 

    try {
      if (hash.startsWith('#admin')) {
        renderAdmin(appContainer, navigate, appState);
      } 
      else if (hash.startsWith('#tester')) {
        renderPcTester(appContainer, navigate, appState);
      } 
      else if (hash.startsWith('#profile')) {
        renderProfile(appContainer, navigate, appState);
      }
      else if (hash.startsWith('#boss')) {
        const urlParams = new URLSearchParams(hash.split('?')[1]);
        const bossId = urlParams.get('id');
        renderBossBattle(appContainer, navigate, appState, bossId);
      }
      else if (hash.startsWith('#mission')) {
        const urlParams = new URLSearchParams(hash.split('?')[1]);
        const missionId = urlParams.get('id');
        renderMission(appContainer, navigate, appState, missionId);
      } 
      else if (hash.startsWith('#location')) {
        const urlParams = new URLSearchParams(hash.split('?')[1]);
        const locKey = urlParams.get('key');
        const locTitle = decodeURIComponent(urlParams.get('title') || 'Lokacja');
        renderLocation(appContainer, navigate, appState, locKey, locTitle);
      } 
      else if (hash === '#market') {
        renderMarket(appContainer, navigate, appState);
      }
      else if (hash === '#forge') {
        renderForge(appContainer, navigate, appState);
      } 
      else if (hash === '#castle') {
        renderCastlePC(appContainer, navigate, appState);
      } 
      else if (hash === '#auth') {
        renderAuth(appContainer, navigate, appState);
      }
      else {
        renderMap(appContainer, navigate, appState);
      }
    } catch (err) {
      console.error("Błąd krytyczny podczas renderowania trasy:", err);
      appContainer.innerHTML = `
        <div style="padding: 20px; color: #d32f2f; background: #ffebee; border-radius: 8px; margin: 20px; font-family: sans-serif;">
          <h3>Wystąpił błąd aplikacji:</h3>
          <p>${err.message}</p>
        </div>
      `;
    }
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}