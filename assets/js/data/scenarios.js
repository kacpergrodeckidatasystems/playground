export const scenarios = [
  {
    id: 1,
    title: "Walka ze smokiem",
    icon: "??",
    mainGif: "assets/gifs/ziejacy-smok.gif",
    description: "Bezpieczna i pe?na humoru przygoda na placu zabaw!",
    steps: [
      { 
        type: 'exercise',
        id: 'cave-approach', 
        name: "Krok 1: Wej?cie do Smoczej Doliny", 
        target: 3, 
        instruction: "Ziemia dr?y! Zr車b 3 zdecydowane kroki w prz車d, trzymaj?c telefon w opasce.",
        text: "Smok zablokowa? ?cie?k? do doliny! Ruszaj ?mia?o przed siebie!",
        gif: "assets/gifs/bieg.gif"
      },
      { 
        type: 'story',
        name: "Przystanek w Krainie ?miechu: Kichni?cie Smoka", 
        text: "Uwaga! Smok pr車bowa? zmonopolizowa? hu?tawki, ale... poci?gn?? nosem i kichn?? tak mocno, ?e zamiast ognia wypu?ci? wielk? chmur? kolorowych baniek mydlanych! Wygl?da na to, ?e nasza bestia jest dzisiaj wyj?tkowo zakatarzona. Odpocznij chwil?, z?ap oddech i przygotuj si? na skoki!",
        gif: "assets/gifs/latajacy-smok.gif"
      },
      { 
        type: 'exercise',
        id: 'swings-jump', 
        name: "Krok 2: Unikamy Ba里kowego Dymu", 
        target: 5, 
        instruction: "Jeste? przy hu?tawkach! Wykonaj 5 wysokich skok車w kangura.",
        text: "Przeskakujemy ba里ki smoka! Skacz wysoko!",
        gif: "assets/gifs/ziejacy-smok.gif"
      },
      { 
        type: 'story',
        name: "Przystanek przy ?awce: Zgubione Kapcie", 
        text: "Ale tempo! Smok uciekaj?c w stron? parkowej ?awki, zgubi? swoje wielkie, czerwone kapcie w paski. Stoi teraz boso i drapie si? po g?owie, zastanawiaj?c si?, gdzie je zostawi?. Masz chwil? na ?miech i odpoczynek, a potem ruszamy dalej!",
        gif: "assets/gifs/rycerz-chodzacy.gif"
      },
      { 
        type: 'exercise',
        id: 'bench-squat', 
        name: "Krok 3: Magiczna Tarcza", 
        target: 5, 
        instruction: "Dotar?e? do ?awki! Zr車b 5 g??bokich przysiad車w mocy.",
        text: "Aktywujemy tarcz?, trzymaj pozycj?!",
        gif: "assets/gifs/rycerz-walczacy.gif"
      },
      { 
        type: 'story',
        name: "Przystanek na Zje?d?alni: ?lizgawka z Gg??bokim Sianem", 
        text: "Tarcza wytrzyma?a! Smok w panice wdrapa? si? na zje?d?alni?, ale zsun?? si? z niej prosto w wielk? g車r? mi?kkiego siana, robi?c ?mieszn? min?. Oho, teraz zje?d?alnia zamieni?a si? w plac testowy dla naszego miecza!",
        gif: "assets/gifs/latajacy-smok.gif"
      },
      { 
        type: 'exercise',
        id: 'slide-slash', 
        name: "Krok 4: ?askotanie Ogonem", 
        target: 5, 
        instruction: "Wykonaj 5 dynamicznych ci?? mieczem (odp?dzamy ogon).",
        text: "Odganiamy sprytny ogon smoka!",
        gif: "assets/gifs/rycerz-walczacy.gif"
      },
      { 
        type: 'story',
        name: "Wielki Fina?: Porozumienie", 
        text: "Ostatnia prosta! Smok macha bia?? flag? zrobion? ze starej skarpety i m車wi, ?e wcale nie chcia? walczy?, tylko nudzi? si? sam i chcia? z kim? poskaka?. Ostatni akord przygody 每 czas na ostateczne uderzenie rado?ci!",
        gif: "assets/gifs/ziejacy-smok.gif"
      },
      { 
        type: 'exercise',
        id: 'dragon-roar', 
        name: "Krok 5: Taniec Zwyci?stwa", 
        target: 5, 
        instruction: "Zr車b 5 szybkich, radosnych wymach車w telefonem w opasce!",
        text: "Ostatnie pi?? ruch車w, ?wi?tujemy zwyci?stwo!",
        gif: "assets/gifs/rycerz-walczacy.gif"
      },
      {
        type: 'cooldown',
        id: 'breathing-calm',
        name: "Krok Fina?owy: Magiczny Oddech Spokoju",
        target: 3,
        instruction: "Zatrzymaj si?. Zrobimy 3 g??bokie wdechy, ?eby wyciszy? puls po zabawie.",
        text: "Misja wykonana wzorowo. Smok poszed? je?? ciasteczka, a my stoimy spokojnie. We? g??boki wdech nosem... i powolny wydech ustami. Zrobimy tak trzy razy.",
        gif: "assets/gifs/bieg.gif"
      }
    ],
    reward: "Odznaka Weso?ego Pogromcy Smok車w ????"
  },
  { id: 2, title: "Uratuj kr車lewn?", icon: "??", description: "Otw車rz bramy zamku szybkimi przysiadami!", steps: [], reward: "Odznaka Kr車lewskiego Obro里cy" },
  { id: 3, title: "Poszukiwacz skarbu", icon: "??", description: "Odszukaj ukryte klejnoty na placu!", steps: [], reward: "Odznaka Odkrywcy" }
];