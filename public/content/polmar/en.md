## Overview

Metal artefacts in computed tomography (CT) images arise from implants, prostheses, screws, or dental fillings — objects with very high X-ray attenuation coefficients. In the reconstructed image they manifest as streaks, bands, and local flares that can obscure or mimic real anatomical structures.

Most existing metal artefact reduction (MAR) methods operate in projection space (sinogram) or require access to raw scanner data, which is rarely available in clinical practice — typically only the reconstructed CT image is at hand. PolMAR is an image-domain-only method requiring no sinogram access, combining two complementary stages: conservative pre-correction and predictive reconstruction supported by optional auxiliary inputs.

## Method

PolMAR consists of two stages with distinct roles:

**CircNet** — a correction stage operating in the local polar coordinate space around each detected metal component. It exploits the observation that artefacts around an implant have approximately radial geometry, making them more regular in the (θ, r) domain. The network predicts a non-negative correction map that is subtracted from the image — it can only reduce excessive brightness, never introduce new structures. The metal region itself is always restored to original values.

**Refiner** — a prediction stage operating on the full slice in Cartesian space. Where intensity correction alone is insufficient (anatomical information has been severely lost), the Refiner predicts a residual correction based on the input image and optional auxiliary inputs:

- CircNet correction output,
- a classical NMAR image (reference from sinogram-based methods),
- a semantic map SEG describing the predicted anatomical structure type (organs, metal, remaining tissue) at each image location, completed in artefact-corrupted regions based on tissue neighbourhood and multi-slice context.

Separating the task into correction (CircNet) and prediction (Refiner) limits the risk of excessive, uncontrolled image modification — the first stage acts conservatively, the second handles more flexible reconstruction in harder regions.

## Results

### Table 1. CircNet standalone evaluation (AAPM body5)

| Variant  | MAE ↓ | RMSE ↓ | PSNR ↑ | SSIM ↑ | Grad-MAE ↓ |
|----------|------:|-------:|-------:|-------:|-----------:|
| Baseline | 46.82 | 87.73  | 28.66  | 0.622  | 0.0332     |
| CircNet  | **42.59** | **74.49** | **29.58** | **0.657** | **0.0300** |

### Table 2. Results overview — AAPM and Jitter

| Dataset | Variant           | MAE ↓      | RMSE ↓     | PSNR ↑     | SSIM ↑     | Grad-MAE ↓ |
|---------|-------------------|------------|------------|------------|------------|------------|
| AAPM    | Baseline          | 46.82      | 87.73      | 28.66      | 0.622      | 0.0332     |
| AAPM    | CircNet           | 42.59      | 74.49      | 29.58      | 0.657      | 0.0300     |
| AAPM    | Base              | 18.07      | 25.64      | 38.44      | 0.918      | 0.0133     |
| AAPM    | Base+NMAR         | 18.02      | 25.63      | 38.51      | 0.914      | 0.0133     |
| AAPM    | Base+CircNet      | **17.84**  | 25.18      | 38.60      | 0.917      | **0.0132** |
| AAPM    | Base+NMAR+CircNet | 17.85      | **25.07**  | **38.68**  | **0.921**  | **0.0132** |
| Jitter  | Baseline          | 39.94      | 63.31      | 20.68      | 0.796      | 0.0385     |
| Jitter  | Base              | 17.73      | 31.51      | 26.49      | 0.889      | 0.0210     |
| Jitter  | Base+CircNet      | **16.30**  | **27.10**  | 27.10      | 0.893      | 0.0208     |
| Jitter  | Base+SEG          | 18.16      | 29.66      | 26.74      | 0.887      | 0.0208     |
| Jitter  | Base+NMAR         | 19.11      | 32.53      | 25.93      | 0.890      | 0.0216     |
| Jitter  | Base+NMAR+SEG     | 17.89      | 28.81      | 27.10      | **0.894**  | **0.0206** |
| Jitter  | Base+CircNet+SEG  | 17.66      | 27.39      | **27.43**  | 0.888      | 0.0207     |

*Bold = best result within a given dataset and metric.*

### Summary

- **CircNet** alone consistently improves all metrics over the Baseline, but the improvement margin is limited — it only reduces bright artefact components without reconstructing anatomy.
- **Refiner** delivers a much larger quality jump. On **AAPM** all variants are similar (MAE ≈ 18 HU, SSIM ≈ 0.92) — the choice of auxiliary input is secondary.
- On **Jitter** differences are more pronounced: **Base+CircNet** achieves the best MAE/RMSE, **Base+NMAR+SEG** the best SSIM and Grad-MAE, **Base+CircNet+SEG** the best PSNR.
- **SEG** alone does not improve results; it works best combined with **NMAR**.
- **2.5D variants** do not improve over single-slice variants.
