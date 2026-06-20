## Przegląd

Gaussian Vicinal DDPM to model dyfuzyjny generujący artefakty metaliczne na obrazach tomografii komputerowej, warunkowany ciągłym wektorem cech fizycznych — m.in. amplitudą rozbłysku, jego zasięgiem przestrzennym i charakterem tekstury. W odróżnieniu od standardowego warunkowania, które wymaga dokładnego trafienia w etykietę, model uczy się z sąsiedztwa wartości docelowej za pomocą funkcji straty opartej na jądrze Gaussa (Gaussian Vicinal Loss). Dzięki temu generowanie artefaktu jest płynnie kontrolowalne — drobna zmiana wektora cech przekłada się na drobną zmianę wygenerowanego rozbłysku, a nie na skok jakościowy.

Metoda została zaprojektowana jako jedno z kilku podejść porównywanych w ramach szerszego projektu badającego artefakty metaliczne w CT.

## Metoda

U podstaw architektury leży zwykły warunkowy model dyfuzyjny: sieć U-Net z warstwami AdaLN uczy się przewidywać szum nałożony na obraz różnicowy artefaktu (I_error), warunkując się obrazem czystym (I_clean) oraz wektorem cech docelowych. Nowość nie leży w architekturze sieci, a w sposobie liczenia straty.

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

Główne ograniczenie modelu: w obecnej wersji nie generuje explicite reprezentacji samego implantu metalicznego — tworzy wyłącznie komponent różnicowy artefaktu. To wpływa na porównania w trybie maskowanym (gdzie maska wyznaczana jest z lokalizacji prawdziwego metalu w AAPM) i jest jednym z kierunków dalszych prac.
