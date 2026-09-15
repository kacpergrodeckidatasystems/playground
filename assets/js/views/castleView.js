// Kangoo: Royal Castle Social Hub Module
export function renderCastlePC(container, navigate, appState) {
  const user = appState.currentUser;

  container.innerHTML = `
    <div class="fade-in" style="padding: 1.5rem; max-width: 650px; margin: 0 auto; width: 100%; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between; background: #fdfbf7; font-family: sans-serif;">
      <div>
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <h2 style="color: #1e293b; margin: 0 0 5px 0;">🏰 Zamek Królewski</h2>
          <p style="font-size: 0.9rem; color: #64748b; margin: 0;">Centrum życia społecznego, turniejów i audiencji grodu.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          
          <div id="room-throne" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 1.2rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 1rem;" class="castle-room-card">
            <span style="font-size: 2.5rem;">👑</span>
            <div style="flex: 1;">
              <h3 style="margin: 0 0 4px 0; color: #0f172a; font-size: 1.1rem;">Sala Tronowa i Audiencja</h3>
              <p style="margin: 0; font-size: 0.85rem; color: #475569;">Sprawdź swój status, tytuł rycerski i oddaj cześć Królowi.</p>
            </div>
            <span style="font-size: 1.2rem; color: #94a3b8;">▶</span>
          </div>

          <div id="room-ballroom" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 1.2rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 1rem;" class="castle-room-card">
            <span style="font-size: 2.5rem;">💃</span>
            <div style="flex: 1;">
              <h3 style="margin: 0 0 4px 0; color: #0f172a; font-size: 1.1rem;">Sala Balowa (Gra w Berka i Muzyczny Ruch)</h3>
              <p style="margin: 0; font-size: 0.85rem; color: #475569;">Wspólna zabawa grupowa dla dzieci: reakcja na sygnały, zwinność i refleks!</p>
            </div>
            <span style="font-size: 1.2rem; color: #94a3b8;">▶</span>
          </div>

          <div id="room-tournament" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 1.2rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 1rem;" class="castle-room-card">
            <span style="font-size: 2.5rem;">⚔️</span>
            <div style="flex: 1;">
              <h3 style="margin: 0 0 4px 0; color: #0f172a; font-size: 1.1rem;">Sala Turniejowa (Rywalizacja na Czas)</h3>
              <p style="margin: 0; font-size: 0.85rem; color: #475569;">Pojedynki kondycyjne: sprawdź, kto zrobi więcej ćwiczeń na arenie w 30 sekund!</p>
            </div>
            <span style="font-size: 1.2rem; color: #94a3b8;">▶</span>
          </div>

        </div>
      </div>

      <div style="margin-top: 2rem;">
        <button id="backToMap" class="big-button" style="background: #e2e8f0; color: #333; font-weight: bold; border-radius: 8px;">⬅ Powrót do mapy świata</button>
      </div>
    </div>
  `;

  if (!document.getElementById('castleStyles')) {
    const s = document.createElement('style');
    s.id = 'castleStyles';
    s.innerHTML = `
      .castle-room-card:hover { border-color: #0284c7 !important; background: #f0fdf4 !important; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    `;
    document.head.appendChild(s);
  }

  document.getElementById('backToMap').addEventListener('click', () => navigate('map'));

  document.getElementById('room-throne').addEventListener('click', () => {
    alert(`Audiencja u Króla:\n\nBohater: ${user.name}\nAktualny tytuł: ${user.title || 'Pachołek Grodu'}\n\nKról kiwa z uznaniem głową! Kontynuuj misje i pokonaj antagonistów, by zdobyć najwyższy pas rycerski.`);
  });

  document.getElementById('room-ballroom').addEventListener('click', () => {
    alert(`💃 Sala Balowa - Berek Królewski:\n\nTo tryb zabawy dla grupy dzieci!\n1. Jedno dziecko zostaje "Gońcem/Zbiorem".\n2. Reszta ucieka po sali.\n3. Kiedy muzyka w aplikacji ucichnie, wszyscy muszą zastygnąć w bezruchu na jednej nodze jak posągi w zamku!`);
  });

  document.getElementById('room-tournament').addEventListener('click', () => {
    alert(`⚔️ Sala Turniejowa - Pojedynek na Czas:\n\nTryb rywalizacji:\nWybierz ćwiczenie (np. przysiady) i włącz stoper na 30 sekund. Dzieci na zmianę sprawdzają, kto wykona więcej czystych powtórzeń w wyznaczonym czasie!`);
  });
}