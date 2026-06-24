"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface Preset {
    name: string;
    bass: number; // 0 to 100
    mids: number;
    treble: number;
    description: string;
}

export default function SoundCustomizer() {
    const [bass, setBass] = useState(65);
    const [mids, setMids] = useState(50);
    const [treble, setTreble] = useState(70);
    const [activePreset, setActivePreset] = useState("Signature");

    const bassSliderRef = useRef<HTMLInputElement>(null);
    const midsSliderRef = useRef<HTMLInputElement>(null);
    const trebleSliderRef = useRef<HTMLInputElement>(null);
    const waveRef1 = useRef<SVGPathElement>(null);
    const waveRef2 = useRef<SVGPathElement>(null);

    const presets: Record<string, Preset> = {
        Signature: {
            name: "Signature",
            bass: 65,
            mids: 50,
            treble: 70,
            description: "Balanced, immersive acoustics optimized for all genres."
        },
        "Bass Boost": {
            name: "Bass Boost",
            bass: 95,
            mids: 45,
            treble: 55,
            description: "Deep, powerful low-end resonance that you can feel."
        },
        "Clear Vocal": {
            name: "Clear Vocal",
            bass: 40,
            mids: 85,
            treble: 65,
            description: "Enhanced mids and highs, perfect for podcasts and acoustics."
        },
        "Studio Reference": {
            name: "Studio Reference",
            bass: 50,
            mids: 50,
            treble: 50,
            description: "Flat response curve for pure, uncolored sound monitoring."
        }
    };

    // Animate sliders smoothly when a preset is selected
    const applyPreset = (presetName: string) => {
        setActivePreset(presetName);
        const preset = presets[presetName];

        // Animate state values using GSAP for a buttery-smooth transition
        const targets = { b: bass, m: mids, t: treble };
        gsap.to(targets, {
            b: preset.bass,
            m: preset.mids,
            t: preset.treble,
            duration: 0.8,
            ease: "power2.out",
            onUpdate: () => {
                setBass(Math.round(targets.b));
                setMids(Math.round(targets.m));
                setTreble(Math.round(targets.t));
            }
        });
    };

    // Real-time Waveform morphing logic based on EQ settings
    useEffect(() => {
        let animationFrameId: number;
        let phase = 0;

        const updateWaveform = () => {
            phase += 0.05 + (treble / 1000); // Treble controls wave speed/frequency
            const amp1 = 15 + (bass / 4);     // Bass controls wave amplitude
            const amp2 = 10 + (mids / 5);     // Mids control secondary wave amplitude

            const points1 = [];
            const points2 = [];
            const steps = 60;

            for (let i = 0; i <= steps; i++) {
                const x = (i / steps) * 400;
                // Complex wave equation combining sine and cosine
                const y1 = 60 + Math.sin(i * 0.15 + phase) * amp1 * Math.sin(i * 0.05);
                const y2 = 60 + Math.cos(i * 0.2 + phase * 0.8) * amp2 * Math.sin(i * 0.08);

                points1.push(`${i === 0 ? "M" : "L"} ${x} ${y1}`);
                points2.push(`${i === 0 ? "M" : "L"} ${x} ${y2}`);
            }

            if (waveRef1.current) waveRef1.current.setAttribute("d", points1.join(" "));
            if (waveRef2.current) waveRef2.current.setAttribute("d", points2.join(" "));

            animationFrameId = requestAnimationFrame(updateWaveform);
        };

        updateWaveform();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [bass, mids, treble]);

    return (
        <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pb-8 section-gap select-none">
            {/* Inner Dark Glass Panel */}
            <div className="w-full bg-neutral-950 rounded-[32px] border border-white/10 p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 overflow-hidden ">

                {/* Left Side: Waveform and Settings */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
                    <div className="section-body-gapp">
                        <span className="text-[10px] tracking-[0.25em] font-semibold text-[#f26e11] uppercase font-sans">
                            Acoustic Engineering
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-1 font-schein uppercase">
                            SoundStage Customizer
                        </h2>
                        <p className="text-sm text-neutral-400 font-light mt-3 max-w-md leading-relaxed font-sans">
                            Adjust the EQ sliders or select a tuning preset to dynamically shape the audio driver’s response curve in real-time.
                        </p>
                    </div>

                    {/* Real-time Dynamic Waveform Screen */}
                    <div className="relative w-full max-w-[400px] h-[140px] bg-neutral-900/50 border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-radial-gradient from-[#f26e11]/5 via-transparent to-transparent pointer-events-none" />
                        <svg viewBox="0 0 400 120" className="w-full h-full">
                            {/* Wave 1 (Primary Orange Wave) */}
                            <path
                                ref={waveRef1}
                                fill="none"
                                stroke="#f26e11"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                className="opacity-90"
                            />
                            {/* Wave 2 (Secondary Subdued Wave) */}
                            <path
                                ref={waveRef2}
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                className="opacity-40"
                            />
                        </svg>

                        {/* Real-time Status Indicator */}
                        <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#f26e11] animate-pulse" />
                            <span className="text-[9px] tracking-[0.15em] font-mono text-neutral-500 uppercase">
                                Driver Live
                            </span>
                        </div>
                    </div>

                    {/* Description of active preset */}
                    <p className="text-xs text-[#f26e11] font-medium font-sans italic tracking-wide min-h-[16px]">
                        {presets[activePreset]?.description || "Custom EQ profile tailored by you."}
                    </p>
                </div>

                {/* Right Side: Tactile EQ Sliders and Presets */}
                <div className="w-full lg:w-1/2 flex flex-col gap-8">
                    {/* Presets Chips Container */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {Object.keys(presets).map((name) => (
                            <button
                                key={name}
                                onClick={() => applyPreset(name)}
                                className={`px-4 py-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all duration-300 border cursor-pointer ${activePreset === name
                                    ? "bg-[#f26e11] text-white border-[#f26e11] shadow-[0_4px_15px_rgba(242,110,17,0.3)]"
                                    : "bg-white/5 text-neutral-300 border-white/5 hover:bg-white/10 hover:border-white/10"
                                    }`}
                            >
                                {name}
                            </button>
                        ))}
                    </div>

                    {/* Equalizer Console (Vertical Sliders) */}
                    <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-6 flex justify-around items-center h-[240px]">
                        {/* BASS SLIDER */}
                        <div className="flex flex-col items-center gap-3 h-full justify-between">
                            <span className="text-[10px] font-mono text-neutral-500">BASS</span>
                            <div className="relative flex items-center justify-center w-8 h-[140px]">
                                <input
                                    ref={bassSliderRef}
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={bass}
                                    onChange={(e) => {
                                        setBass(Number(e.target.value));
                                        setActivePreset("Custom");
                                    }}
                                    className="accent-[#f26e11] cursor-pointer h-full outline-none w-1"
                                    style={{
                                        writingMode: "vertical-lr",
                                        direction: "rtl",
                                        WebkitAppearance: "slider-vertical"
                                    }}
                                />
                            </div>
                            <span className="text-[11px] font-mono font-bold text-white w-8 text-center">
                                {bass}%
                            </span>
                        </div>

                        {/* MIDS SLIDER */}
                        <div className="flex flex-col items-center gap-3 h-full justify-between">
                            <span className="text-[10px] font-mono text-neutral-500">MIDS</span>
                            <div className="relative flex items-center justify-center w-8 h-[140px]">
                                <input
                                    ref={midsSliderRef}
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={mids}
                                    onChange={(e) => {
                                        setMids(Number(e.target.value));
                                        setActivePreset("Custom");
                                    }}
                                    className="accent-[#f26e11] cursor-pointer h-full outline-none w-1"
                                    style={{
                                        writingMode: "vertical-lr",
                                        direction: "rtl",
                                        WebkitAppearance: "slider-vertical"
                                    }}
                                />
                            </div>
                            <span className="text-[11px] font-mono font-bold text-white w-8 text-center">
                                {mids}%
                            </span>
                        </div>

                        {/* TREBLE SLIDER */}
                        <div className="flex flex-col items-center gap-3 h-full justify-between">
                            <span className="text-[10px] font-mono text-neutral-500">TREB</span>
                            <div className="relative flex items-center justify-center w-8 h-[140px]">
                                <input
                                    ref={trebleSliderRef}
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={treble}
                                    onChange={(e) => {
                                        setTreble(Number(e.target.value));
                                        setActivePreset("Custom");
                                    }}
                                    className="accent-[#f26e11] cursor-pointer h-full outline-none w-1"
                                    style={{
                                        writingMode: "vertical-lr",
                                        direction: "rtl",
                                        WebkitAppearance: "slider-vertical"
                                    }}
                                />
                            </div>
                            <span className="text-[11px] font-mono font-bold text-white w-8 text-center">
                                {treble}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
