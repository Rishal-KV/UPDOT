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
├── src/
│   ├── app/
│   │   ├── globals.css                # Custom @utility declarations and theme mappings
│   │   ├── layout.tsx                 # Root layout injecting brand localFonts
│   │   └── page.tsx                   # Modular Page assembler with scroll anchors
│   └── components/
│       ├── banner/
│       │   └── Banner.tsx             # 3D Parallax & Cursor-reactive Hero Banner (no glow on mobile)
│       ├── faq/
│       │   └── FAQSection.tsx         # Premium accordion-style FAQ component
│       ├── features/
│       │   └── StackedFeatures.tsx    # Scroll-based specs card deck stacker (scroll column on mobile)
│       ├── intro/
│       │   └── IntroSection.tsx       # Typography-focused Editorial Description
│       ├── carousel/
│       │   └── RangeCarousel.tsx      # 3D Depth Gallery Carousel with Auto-Slide & Hover Pause
│       ├── navigation/
│       │   └── Navbar.tsx             # Scroll-activated glassmorphic sticky navbar
│       ├── footer/
│       │   └── Footer.tsx             # Glassmorphic footer with custom SVG social icons (edge-to-edge on mobile)
│       └── specs/
│           └── SoundCustomizer.tsx    # Real-Time EQ Waveform Customizer with 100% Squeeze Overdrive
├── public/
│   ├── fonts/                         # Brand typography (Schein Sans)
│   └── headphone_*.png                # 100% Alpha, Studio-grade headphone assets
├── package.json
└── README.md
```

---

## 🎨 Animation & Interaction Highlights

### 1. 3D Parallax Hero Banner (`Banner.tsx`)
* **Dynamic Hover Glow:** A radial gradient spotlight follows the user's cursor across the card on desktops using smooth GSAP-interpolated translations. Disabled on mobile (`hidden md:block`) to keep layout clean.
* **3D Depth Layering:** The primary headphone is layered in front of the giant "MODEL XRS" background title and reacts with subtle, inertia-rich translation shifts matching the cursor's coordinate offset.
* **Responsive Layout:** Engineered to dynamically transition from a vertical stacking order on mobile devices to a full-width immersive landscape layout on desktops.

### 2. Scroll-Activated Glassmorphic Navbar (`Navbar.tsx`)
* **Dynamic Entrance:** Automatically slides down and fades in from the top once the user scrolls past `120px` with a custom spring-like ease.
* **Active Anchor Tracking:** Automatically detects which section is currently active in the viewport and highlights the corresponding link with a glowing orange bottom border.
* **Compact Mobile Pill:** Shrinks gracefully on mobile, hiding intermediate links while keeping the brand logo and the "Buy Now" button visible.

### 3. Scroll-Based Specs Card Stacker (`StackedFeatures.tsx`)
* **Premium Deck Stacking (Desktop):** Cards smoothly slide up and stack on top of each other, scaling and fading underlying cards.
* **Responsive Fallback (Mobile):** Automatically bypasses ScrollTrigger pinning and stacking on mobile to lay cards out in a clean, vertical, scrollable grid.
* **Smart Window Resize Cleanup:** Wrapped in `gsap.matchMedia("(min-width: 768px)")` to automatically release GSAP styles and ScrollTriggers when switching between viewports.

### 4. 3D Range Explorer Carousel (`RangeCarousel.tsx`)
* **Horizontal Bleed:** Stretches the background "OUR RANGE" watermark fully across the viewport (`overflow-visible`), bleeding off the screen edges to match the reference design.
* **Focus & Depth Blur:** Uses a combination of CSS 3D scale transforms, relative opacities, and `blur-[7px]` filters to keep the active item sharp in the center while pushing inactive items to the sides.
* **Interactive Chevron Dials:** Replaces generic indicators with side-by-side circular chevron triggers that rotate the carousel, featuring active scale-down and hover-fill states.
* **Auto-Slide with Smart Pause:** Ticks every 4 seconds, pausing automatically when the user hovers over the section to explore details, resuming when the mouse leaves.

### 5. SoundStage EQ Customizer (`SoundCustomizer.tsx`)
* **Real-time SVG Waveform:** Features two overlapping Bezier-curve SVG paths that morph dynamically in a high-frequency animation loop.
* **Dynamic Tuning Sliders:** Allows users to adjust Bass, Mids, and Treble. The waveform's amplitude, frequency, and turbulence adapt in real-time to the slider values.
* **Presets Console:** Users can select presets (Signature, Bass Boost, Clear Vocal, Studio Reference), which triggers a GSAP animation to smoothly glide the sliders to their target values.
* **100% Squeeze & Skew Overdrive Effect:** When any slider hits 100%, the waveform box skews (`-skew-x-6`) and squeezes vertically (`scale-y-90`) with an active orange glowing border, a cybernetic grid overlay, a glowing warning badge, and physically compressed/sped-up waves.

---


