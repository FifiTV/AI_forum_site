export const pl = {
  nav: {
    home: 'Strona główna',
    polmar: 'PolMar',
    magnet: 'MAGGNet',
    gvl: 'Gaussian Vicinal Loss',
  },
  home: {
    title: 'SmartUDL',
    subtitle: 'Redukcja artefaktów metalicznych w CT',
    description: 'Trzy podejścia badawcze rozwijane w ramach projektu AI Forum: obrazowa korekcja dwuetapowa, framework generatywny oparty na StyleGAN oraz warunkowy model dyfuzyjny z Gaussian Vicinal Loss.',
    approachesTitle: 'Nasze podejścia',
    slider: {
      title: 'Problem: artefakty metaliczne w CT',
      caption: 'Przesuń suwak, aby porównać skan CT z artefaktami metalicznymi i odpowiadający mu obraz po korekcji.',
      artifact: 'Z artefaktami',
      clean: 'Po korekcji',
    },
    polmar: {
      title: 'PolMAR',
      description: 'Dwuetapowa redukcja artefaktów metalicznych działająca wyłącznie w przestrzeni obrazu. Etap CircNet koryguje artefakty w lokalnym układzie polarnym wokół implantu, a Refiner przewiduje rezydualną poprawkę wspieraną opcjonalnymi wejściami pomocniczymi.',
      learnMore: 'Dowiedz się więcej',
    },
    magnet: {
      title: 'MAGGNet',
      description: 'Framework oparty na StyleGAN generujący realistyczne i spójne objętościowo artefakty metaliczne w skanach CT. Enkoder treści (EC) i wariacyjny enkoder artefaktów (EA) umożliwiają niezależną kontrolę anatomii.',
      learnMore: 'Dowiedz się więcej',
    },
    gvl: {
      title: 'Gaussian Vicinal Loss',
      description: 'Warunkowy model dyfuzyjny generujący artefakty metaliczne z ciągłą kontrolą przez wektor cech fizycznych. Gaussian Vicinal Loss waży każdą próbkę w zależności od odległości od wartości docelowej, eliminując niefizyczne, skokowe uczenie przy rzadko próbkowanych etykietach.',
      learnMore: 'Dowiedz się więcej',
    },
  },
  polmar: {
    title: 'PolMAR',
    subtitle: 'Dwuetapowa redukcja artefaktów metalicznych w przestrzeni obrazu CT',
    text: `## Przegląd

Artefakty metalowe w obrazach tomografii komputerowej (CT) powstają w obecności implantów, protez, śrub czy wypełnień dentystycznych — obiektów o bardzo wysokim współczynniku osłabienia promieniowania rentgenowskiego. W zrekonstruowanym obrazie objawiają się jako smugi, pasma i lokalne rozbłyski, które mogą zasłaniać lub imitować rzeczywiste struktury anatomiczne.

Większość istniejących metod redukcji artefaktów metalowych (MAR) działa w przestrzeni projekcyjnej (sinogramie) lub wymaga dostępu do surowych danych skanera, co w praktyce klinicznej jest rzadko dostępne — najczęściej dysponujemy jedynie zrekonstruowanym obrazem CT. PolMAR jest metodą działającą wyłącznie w przestrzeni obrazu, bez potrzeby dostępu do sinogramu, łączącą dwa uzupełniające się etapy: zachowawczą korekcję wstępną oraz predykcyjną rekonstrukcję wspieraną dodatkowymi informacjami pomocniczymi.

## Metoda

PolMAR składa się z dwóch etapów realizujących różne zadania:

**CircNet** — etap korekcyjny działający w lokalnej przestrzeni polarnej wokół każdego wykrytego komponentu metalu. Wykorzystuje obserwację, że artefakty wokół implantu mają geometrię zbliżoną do radialnej, dzięki czemu w układzie (θ, r) stają się bardziej regularne. Sieć przewiduje nieujemną mapę korekcji, którą odejmuje się od obrazu — model może więc tylko redukować nadmiarową jasność, nigdy generować nowych struktur. Obszar samego metalu jest zawsze przywracany do wartości oryginalnych.

**Refiner** — etap predykcyjny działający na całym przekroju w przestrzeni kartezjańskiej. Tam, gdzie sama korekcja intensywnościowa nie wystarcza (informacja anatomiczna została silnie utracona), Refiner przewiduje poprawkę rezydualną w oparciu o obraz wejściowy oraz opcjonalne wejścia pomocnicze:

- wynik korekcji CircNet,
- klasyczny obraz NMAR (punkt odniesienia z metod sinogramowych),
- mapa semantyczna SEG opisująca przewidywany typ struktury anatomicznej (organy, metal, pozostała tkanka), uzupełniana w obszarach zaburzonych przez artefakt na podstawie sąsiedztwa tkankowego i informacji z przekrojów wolumenu.

Rozdzielenie zadania na korekcję (CircNet) i predykcję (Refiner) ogranicza ryzyko nadmiernej, niekontrolowanej modyfikacji obrazu — pierwszy etap działa zachowawczo, drugi odpowiada za bardziej elastyczną rekonstrukcję w trudniejszych obszarach.

## Wyniki

### Tabela 1. Samodzielna ocena CircNet (AAPM body5)

| Wariant  | MAE ↓ | RMSE ↓ | PSNR ↑ | SSIM ↑ | Grad-MAE ↓ |
|----------|------:|-------:|-------:|-------:|-----------:|
| Baseline | 46,82 | 87,73  | 28,66  | 0,622  | 0,0332     |
| CircNet  | **42,59** | **74,49** | **29,58** | **0,657** | **0,0300** |

### Tabela 2. Zestawienie wyników — AAPM i Jitter

| Zbiór  | Wariant           | MAE ↓     | RMSE ↓    | PSNR ↑    | SSIM ↑    | Grad-MAE ↓ |
|--------|-------------------|-----------|-----------|-----------|-----------|------------|
| AAPM   | Baseline          | 46,82     | 87,73     | 28,66     | 0,622     | 0,0332     |
| AAPM   | CircNet           | 42,59     | 74,49     | 29,58     | 0,657     | 0,0300     |
| AAPM   | Base              | 18,07     | 25,64     | 38,44     | 0,918     | 0,0133     |
| AAPM   | Base+NMAR         | 18,02     | 25,63     | 38,51     | 0,914     | 0,0133     |
| AAPM   | Base+CircNet      | **17,84** | 25,18     | 38,60     | 0,917     | **0,0132** |
| AAPM   | Base+NMAR+CircNet | 17,85     | **25,07** | **38,68** | **0,921** | **0,0132** |
| Jitter | Baseline          | 39,94     | 63,31     | 20,68     | 0,796     | 0,0385     |
| Jitter | Base              | 17,73     | 31,51     | 26,49     | 0,889     | 0,0210     |
| Jitter | Base+CircNet      | **16,30** | **27,10** | 27,10     | 0,893     | 0,0208     |
| Jitter | Base+SEG          | 18,16     | 29,66     | 26,74     | 0,887     | 0,0208     |
| Jitter | Base+NMAR         | 19,11     | 32,53     | 25,93     | 0,890     | 0,0216     |
| Jitter | Base+NMAR+SEG     | 17,89     | 28,81     | 27,10     | **0,894** | **0,0206** |
| Jitter | Base+CircNet+SEG  | 17,66     | 27,39     | **27,43** | 0,888     | 0,0207     |

*Pogrubienie = najlepszy wynik w obrębie danego zbioru i metryki.*

### Podsumowanie

- **CircNet** samodzielnie konsekwentnie poprawia wszystkie metryki względem Baseline, ale skala poprawy jest ograniczona — model jedynie redukuje jasne składowe artefaktu, nie rekonstruuje anatomii.
- **Refiner** daje znacznie większy skok jakości. Na **AAPM** wszystkie warianty są zbliżone (MAE ≈ 18 HU, SSIM ≈ 0,92) — wybór wejścia pomocniczego ma tu znaczenie drugorzędne.
- Na **Jitter** różnice są wyraźniejsze: **Base+CircNet** osiąga najlepszy MAE/RMSE, **Base+NMAR+SEG** najlepszy SSIM i Grad-MAE, **Base+CircNet+SEG** najlepszy PSNR.
- **SEG** samo nie poprawia wyniku; działa najlepiej w połączeniu z **NMAR**.
- Warianty **2,5D** nie przynoszą poprawy względem wariantów jednoprzekrojowych.`,
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
    title: 'MAGGNet',
    subtitle: 'Framework oparty na StyleGAN do generowania spójnych objętościowo artefaktów metalicznych w CT',
    text: `## Przegląd

Artefakty metaliczne to jeden z głównych problemów w tomografii komputerowej (CT) — pojawiają się wokół implantów metalowych i znacząco utrudniają interpretację obrazu. Problemem w rozwijaniu metod ich redukcji (MAR — Metal Artefact Reduction) jest brak sparowanych danych: tych samych skanów z artefaktami i bez nich. Dlatego większość metod uczy się na sztucznie wygenerowanych artefaktach, co prowadzi do tzw. **domain gap** — modele słabiej radzą sobie z rzeczywistymi danymi klinicznymi, zwłaszcza w 3D, gdzie generowanie artefaktów warstwa po warstwie prowadzi do nieciągłości między sąsiednimi przekrojami.

**MAGGNet** (Metal Artefact Guided Generation network) to framework oparty na StyleGAN, który generuje realistyczne, sterowalne i **spójne objętościowo** artefakty metaliczne w skanach CT, tworząc wysokiej jakości dane syntetyczne do trenowania i ewaluacji metod MAR.

## Metoda

MAGGNet rozszerza architekturę StyleGAN o komponenty kontrolujące fizyczne pochodzenie i strukturę artefaktów:

- **Enkoder treści (EC)** — zachowuje anatomię pacjenta na podstawie czystego skanu CT oraz mapy naprowadzającej kodującej położenie implantu i przewidywany przebieg pasm artefaktów.
- **Wariacyjny enkoder artefaktów (EA)** — uczy się rozkładu cech wizualnych artefaktu (rozkład Gaussa) i próbkuje z niego ukryty kod artefaktu.
- **Generator (GA)** — łączy kod treści i kod artefaktu, tworząc obraz CT z realistycznym, kontrolowanym artefaktem.
- **Dyskryminator (DA)** — stosowany wyłącznie podczas treningu (metoda LSGAN); po uczeniu jest odrzucany.

**Maska prowadząca** jest generowana proceduralnie — symuluje źródła metalu i rozchodzące się od nich pasma artefaktów, zapewniając fizycznie sensowną zgodność między położeniem metalu a kształtem artefaktu.

Aby zapewnić **spójność objętościową**, model przetwarza kolejne warstwy skanu sekwencyjnie, stosując delikatnie zmieniającą się maskę między sąsiednimi przekrojami — artefakty „płynnie" przechodzą z warstwy na warstwę zamiast być generowane niezależnie.

## Metryka GCM

Autorzy proponują nową metrykę — **GCM (Gradient-based Consistency Metric)** — mierzącą spójność strukturalną między sąsiednimi warstwami CT za pomocą podobieństwa kosinusowego gradientów obrazu. Jest to, według autorów, pierwsza dedykowana metryka tego typu w generacji obrazów medycznych.

## Wyniki

Model trenowano przez 100 epok (Adam, lr=1e-4) na stacji roboczej z RTX 4070 Super oraz superkomputerze Helios, korzystając z 74 czystych skanów z bazy DeepLesion (5261 obrazów).

| Wariant | GCM (średnia ± std) |
|---------|---------------------|
| Czysty skan (baseline) | 0,6901 ± 0,0309 |
| MAGGNet (spójny objętościowo) | 0,5853 ± 0,0304 |
| Artefakty losowe | 0,3856 ± 0,0385 |

Artefakty generowane przez MAGGNet zachowują znacznie więcej spójności strukturalnej między warstwami (spadek GCM ~15% względem czystego skanu) niż artefakty losowe (spadek ~44%), co potwierdza skuteczność podejścia.

MAGGNet działa szybciej i efektywniej niż symulatory projekcyjne (np. CatSim), generując kontrolowane, anatomicznie zgodne i spójne objętościowo artefakty metaliczne. Dalsze prace obejmą ocenę wpływu na trening modeli MAR oraz bardziej anatomicznie świadome rozmieszczanie implantów.`,
    arch: {
      title: 'Architektura MAGGNet',
      formula: {
        label: 'Gradient-based Consistency Metric (GCM)',
        description: 'Mierzy spójność strukturalną między sąsiednimi warstwami CT za pomocą podobieństwa kosinusowego gradientów obrazu. ε stabilizuje mianownik numerycznie.',
      },
      edges: {
        contentCode: 'kod treści c',
        artifactCode: 'kod artefaktu z',
        trainingOnly: 'tylko trening',
      },
      nodes: {
        cleanCT: 'Czysty skan CT',
        guidanceMap: 'Maska prowadząca',
        phantom: 'Skan phantomu',
        ec: 'EC — Enkoder treści',
        ea: 'EA — Enkoder artefaktów\n(wariacyjny)',
        sample: 'Próbkowanie\nz ~ N(μ, σ²)',
        ga: 'GA — Generator\n(StyleGAN)',
        da: 'DA — Dyskryminator\n(LSGAN · tylko trening)',
        outputCT: 'Syntetyczny skan CT\nz artefaktem',
      },
    },
    charts: {
      gcmTitle: 'Spójność objętościowa — wyniki GCM',
      gcmDesc: 'Wyższy GCM oznacza wyższą spójność strukturalną między sąsiednimi warstwami CT.',
      lowerNote: 'Niższy niż baseline = artefakty zaburzają spójność; MAGGNet minimalizuje ten spadek.',
      clean: 'Czysty skan',
      maggnet: 'MAGGNet',
      random: 'Losowe',
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
    text: `## Przegląd

Gaussian Vicinal DDPM to model dyfuzyjny generujący artefakty metaliczne na obrazach tomografii komputerowej, warunkowany ciągłym wektorem cech fizycznych — m.in. amplitudą rozbłysku, jego zasięgiem przestrzennym i charakterem tekstury. W odróżnieniu od standardowego warunkowania, które wymaga dokładnego trafienia w etykietę, model uczy się z sąsiedztwa wartości docelowej za pomocą funkcji straty opartej na jądrze Gaussa (Gaussian Vicinal Loss). Dzięki temu generowanie artefaktu jest płynnie kontrolowalne — drobna zmiana wektora cech przekłada się na drobną zmianę wygenerowanego rozbłysku, a nie na skok jakościowy.

Metoda została zaprojektowana jako jedno z kilku podejść porównywanych w ramach szerszego projektu badającego artefakty metaliczne w CT.

## Metoda

U podstaw architektury leży zwykły warunkowy model dyfuzyjny: sieć U-Net z warstwami AdaLN uczy się przewidywać szum nałożony na obraz różnicowy artefaktu (I\_error), warunkując się obrazem czystym (I\_clean) oraz wektorem cech docelowych. Nowość nie leży w architekturze sieci, a w sposobie liczenia straty.

Standardowe podejście porównuje predykcję tylko z próbkami mającymi dokładnie tę etykietę co cel — co przy ciągłych, rzadko próbkowanych etykietach prowadzi do niefizycznego, skokowego uczenia. Gaussian Vicinal Loss zamiast tego waży wpływ każdej próbki w batchu na gradient w zależności od jej odległości od wylosowanego wektora docelowego.

Im próbka bliżej celu w przestrzeni cech, tym większy jej udział w stracie. Parametr σ kontroluje szerokość tego sąsiedztwa i jest dobierany względem rozmiaru batcha — zbyt mała wartość degeneruje metodę do zwykłego dopasowania punktowego, zbyt duża rozmywa warunkowanie.

Sześć cech składających się na wektor warunkujący — amplituda szczytowa, zasięg przestrzenny, stosunek bounding-box do rozmiaru obrazu, stosunek energii ciemnych smug do jasnych rozbłysków, koncentracja kątowa i chropowatość tekstury — zostało wyznaczonych analitycznie z par danych AAPM Grand Challenge, bez udziału sieci neuronowej w ich ekstrakcji.

## Wyniki

| Metryka FID ↓ | Generated vs Szpital | AAPM vs Szpital |
|---|---:|---:|
| Std-FID (sieć ogólna, ImageNet) | **85,5** | 115,6 |
| Med-FID (sieć medyczna, RadImageNet) | 949 372 | **707 101** |
| Sino-FID (statystyki sinogramu) | **93,88** | 102 |

Model trenowano na danych syntetycznych z symulatora XCIST i ewaluowano na zbiorze testowym AAPM oraz na niesparowanych danych klinicznych ze szpitala. Trzy niezależne metryki FID (na obrazach CT, na sinogramach, z dwoma różnymi enkoderami cech) wskazują zgodnie, że obrazy generowane przez Gaussian Vicinal DDPM są bliższe rozkładowi danych klinicznych niż dane AAPM same są bliskie tym danym klinicznym — co sugeruje, że model generalizuje poza ograniczenia symulatora fizycznego, na którym był trenowany.

Cechy geometryczne artefaktu (amplituda, zasięg) są kontrolowane z wysoką precyzją — wygenerowany obraz po ekstrakcji cech odtwarza zadany wektor docelowy. Cechy teksturowe pozostają trudniejsze do niezależnego sterowania, co opisujemy jako ograniczenie obecnej wersji metody.

Główne ograniczenie modelu: w obecnej wersji nie generuje explicite reprezentacji samego implantu metalicznego — tworzy wyłącznie komponent różnicowy artefaktu. To wpływa na porównania w trybie maskowanym (gdzie maska wyznaczana jest z lokalizacji prawdziwego metalu w AAPM) i jest jednym z kierunków dalszych prac.`,
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
