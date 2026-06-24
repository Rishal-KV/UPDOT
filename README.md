# Updot Frontend Engineering Assignment - MODEL XRS Portfolio

A state-of-the-art rebuild of the **MODEL XRS** landing page, engineered as a demonstration of elite frontend craftsmanship, fluid animation quality, tactile interactivity, and clean engineering practices.

Developed with **Next.js (App Router)**, **Tailwind CSS**, and **GSAP**, this project is fully responsive across all viewports (mobile, tablet, and desktop) and features a bespoke interactive addition: a **Real-Time SoundStage EQ Customizer**.

---

## 🚀 Quick Start & Setup

Ensure you have [Node.js (v18.x or later)](https://nodejs.org/) installed.

### 1. Install Dependencies
Clone or extract the project directory, navigate to the root, and run:
```bash
npm install
```

### 2. Run the Development Server
Launch the hot-reloading local development environment:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to experience the site live.

### 3. Build for Production
Validate the TypeScript compilation, CSS optimizations, and Next.js production bundling:
```bash
npm run build
```

---

## 📐 Architecture & Folder Structure

The project adheres to modern, scalable Next.js conventions. Spacing uniformity is managed component-wise via standard `.section-gap` tokens:

```
updot/
├── app/
│   ├── components/
│   │   ├── banner/
│   │   │   └── Banner.tsx         # 3D Parallax & Cursor-reactive Hero Banner
│   │   ├── intro/
│   │   │   └── IntroSection.tsx   # Typography-focused Editorial Description
│   │   ├── carousel/
│   │   │   └── RangeCarousel.tsx  # 3D Depth Gallery Carousel with Auto-Slide & Hover Pause
│   │   └── specs/
│   │       └── SoundCustomizer.tsx# Real-Time Interactive EQ Waveform Customizer (Bonus Section)
│   ├── globals.css                # Custom @utility declarations and theme mappings
│   ├── layout.tsx                 # Root layout injecting brand localFonts
│   └── page.tsx                   # Modular Page assembler
├── public/
│   ├── fonts/                     # Brand typography (Schein Sans)
│   └── headphone_*.png            # 100% Alpha, Studio-grade headphone assets
├── package.json
└── README.md
```

---

## 🎨 Animation & Interaction Highlights

### 1. 3D Parallax Hero Banner (`Banner.tsx`)
* **Dynamic Hover Glow:** A radial gradient spotlight follows the user's cursor across the card using smooth GSAP-interpolated translations.
* **3D Depth Layering:** The primary headphone is layered in front of the giant "MODEL XRS" background title and reacts with subtle, inertia-rich translation shifts matching the cursor's coordinate offset.
* **Responsive Layout:** Engineered to dynamically transition from a vertical stacking order on mobile devices to a full-width immersive landscape layout on desktops.

### 2. 3D Range Explorer Carousel (`RangeCarousel.tsx`)
* **Horizontal Horizonal Bleed:** Stretches the background "OUR RANGE" watermark fully across the viewport (`overflow-visible`), bleeding off the screen edges to match the reference design.
* **Focus & Depth Blur:** Uses a combination of CSS 3D scale transforms, relative opacities, and `blur-[7px]` filters to keep the active item sharp in the center while pushing inactive items to the sides.
* **Interactive Chevron Dials:** Replaces generic indicators with side-by-side circular chevron triggers that rotate the carousel, featuring active scale-down and hover-fill states.
* **Auto-Slide with Smart Pause:** Ticks every 4 seconds, pausing automatically when the user hovers over the section to explore details, resuming when the mouse leaves.

### 3. SoundStage EQ Customizer (`SoundCustomizer.tsx`)
* **Real-time SVG Waveform:** Features two overlapping Bezier-curve SVG paths that morph dynamically in a high-frequency animation loop.
* **Dynamic Tuning Sliders:** Allows users to adjust Bass, Mids, and Treble. The waveform's amplitude, frequency, and turbulence adapt in real-time to the slider values.
* **Presets Console:** Users can select presets (Signature, Bass Boost, Clear Vocal, Studio Reference), which triggers a GSAP animation to smoothly glide the sliders to their target values.

---

## ⚡ Elite Performance & Asset Engineering

To deliver a flawless visual score, the project implements advanced asset pre-processing and CSS calculations:

### 1. Automated Python Flood-Fill Background Extraction
Instead of relying on lossy manual cutouts, the three generated product images were processed using a custom **Python BFS flood-fill algorithm**:
* Sweeps inward from all border pixels.
* Automatically turns any pixels close to the white studio lighting background (color distance threshold of `120`) into **100% transparency**.
* Safely protects white highlights *inside* the headphones (like metal reflections) because they are enclosed by darker parts of the headset.

### 2. 14% Bounding-Box Canvas Padding Calculation
Applying a heavy CSS blur (`blur-[7px]`) to an image that touches the file edges results in a visible, sharp vertical cut-off line (forming a rigid box outline). 
* To resolve this, the Python script crops the headphones to their exact bounding box, scales them down to exactly **72%** of the canvas, and centers them.
* This leaves a **14% pure transparent buffer zone** on all sides of the image.
* When blurred in the carousel, the headphone edges fade softly and organically into the page background with **zero clipping artifacts**.

---

## 🤝 Submission Details

* **Assignment:** Updot Frontend Engineering Assignment
* **Candidate:** [Your Full Name]
* **Method:** Single ZIP archive containing full source code and high-resolution assets, ready for local execution.
