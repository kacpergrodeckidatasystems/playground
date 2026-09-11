export const scenarios = [
  {
    id: 1,
    title: "Walka ze smokiem",
    icon: "🐉",
    mainGif: "assets/gifs/ziejacy-smok.gif",
    description: "Ocal plac zabaw przed Smokiem Gadułą w pełnej przygód historii!",
    steps: [
      { 
        type: 'exercise',
        id: 'cave-approach', 
        name: "Krok 1: Wejście do Smoczej Doliny", 
        target: 3, 
        instruction: "Smok zablokował ścieżkę! Zrób 3 zdecydowane kroki w przód, trzymając telefon w opasce.",
        obstacle: "Ziemia drży od pomruków bestii!",
        gif: "assets/gifs/bieg.gif"
      },
      { 
        type: 'story',
        name: "Przystanek: Ucieczka do Parku", 
        text: "Brawo! Pierwszy cios zaskoczył bestię. Smok Gaduła rzuca się do ucieczki i pędzi w stronę strefy z huśtawkami!",
        gif: "assets/gifs/latajacy-smok.gif"
      },
      { 
        type: 'exercise',
        id: 'swings-jump', 
        name: "Krok 2: Ognisty Oddech (Huśtawki)", 
        target: 5, 
        instruction: "Smok ział ogniem w okolicy huśtawek! Wykonaj 5 wysokich Skoków Kangura, aby przeskoczyć fale dymu.",
        obstacle: "Gorąca fala pod stopami!",
        gif: "assets/gifs/ziejacy-smok.gif"
      },
      { 
        type: 'story',
        name: "Przystanek: Pułapka przy Ławce", 
        text: "Udało się przeskoczyć ogień! Smok czuje się osaczony i chowa się tuż obok parkowej ławki.",
        gif: "assets/gifs/rycerz-chodzacy.gif"
      },
      { 
        type: 'exercise',
        id: 'bench-squat', 
        name: "Krok 3: Magiczna Tarcza (Przy Ławce)", 
        target: 5, 
        instruction: "Zrób 5 Przysiadów Mocy, chroniąc się bezpiecznie obok parkowej ławki.",
        obstacle: "Magiczna bariera smoka!",
        gif: "assets/gifs/rycerz-walczacy.gif"
      },
      { 
        type: 'story',
        name: "Przystanek: W stronę Zjeżdżalni", 
        text: "Tarcza wytrzymała! Smok traci siły i wspina się na zjeżdżalnię.",
        gif: "assets/gifs/latajacy-smok.gif"
      },
      { 
        type: 'exercise',
        id: 'slide-slash', 
        name: "Krok 4: Ogon-Lawina (Zjeżdżalnia)", 
        target: 5, 
        instruction: "Bestia macha ostrym ogonem ze zjeżdżalni! Wykonaj 5 dynamicznych Cięć Mieczem.",
        obstacle: "Ostry ogon smoka blokuje zjeżdżalnię!",
        gif: "assets/gifs/rycerz-walczacy.gif"
      },
      { 
        type: 'story',
        name: "Przystanek: Finał Starcia", 
        text: "Ostatnia prosta! Smok szykuje swój najgłośniejszy ryk.",
        gif: "assets/gifs/ziejacy-smok.gif"
      },
      { 
        type: 'exercise',
        id: 'dragon-roar', 
        name: "Krok 5: Ostateczne Piorunujące Uderzenie", 
        target: 5, 
        instruction: "Zadaj ostateczny cios – zrób 5 szybkich wymachów telefonem w opasce!",
        obstacle: "Ostatnia linia obrony smoka!",
        gif: "assets/gifs/rycerz-walczacy.gif"
      }
    ],
    reward: "Legendarna Odznaka Pogromcy Smoków 🛡️🐉"
  },
  { id: 2, title: "Uratuj królewnę", icon: "👸", description: "Otwórz bramy zamku szybkimi przysiadami!", steps: [], reward: "Odznaka Królewskiego Obrońcy" },
  { id: 3, title: "Poszukiwacz skarbu", icon: "💎", description: "Odszukaj ukryte klejnoty na placu!", steps: [], reward: "Odznaka Odkrywcy" },
  { id: 4, title: "Ucieczka przed lawą", icon: "🌋", description: "Biegnij w miejscu, zanim lawa cię dosięgnie!", steps: [], reward: "Odznaka Szybkiego Stópki" },
  { id: 5, title: "Wspinaczka na Górę", icon: "⛰️", description: "Wspinaj się wysoko, machając rękami!", steps: [], reward: "Odznaka Górołaza" },
  { id: 6, title: "Labirynt Duszka", icon: "🧚", description: "Wykonaj uniki w bok w leśnym labiryncie!", steps: [], reward: "Odznaka Leśnego Zwiadowca" },
  { id: 7, title: "Obrona Mostu", icon: "🏰", description: "Utrzymaj stabilną postawę wojownika!", steps: [], reward: "Odznaka Obrońcy Mostu" }
];