// assets/js/bosses.js - Baza antagonistów i progresji fabularnej
export const bosses = [
  {
    id: 'bandit',
    name: 'Leśny Zbir',
    icon: '🦹‍♂️',
    tier: 1,
    location: 'forest',
    description: 'Niski łobuz napadający na gościńce. Wymaga podstawowego narzędzia lub broni, aby go przepędzić.',
    requiredItem: 'siekiera',
    exercisesNeeded: 5,
    rewardTitle: 'Obrońca Polany',
    unlockedNext: 'mountains'
  },
  {
    id: 'merc',
    name: 'Czarny Najemnik',
    icon: '🥷',
    tier: 2,
    location: 'mountains',
    description: 'Najemnik z zamorskich krain, który zablokował przejście w górach. Wymaga solidnej tarczy i hełmu!',
    requiredItem: 'tarcza',
    exercisesNeeded: 6,
    rewardTitle: 'Strażnik Szlaku',
    unlockedNext: 'river'
  },
  {
    id: 'wizard',
    name: 'Cieniowy Czarownik',
    icon: '🧙‍♂️',
    tier: 3,
    location: 'castle',
    description: 'Mroczny mag zagrażający bramom królestwa. Pokonaj go, by zasłużyć na audiencję u Króla!',
    requiredItem: 'zbroja',
    exercisesNeeded: 8,
    rewardTitle: 'Pasowany Rycerz Królestwa 🛡️👑',
    unlockedNext: 'victory'
  }
];