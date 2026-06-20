## Overview

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

MAGGNet operates faster and more efficiently than projection-domain simulators (e.g. CatSim), generating controlled, anatomically consistent, and volumetrically coherent metal artefacts. Future work will include evaluating the impact on MAR model training and more anatomically aware implant placement.
