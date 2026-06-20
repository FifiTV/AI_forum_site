## Przegląd

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

MAGGNet działa szybciej i efektywniej niż symulatory projekcyjne (np. CatSim), generując kontrolowane, anatomicznie zgodne i spójne objętościowo artefakty metaliczne. Dalsze prace obejmą ocenę wpływu na trening modeli MAR oraz bardziej anatomicznie świadome rozmieszczanie implantów.
