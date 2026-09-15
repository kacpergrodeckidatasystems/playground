export const mountainScenarios = [
  {
    id: 101,
    location: 'mountains',
    title: "Wspinaczka po Kamiennej Ścieżce",
    icon: "assets/images/icons/mountain_climb.png",
    requiredItem: null,
    description: "Pokonaj strome zbocze, stawiając mocne i stabilne kroki.",
    reward: "+3 Kamień",
    rewardsObj: { kamien: 3 },
    steps: [
      { type: 'exercise', id: 'cave-approach', name: "Krok 1: Marsz Wysoki jak Żyrafa", target: 4, instruction: "Podnoś kolana wysoko w górę w miejscu.", text: "Podnosimy wysoko kolana!", gif: "assets/images/exercises/zyrafa.gif" },
      { type: 'exercise', id: 'swings-jump', name: "Krok 2: Miękkie Skoki Kangura", target: 4, instruction: "Wykonaj 4 lekkie skoki obunóż, lądując na miękkie kolana.", text: "Przeskakujemy przez głazy!", gif: "assets/images/exercises/kangur.gif" },
      { type: 'exercise', id: 'cave-approach', name: "Krok 3: Kroki Giganta", target: 4, instruction: "Zrób 4 duże, kontrolowane wykroki w przód.", text: "Pokonujemy stromy usypisk.", gif: "assets/images/exercises/gigant.gif" },
      { type: 'exercise', id: 'swings-jump', name: "Krok 4: Sięganie po Gwiazdy", target: 4, instruction: "Unoś się powoli wysoko na palcach stóp i opuszczaj na pięty.", text: "Złap równowagę na półce skalnej.", gif: "assets/images/exercises/gwiazdy.gif" }
    ],
    rewardText: "+3 Kamień trafia do plecaka!"
  },
  {
    id: 102,
    location: 'mountains',
    title: "Ratowanie Kozice na Skale",
    icon: "assets/images/icons/mountain_goat.png",
    requiredItem: null,
    description: "Mała kozica utknęła na półce skalnej. Pomóż jej zejść!",
    reward: "+2 Kamień, +1 Skóra",
    rewardsObj: { kamien: 2, skora: 1 },
    steps: [
      { type: 'exercise', id: 'bench-squat', name: "Krok 1: Przysiady Małego Rycerza", target: 4, instruction: "Zrób 4 klasyczne przysiady z prostymi plecami.", text: "Przeciskamy się przez szczelinę.", gif: "assets/images/exercises/przysiad.gif" },
      { type: 'exercise', id: 'slide-slash', name: "Krok 2: Wesoły Galop Konika", target: 4, instruction: "Zrób 4 kroki dostawne w bok.", text: "Odsuniemy mały kamień.", gif: "assets/images/exercises/galop.gif" },
      { type: 'exercise', id: 'bench-squat', name: "Krok 3: Stanie jak Bocian", target: 3, instruction: "Utrzymaj równowagę, stojąc na jednej nodze.", text: "Rozglądamy się czujnie.", gif: "assets/images/exercises/bocian.gif" },
      { type: 'exercise', id: 'cave-approach', name: "Krok 4: Szybki Bieg w Miejscu", target: 4, instruction: "Wykonaj 4 szybkie, energiczne kroki w miejscu.", text: "Uciekamy w bezpieczne miejsce.", gif: "assets/images/exercises/bieg.gif" }
    ],
    rewardText: "+2 Kamień, +1 Skóra w plecaku!"
  },
  {
    id: 103,
    location: 'mountains',
    title: "Zdobycie Lodowego Szczytu",
    icon: "assets/images/icons/mountain_peak.png",
    requiredItem: 'lina',
    description: "Wejście na najwyższy, ośnieżony szczyt górski z użyciem liny.",
    reward: "+5 Kamień, +2 Drewno",
    rewardsObj: { kamien: 5, drewno: 2 },
    steps: [
      { type: 'exercise', id: 'cave-approach', name: "Krok 1: Sięganie po Gwiazdy", target: 5, instruction: "Unoś się powoli wysoko na palcach stóp i opuszczaj na pięty.", text: "Zaczepiamy linę i pociągamy.", gif: "assets/images/exercises/gwiazdy.gif" },
      { type: 'exercise', id: 'swings-jump', name: "Krok 2: Kroki Giganta", target: 4, instruction: "Zrób 4 duże, kontrolowane wykroki w przód.", text: "Stawiamy mocne kroki na lodzie.", gif: "assets/images/exercises/gigant.gif" },
      { type: 'exercise', id: 'swings-jump', name: "Krok 3: Miękkie Skoki Kangura", target: 4, instruction: "Wykonaj 4 lekkie skoki obunóż w miejscu.", text: "Przeskakujemy pęknięcia w lodowcu.", gif: "assets/images/exercises/kangur.gif" },
      { type: 'exercise', id: 'cave-approach', name: "Krok 4: Marsz Wysoki jak Żyrafa", target: 4, instruction: "Podnoś kolana wysoko w górę w miejscu.", text: "Ostatnie metry na szczyt.", gif: "assets/images/exercises/zyrafa.gif" }
    ],
    rewardText: "+5 Kamień, +2 Drewno zdobyte!"
  }
];