# Plan Realizacji Strony Projektu AIForum

## Etap 1: Setup ✅
- [x] Zainstaluj i18next i react-i18next
- [x] Zainstaluj react-router-dom
- [x] Zainstaluj Tailwind CSS v3 + postcss + autoprefixer
- [x] Stwórz strukturę folderów (components, pages, i18n, assets)
- [x] Skonfiguruj i18next z tłumaczeniami (PL/EN) — domyślny język: PL

## Etap 2: Komponenty Bazowe ✅
- [x] Navbar (menu + language switcher EN/PL + hamburger mobile)
- [x] Footer (stopka)
- [x] Layout (główny layout ze zmienną zawartością)
- [x] ApproachPage (współdzielony komponent dla PolMar / MAGNet / GVL)

## Etap 3: Strony ✅
- [x] Strona główna (Home/Wstęp) — hero + 3 karty z linkami
- [x] PolMar (niebieski motyw)
- [x] MAGNet (fioletowy motyw)
- [x] Gaussian Vicinal Loss (zielony motyw)

## Etap 4: Mockupy i Design ✅
- [x] Teksty placeholder dla każdej sekcji (oznaczone [Placeholder])
- [x] Stylowanie Tailwind CSS — gradient hero, karty, sekcje
- [x] Logo SmartUDL w Navbar i na stronie głównej
- [x] Responsywność (hamburger mobile, siatka md:grid-cols-3)

## Etap 5: Konfiguracja GitHub Pages ✅
- [x] vite.config.ts ma `base: '/AI_forum_site/'` — skonfigurowane wcześniej
- [x] package.json ma `homepage`, `predeploy` i `deploy` skrypty
- [x] Routing przez HashRouter (brak problemów z 404 na GitHub Pages)
- [x] Build przechodzi bezbłędnie (`npm run build`)

---

## Struktura plików

```
src/
  main.tsx                        # entry point + i18n import
  App.tsx                         # HashRouter + Routes
  index.css                       # Tailwind directives
  i18n/
    index.ts                      # i18next init
    translations/
      en.ts                       # tłumaczenia angielskie
      pl.ts                       # tłumaczenia polskie
  components/
    Navbar.tsx                    # sticky nav + lang switcher + hamburger
    Footer.tsx                    # stopka
    Layout.tsx                    # wrapper min-h-screen
    ApproachPage.tsx              # wielokrotny układ dla podstron
  pages/
    Home.tsx                      # strona główna
    PolMar.tsx                    # strona PolMar
    MAGNet.tsx                    # strona MAGNet
    GaussianVicinalLoss.tsx       # strona GVL
```

## Następne kroki (TODO)
- [ ] Zastąpić [Placeholder] teksty rzeczywistymi opisami metod
- [ ] Dodać diagramy architektur do sekcji "Architektura"
- [ ] Dodać wykresy/tabele wyników do sekcji "Wyniki"
- [ ] Ewentualnie dodać animacje scroll (np. framer-motion)
- [ ] Deploy: `npm run deploy`

## Uwagi:
- Logo: `ai_forum/public/imgs/smartudl.png`
- Framework: React + TypeScript
- UI Framework: Tailwind CSS v3
- I18n: i18next (react-i18next)
- Routing: react-router-dom z HashRouter
- Teksty w tłumaczeniach: `src/i18n/translations/en.ts` i `pl.ts`
