// assets/js/bossBattle.js - Ekran starcia z antagonistą
import { bosses } from '../data/bosses.js';
import { updateUserData } from '../data/profilesData.js';

export function renderBossBattle(container, navigate, appState, bossId) {
  const user = appState.currentUser;
  const boss = bosses.find(b => b.id === bossId) || bosses[0];

  // Sprawdzenie, czy gracz ma wymagany przedmiot
  const hasItem = user.inventory[boss.requiredItem] || false;

  container.innerHTML = `
    <div class="fade-in" style="padding: 1.5rem; max-width: 600px; margin: 0 auto; width: 100%; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; background: #fff1f2;">
      <div>
        <div style="text-align: center; margin-bottom: 1rem;">
          <span style="font-size: 4rem; display: block; animation: heroJump 1s infinite;">${boss.icon}</span>
          <h2 style="color: #991b1b; margin: 0.5rem 0;">Starcie: ${boss.name}</h2>
          <p style="font-size: 0.9rem; color: #7f1d1d;">${boss.description}</p>
        </div>

        <div style="background: white; border: 2px solid ${hasItem ? '#f87171' : '#cbd5e1'}; border-radius: 12px; padding: 1.2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h4 style="margin: 0 0 0.5rem 0; color: #1e293b;">Wymagany rynsztunek:</h4>
          <p style="font-size: 0.85rem; margin: 0 0 1rem 0; color: ${hasItem ? '#15803d' : '#b91c1c'}; font-weight: bold;">
            ${hasItem ? '✅ Posiadasz wymagany przedmiot!' : `❌ Musisz wykuć przedmiot: <strong>${boss.requiredItem.toUpperCase()}</strong> na Targu!`}
          </p>

          <div id="battle-progress-box" style="display: ${hasItem ? 'block' : 'none'};">
            <p style="font-size: 0.85rem; color: #475569; margin-bottom: 0.8rem;">Wykonaj decydującą serię ćwiczeń (${boss.exercisesNeeded} powtórzeń), aby pokonać przeciwnika!</p>
            <div style="background: #e2e8f0; border-radius: 8px; height: 16px; overflow: hidden; margin-bottom: 1rem;">
              <div id="boss-hp-bar" style="width: 0%; height: 100%; background: #ef4444; transition: width 0.3s ease;"></div>
            </div>
            <button id="hit-boss-btn" class="big-button" style="background: #dc2626; color: white;">💥 Zadaj cios (Ćwiczenie)!</button>
          </div>
        </div>
      </div>

      <div>
        <button id="backToMap" class="big-button" style="background: #e2e8f0; color: #333;">⬅ Uciekaj na mapę</button>
      </div>
    </div>
  `;

  document.getElementById('backToMap').addEventListener('click', () => navigate('map'));

  if (hasItem) {
    let progress = 0;
    const hitBtn = document.getElementById('hit-boss-btn');
    const hpBar = document.getElementById('boss-hp-bar');

    hitBtn.addEventListener('click', () => {
      progress++;
      const percent = Math.min(100, (progress / boss.exercisesNeeded) * 100);
      hpBar.style.width = `${percent}%`;

      if (progress >= boss.exercisesNeeded) {
        alert(`🎉 Zwycięstwo! Pokonałeś antagonistę: ${boss.name}! Otrzymujesz tytuł: ${boss.rewardTitle}`);
        user.title = boss.rewardTitle;
        updateUserData(user);
        navigate('map');
      } else {
        hitBtn.textContent = `💥 Zadałeś cios! (${progress}/${boss.exercisesNeeded})`;
      }
    });
  }
}