"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Prevent ScrollTrigger from jumping/recalculating when mobile address bar hides/shows
if (typeof window !== "undefined") {
    ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function StackedFeatures() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Safe client-side window measurement
        setIsDesktop(window.innerWidth >= 768);
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsParentRef = useRef<HTMLDivElement>(null);

    // Individual card refs
    const card0Ref = useRef<HTMLDivElement>(null);
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const card3Ref = useRef<HTMLDivElement>(null);

    // Inner element refs for card animations
    const card0ImageRef = useRef<HTMLImageElement>(null);
    const card1WaveBarsRef = useRef<HTMLDivElement>(null);
    const card2BatteryFillRef = useRef<HTMLDivElement>(null);
    const card2BatteryPercentRef = useRef<HTMLSpanElement>(null);
    const card3TransducerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const cardsParent = cardsParentRef.current;

        const c0 = card0Ref.current;
        const c1 = card1Ref.current;
        const c2 = card2Ref.current;
        const c3 = card3Ref.current;

        if (!section || !container || !cardsParent || !c0 || !c1 || !c2 || !c3) return;

        // Use gsap.matchMedia to elegantly run animations only on desktop (>= 768px)
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // 1. Initial Position setup
            // Cards 1, 2, 3 are positioned off-screen (translated down by 115%) on desktop
            gsap.set([c1, c2, c3], {
                yPercent: 115,
                opacity: 0.95
            });

            // 2. 3D Tilt effect on Card 0 (Hero Card)
            const handleMouseMove = (e: MouseEvent) => {
                const rect = c0.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

                gsap.to(c0, {
                    rotateY: x * 8,
                    rotateX: -y * 8,
                    transformPerspective: 1200,
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: "auto",
                });

                if (card0ImageRef.current) {
                    gsap.to(card0ImageRef.current, {
                        x: x * 25,
                        y: y * 25,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: "auto",
                    });
                }

                const glow = c0.querySelector(".card-glow") as HTMLDivElement;
                if (glow) {
                    const glowX = e.clientX - rect.left - 150;
                    const glowY = e.clientY - rect.top - 150;
                    gsap.to(glow, {
                        x: glowX,
                        y: glowY,
                        opacity: 0.2,
                        duration: 0.4,
                        overwrite: "auto",
                    });
                }
            };

            const handleMouseLeave = () => {
                gsap.to(c0, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    overwrite: "auto",
                });

                if (card0ImageRef.current) {
                    gsap.to(card0ImageRef.current, {
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        overwrite: "auto",
                    });
                }

                const glow = c0.querySelector(".card-glow") as HTMLDivElement;
                if (glow) {
                    gsap.to(glow, {
                        opacity: 0,
                        duration: 0.6,
                        overwrite: "auto",
                    });
                }
            };

            c0.addEventListener("mousemove", handleMouseMove);
            c0.addEventListener("mouseleave", handleMouseLeave);

            // 3. Stacking ScrollTrigger timeline
            const pinDistance = window.innerHeight * 2.5;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top 8%", // pin when the container gets close to the top
                    end: `+=${pinDistance}`,
                    pin: true,
                    scrub: 1, // smooth scroll scrubbing
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                }
            });

            // --- TRANSITION 1: Card 1 slides up over Card 0 ---
            tl.to(c1, {
                yPercent: 0,
                opacity: 1,
                ease: "none",
                duration: 1,
            }, 0);

            tl.to(c0, {
                scale: 0.93,
                opacity: 0.4,
                y: -35,
                ease: "none",
                duration: 1,
            }, 0);

            // Animate inside Card 1 (Soundwave bars pop up and grow)
            if (card1WaveBarsRef.current) {
                const bars = card1WaveBarsRef.current.children;
                tl.fromTo(bars, {
                    scaleY: 0.1,
                }, {
                    scaleY: 1,
                    stagger: 0.05,
                    duration: 0.6,
                    ease: "power2.out",
                }, 0.3);
            }

            // --- TRANSITION 2: Card 2 slides up over Card 1 ---
            tl.to(c2, {
                yPercent: 0,
                opacity: 1,
                ease: "none",
                duration: 1,
            }, 1);

            tl.to(c1, {
                scale: 0.93,
                opacity: 0.4,
                y: -35,
                ease: "none",
                duration: 1,
            }, 1);

            tl.to(c0, {
                scale: 0.86,
                opacity: 0.15,
                y: -70,
                ease: "none",
                duration: 1,
            }, 1);

            // Animate inside Card 2 (Battery fill charging)
            if (card2BatteryFillRef.current) {
                tl.fromTo(card2BatteryFillRef.current, {
                    width: "0%",
                }, {
                    width: "85%",
                    duration: 0.7,
                    ease: "power3.out",
                }, 1.3);
            }

            // --- TRANSITION 3: Card 3 slides up over Card 2 ---
            tl.to(c3, {
                yPercent: 0,
                opacity: 1,
                ease: "none",
                duration: 1,
            }, 2);

            tl.to(c2, {
                scale: 0.93,
                opacity: 0.4,
                y: -35,
                ease: "none",
                duration: 1,
            }, 2);

            tl.to(c1, {
                scale: 0.86,
                opacity: 0.15,
                y: -70,
                ease: "none",
                duration: 1,
            }, 2);

            // Animate inside Card 3 (Transducer rotates faster and glows)
            if (card3TransducerRef.current) {
                tl.fromTo(card3TransducerRef.current, {
                    rotation: 0,
                    scale: 0.9,
                }, {
                    rotation: 180,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                }, 2.3);
            }

            // Cleanup when media query stops matching
            return () => {
                c0.removeEventListener("mousemove", handleMouseMove);
                c0.removeEventListener("mouseleave", handleMouseLeave);
            };
        });

        // Cleanup the matchMedia instance on unmount
        return () => {
            mm.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white select-none section-gap"
        >
            <div
                ref={containerRef}
                className="w-full flex flex-col items-center justify-start h-auto md:h-[90vh] md:max-h-[800px] md:overflow-hidden"
            >
                {/* Header / Titles */}
                <div className="flex flex-col items-center text-center gap-2.5 section-body-gapp px-4 z-30 shrink-0">
                    <span className="text-[10px] tracking-[0.25em] font-semibold text-[#f26e11] uppercase font-sans">
                        Core Specifications
                    </span>
                    <h2 className="text-3xl md:text-4xl font-medium text-[#111] tracking-tight uppercase font-schein">
                        Acoustic Intelligence
                    </h2>
                    <p className="text-xs text-neutral-500 font-light font-sans max-w-md leading-relaxed">
                        Designed without compromise. Merging aerospace-grade materials with revolutionary neural audio processors.
                    </p>
                </div>

                {/* Spacer to guarantee un-compressible gap on mobile/desktop */}
                <div className="h-8 md:h-16 shrink-0" />

                {/* Cards Stack Parent (This acts as the deck window) */}
                <div
                    ref={cardsParentRef}
                    className="relative w-full max-w-[1200px] flex-grow px-3 md:px-6 flex flex-col md:block gap-6 md:gap-0 h-auto md:h-[500px] md:max-h-[500px] mb-8"
                    style={{ perspective: 1200 }}
                >
                    <div
                        ref={card0Ref}
                        className="relative md:absolute md:inset-x-6 md:top-0 md:bottom-0 w-full md:w-auto min-h-[380px] md:min-h-0 bg-neutral-950 border border-white/10 rounded-[32px] p-6 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden z-10 transition-colors duration-300"
                        style={{ transformStyle: isDesktop ? "preserve-3d" : "flat" }}
                    >
                        {/* Magnetic Glow inside card */}
                        <div className="card-glow absolute h-[300px] w-[300px] rounded-full bg-[#f26e11] blur-[90px] opacity-0 pointer-events-none" />

                        <div className="flex flex-col justify-between md:h-full w-full md:w-[45%] z-20 gap-3 md:gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] tracking-[0.2em] font-semibold text-[#f26e11] uppercase font-sans">
                                    Masterpiece Design
                                </span>
                                <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight uppercase font-schein leading-tight">
                                    Ergonomic Sculpting
                                </h3>
                            </div>

                            <div>
                                <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
                                    Constructed with anodized aluminum telescopic arms and custom-engineered memory foam ear cushions wrapped in breathable, protein-leather fabric. Sized precisely for long-listening sessions.
                                </p>
                            </div>
                        </div>

                        {/* Large Parallax Headphone Image */}
                        <div className="relative w-full md:w-[50%] h-[150px] md:h-[80%] flex items-center justify-center z-10 mt-2 md:mt-0">
                            <div className="absolute w-[220px] h-[220px] rounded-full bg-[#f26e11]/5 blur-[70px] pointer-events-none" />
                            <Image
                                ref={card0ImageRef}
                                src="/headphone_gray_v3.png"
                                alt="Headphone Hero"
                                width={600}
                                height={600}
                                className="w-auto h-full md:h-[125%] object-contain select-none transform"
                                priority
                            />
                        </div>
                    </div>

                    {/* CARD 1: Active Noise Cancelling */}
                    <div
                        ref={card1Ref}
                        className="relative md:absolute md:inset-x-6 md:top-0 md:bottom-0 w-full md:w-auto min-h-[380px] md:min-h-0 bg-neutral-950 border border-white/10 rounded-[32px] p-6 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden z-20 hover:border-[#f26e11]/30 transition-colors duration-300"
                    >
                        {/* Ambient glow in corner */}
                        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#f26e11] blur-[80px] opacity-10 pointer-events-none" />

                        <div className="flex flex-col justify-between md:h-full w-full md:w-[45%] z-20 gap-3 md:gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] tracking-[0.2em] font-semibold text-[#f26e11] uppercase font-sans">
                                    Acoustic Shield
                                </span>
                                <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight uppercase font-schein leading-tight">
                                    48dB Hybrid ANC
                                </h3>
                            </div>

                            <div>
                                <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
                                    Isolate yourself in perfect silence. Our high-performance neural processors monitor environmental sound in real-time, instantly emitting anti-noise waves to counter plane engines, urban hums, and office chatter.
                                </p>
                            </div>
                        </div>

                        {/* Animated Soundwave Graphic */}
                        <div className="w-full md:w-[45%] h-[130px] md:h-[80%] flex items-center justify-center bg-neutral-900/40 border border-white/5 rounded-2xl p-4 relative mt-2 md:mt-0">
                            <div
                                ref={card1WaveBarsRef}
                                className="w-full h-full flex items-center justify-center gap-2 md:gap-3"
                            >
                                {[1.2, 2.1, 0.8, 2.5, 1.7, 0.5, 2.0, 1.4, 0.9, 1.8, 1.1, 2.3].map((speed, idx) => (
                                    <span
                                        key={idx}
                                        style={{
                                            animation: `soundwave 1.4s ease-in-out infinite alternate`,
                                            animationDelay: `${idx * 0.08}s`,
                                            transformOrigin: "center"
                                        }}
                                        className="w-1 md:w-2.5 rounded-full bg-gradient-to-t from-[#f26e11]/20 to-[#f26e11] h-10 md:h-28"
                                    />
                                ))}
                            </div>

                            <span className="absolute bottom-3 left-4 flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#f26e11] animate-pulse" />
                                <span className="text-[8px] tracking-[0.2em] font-mono text-neutral-500 uppercase">
                                    Adaptive Suppression
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* CARD 2: Battery Power Reserve */}
                    <div
                        ref={card2Ref}
                        className="relative md:absolute md:inset-x-6 md:top-0 md:bottom-0 w-full md:w-auto min-h-[380px] md:min-h-0 bg-neutral-950 border border-white/10 rounded-[32px] p-6 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden z-30 hover:border-[#f26e11]/30 transition-colors duration-300"
                    >
                        <div className="absolute -left-24 -bottom-24 h-56 w-56 rounded-full bg-[#f26e11] blur-[80px] opacity-10 pointer-events-none" />

                        <div className="flex flex-col justify-between md:h-full w-full md:w-[45%] z-20 gap-3 md:gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] tracking-[0.2em] font-semibold text-[#f26e11] uppercase font-sans">
                                    Power Reserve
                                </span>
                                <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight uppercase font-schein leading-tight">
                                    80-Hour Playback
                                </h3>
                            </div>

                            <div>
                                <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
                                    Go weeks without recharging. Engineered with dual high-density lithium cells, the Model XRS delivers an unprecedented 80 hours of high-fidelity listening. Supports ultra-fast charging: 10 minutes gives you 5 hours.
                                </p>
                            </div>
                        </div>

                        {/* Battery Level Dashboard Widget */}
                        <div className="w-full md:w-[45%] h-[140px] md:h-[80%] flex flex-col justify-between bg-neutral-900/40 border border-white/5 rounded-2xl p-4 md:p-8 relative mt-2 md:mt-0">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[8px] md:text-[9px] tracking-[0.15em] font-mono text-neutral-500 uppercase">System Status</span>
                                    <span className="text-sm md:text-lg font-bold text-white font-sans tracking-tight">Battery Reserve</span>
                                </div>
                                <svg className="w-5 h-5 md:w-7 md:h-7 text-[#f26e11] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <div className="w-full h-2 bg-white/5 border border-white/5 rounded-full overflow-hidden p-0.5">
                                    <div
                                        ref={card2BatteryFillRef}
                                        className="h-full bg-[#f26e11] rounded-full"
                                        style={{ width: "85%" }}
                                    />
                                </div>
                                <div className="flex justify-between items-center text-[9px] md:text-[10px] text-neutral-400 font-mono">
                                    <span className="flex items-center gap-1">
                                        <span className="h-1 w-1 rounded-full bg-[#f26e11] animate-ping" />
                                        <span>CHARGING</span>
                                    </span>
                                    <span ref={card2BatteryPercentRef} className="text-white font-bold">85% ACTIVE</span>
                                </div>
                            </div>

                            <div className="hidden sm:block text-[9px] text-neutral-500 font-sans tracking-wide leading-normal border-t border-white/5 pt-2">
                                Estimated standby: 720 hours • USB-C Quick Charge 3.0 Compatible
                            </div>
                        </div>
                    </div>

                    {/* CARD 3: Beryllium Transducer */}
                    <div
                        ref={card3Ref}
                        className="relative md:absolute md:inset-x-6 md:top-0 md:bottom-0 w-full md:w-auto min-h-[380px] md:min-h-0 bg-neutral-950 border border-white/10 rounded-[32px] p-6 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden z-40 hover:border-[#f26e11]/30 transition-colors duration-300"
                    >
                        <div className="absolute -right-24 -bottom-24 h-56 w-56 rounded-full bg-[#f26e11] blur-[80px] opacity-10 pointer-events-none" />

                        <div className="flex flex-col justify-between md:h-full w-full md:w-[45%] z-20 gap-3 md:gap-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] tracking-[0.2em] font-semibold text-[#f26e11] uppercase font-sans">
                                    Transducer Technology
                                </span>
                                <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight uppercase font-schein leading-tight">
                                    Beryllium Driver
                                </h3>
                            </div>

                            <div>
                                <p className="text-xs text-neutral-400 font-light leading-relaxed font-sans">
                                    Our signature 40mm transducer features a pure Beryllium-coated diaphragm. Beryllium is extremely rigid yet ultra-lightweight, allowing the driver to react instantly to complex audio signals, rendering crystalline highs and deep, undistorted bass.
                                </p>
                            </div>
                        </div>

                        {/* Interactive Rotating Driver Graphic */}
                        <div className="w-full md:w-[45%] h-[140px] md:h-[80%] flex items-center justify-center bg-neutral-900/40 border border-white/5 rounded-2xl relative mt-2 md:mt-0 overflow-hidden">
                            <div className="absolute inset-0 bg-radial-gradient from-[#f26e11]/5 to-transparent pointer-events-none" />

                            <div
                                ref={card3TransducerRef}
                                className="relative w-24 h-24 md:w-44 md:h-44 rounded-full border border-white/10 flex items-center justify-center"
                            >
                                {/* Inner driver core */}
                                <div className="absolute w-16 h-16 md:w-28 md:h-28 rounded-full border border-dashed border-[#f26e11]/40 animate-[spin_20s_linear_infinite]" />
                                <div className="absolute w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/15 flex items-center justify-center">
                                    <div className="w-3 h-3 md:w-6 md:h-6 rounded-full bg-gradient-to-tr from-[#f26e11] to-orange-400 shadow-[0_0_20px_rgba(242,110,17,0.6)]" />
                                </div>

                                {/* Outer ring ticks */}
                                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#f26e11]/30 border-b-[#f26e11]/30 animate-[spin_8s_linear_infinite]" />
                            </div>

                            <span className="absolute bottom-3 right-4 flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#f26e11]" />
                                <span className="text-[8px] tracking-[0.2em] font-mono text-neutral-500 uppercase">
                                    40mm Solid-State Core
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
