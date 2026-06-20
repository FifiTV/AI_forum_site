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
    title: 'PolMAR',
    subtitle: 'Two-stage image-domain metal artefact reduction for CT',
    charts: {
      circnetTitle: 'CircNet — standalone evaluation (AAPM body5)',
      aapTitle: 'MAE by variant — AAPM dataset [HU ↓]',
      jitterTitle: 'MAE by variant — Jitter dataset [HU ↓]',
      lowerIsBetter: 'Lower MAE values indicate smaller reconstruction error.',
      mae: 'MAE',
      rmse: 'RMSE',
    },
    viz: {
      title: 'Polar domain transformation',
      description: 'Artefacts around a metal implant have radial geometry — in Cartesian space they appear as streaks emanating from the centre. After mapping to polar coordinates (θ, r) they become vertical bands, which is much easier for a network to model.',
      cartesian: 'Cartesian space',
      polar: 'Polar space',
      transform: 'transform',
      caption: 'Simulated CT slice: white circle = metal implant, bright lines = artefacts. In the polar domain, artefacts align into regular vertical columns.',
    },
    arch: {
      title: 'Model Architecture',
      refiner: 'Refiner — inputs',
      unet: 'U-Net — detail',
      circnet: 'CircNet',
      refinerDesc: 'The Refiner accepts 1–4 concatenated input channels. Only the base CT image is required; CircNet, SEG and NMAR inputs are optional and improve reconstruction quality.',
      unetDesc: 'Detailed encoder–decoder architecture of the Refiner. Skip-connections (dashed lines) link matching encoder–decoder levels.',
      circnetDesc: 'CircNet operates in the polar domain. RadiusProjector processes the radial profile per angle θ, while AngleUNet1D models angular dependencies along the θ axis with circular padding.',
      nodes: {
        input: 'Input',
        outputImg: 'Output image',
        required: 'Required',
        optional: 'optional',
        concat: 'Concatenation',
        baseImg: 'CT image with artifact',
        circnetImg: 'Polar-corrected image',
        segMask: 'Anatomical segmentation mask',
        nmarImg: 'Pre-cleaned image (NMAR)',
        encoder: 'Encoder',
        decoder: 'Decoder',
        hardPaste: 'hard paste → Î_fin',
        shape: 'shape',
        mlpDesc: 'MLP operating independently per angle θ',
        unetDesc: '1D U-Net along angle axis · circular padding',
        head: 'Head',
        rpOut: 'RadiusProjector output',
        auOut: 'AngleUNet1D output',
      },
    },
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
    arch: {
      nodes: {
        phantomScan: 'Metal Phantom Scan',
        phantomDesc: 'CT scan with metal artifact',
        anatomyScan: 'Anatomical CT Scan',
        anatomyDesc: 'Clean anatomy image',
        combine: 'Combine Features for Augmentation',
        augmented: 'Augmented Training Sample',
        anatomyArtifact: 'Anatomy with Simulated Artifact',
      },
    },
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
