export const en = {
  nav: {
    home: 'Home',
    polmar: 'PolMar',
    magnet: 'MAGNet',
    gvl: 'Gaussian Vicinal Loss',
  },
  home: {
    title: 'SmartUDL — AI Forum Project',
    subtitle: 'Some text about the project',
    description:
      '',
    approachesTitle: 'Our Approaches',
    polmar: {
      title: 'PolMar',
      description:
        '[Placeholder]  ',
      learnMore: 'Learn more',
    },
    magnet: {
      title: 'MAGNet',
      description:
        '[Placeholder]',
      learnMore: 'Learn more',
    },
    gvl: {
      title: 'Gaussian Vicinal Loss',
      description:
        '[Placeholder] ',
      learnMore: 'Learn more',
    },
  },
  polmar: {
    title: 'PolMar',
    subtitle: 'Polarization-Based Margin Method',
    sections: {
      overview: {
        heading: 'Overview',
        body: '[Placeholder]',
      },
      method: {
        heading: 'Method',
        body: '[Placeholder] ',
      },
      results: {
        heading: 'Results',
        body: '[Placeholder] ',
      },
      architecture: {
        heading: 'Architecture',
        body: '[Placeholder] ',
      },
    },
  },
  magnet: {
    title: 'MAGNet',
    subtitle: 'Some text about MAGNet',
    sections: {
      overview: {
        heading: 'Overview',
        body: '[Placeholder] ',
      },
      method: {
        heading: 'Method',
        body: '[Placeholder]',
      },
      results: {
        heading: 'Results',
        body: '[Placeholder] ',
      },
      architecture: {
        heading: 'Architecture',
        body: '[Placeholder] ',
      },
    },
  },
  gvl: {
    title: 'Gaussian Vicinal Loss',
    subtitle: 'Conditional diffusion model with Gaussian vicinal loss for CT metal artefact generation',
    sections: {
      overview: {
        heading: 'Overview',
        body: '[Placeholder] ',
      },
      method: {
        heading: 'Method',
        body: '[Placeholder] ',
      },
      results: {
        heading: 'Results',
        body: '[Placeholder] ',
      },
      architecture: {
        heading: 'Architecture',
        body: '[Placeholder] ',
      },
    },
    diagram: {
      nodes: {
        ytarget: 'Target y_target',
        yi: 'Sample y_i',
        noise_proc: 'Noising process',
        unet: 'U-Net (AdaLN)\nNoise predictor ε_θ',
        time: 'Step t',
        true_noise: 'True noise ε',
        pred_noise: 'Predicted noise ε_θ',
        mse: 'Unweighted MSE',
        gauss: 'Gaussian kernel exp(...)',
        sigma: 'Width σ',
        weight: 'Weight w_i',
        vicinal: 'Vicinal\nLoss',
      },
      edges: {
        noisyImage: 'Noisy image x_t',
        backprop: 'Backpropagation',
      },
      formula: {
        label: 'Gaussian Vicinal Loss — sample weight',
        description: 'The closer sample {{yi}} is to target {{ytarget}} in feature space, the higher its contribution to the loss. Parameter {{sigma}} controls the neighbourhood width.',
      },
    },
  },
  footer: {
    copyright: '© {{year}} SmartUDL — AI Forum Project',
    madeWith: 'Built with React & TypeScript',
  },
}
