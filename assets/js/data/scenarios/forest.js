export const forestScenarios = [
  {
    id: 201,
    location: 'forest',
    title: "Zbieranie Jagód i Ziół",
    icon: "assets/images/icons/forest_berries.png",
    requiredItem: null,
    description: "Przeszukaj leśne ściółki w poszukiwaniu smacznych leśnych skarbów.",
    reward: "+3 Drewno",
    rewardsObj: { drewno: 3 },
    steps: [
      { type: 'exercise', id: 'bench-squat', name: "Krok 1: Zbieranie z Krzaczków", target: 4, instruction: "Zrób 4 płytkie, bezpieczne przysiady.", text: "Szukamy najsłodszych jagód.", gif: "assets/images/exercises/przysiad.gif" },
      { type: 'exercise', id: 'cave-approach', name: "Krok 2: Marsz przez Gęstwinę", target: 4, instruction: "Wykonaj 4 kroki w miejscu z wysokim unoszeniem kolan.", text: "Idziemy przez gęste krzaki malin.", gif: "assets/images/exercises/zyrafa.gif" },
      { type: 'exercise', id: 'slide-slash', name: "Krok 3: Obroty Wiatrak", target: 4, instruction: "Wykonaj 4 bezpieczne obroty tułowia w lewo i prawo.", text: "Rozglądamy się za grzybkami.", gif: "assets/images/exercises/wiatrak.gif" },
      { type: 'exercise', id: 'cave-approach', name: "Krok 4: Wspięcia Gospodarza", target: 4, instruction: "Zrób 4 wspięcia na palce stóp z rękami w górę.", text: "Sięgamy po wyższe gałązki.", gif: "assets/images/exercises/gwiazdy.gif" }
    ],
    rewardText: "+3 Drewno trafia do plecaka!"
  },
  {
    id: 202,
    location: 'forest',
    title: "Tropienie Leśnego Liska",
    icon: "assets/images/icons/forest_fox.png",
    requiredItem: null,
    description: "Podążaj za śladami rudego liska w głąb puszczy.",
    reward: "+2 Drewno, +1 Skóra",
    rewardsObj: { drewno: 2, skora: 1 },
    steps: [
      { type: 'exercise', id: 'cave-approach', name: "Krok 1: Cichy Marsz Tyłem", target: 4, instruction: "Stawiaj ostrożne, powolne kroki do tyłu.", text: "Idziemy cicho za liskiem.", gif: "assets/images/exercises/marsz_tylem.gif" },
      { type: 'exercise', id: 'bench-squat', name: "Krok 2: Stanie jak Bocian", target: 3, instruction: "Utrzymaj równowagę, stojąc na jednej nodze.", text: "Nasłuchujemy szelestów.", gif: "assets/images/exercises/bocian.gif" },
      { type: 'exercise', id: 'slide-slash', name: "Krok 3: Wesoły Galop Konika", target: 4, instruction: "Zrób 4 kroki dostawne w bok.", text: "Podążamy sprawnie ścieżką.", gif: "assets/images/exercises/galop.gif" },
      { type: 'exercise', id: 'cave-approach', name: "Krok 4: Szybki Bieg w Miejscu", target: 4, instruction: "Wykonaj 4 szybkie, energiczne kroki w miejscu.", text: "Wskakujemy na polanę.", gif: "assets/images/exercises/bieg.gif" }
    ],
    rewardText: "+2 Drewno, +1 Skóra zdobyte!"
  },
  {
    id: 203,
    location: 'forest',
    title: "Wycinka Starego Dębu",
    icon: "assets/images/icons/forest_axe.png",
    requiredItem: 'siekiera',
    description: "Pozyskanie potężnych pni drewna na rozbudowę zamku.",
    reward: "+6 Drewno",
    rewardsObj: { drewno: 6 },
    steps: [
      { type: 'exercise', id: 'slide-slash', name: "Krok 1: Wiatrak Drwala", target: 5, instruction: "Wykonaj 5 zamaszystych krążeń ramion w przód.", text: "Pracujemy z narzędziem.", gif: "assets/images/exercises/wiatrak.gif" },
      { type: 'exercise', id: 'slide-slash', name: "Krok 2: Skręty Tułowia", target: 4, instruction: "Zrób 4 obroty tułowia w lewo i prawo.", text: "Przygotowujemy pień do transportu.", gif: "assets/images/exercises/skrety.gif" },
      { type: 'exercise', id: 'slide-slash', name: "Krok 3: Wesołe Pajacyki", target: 4, instruction: "Wykonaj 4 bezpieczne pajacyki.", text: "Cieszymy się z udanej wycinki.", gif: "assets/images/exercises/pajacyki.gif" },
      { type: 'exercise', id: 'cave-approach', name: "Krok 4: Sięganie po Gwiazdy", target: 4, instruction: "Unoś się powoli wysoko na palcach stóp.", text: "Porządkujemy stos drewna.", gif: "assets/images/exercises/gwiazdy.gif" }
    ],
    rewardText: "+6 Drewno w plecaku!"
  }
];