import { scenarios } from '../data/scenarios/scenarios.js';
import { getDatabase, updateUserData } from '../data/profilesData.js';
import { speak } from '../utils/audio.js';
import { getCurrentUser, navigateTo } from '../engine/state.js';

export function renderDashboardScreen(app) {
  const currentUser = getCurrentUser();
  const db = getDatabase();
  const otherUsers = db.filter(u => u.login !== currentUser.login);
  const messages = JSON.parse(localStorage.getItem('kangoo_messages') || '[]');

  app.innerHTML = `
    <div class="dashboard fade-in" style="padding: 0.8rem 1rem; display: flex; flex-direction: column; height: 100vh; max-height: 100vh; justify-content: space-between; overflow: hidden; box-sizing: border-box;">
      
      <div style="display: flex; justify-content: space-between; align-items: center; background: #f8f9fa; padding: 0.5rem 0.8rem; border-radius: 10px; border: 1px solid #e0e0e0;">
        <div>
          <span style="font-weight: bold; color: var(--color-primary); font-size: 0.95rem;">Rycerz: ${currentUser.name} (${currentUser.title})</span>
          <span style="font-size: 0.75rem; color: #666; display: inline-block; margin-left: 0.5rem;">🪵 ${currentUser.resources.drewno} | 🦌 ${currentUser.resources.skora} | 🐉 ${currentUser.resources.smocze_luski}</span>
        </div>
        <button id="logoutBtn" style="padding: 0.2rem 0.6rem; border-radius: 6px; border: 1px solid #ff7043; color: #ff7043; background: white; cursor: pointer; font-size: 0.75rem; font-weight: bold;">Wyloguj</button>
      </div>

      <div style="display: flex; gap: 0.5rem;">
        <button id="openForgeBtn" class="big-button" style="background: var(--color-accent); font-size: 0.85rem; padding: 0.5rem; flex: 1; border-radius: 10px;">
          ⚒️ Kuźnia
        </button>
        <button id="openCastleBtn" class="big-button" style="background: #795548; font-size: 0.85rem; padding: 0.5rem; flex: 1; border-radius: 10px;">
          🏰 Targ w Zamku
        </button>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; align-items: stretch; flex: 1; overflow: hidden;">
        
        <div style="display: flex; flex-direction: column; gap: 0.4rem; overflow-y: auto;">
          <h4 style="color: var(--color-primary); font-size: 0.9rem; margin-bottom: 0.2rem;">Wybierz Misję:</h4>
          ${scenarios.map(s => 
            `<div class="scenario-card" data-id="${s.id}" style="padding: 0.5rem 0.8rem; border-radius: 10px; display: flex; align-items: center; gap: 0.6rem; cursor: pointer; background: white; border: 1px solid #ddd; min-height: 45px;">
              <div style="font-size: 1.5rem; line-height: 1;">${s.mainGif ? `<img src="${s.mainGif}" alt="" style="max-height: 30px; max-width: 30px; object-fit: contain;" onerror="this.outerHTML='${s.icon}'">` : s.icon}</div>
              <div class="scenario-title" style="font-size: 0.9rem; font-weight: bold; color: var(--color-text);">${s.title}</div>
            </div>`
          ).join('')}
        </div>

        <div style="background: #fdfdfd; border: 1px dashed #ccc; border-radius: 10px; padding: 0.6rem; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;">
          
          <div>
            <h5 style="color: #333; font-size: 0.8rem; margin-bottom: 0.2rem;">🤝 Handel Surowcami</h5>
            <div style="display: flex; gap: 0.3rem;">
              ${otherUsers.length > 0 ? `
                <select id="targetUserLogin" style="padding: 0.2rem; border-radius: 6px; border: 1px solid #ccc; font-size: 0.75rem; flex: 1;">
                  ${otherUsers.map(u => `<option value="${u.login}">${u.name}</option>`).join('')}
                </select>
                <select id="tradeResource" style="padding: 0.2rem; border-radius: 6px; border: 1px solid #ccc; font-size: 0.75rem;">
                  <option value="drewno">Drewno</option>
                  <option value="skora">Skóra</option>
                  <option value="smocze_luski">Łuski</option>
                </select>
                <button id="sendResourceBtn" style="background: var(--color-success); color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 6px; cursor: pointer; font-size: 0.75rem; font-weight: bold;">Wyślij</button>
              ` : `<span style="font-size: 0.75rem; color: #888;">Brak graczy.</span>`}
            </div>
          </div>

          <div style="display: flex; flex-direction: column; flex: 1; margin-top: 0.4rem; overflow: hidden;">
            <h5 style="color: #333; font-size: 0.8rem; margin-bottom: 0.2rem;">📜 Czat Grodu</h5>
            <div id="chatMessages" style="background: white; border: 1px solid #e0e0e0; border-radius: 6px; flex: 1; min-height: 40px; max-height: 60px; overflow-y: auto; padding: 0.3rem; font-size: 0.75rem; margin-bottom: 0.3rem;">
              ${messages.length > 0 ? messages.map(m => `<div><strong>${m.author}:</strong> ${m.text}</div>`).join('') : '<i style="color:#aaa; font-size:0.7rem;">Brak wiadomości...</i>'}
            </div>
            <div style="display: flex; gap: 0.3rem;">
              <input type="text" id="chatInput" placeholder="Napisz..." style="flex: 1; padding: 0.2rem 0.4rem; border-radius: 6px; border: 1px solid #ccc; font-size: 0.75rem;" />
              <button id="sendChatBtn" style="background: var(--color-primary); color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 6px; cursor: pointer; font-size: 0.75rem;">➤</button>
            </div>
          </div>

        </div>

      </div>
      
      <div style="font-size: 0.7rem; text-align: center; color: #888; padding-top: 0.2rem;">
        Stacja Dowodzenia Grodu 🟢
      </div>

    </div>
  `;

  document.getElementById('logoutBtn').addEventListener('click', () => navigateTo('auth'));
  document.getElementById('openForgeBtn').addEventListener('click', () => navigateTo('forge'));
  document.getElementById('openCastleBtn').addEventListener('click', () => navigateTo('castle'));

  document.querySelectorAll('.scenario-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const scenarioId = Number(e.currentTarget.getAttribute('data-id'));
      const chosen = scenarios.find(s => s.id === scenarioId);
      if (chosen && chosen.steps && chosen.steps.length > 0) {
        speak(`Rozpoczynamy misję: ${chosen.title}`, () => {
          navigateTo('scenario', { scenarioId, stepIndex: 0 });
        });
      }
    });
  });

  const sendResBtn = document.getElementById('sendResourceBtn');
  if (sendResBtn) {
    sendResBtn.addEventListener('click', () => {
      const targetLogin = document.getElementById('targetUserLogin').value;
      const resType = document.getElementById('tradeResource').value;

      if (currentUser.resources[resType] > 0) {
        currentUser.resources[resType] -= 1;
        updateUserData(currentUser);

        const db = getDatabase();
        const targetUser = db.find(u => u.login === targetLogin);
        if (targetUser) {
          targetUser.resources[resType] = (targetUser.resources[resType] || 0) + 1;
          updateUserData(targetUser);
        }

        alert(`Wysłano 1x ${resType} do ${targetLogin}!`);
        renderDashboardScreen(app);
      } else {
        alert("Brak surowca w plecaku!");
      }
    });
  }

  const sendChatBtn = document.getElementById('sendChatBtn');
  const chatInput = document.getElementById('chatInput');
  if (sendChatBtn && chatInput) {
    const handleSend = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      const currentMsgs = JSON.parse(localStorage.getItem('kangoo_messages') || '[]');
      currentMsgs.push({ author: currentUser.name, text, time: new Date().toLocaleTimeString() });
      localStorage.setItem('kangoo_messages', JSON.stringify(currentMsgs));
      renderDashboardScreen(app);
    };
    sendChatBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
  }
}