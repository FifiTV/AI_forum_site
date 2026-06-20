export const en = {
  nav: {
    home: 'Home',
    polmar: 'PolMar',
    magnet: 'MAGNet',
    gvl: 'Gaussian Vicinal Loss',
  },
  home: {
    title: 'SmartUDL',
    subtitle: 'Metal Artefact Reduction in CT',
    description: 'Three research approaches developed within the AI Forum project: two-stage image-domain correction, a StyleGAN-based generative framework, and a conditional diffusion model with Gaussian Vicinal Loss.',
    approachesTitle: 'Our Approaches',
    slider: {
      title: 'The problem: metal artefacts in CT',
      caption: 'Drag the slider to compare a CT scan with metal artefacts and the corresponding corrected image.',
      artifact: 'With artefacts',
      clean: 'After correction',
    },
    polmar: {
      title: 'PolMAR',
      description: 'A two-stage image-domain metal artefact reduction method. CircNet corrects artefacts in the local polar coordinate system around each implant; the Refiner predicts a residual correction supported by optional auxiliary inputs.',
      learnMore: 'Learn more',
    },
    magnet: {
      title: 'MAGGNet',
      description: 'A StyleGAN-based framework generating realistic, volumetrically consistent metal artefacts in CT scans. A content encoder (EC) and a variational artifact encoder (EA) enable independent control over anatomy.',
      learnMore: 'Learn more',
    },
    gvl: {
      title: 'Gaussian Vicinal Loss',
      description: 'A conditional diffusion model generating metal artefacts with smooth control via a physical feature vector. Gaussian Vicinal Loss weights each batch sample by its distance from the target value, eliminating non-physical step-like learning for sparsely sampled continuous labels.',
      learnMore: 'Learn more',
    },
  },
  polmar: {
    title: 'PolMAR',
    subtitle: 'Two-stage image-domain metal artefact reduction for CT',
    text: `## Overview

Metal artefacts in CT images arise in the presence of implants, prostheses, screws, or dental fillings — objects with a very high X-ray attenuation coefficient. In the reconstructed image they manifest as streaks, bands, and localised flares that can obscure or mimic genuine anatomical structures.

Most existing metal artefact reduction (MAR) methods operate in the projection domain (sinogram) or require access to raw scanner data, which is rarely available in clinical practice — typically only the reconstructed CT image is at hand. PolMAR is a purely image-domain method that requires no sinogram access, combining two complementary stages: a conservative pre-correction and a predictive reconstruction supported by optional auxiliary inputs.

## Method

PolMAR consists of two stages that address different sub-tasks:

**CircNet** — a correction stage operating in the local polar space around each detected metal component. It exploits the observation that artefacts around an implant have near-radial geometry, so in the (θ, r) coordinate system they become more regular. The network predicts a non-negative correction map that is subtracted from the image — the model can therefore only reduce excess brightness, never introduce new structures. The metal region itself is always restored to its original values.

**Refiner** — a predictive stage operating on the full cross-section in Cartesian space. Where intensity correction alone is insufficient (anatomical information has been severely lost), the Refiner predicts a residual correction based on the input image and optional auxiliary inputs:

- the CircNet correction result,
- a classic NMAR image (sinogram-based reference),
- a semantic segmentation map (SEG) describing the predicted anatomical structure type (organs, metal, remaining tissue) at each location, completed in artefact-corrupted regions based on tissue neighbourhood and volumetric context.

Separating the task into correction (CircNet) and prediction (Refiner) limits the risk of excessive, uncontrolled image modification — the first stage acts conservatively, while the second handles more flexible reconstruction in harder regions.

## Results

### Table 1. Standalone CircNet evaluation (AAPM body5)

| Variant  | MAE ↓ | RMSE ↓ | PSNR ↑ | SSIM ↑ | Grad-MAE ↓ |
|----------|------:|-------:|-------:|-------:|-----------:|
| Baseline | 46.82 | 87.73  | 28.66  | 0.622  | 0.0332     |
| CircNet  | **42.59** | **74.49** | **29.58** | **0.657** | **0.0300** |

### Table 2. Results summary — AAPM and Jitter

| Set    | Variant           | MAE ↓     | RMSE ↓    | PSNR ↑    | SSIM ↑    | Grad-MAE ↓ |
|--------|-------------------|-----------|-----------|-----------|-----------|------------|
| AAPM   | Baseline          | 46.82     | 87.73     | 28.66     | 0.622     | 0.0332     |
| AAPM   | CircNet           | 42.59     | 74.49     | 29.58     | 0.657     | 0.0300     |
| AAPM   | Base              | 18.07     | 25.64     | 38.44     | 0.918     | 0.0133     |
| AAPM   | Base+NMAR         | 18.02     | 25.63     | 38.51     | 0.914     | 0.0133     |
| AAPM   | Base+CircNet      | **17.84** | 25.18     | 38.60     | 0.917     | **0.0132** |
| AAPM   | Base+NMAR+CircNet | 17.85     | **25.07** | **38.68** | **0.921** | **0.0132** |
| Jitter | Baseline          | 39.94     | 63.31     | 20.68     | 0.796     | 0.0385     |
| Jitter | Base              | 17.73     | 31.51     | 26.49     | 0.889     | 0.0210     |
| Jitter | Base+CircNet      | **16.30** | **27.10** | 27.10     | 0.893     | 0.0208     |
| Jitter | Base+SEG          | 18.16     | 29.66     | 26.74     | 0.887     | 0.0208     |
| Jitter | Base+NMAR         | 19.11     | 32.53     | 25.93     | 0.890     | 0.0216     |
| Jitter | Base+NMAR+SEG     | 17.89     | 28.81     | 27.10     | **0.894** | **0.0206** |
| Jitter | Base+CircNet+SEG  | 17.66     | 27.39     | **27.43** | 0.888     | 0.0207     |

*Bold = best result within each dataset and metric.*

### Summary

- **CircNet** consistently improves all metrics over Baseline on its own, but the improvement is limited — the model only reduces bright artefact components, it does not reconstruct anatomy.
- **Refiner** provides a much larger quality gain. On **AAPM** all variants are similar (MAE ≈ 18 HU, SSIM ≈ 0.92) — the choice of auxiliary input is secondary.
- On **Jitter** differences are more pronounced: **Base+CircNet** achieves the best MAE/RMSE, **Base+NMAR+SEG** the best SSIM and Grad-MAE, **Base+CircNet+SEG** the best PSNR.
- **SEG** alone does not improve results; it works best combined with **NMAR**.
- **2.5D** variants do not improve over single-slice variants.`,
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
    title: 'MAGGNet',
    subtitle: 'StyleGAN-based framework for generating volumetrically consistent metal artefacts in CT',
    text: `## Overview

Metal artefacts are one of the primary challenges in computed tomography (CT) — they appear around metal implants and significantly hamper image interpretation. A key problem in developing metal artefact reduction (MAR) methods is the lack of paired data: the same scans with and without artefacts. Most methods therefore train on synthetically generated artefacts, leading to a **domain gap** — models perform worse on real clinical data, especially in 3D, where slice-wise artefact generation causes discontinuities between adjacent slices.

**MAGGNet** (Metal Artefact Guided Generation network) is a StyleGAN-based framework that generates realistic, controllable, and **volumetrically consistent** metal artefacts in CT scans, providing high-quality synthetic data for training and evaluating MAR methods.

## Method

MAGGNet extends the StyleGAN architecture with components that control the physical origin and structure of artefacts:

- **Content Encoder (EC)** — preserves patient anatomy from a clean CT scan and a guidance map encoding the implant location and predicted artefact streak paths.
- **Variational Artifact Encoder (EA)** — learns the distribution of artefact visual features (Gaussian distribution) and samples a latent artefact code from it.
- **Generator (GA)** — combines the content code and artefact code to produce a CT image with a realistic, controlled artefact.
- **Discriminator (DA)** — used only during training (LSGAN); discarded after training.

The **guidance mask** is generated procedurally — it simulates metal sources and the streaks emanating from them, ensuring physically plausible correspondence between metal location and artefact shape.

To ensure **volumetric consistency**, the model processes consecutive CT slices sequentially with a smoothly changing guidance mask between adjacent slices — artefacts transition smoothly from slice to slice rather than being generated independently.

## GCM Metric

The authors propose a novel metric — **GCM (Gradient-based Consistency Metric)** — measuring structural consistency between adjacent CT slices using cosine similarity of image gradients. This is, according to the authors, the first dedicated metric of this kind in medical image generation.

## Results

The model was trained for 100 epochs (Adam, lr=1e-4) on a workstation with RTX 4070 Super and the Helios supercomputer, using 74 clean scans from the DeepLesion dataset (5261 images).

| Variant | GCM (mean ± std) |
|---------|------------------|
| Clean scan (baseline) | 0.6901 ± 0.0309 |
| MAGGNet (volumetrically consistent) | 0.5853 ± 0.0304 |
| Random artefacts | 0.3856 ± 0.0385 |

MAGGNet-generated artefacts retain significantly more structural consistency between slices (GCM drop ~15% vs. clean scan) compared to random artefacts (drop ~44%), confirming the approach's effectiveness.

MAGGNet operates faster and more efficiently than projection-domain simulators (e.g. CatSim), generating controlled, anatomically consistent, and volumetrically coherent metal artefacts. Future work will include evaluating the impact on MAR model training and more anatomically aware implant placement.`,
    arch: {
      title: 'MAGGNet Architecture',
      formula: {
        label: 'Gradient-based Consistency Metric (GCM)',
        description: 'Measures structural consistency between adjacent CT slices using cosine similarity of image gradients. ε is a small constant for numerical stability.',
      },
      edges: {
        contentCode: 'content code c',
        artifactCode: 'artifact code z',
        trainingOnly: 'training only',
      },
      nodes: {
        cleanCT: 'Clean CT scan',
        guidanceMap: 'Guidance map',
        phantom: 'Phantom scan',
        ec: 'EC — Content Encoder',
        ea: 'EA — Artifact Encoder\n(variational)',
        sample: 'Sampling\nz ~ N(μ, σ²)',
        ga: 'GA — Generator\n(StyleGAN)',
        da: 'DA — Discriminator\n(LSGAN · training only)',
        outputCT: 'Synthetic CT scan\nwith artifact',
      },
    },
    charts: {
      gcmTitle: 'Volumetric consistency — GCM results',
      gcmDesc: 'Higher GCM indicates greater structural consistency between adjacent CT slices.',
      lowerNote: 'Lower than baseline = artefacts disrupt consistency; MAGGNet minimises this drop.',
      clean: 'Clean scan',
      maggnet: 'MAGGNet',
      random: 'Random',
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
    text: `## Overview

Gaussian Vicinal DDPM is a diffusion model that generates metal artefacts on CT images, conditioned on a continuous vector of physical features — including streak amplitude, spatial extent, and texture character. Unlike standard conditioning that requires an exact label match, the model learns from a neighbourhood of the target value using a Gaussian kernel-based loss (Gaussian Vicinal Loss). This makes artefact generation smoothly controllable — a small change in the feature vector produces a proportionally small change in the generated streak, rather than a qualitative jump.

The method was designed as one of several approaches being compared as part of a broader project investigating metallic artifacts in CT.

## Method

At the core of the architecture lies a standard conditional diffusion model: a U-Net with AdaLN layers learns to predict the noise added to the differential artefact image (I\_error), conditioned on a clean image (I\_clean) and the target feature vector. The novelty lies not in the network architecture but in how the loss is computed.

The standard approach compares predictions only against samples with exactly the same label as the target — which, for continuous, sparsely sampled labels, leads to non-physical, step-like learning. Gaussian Vicinal Loss instead weights the contribution of each batch sample to the gradient according to its distance from the sampled target vector.

The closer a sample is to the target in feature space, the greater its contribution to the loss. The parameter σ controls the width of this neighbourhood and is tuned relative to batch size — too small a value degenerates the method into ordinary point matching; too large blurs the conditioning.

The six features making up the conditioning vector — peak amplitude, spatial extent, bounding-box to image size ratio, energy ratio of dark streaks to bright flares, angular concentration, and texture roughness — were derived analytically from AAPM Grand Challenge data pairs, without any neural network involvement in their extraction.

## Results

| FID Metric ↓ | Generated vs Hospital | AAPM vs Hospital |
|---|---:|---:|
| Std-FID (general network, ImageNet) | **85.5** | 115.6 |
| Med-FID (medical network, RadImageNet) | 949,372 | **707,101** |
| Sino-FID (sinogram statistics) | **93.88** | 102 |

The model was trained on synthetic data from the XCIST simulator and evaluated on the AAPM test set and unpaired clinical hospital data. Three independent FID metrics (on CT images, on sinograms, and with two different feature encoders) consistently indicate that images generated by Gaussian Vicinal DDPM are closer to the clinical data distribution than AAPM data itself is to that clinical data — suggesting the model generalises beyond the limitations of the physical simulator it was trained on.

Geometric artefact features (amplitude, extent) are controlled with high precision — the generated image, after feature extraction, reproduces the specified target vector. Texture features remain harder to control independently, which we describe as a limitation of the current method.

Main model limitation: in its current form, the model does not explicitly generate a representation of the metal implant itself — it produces only the differential artefact component. This affects comparisons in masked mode (where the mask is derived from the true metal location in AAPM) and is one direction for future work.`,
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
