export const fieldScenarios = [
  {
    id: 401,
    location: 'field',
    title: "Zbiór Złotych Kłosów",
    icon: "assets/images/icons/field_wheat.png",
    requiredItem: null,
    description: "Pomóż w żniwach na polach pszenicy u podnóża zamku.",
    reward: "+4 Zboże",
    rewardsObj: { zboze: 4 },
    steps: [
      { type: 'exercise', id: 'bench-squat', name: "Krok 1: Podnoszenie Snopów", target: 4, instruction: "Zrób 4 stabilne przysiady z dźwiganiem.", text: "Zbieramy złociste zboże.", gif: "assets/images/exercises/przysiad.gif" },
      { type: 'exercise', id: 'cave-approach', name: "Krok 2: Marsz Żniwiarza", target: 4, instruction: "Marsz w miejscu z wysokim podnoszeniem kolan.", text: "Niesiemy plony do spichlerza.", gif: "assets/images/exercises/zyrafa.gif" },
      { type: 'exercise', id: 'slide-slash', name: "Krok 3: Obroty Wiatrak", target: 4, instruction: "Wykonaj 4 obroty tułowia w lewo i prawo.", text: "Rozglądamy się po polu.", gif: "assets/images/exercises/wiatrak.gif" },
      { type: 'exercise', id: 'cave-approach', name: "Krok 4: Sięganie po Gwiazdy", target: 4, instruction: "Unoś się powoli wysoko na palcach stóp.", text: "Układamy plony wysoko.", gif: "assets/images/exercises/gwiazdy.gif" }
    ],
    rewardText: "+4 Zboże w plecaku!"
  },
  {
    id: 402,
    location: 'field',
    title: "Wypas Owiec na Łące",
    icon: "assets/images/icons/field_sheep.png",
    requiredItem: null,
    description: "Zagonij uciekające owieczki z powrotem do bezpiecznej zagrody.",
    reward: "+2 Zboże, +2 Skóra",
    rewardsObj: { zboze: 2, skora: 2 },
    steps: [
      { type: 'exercise', id: 'cave-approach', name: "Krok 1: Szybki Bieg w Miejscu", target: 4, instruction: "Wykonaj 4 szybkie kroki w miejscu.", text: "Zaganiamy delikatnie stado.", gif: "assets/images/exercises/bieg.gif" },
      { type: 'exercise', id: 'bench-squat', name: "Krok 2: Wesoły Bocian", target: 3, instruction: "Stojąc na jednej nodze, utrzymaj równowagę.", text: "Pilnujemy spokojnego wypasu.", gif: "assets/images/exercises/bocian.gif" },
      { type: 'exercise', id: 'slide-slash', name: "Krok 3: Wesoły Galop Konika", target: 4, instruction: "Zrób 4 kroki dostawne w bok.", text: "Okrążamy owieczki.", gif: "assets/images/exercises/galop.gif" },
      { type: 'exercise', id: 'bench-squat', name: "Krok 4: Przysiady Małego Rycerza", target: 4, instruction: "Zrób 4 klasyczne przysiady.", text: "Zamykamy furtkę zagrody.", gif: "assets/images/exercises/przysiad.gif" }
    ],
    rewardText: "+2 Zboże, +2 Skóra w plecaku!"
  },
  {
    id: 403,
    location: 'field',
    title: "Naprawa Płotu Zagrody",
    icon: "assets/images/icons/field_fence.png",
    requiredItem: 'mlot',
    description: "Wzmocnij drewniany płot zagrody solidnymi gwoździami i balami.",
    reward: "+4 Zboże, +3 Drewno",
    rewardsObj: { zboze: 4, drewno: 3 },
    steps: [
      { type: 'exercise', id: 'slide-slash', name: "Krok 1: Obroty Wiatrak", target: 5, instruction: "Wykonaj 5 obrotów tułowia w lewo i prawo.", text: "Naprawiamy przęsło płotu.", gif: "assets/images/exercises/wiatrak.gif" },
      { type: 'exercise', id: 'cave-approach', name: "Krok 2: Wspięcia Gospodarza", target: 4, instruction: "Zrób 4 wspięcia na palce stóp z rękami w górę.", text: "Wzmacniamy bramę.", gif: "assets/images/exercises/gwiazdy.gif" },
      { type: 'exercise', id: 'slide-slash', name: "Krok 3: Wesołe Pajacyki", target: 4, instruction: "Wykonaj 4 bezpieczne pajacyki.", text: "Cieszymy się z ogrodzenia.", gif: "assets/images/exercises/pajacyki.gif" },
      { type: 'exercise', id: 'slide-slash', name: "Krok 4: Wymachy na Krzyż", target: 4, instruction: "Dotykaj prawym łokciem lewego kolana.", text: "Sprawdzamy gospodarstwo.", gif: "assets/images/exercises/krzyz.gif" }
    ],
    rewardText: "+4 Zboże, +3 Drewno zdobyte!"
  }
];