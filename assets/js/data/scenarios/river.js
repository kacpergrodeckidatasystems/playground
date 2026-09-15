export const riverScenarios = [
  {
    id: 301,
    location: 'river',
    title: "Przeprawa po Kamieniach",
    icon: "assets/images/icons/river_bridge.png",
    requiredItem: null,
    description: "Przejdź na drugą stronę rzeki po śliskich, wystających kamieniach.",
    reward: "+3 Ryba",
    rewardsObj: { ryba: 3 },
    steps: [
      { type: 'exercise', id: 'swings-jump', name: "Krok 1: Sprężyste Skoki Żabki", target: 4, instruction: "Wykonaj 4 niskie, miękkie skoki obunóż w miejscu.", text: "Skaczemy po kamieniach!", gif: "assets/images/exercises/kangur.gif" },
      { type: 'exercise', id: 'slide-slash', name: "Krok 2: Galop nad Brzegiem", target: 3, instruction: "Zrób 3 szybkie kroki dostawne w bok.", text: "Szybki krok wzdłuż wody.", gif: "assets/images/exercises/galop.gif" },
      { type: 'exercise', id: 'cave-approach', name: "Krok 3: Marsz Wysoki jak Żyrafa", target: 4, instruction: "Podnoś kolana wysoko w górę w miejscu.", text: "Wychodzimy na drugi brzeg.", gif: "assets/images/exercises/zyrafa.gif" },
      { type: 'exercise', id: 'bench-squat', name: "Krok 4: Stanie jak Bocian", target: 3, instruction: "Utrzymaj równowagę na jednej nodze.", text: "Łapiemy balans.", gif: "assets/images/exercises/bocian.gif" }
    ],
    rewardText: "+3 Ryba w plecaku!"
  },
  {
    id: 302,
    location: 'river',
    title: "Łowienie Muszli w Nurcie",
    icon: "assets/images/icons/river_shell.png",
    requiredItem: null,
    description: "Szukaj błyszczących muszli i skarbów na płytkim dnie rzeki.",
    reward: "+2 Ryba, +1 Kamień",
    rewardsObj: { ryba: 2, kamien: 1 },
    steps: [
      { type: 'exercise', id: 'bench-squat', name: "Krok 1: Schylanie po Skarby", target: 4, instruction: "Zrób 4 powolne przysiady z rękami do ziemi.", text: "Schylamy się po muszle.", gif: "assets/images/exercises/przysiad.gif" },
      { type: 'exercise', id: 'cave-approach', name: "Krok 2: Sięganie po Słońce", target: 4, instruction: "Unoś ręce wysoko w górę na palcach stóp.", text: "Suszymy się w słońcu.", gif: "assets/images/exercises/gwiazdy.gif" },
      { type: 'exercise', id: 'bench-squat', name: "Krok 3: Przysiady Małego Rycerza", target: 4, instruction: "Zrób 4 klasyczne przysiady.", text: "Szukamy kolejnych skarbów.", gif: "assets/images/exercises/przysiad.gif" },
      { type: 'exercise', id: 'cave-approach', name: "Krok 4: Cichy Marsz Tyłem", target: 3, instruction: "Stawiaj ostrożne kroki do tyłu.", text: "Wycofujemy się na brzeg.", gif: "assets/images/exercises/marsz_tylem.gif" }
    ],
    rewardText: "+2 Ryba, +1 Kamień zdobyte!"
  },
  {
    id: 303,
    location: 'river',
    title: "Budowa Mostu z Pni",
    icon: "assets/images/icons/river_hammer.png",
    requiredItem: 'mlot',
    description: "Wzmocnij kamienny most solidnymi balami drewna.",
    reward: "+4 Ryba, +3 Drewno",
    rewardsObj: { ryba: 4, drewno: 3 },
    steps: [
      { type: 'exercise', id: 'slide-slash', name: "Krok 1: Wesołe Pajacyki", target: 5, instruction: "Wykonaj 5 bezpiecznych pajacyków.", text: "Rozgrzewamy ramiona do pracy.", gif: "assets/images/exercises/pajacyki.gif" },
      { type: 'exercise', id: 'slide-slash', name: "Krok 2: Wymachy na Krzyż", target: 4, instruction: "Dotykaj prawym łokciem lewego kolana.", text: "Zabezpieczamy kładkę.", gif: "assets/images/exercises/krzyz.gif" },
      { type: 'exercise', id: 'slide-slash', name: "Krok 3: Wiatrak Drwala", target: 4, instruction: "Wykonaj 4 zamaszyste krążenia ramion.", text: "Wzmacniamy konstrukcję.", gif: "assets/images/exercises/wiatrak.gif" },
      { type: 'exercise', id: 'swings-jump', name: "Krok 4: Kroki Giganta", target: 4, instruction: "Zrób 4 duże wykroki w przód.", text: "Testujemy stabilność mostu.", gif: "assets/images/exercises/gigant.gif" }
    ],
    rewardText: "+4 Ryba, +3 Drewno w plecaku!"
  }
];