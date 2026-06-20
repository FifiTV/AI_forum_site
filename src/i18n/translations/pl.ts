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
    title: 'PolMar',
    subtitle: 'troche tekstu o PolMar',
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
