export const pl = {
  nav: {
    home: 'Strona główna',
    polmar: 'PolMar',
    magnet: 'MAGNet',
    gvl: 'Gaussian Vicinal Loss',
  },
  home: {
    title: 'SmartUDL — Projekt AI Forum',
    subtitle: 'Trochę tekstu o projekcie',
    description:
      '',
    approachesTitle: 'Nasze podejścia',
    polmar: {
      title: 'PolMar',
      description:
        '[Placeholder] ',
      learnMore: 'Dowiedz się więcej',
    },
    magnet: {
      title: 'MAGNet',
      description:
        '[Placeholder] ',
      learnMore: 'Dowiedz się więcej',
    },
    gvl: {
      title: 'Gaussian Vicinal Loss',
      description:
        '[Placeholder] ',
      learnMore: 'Dowiedz się więcej',
    },
  },
  polmar: {
    title: 'PolMAR',
    subtitle: 'Dwuetapowa redukcja artefaktów metalicznych w przestrzeni obrazu CT',
    charts: {
      circnetTitle: 'CircNet — ocena samodzielna (AAPM body5)',
      aapTitle: 'MAE według wariantu — zbiór AAPM [HU ↓]',
      jitterTitle: 'MAE według wariantu — zbiór Jitter [HU ↓]',
      lowerIsBetter: 'Niższe wartości MAE oznaczają mniejszy błąd rekonstrukcji.',
      mae: 'MAE',
      rmse: 'RMSE',
    },
    viz: {
      title: 'Transformacja do przestrzeni polarnej',
      description: 'Artefakty wokół implantu mają geometrię radialną — w układzie kartezjańskim są smugami wychodzącymi ze środka. Po przejściu do układu polarnego (θ, r) stają się pionowymi pasmami, co znacznie ułatwia ich modelowanie przez sieć.',
      cartesian: 'Przestrzeń kartezjańska',
      polar: 'Przestrzeń polarna',
      transform: 'transformacja',
      caption: 'Symulowany przekrój CT: biały krąg = implant metaliczny, jasne linie = artefakty. W domenie polarnej artefakty układają się w regularne pionowe kolumny.',
    },
    arch: {
      title: 'Architektura modelu',
      refiner: 'Refiner — wejścia',
      unet: 'U-Net — szczegóły',
      circnet: 'CircNet',
      refinerDesc: 'Refiner przyjmuje od 1 do 4 wejść (konkatenacja kanałów). Wymagany jest tylko obraz bazowy CT; pozostałe wejścia — CircNet, SEG i NMAR — są opcjonalne i poprawiają wynik.',
      unetDesc: 'Szczegółowa architektura enkodera–dekodera Refinera. Skip-connections (przerywane linie) łączą odpowiadające sobie poziomy enkoder–dekoder.',
      circnetDesc: 'CircNet operuje w domenie polarnej. RadiusProjector przetwarza profil radialny per kąt θ, a AngleUNet1D modeluje zależności kątowe wzdłuż osi θ z circular paddingiem.',
      nodes: {
        input: 'Wejście',
        outputImg: 'Obraz wynikowy',
        required: 'Wymagane',
        optional: 'opcjonalny',
        concat: 'Konkatenacja',
        baseImg: 'Obraz CT z artefaktem',
        circnetImg: 'Obraz po korekcji polarnej',
        segMask: 'Maska segmentacji anatomicznej',
        nmarImg: 'Wstępnie oczyszczony obraz',
        encoder: 'Enkoder',
        decoder: 'Dekoder',
        hardPaste: 'twarde wklejenie → Î_fin',
        shape: 'kształt',
        mlpDesc: 'MLP działa niezależnie per kąt θ',
        unetDesc: '1D U-Net wzdłuż osi kąta · circular padding',
        head: 'Głowica',
        rpOut: 'Wyjście RadiusProjector',
        auOut: 'Wyjście AngleUNet1D',
      },
    },
    sections: {
      overview: {
        heading: 'Przegląd',
        body: '[Placeholder] ',
      },
      method: {
        heading: 'Metoda',
        body: '[Placeholder] ',
      },
      results: {
        heading: 'Wyniki',
        body: '[Placeholder] ',
      },
      architecture: {
        heading: 'Architektura',
        body: '[Placeholder]',
      },
    },
  },
  magnet: {
    title: 'MAGNet',
    subtitle: 'Troche tekstu o MAGNet',
    arch: {
      nodes: {
        phantomScan: 'Skan phantomu metalowego',
        phantomDesc: 'Skan CT z artefaktem metalowym',
        anatomyScan: 'Skan anatomiczny CT',
        anatomyDesc: 'Czysty obraz anatomii',
        combine: 'Łączenie cech do augmentacji',
        augmented: 'Augmentowana próbka treningowa',
        anatomyArtifact: 'Anatomia z symulowanym artefaktem',
      },
    },
    sections: {
      overview: {
        heading: 'Przegląd',
        body: '[Placeholder] ',
      },
      method: {
        heading: 'Metoda',
        body: '[Placeholder]',
      },
      results: {
        heading: 'Wyniki',
        body: '[Placeholder] ',
      },
      architecture: {
        heading: 'Architektura',
        body: '[Placeholder]',
      },
    },
  },
  gvl: {
    title: 'Gaussian Vicinal Loss',
    subtitle: 'Warunkowy model dyfuzyjny z gaussowską funkcją straty dla generowania artefaktów metalicznych w CT',
    sections: {
      overview: {
        heading: 'Przegląd',
        body: '[Placeholder] ',
      },
      method: {
        heading: 'Metoda',
        body: '[Placeholder]',
      },
      results: {
        heading: 'Wyniki',
        body: '[Placeholder]',
      },
      architecture: {
        heading: 'Architektura',
        body: '[Placeholder]',
      },
    },
    diagram: {
      nodes: {
        ytarget: 'Cel y_target',
        yi: 'Próbka y_i',
        noise_proc: 'Proces zaszumiania',
        unet: 'U-Net (AdaLN)\nPredyktor szumu ε_θ',
        time: 'Krok t',
        true_noise: 'Rzeczywisty szum ε',
        pred_noise: 'Przewidziany szum ε_θ',
        mse: 'Nieważone MSE',
        gauss: 'Jądro Gaussa exp(...)',
        sigma: 'Szerokość σ',
        weight: 'Waga w_i',
        vicinal: 'Błąd\nVicinal',
      },
      edges: {
        noisyImage: 'Zaszumiony obraz x_t',
        backprop: 'Propagacja wsteczna',
      },
      formula: {
        label: 'Gaussian Vicinal Loss — waga próbki',
        description: 'Im próbka {{yi}} bliżej celu {{ytarget}} w przestrzeni cech, tym większy jej udział w stracie. Parametr {{sigma}} kontroluje szerokość sąsiedztwa.',
      },
    },
  },
  footer: {
    copyright: '© {{year}} SmartUDL — Projekt AI Forum',
    madeWith: 'Zbudowane z React & TypeScript',
  },
}
