const CSV_STORAGE_KEY = 'kangoo_csv_database';

const DEFAULT_CSV_DATA = [
  { 
    login: 'szymek', 
    password: '1234', 
    name: 'Szymek', 
    tier: 1, 
    title: 'Młody Pasterz', 
    resources: { drewno: 4, skora: 2, smocze_luski: 0 }, 
    inventory: { kij: 1, siekiera: 0, wlocznia: 0, helm: 0, tarcza: 0 }, 
    unlockedQuests: [1, 2] 
  },
  { 
    login: 'dominik', 
    password: 'abcd', 
    name: 'Dominik', 
    tier: 1, 
    title: 'Młody Pasterz', 
    resources: { drewno: 1, skora: 0, smocze_luski: 0 }, 
    inventory: { kij: 1, siekiera: 0, wlocznia: 0, helm: 0, tarcza: 0 }, 
    unlockedQuests: [1] 
  }
];

export function getDatabase() {
  const saved = localStorage.getItem(CSV_STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(CSV_STORAGE_KEY, JSON.stringify(DEFAULT_CSV_DATA));
    return DEFAULT_CSV_DATA;
  }
  return JSON.parse(saved);
}

export function saveDatabase(db) {
  localStorage.setItem(CSV_STORAGE_KEY, JSON.stringify(db));
}

export function loginAccount(login, password) {
  const db = getDatabase();
  const user = db.find(u => u.login.trim().toLowerCase() === login.trim().toLowerCase());
  if (!user) return { success: false, message: 'Nie znaleziono takiego konta!' };
  if (user.password !== password) return { success: false, message: 'Błędne hasło!' };
  return { success: true, user };
}

export function registerAccount(login, password, name) {
  const db = getDatabase();
  const cleanLogin = login.trim().toLowerCase();
  
  if (!cleanLogin || !password || !name.trim()) return { success: false, message: 'Wypełnij wszystkie pola!' };
  if (db.find(u => u.login === cleanLogin)) return { success: false, message: 'Login jest zajęty!' };

  const newUser = {
    login: cleanLogin,
    password,
    name: name.trim(),
    tier: 1,
    title: 'Młody Pasterz',
    resources: { drewno: 0, skora: 0, smocze_luski: 0 },
    inventory: { kij: 1, siekiera: 0, wlocznia: 0, helm: 0, tarcza: 0 },
    unlockedQuests: [1]
  };

  db.push(newUser);
  saveDatabase(db);
  return { success: true, user: newUser };
}

export function updateUserData(updatedUser) {
  const db = getDatabase();
  const index = db.findIndex(u => u.login === updatedUser.login);
  if (index !== -1) {
    db[index] = updatedUser;
    saveDatabase(db);
  }
}