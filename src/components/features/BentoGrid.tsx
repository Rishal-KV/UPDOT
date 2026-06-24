"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BentoCard {
    id: number;
}

export default function BentoGrid() {
    const gridRef = useRef<HTMLDivElement>(null);
    const heroCardRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);
    
    // Cards refs for staggered fade-in
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // 1. 3D perspective Flip-Up entrance animation when scrolled into view
        const cards = cardRefs.current.filter(Boolean);
        if (cards.length > 0) {
            gsap.fromTo(
                cards,
                { 
                    rotationX: -20, 
                    rotationY: 10,
                    y: 80, 
                    opacity: 0,
                    transformPerspective: 1000
                },
                {
                    rotationX: 0,
                    rotationY: 0,
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.12,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }

        // 2. Text Decrypt/Scramble effect on Hover
        const scrambleText = (element: HTMLElement) => {
            const originalText = element.getAttribute("data-title") || element.innerText;
            if (!element.getAttribute("data-title")) {
                element.setAttribute("data-title", originalText);
            }
            
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=?";
            let iterations = 0;
            
            // Clear any existing scramble interval on this element to prevent overlapping loops
            const existingInterval = (element as any).scrambleInterval;
            if (existingInterval) clearInterval(existingInterval);
            
            const interval = setInterval(() => {
                element.innerText = originalText
                    .split("")
                    .map((char, index) => {
                        if (char === " ") return " ";
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                }
                iterations += 1/3; // Scramble speed factor
            }, 30);
            
            (element as any).scrambleInterval = interval;
        };

        // Attach hover scramble events to each card
        cards.forEach((card) => {
            const handleMouseEnter = () => {
                const titleEl = card.querySelector("[data-scramble]") as HTMLElement;
                if (titleEl) scrambleText(titleEl);
            };
            card.addEventListener("mouseenter", handleMouseEnter);
            
            // Save the cleanup reference on the card element
            (card as any)._handleMouseEnter = handleMouseEnter;
        });

        // 3. 3D Tilt effect on the Hero Card
        const heroCard = heroCardRef.current;
        const heroImage = heroImageRef.current;
        if (!heroCard || !heroImage) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = heroCard.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

            // Rotate card slightly in 3D space
            gsap.to(heroCard, {
                rotateY: x * 12,
                rotateX: -y * 12,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto",
            });

            // Parallax shift on the headphone image inside (moves slightly opposite/layered)
            gsap.to(heroImage, {
                x: x * 20,
                y: y * 20,
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto",
            });

            // Move custom glow element inside the card
            const glow = heroCard.querySelector(".bento-glow") as HTMLDivElement;
            if (glow) {
                const glowX = e.clientX - rect.left - 150;
                const glowY = e.clientY - rect.top - 150;
                gsap.to(glow, {
                    x: glowX,
                    y: glowY,
                    opacity: 0.15,
                    duration: 0.4,
                    overwrite: "auto",
                });
            }
        };

        const handleMouseLeave = () => {
            // Reset rotation
            gsap.to(heroCard, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.8,
                ease: "power3.out",
                overwrite: "auto",
            });

            // Reset image parallax
            gsap.to(heroImage, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                overwrite: "auto",
            });

            // Fade out glow
            const glow = heroCard.querySelector(".bento-glow") as HTMLDivElement;
            if (glow) {
                gsap.to(glow, {
                    opacity: 0,
                    duration: 0.6,
                    overwrite: "auto",
                });
            }
        };

        heroCard.addEventListener("mousemove", handleMouseMove);
        heroCard.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            heroCard.removeEventListener("mousemove", handleMouseMove);
            heroCard.removeEventListener("mouseleave", handleMouseLeave);
            
            // Clean up hover event listeners on cards
            cards.forEach((card) => {
                if ((card as any)._handleMouseEnter) {
                    card.removeEventListener("mouseenter", (card as any)._handleMouseEnter);
                }
            });
        };
    }, []);

    // Helper to add card to refs
    const addToRefs = (el: HTMLDivElement | null, index: number) => {
        if (el) cardRefs.current[index] = el;
    };

    return (
        <section 
            ref={gridRef}
            className="w-full max-w-[1400px] mx-auto px-3 md:px-6 section-gap select-none"
        >
            {/* Header / Titles */}
            <div className="flex flex-col items-center text-center gap-2.5 mb-12">
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

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px]">
                
                {/* CARD 1: Large Hero Product Card (Spans 2 cols, 2 rows) */}
                <div
                    ref={(el) => addToRefs(el, 0)}
                    className="md:col-span-2 md:row-span-2 relative overflow-hidden bg-neutral-950 border border-white/10 rounded-[32px] p-8 md:p-10 flex flex-col justify-between group"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Inner 3D Container */}
                    <div ref={heroCardRef} className="absolute inset-0 w-full h-full z-10 p-8 md:p-10 flex flex-col justify-between pointer-events-auto">
                        
                        {/* Magnetic Glow inside card */}
                        <div className="bento-glow absolute h-[300px] w-[300px] rounded-full bg-[#f26e11] blur-[80px] opacity-0 pointer-events-none" />

                        {/* Top Info */}
                        <div className="flex flex-col gap-2 relative z-20">
                            <span className="text-[9px] tracking-[0.2em] font-semibold text-[#f26e11] uppercase font-sans">
                                Masterpiece Design
                            </span>
                            <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight uppercase font-schein leading-tight max-w-[200px]">
                                Ergonomic Sculpting
                            </h3>
                        </div>

                        {/* Large Parallax Headphone Image */}
                        <div 
                            ref={heroImageRef}
                            className="absolute right-[-5%] bottom-[-5%] w-[65%] h-[90%] flex items-center justify-center z-10"
                        >
                            <div className="absolute w-[240px] h-[240px] rounded-full bg-[#f26e11]/5 blur-[70px] pointer-events-none" />
                            <Image
                                src="/headphone_gray_v3.png"
                                alt="Headphone Hero"
                                width={800}
                                height={800}
                                className="w-full h-full object-contain select-none transform scale-110"
                                priority
                            />
                        </div>

                        {/* Bottom details */}
                        <div className="relative z-20 max-w-[220px]">
                            <p className="text-[11px] text-neutral-400 font-light leading-relaxed font-sans">
                                Constructed with anodized aluminum arms and custom-engineered memory foam ear cushions wrapped in breathable, protein-leather fabric.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CARD 2: Active Noise Cancelling (Spans 2 cols, 1 row) */}
                <div
                    ref={(el) => addToRefs(el, 1)}
                    className="md:col-span-2 relative overflow-hidden bg-neutral-950 border border-white/10 rounded-[32px] p-8 flex items-center justify-between group cursor-pointer hover:border-[#f26e11]/30 transition-colors duration-300"
                >
                    <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#f26e11] blur-[70px] opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
                    
                    <div className="flex flex-col gap-3 relative z-10 max-w-[50%]">
                        <span className="text-[9px] tracking-[0.2em] font-semibold text-[#f26e11] uppercase font-sans">
                            Acoustic Shield
                        </span>
                        <h3 className="text-xl font-medium text-white tracking-tight uppercase font-schein">
                            48dB Hybrid ANC
                        </h3>
                        <p className="text-[11px] text-neutral-400 font-light leading-relaxed font-sans">
                            Isolate yourself in perfect silence. Smart environmental sensors continuously adjust dampening waves in real time.
                        </p>
                    </div>

                    {/* Animated Soundwave Graphic */}
                    <div className="w-[40%] h-[80%] flex items-center justify-center gap-1">
                        {[1.2, 2.1, 0.8, 2.5, 1.7, 0.5, 2.0, 1.4, 0.9, 1.8].map((speed, idx) => (
                            <span 
                                key={idx}
                                style={{ 
                                    animation: `soundwave 1.5s ease-in-out infinite alternate`,
                                    animationDelay: `${idx * 0.1}s`,
                                    transformOrigin: "center"
                                }}
                                className="w-1.5 rounded-full bg-gradient-to-t from-[#f26e11]/30 to-[#f26e11] h-8"
                            />
                        ))}
                    </div>
                </div>

                {/* CARD 3: Battery Power Reserve (Spans 1 col, 1 row) */}
                <div
                    ref={(el) => addToRefs(el, 2)}
                    className="relative overflow-hidden bg-neutral-950 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between group cursor-pointer hover:border-[#f26e11]/30 transition-colors duration-300"
                >
                    <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-[#f26e11] blur-[50px] opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
                    
                    <div className="flex justify-between items-start z-10">
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] tracking-[0.2em] font-semibold text-[#f26e11] uppercase font-sans">
                                Power reserve
                            </span>
                            <h3 className="text-xl font-medium text-white tracking-tight uppercase font-schein">
                                80 Hours
                            </h3>
                        </div>
                        {/* Battery Icon with subtle animation */}
                        <svg className="w-6 h-6 text-[#f26e11] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                    </div>

                    <div className="flex flex-col gap-2 z-10">
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-[85%] h-full bg-[#f26e11] rounded-full animate-[batteryFill_2.5s_ease-out_forwards]" />
                        </div>
                        <span className="text-[10px] text-neutral-400 font-light font-sans flex justify-between">
                            <span>85% Charged</span>
                            <span>5 Days Standby</span>
                        </span>
                    </div>
                </div>

                {/* CARD 4: Custom Drivers / Beryllium (Spans 1 col, 1 row) */}
                <div
                    ref={(el) => addToRefs(el, 3)}
                    className="relative overflow-hidden bg-neutral-950 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between group cursor-pointer hover:border-[#f26e11]/30 transition-colors duration-300"
                >
                    <div className="absolute -right-12 -bottom-12 h-32 w-32 rounded-full bg-[#f26e11] blur-[50px] opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
                    
                    <div className="flex flex-col gap-1.5 z-10">
                        <span className="text-[9px] tracking-[0.2em] font-semibold text-[#f26e11] uppercase font-sans">
                            Transducer
                        </span>
                        <h3 className="text-xl font-medium text-white tracking-tight uppercase font-schein">
                            Beryllium
                        </h3>
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                        <p className="text-[11px] text-neutral-400 font-light leading-relaxed font-sans max-w-[70%]">
                            40mm diaphragms with rapid transient response.
                        </p>
                        {/* Circular Driver Graphic */}
                        <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#f26e11]/40 transition-colors duration-500">
                            <div className="w-6 h-6 rounded-full border border-dashed border-[#f26e11]/40 animate-[spin_10s_linear_infinite]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
