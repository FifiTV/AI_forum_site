## Przegląd

Artefakty metalowe w obrazach tomografii komputerowej (CT) powstają w obecności implantów, protez, śrub czy wypełnień dentystycznych — obiektów o bardzo wysokim współczynniku osłabienia promieniowania rentgenowskiego. W zrekonstruowanym obrazie objawiają się jako smugi, pasma i lokalne rozbłyski, które mogą zasłaniać lub imitować rzeczywiste struktury anatomiczne.

Większość istniejących metod redukcji artefaktów metalowych (MAR) działa w przestrzeni projekcyjnej (sinogramie) lub wymaga dostępu do surowych danych skanera, co w praktyce klinicznej jest rzadko dostępne — najczęściej dysponujemy jedynie zrekonstruowanym obrazem CT. PolMAR jest metodą działającą wyłącznie w przestrzeni obrazu, bez potrzeby dostępu do sinogramu, łączącą dwa uzupełniające się etapy: zachowawczą korekcję wstępną oraz predykcyjną rekonstrukcję wspieraną dodatkowymi informacjami pomocniczymi.

## Metoda

PolMAR składa się z dwóch etapów realizujących różne zadania:

**CircNet** — etap korekcyjny działający w lokalnej przestrzeni polarnej wokół każdego wykrytego komponentu metalu. Wykorzystuje obserwację, że artefakty wokół implantu mają geometrię zbliżoną do radialnej, dzięki czemu w układzie (θ, r) stają się bardziej regularne. Sieć przewiduje nieujemną mapę korekcji, którą odejmuje się od obrazu — model może więc tylko redukować nadmiarową jasność, nigdy generować nowych struktur. Obszar samego metalu jest zawsze przywracany do wartości oryginalnych.

**Refiner** — etap predykcyjny działający na całym przekroju w przestrzeni kartezjańskiej. Tam, gdzie sama korekcja intensywnościowa nie wystarcza (informacja anatomiczna została silnie utracona), Refiner przewiduje poprawkę rezydualną w oparciu o obraz wejściowy oraz opcjonalne wejścia pomocnicze:

- wynik korekcji CircNet,
- klasyczny obraz NMAR (punkt odniesienia z metod sinogramowych),
- mapa semantyczna SEG, opisująca przewidywany typ struktury anatomicznej (organy, metal, pozostała tkanka) w danym miejscu obrazu, uzupełniana w obszarach zaburzonych przez artefakt na podstawie sąsiedztwa tkankowego i informacji z przekrojów wolumenu.

Rozdzielenie zadania na korekcję (CircNet) i predykcję (Refiner) ogranicza ryzyko nadmiernej, niekontrolowanej modyfikacji obrazu — pierwszy etap działa zachowawczo, drugi odpowiada za bardziej elastyczną rekonstrukcję w trudniejszych obszarach.

## Wyniki

### Tabela 1. Samodzielna ocena CircNet (AAPM body5)

| Wariant  | MAE ↓ | RMSE ↓ | PSNR ↑ | SSIM ↑ | Grad-MAE ↓ |
|----------|------:|-------:|-------:|-------:|-----------:|
| Baseline | 46,82 | 87,73  | 28,66  | 0,622  | 0,0332     |
| CircNet  | **42,59** | **74,49** | **29,58** | **0,657** | **0,0300** |

### Tabela 2. Zestawienie wyników — AAPM i Jitter

| Zbiór  | Wariant           | MAE ↓      | RMSE ↓     | PSNR ↑     | SSIM ↑     | Grad-MAE ↓ |
|--------|-------------------|------------|------------|------------|------------|------------|
| AAPM   | Baseline          | 46,82      | 87,73      | 28,66      | 0,622      | 0,0332     |
| AAPM   | CircNet           | 42,59      | 74,49      | 29,58      | 0,657      | 0,0300     |
| AAPM   | Base              | 18,07      | 25,64      | 38,44      | 0,918      | 0,0133     |
| AAPM   | Base+NMAR         | 18,02      | 25,63      | 38,51      | 0,914      | 0,0133     |
| AAPM   | Base+CircNet      | **17,84**  | 25,18      | 38,60      | 0,917      | **0,0132** |
| AAPM   | Base+NMAR+CircNet | 17,85      | **25,07**  | **38,68**  | **0,921**  | **0,0132** |
| Jitter | Baseline          | 39,94      | 63,31      | 20,68      | 0,796      | 0,0385     |
| Jitter | Base              | 17,73      | 31,51      | 26,49      | 0,889      | 0,0210     |
| Jitter | Base+CircNet      | **16,30**  | **27,10**  | 27,10      | 0,893      | 0,0208     |
| Jitter | Base+SEG          | 18,16      | 29,66      | 26,74      | 0,887      | 0,0208     |
| Jitter | Base+NMAR         | 19,11      | 32,53      | 25,93      | 0,890      | 0,0216     |
| Jitter | Base+NMAR+SEG     | 17,89      | 28,81      | 27,10      | **0,894**  | **0,0206** |
| Jitter | Base+CircNet+SEG  | 17,66      | 27,39      | **27,43**  | 0,888      | 0,0207     |

*Pogrubienie = najlepszy wynik w obrębie danego zbioru i metryki.*

### Podsumowanie

- **CircNet** samodzielnie konsekwentnie poprawia wszystkie metryki względem Baseline, ale skala poprawy jest ograniczona — model jedynie redukuje jasne składowe artefaktu, nie rekonstruuje anatomii.
- **Refiner** daje znacznie większy skok jakości. Na **AAPM** wszystkie warianty są zbliżone (MAE ≈ 18 HU, SSIM ≈ 0,92) — wybór wejścia pomocniczego ma tu znaczenie drugorzędne.
- Na **Jitter** różnice są wyraźniejsze: **Base+CircNet** osiąga najlepszy MAE/RMSE, **Base+NMAR+SEG** najlepszy SSIM i Grad-MAE, **Base+CircNet+SEG** najlepszy PSNR.
- **SEG** samo nie poprawia wyniku; działa najlepiej w połączeniu z **NMAR**.
- Warianty **2,5D** nie przynoszą poprawy względem wariantów jednoprzekrojowych.
