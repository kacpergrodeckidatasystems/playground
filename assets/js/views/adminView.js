// assets/js/admin.js - Panel Administratora z ikonkami surowców i edycją liczbową w Kuźni
import { scenarios } from '../data/scenarios/scenarios.js';

export function renderAdmin(container) {
  let currentScenarios = JSON.parse(localStorage.getItem('kplay_scenarios')) || scenarios;
  
  // Domyślne przepisy z obiektem kosztów surowcowych
  let craftRecipes = JSON.parse(localStorage.getItem('kplay_craft_recipes')) || [
    { id: 'siekiera', name: 'Siekiera Drwala', icon: '🪓', desc: 'Wymagana do wycinki starego dębu', cost: { drewno: 3, kamien: 0, ryba: 0, zboze: 0, skora: 0 } },
    { id: 'lina', name: 'Lina Wspinaczkowa', icon: '🪢', desc: 'Wymagana do zdobycia lodowego szczytu', cost: { drewno: 0, kamien: 3, ryba: 0, zboze: 0, skora: 0 } },
    { id: 'mlot', name: 'Kowalski Młot', icon: '🔨', desc: 'Wymagany do naprawy płotu i mostu', cost: { drewno: 2, kamien: 0, ryba: 3, zboze: 0, skora: 0 } },
    { id: 'miecz', name: 'Miecz Rycerski', icon: '🗡️', desc: 'Ekwipunek rycerski do walki i obrony', cost: { drewno: 0, kamien: 5, ryba: 0, zboze: 0, skora: 2 } },
    { id: 'helm', name: 'Żelazny Hełm', icon: '🪖', desc: 'Element zbroi chroniący głowę', cost: { drewno: 0, kamien: 4, ryba: 0, zboze: 0, skora: 1 } },
    { id: 'tarcza', name: 'Drewniana Tarcza', icon: '🛡️', desc: 'Przedmiot obronny do misji specjalnych', cost: { drewno: 4, kamien: 0, ryba: 0, zboze: 0, skora: 2 } },
    { id: 'zbroja', name: 'Pełna Zbroja', icon: '🛡️✨', desc: 'Pełny pancerz potrzebny w trudnych lokacjach', cost: { drewno: 3, kamien: 6, ryba: 0, zboze: 0, skora: 4 } }
  ];

  container.innerHTML = `
    <div style="max-width: 1050px; margin: 2rem auto; padding: 25px; background: #ffffff; border-radius: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      
      <!-- Nagłówek -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eaeaea; padding-bottom: 15px; margin-bottom: 20px;">
        <div>
          <h2 style="margin: 0; color: #2c3e50;">🛠️ Panel Administratora i Tworzenia</h2>
          <p style="margin: 5px 0 0 0; color: #7f8c8d; font-size: 14px;">Zarządzaj misjami, edytuj cele ćwiczeń oraz skonfiguruj koszta surowcowe w Kuźni</p>
        </div>
        <div>
          <button id="admin-back-btn" style="background: #3498db; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600;">← Powrót do Mapy</button>
        </div>
      </div>

      <!-- Pasek akcji -->
      <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
        <button id="admin-export-btn" style="background: #2ecc71; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-size: 13px;">📥 Eksportuj JSON</button>
        <button id="admin-save-storage-btn" style="background: #9b59b6; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-size: 13px;">💾 Zapisz wszystkie zmiany</button>
        <button id="admin-reset-btn" style="background: #e74c3c; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-size: 13px;">🔄 Resetuj do domyślnych</button>
      </div>

      <!-- Okno eksportu -->
      <div id="export-container" style="display: none; margin-bottom: 20px;">
        <label style="font-weight: bold; font-size: 13px; color: #333;">Wygenerowany kod JSON (scenariusze):</label>
        <textarea id="export-output" readonly style="width: 100%; height: 100px; margin-top: 5px; padding: 10px; font-family: monospace; font-size: 12px; border: 1px solid #ccc; border-radius: 6px; background: #fdfdfd;"></textarea>
      </div>

      <!-- ZAKŁADKI (TABS) NA GÓRZE -->
      <div style="display: flex; gap: 5px; border-bottom: 2px solid #cbd5e1; margin-bottom: 20px;">
        <button class="admin-tab-btn active" data-tab="tab-missions" style="padding: 10px 20px; background: #0ea5e9; color: white; border: none; border-radius: 8px 8px 0 0; cursor: pointer; font-weight: 600; font-size: 14px;">📋 Spis Misji i Edycja</button>
        <button class="admin-tab-btn" data-tab="tab-craft" style="padding: 10px 20px; background: #e2e8f0; color: #475569; border: none; border-radius: 8px 8px 0 0; cursor: pointer; font-weight: 600; font-size: 14px;">⚒️ Kuźnia (Ikonki surowców)</button>
        <button class="admin-tab-btn" data-tab="tab-items" style="padding: 10px 20px; background: #e2e8f0; color: #475569; border: none; border-radius: 8px 8px 0 0; cursor: pointer; font-weight: 600; font-size: 14px;">📦 Przedmioty i Surowce</button>
      </div>

      <!-- ================= TAB 1: SPIS MISJI I EDYCJA ================= -->
      <div id="tab-missions" class="admin-tab-content">
        <div style="background: #eef2f7; border: 1px solid #cbd5e1; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
          <h3 style="margin-top: 0; color: #1e293b;">🎯 Edytor Celów Powtórzeń w Misjach</h3>
          <p style="font-size: 13px; color: #475569;">Wybierz misję z listy rozwijanej, aby edytować liczbę powtórzeń jej kroków:</p>
          
          <div style="margin-bottom: 15px;">
            <select id="mission-select" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #94a3b8; font-size: 14px; background: white;">
              <option value="">-- Wybierz misję do edycji --</option>
              ${currentScenarios.map(m => `<option value="${m.id}">[${m.location.toUpperCase()}] ID ${m.id}: ${m.title}</option>`).join('')}
            </select>
          </div>

          <div id="mission-editor-area" style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; display: none;"></div>
        </div>

        <h3 style="color: #34495e; margin-bottom: 15px;">Podgląd wszystkich misji</h3>
        <div style="display: flex; flex-direction: column; gap: 15px;">
          ${currentScenarios.map(mission => `
            <div style="background: #f8f9fa; border: 1px solid #e9ecef; border-left: 5px solid #3498db; padding: 15px; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="background: #e1f5fe; color: #0288d1; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">ID: ${mission.id} | Lokacja: ${mission.location.toUpperCase()}</span>
                <span style="color: #27ae60; font-weight: bold; font-size: 13px;">Nagroda: ${mission.reward}</span>
              </div>
              <h4 style="margin: 8px 0 4px 0; color: #2c3e50; font-size: 16px;">${mission.title}</h4>
              <p style="margin: 0 0 10px 0; color: #666; font-size: 13px;">${mission.description}</p>
              ${mission.requiredItem ? `<div style="font-size: 12px; color: #d35400; margin-bottom: 8px;">🔒 Wymaga przedmiotu: <strong>${mission.requiredItem}</strong></div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ================= TAB 2: KUŹNIA (IKONKI I LICZBY SUROWCÓW) ================= -->
      <div id="tab-craft" class="admin-tab-content" style="display: none;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 10px;">
          <h3 style="margin-top: 0; color: #1e293b;">⚒️ Edytor Kosztów Surowcowych w Kuźni</h3>
          <p style="font-size: 13px; color: #64748b; margin-bottom: 20px;">Wpisz liczby pod odpowiednimi ikonkami surowców, aby określić, co jest potrzebne do wykucia danego przedmiotu:</p>
          
          <div style="display: flex; flex-direction: column; gap: 15px;" id="craft-recipes-list">
            ${craftRecipes.map((recipe, index) => `
              <div style="background: white; border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                  <span style="font-size: 2rem; width: 40px; text-align: center;">${recipe.icon}</span>
                  <div style="flex: 1;">
                    <label style="font-size: 11px; color: #64748b; display: block; font-weight: bold;">Nazwa przedmiotu (ID: ${recipe.id}):</label>
                    <input type="text" value="${recipe.name}" data-craft-index="${index}" data-field="name" style="width: 100%; padding: 6px; border: 1px solid #cbd5e1; border-radius: 4px; font-weight: 600;">
                  </div>
                </div>

                <!-- Panel ikon surowców z polami liczbowymi -->
                <div>
                  <label style="font-size: 12px; color: #334155; font-weight: bold; display: block; margin-bottom: 6px;">Wymagane ilości surowców:</label>
                  <div style="display: flex; gap: 12px; flex-wrap: wrap; background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    
                    <div style="text-align: center;">
                      <span style="font-size: 1.3rem; display: block;" title="Drewno">🪵</span>
                      <input type="number" min="0" max="30" value="${recipe.cost.drewno || 0}" data-craft-index="${index}" data-res="drewno" style="width: 55px; padding: 4px; text-align: center; border: 1px solid #cbd5e1; border-radius: 4px; font-weight: bold; background: #fff;">
                      <span style="font-size: 10px; color: #64748b; display: block; margin-top: 2px;">Drewno</span>
                    </div>

                    <div style="text-align: center;">
                      <span style="font-size: 1.3rem; display: block;" title="Kamień">🪨</span>
                      <input type="number" min="0" max="30" value="${recipe.cost.kamien || 0}" data-craft-index="${index}" data-res="kamien" style="width: 55px; padding: 4px; text-align: center; border: 1px solid #cbd5e1; border-radius: 4px; font-weight: bold; background: #fff;">
                      <span style="font-size: 10px; color: #64748b; display: block; margin-top: 2px;">Kamień</span>
                    </div>

                    <div style="text-align: center;">
                      <span style="font-size: 1.3rem; display: block;" title="Ryba">🐟</span>
                      <input type="number" min="0" max="30" value="${recipe.cost.ryba || 0}" data-craft-index="${index}" data-res="ryba" style="width: 55px; padding: 4px; text-align: center; border: 1px solid #cbd5e1; border-radius: 4px; font-weight: bold; background: #fff;">
                      <span style="font-size: 10px; color: #64748b; display: block; margin-top: 2px;">Ryba</span>
                    </div>

                    <div style="text-align: center;">
                      <span style="font-size: 1.3rem; display: block;" title="Zboże">🌾</span>
                      <input type="number" min="0" max="30" value="${recipe.cost.zboze || 0}" data-craft-index="${index}" data-res="zboze" style="width: 55px; padding: 4px; text-align: center; border: 1px solid #cbd5e1; border-radius: 4px; font-weight: bold; background: #fff;">
                      <span style="font-size: 10px; color: #64748b; display: block; margin-top: 2px;">Zboże</span>
                    </div>

                    <div style="text-align: center;">
                      <span style="font-size: 1.3rem; display: block;" title="Skóra">🦌</span>
                      <input type="number" min="0" max="30" value="${recipe.cost.skora || 0}" data-craft-index="${index}" data-res="skora" style="width: 55px; padding: 4px; text-align: center; border: 1px solid #cbd5e1; border-radius: 4px; font-weight: bold; background: #fff;">
                      <span style="font-size: 10px; color: #64748b; display: block; margin-top: 2px;">Skóra</span>
                    </div>

                  </div>
                </div>

              </div>
            `).join('')}
          </div>
          
          <button id="save-craft-btn" style="margin-top: 20px; background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px;">Zapisz zmiany w Kuźni</button>
        </div>
      </div>

      <!-- ================= TAB 3: PRZEDMIOTY I SUROWCE ================= -->
      <div id="tab-items" class="admin-tab-content" style="display: none;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 10px;">
            <h3 style="margin-top: 0; color: #0f172a; border-bottom: 2px solid #cbd5e1; padding-bottom: 8px;">🌾 Dostępne Surowce (Zasoby)</h3>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155; line-height: 1.8;">
              <li><strong>Zboże (🌾)</strong> – zdobywane na polach.</li>
              <li><strong>Drewno (🪵)</strong> – pozyskiwane w lesie, górach i nad rzeką.</li>
              <li><strong>Kamień (🪨)</strong> – wydobywany w górach i rzece.</li>
              <li><strong>Ryba (🐟)</strong> – łowiona w rzece.</li>
              <li><strong>Skóra (🦌)</strong> – zdobywana przy wypasie owiec, lisach i kozicach.</li>
            </ul>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 10px;">
            <h3 style="margin-top: 0; color: #0f172a; border-bottom: 2px solid #cbd5e1; padding-bottom: 8px;">⚔️ Ekwipunek i Narzędzia</h3>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155; line-height: 1.8;">
              <li><strong>Młot (mlot)</strong> – wymagany do naprawy płotu i mostu.</li>
              <li><strong>Siekiera (siekiera)</strong> – wymagana do wycinki starego dębu.</li>
              <li><strong>Lina (lina)</strong> – wymagana do zdobycia lodowego szczytu.</li>
              <li><strong>Miecz</strong> – ekwipunek rycerski do walki i obrony.</li>
              <li><strong>Hełm</strong> – element zbroi chroniący głowę.</li>
              <li><strong>Tarcza</strong> – przedmiot obronny do misji specjalnych.</li>
              <li><strong>Zbroja</strong> – pełny pancerz potrzebny w trudnych lokacjach.</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  `;

  // Obsługa zakładek (Tabs)
  const tabButtons = document.querySelectorAll('.admin-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabButtons.forEach(b => {
        b.style.background = '#e2e8f0';
        b.style.color = '#475569';
        b.classList.remove('active');
      });
      document.querySelectorAll('.admin-tab-content').forEach(c => c.style.display = 'none');
      
      const targetTab = e.currentTarget.getAttribute('data-tab');
      e.currentTarget.style.background = '#0ea5e9';
      e.currentTarget.style.color = 'white';
      e.currentTarget.classList.add('active');
      document.getElementById(targetTab).style.display = 'block';
    });
  });

  // Obsługa edytora celów misji
  const selectEl = document.getElementById('mission-select');
  const editorArea = document.getElementById('mission-editor-area');

  selectEl.addEventListener('change', (e) => {
    const missionId = Number(e.target.value);
    if (!missionId) {
      editorArea.style.display = 'none';
      editorArea.innerHTML = '';
      return;
    }
    const mission = currentScenarios.find(m => m.id === missionId);
    if (!mission) return;

    editorArea.style.display = 'block';
    editorArea.innerHTML = `
      <h4 style="margin: 0 0 10px 0; color: #1e293b;">Edytujesz cele dla: <em>${mission.title}</em></h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${mission.steps.map((step, sIdx) => `
          <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 8px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
            <span style="font-size: 13px; font-weight: 500;">Krok ${sIdx + 1}: ${step.name}</span>
            <div style="display: flex; align-items: center; gap: 8px;">
              <label style="font-size: 12px; color: #475569;">Powtórzenia:</label>
              <input type="number" data-step-index="${sIdx}" value="${step.target}" min="1" max="30" style="width: 60px; padding: 4px; border: 1px solid #cbd5e1; border-radius: 4px; text-align: center; font-weight: bold;">
            </div>
          </div>
        `).join('')}
      </div>
      <button id="save-mission-edits" style="margin-top: 12px; background: #0ea5e9; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;">Zapisz zmiany w tej misji</button>
    `;

    document.getElementById('save-mission-edits').addEventListener('click', () => {
      const inputs = editorArea.querySelectorAll('input[type="number"]');
      inputs.forEach(input => {
        const sIdx = Number(input.getAttribute('data-step-index'));
        mission.steps[sIdx].target = Number(input.value);
      });
      localStorage.setItem('kplay_scenarios', JSON.stringify(currentScenarios));
      alert('Zaktualizowano cele powtórzeń dla tej misji!');
    });
  });

  // Zapis przepisów kuźni (wraz z ikonkowymi zasobami)
  document.getElementById('save-craft-btn').addEventListener('click', () => {
    const nameInputs = document.querySelectorAll('#craft-recipes-list input[data-field="name"]');
    nameInputs.forEach(input => {
      const idx = Number(input.getAttribute('data-craft-index'));
      craftRecipes[idx].name = input.value;
    });

    const resInputs = document.querySelectorAll('#craft-recipes-list input[data-res]');
    resInputs.forEach(input => {
      const idx = Number(input.getAttribute('data-craft-index'));
      const resKey = input.getAttribute('data-res');
      craftRecipes[idx].cost[resKey] = Number(input.value) || 0;
    });

    localStorage.setItem('kplay_craft_recipes', JSON.stringify(craftRecipes));
    alert('Zapisano nowe koszta surowcowe w Kuźni!');
  });

  // Przyciski ogólne
  document.getElementById('admin-back-btn').addEventListener('click', () => {
    window.location.hash = '#map';
  });

  document.getElementById('admin-save-storage-btn').addEventListener('click', () => {
    localStorage.setItem('kplay_scenarios', JSON.stringify(currentScenarios));
    localStorage.setItem('kplay_craft_recipes', JSON.stringify(craftRecipes));
    alert('Wszystkie zmiany zostały pomyślnie zapisane w pamięci przeglądarki!');
    location.reload();
  });

  document.getElementById('admin-export-btn').addEventListener('click', () => {
    const area = document.getElementById('export-container');
    const output = document.getElementById('export-output');
    area.style.display = 'block';
    output.value = JSON.stringify(currentScenarios, null, 2);
  });

  document.getElementById('admin-reset-btn').addEventListener('click', () => {
    if (confirm('Czy na pewno chcesz zresetować wszystkie modyfikacje?')) {
      localStorage.removeItem('kplay_scenarios');
      localStorage.removeItem('kplay_craft_recipes');
      location.reload();
    }
  });
}