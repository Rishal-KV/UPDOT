"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the GSAP ScrollTrigger plugin safely
gsap.registerPlugin(ScrollTrigger);

interface ShowcasePanel {
    id: number;
    title: string;
    subtitle: string;
    highlight: string;
    image: string;
    bgColor: string;
    textColor: string;
    badgeText: string;
}

export default function HorizontalShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const panels: ShowcasePanel[] = [
        {
            id: 1,
            badgeText: "Adaptable Silence",
            title: "HYBRID ACTIVE NOISE CANCELLATION",
            highlight: "48dB Hybrid ANC",
            subtitle: "Outward and inward-facing microphones detect ambient sound and cancel it in real-time, leaving you in absolute sonic isolation.",
            image: "/headphone_black_v3.png",
            bgColor: "bg-black",
            textColor: "text-white"
        },
        {
            id: 2,
            badgeText: "Sonic Dimensions",
            title: "360° SPATIAL AUDIO SOUNDSTAGE",
            highlight: "Gyroscopic Tracking",
            subtitle: "Bespoke spatial audio algorithms simulate an expansive 3D acoustic room that dynamically adjusts as you move your head.",
            image: "/headphone_blue_v3.png",
            bgColor: "bg-[#0b132b]",
            textColor: "text-white"
        },
        {
            id: 3,
            badgeText: "High-Res Acoustic",
            title: "BERYLLIUM-COATED DIAPHRAGMS",
            highlight: "40mm Custom Drivers",
            subtitle: "Engineered with ultra-lightweight beryllium-coated drivers to deliver tight transient response, deep bass, and crystal clear treble.",
            image: "/headphone_gray_v3.png",
            bgColor: "bg-neutral-900",
            textColor: "text-white"
        }
    ];

    useEffect(() => {
        const container = containerRef.current;
        const trigger = triggerRef.current;

        if (!container || !trigger) return;

        // Create a GSAP context for safe React lifecycle scoping
        const ctx = gsap.context(() => {
            
            // GSAP scroll-pinned horizontal translation animation
            const pinAnimation = gsap.to(container, {
                x: () => -(container.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    pin: true,
                    scrub: 1.2,
                    start: "top top",
                    end: () => `+=${container.scrollWidth - window.innerWidth}`,
                    invalidateOnRefresh: true, // Recalculates sizes on window resize
                }
            });

            // Sub-elements parallax translation (slides text at a offset speed)
            const textElements = container.querySelectorAll(".parallax-text");
            textElements.forEach((el) => {
                gsap.fromTo(el, 
                    { x: 100, opacity: 0.3 },
                    {
                        x: -100,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: trigger,
                            containerAnimation: pinAnimation,
                            start: "left right",
                            end: "right left",
                            scrub: true,
                        }
                    }
                );
            });

        }, triggerRef); // Scope all animations to the trigger container

        // Clean up context (removes all triggers, timelines, and spacers) on unmount or re-render
        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div 
            ref={triggerRef} 
            className="relative w-full overflow-visible select-none bg-black section-gap"
        >
            {/* The Horizontal scrolling container */}
            <div 
                ref={containerRef} 
                className="flex flex-row h-screen overflow-hidden will-change-transform"
                style={{ width: `${panels.length * 100}vw` }}
            >
                {panels.map((panel) => (
                    <section
                        key={panel.id}
                        className={`w-screen h-screen flex-shrink-0 flex items-center justify-center relative overflow-hidden px-6 md:px-16 ${panel.bgColor} ${panel.textColor}`}
                    >
                        {/* Abstract Background Aesthetic Elements */}
                        <div className="absolute inset-0 bg-radial-gradient from-white/5 via-transparent to-transparent opacity-40 pointer-events-none" />
                        
                        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-10">
                            
                            {/* Panel Text Details */}
                            <div className="w-full md:w-[50%] flex flex-col items-start gap-4 md:gap-6 text-left order-2 md:order-1">
                                <div className="parallax-text flex flex-col items-start gap-3">
                                    <span className="px-3.5 py-1.5 rounded-full border border-[#f26e11]/30 bg-[#f26e11]/5 text-[10px] tracking-[0.2em] font-semibold text-[#f26e11] uppercase font-sans">
                                        {panel.badgeText}
                                    </span>
                                    <h3 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight uppercase font-schein mt-2">
                                        {panel.title}
                                    </h3>
                                    <h4 className="text-lg md:text-xl font-bold text-[#f26e11] font-sans">
                                        {panel.highlight}
                                    </h4>
                                </div>
                                <p className="parallax-text text-sm md:text-base text-neutral-400 font-light leading-relaxed max-w-lg font-sans">
                                    {panel.subtitle}
                                </p>
                            </div>

                            {/* Panel Product Image */}
                            <div className="w-full md:w-[45%] flex items-center justify-center order-1 md:order-2 h-[300px] md:h-[480px] relative">
                                <div className="absolute w-[280px] md:w-[420px] h-[280px] md:h-[420px] rounded-full bg-[#f26e11]/5 blur-[80px] animate-pulse" />
                                <Image
                                    src={panel.image}
                                    alt={panel.title}
                                    width={1200}
                                    height={1200}
                                    className="w-full h-full object-contain select-none z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                                    priority={panel.id === 1}
                                />
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
