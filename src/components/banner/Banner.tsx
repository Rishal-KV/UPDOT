"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function HeadphoneBanner() {
    const bannerRef = useRef<HTMLDivElement>(null);
    const headphoneRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const banner = bannerRef.current;
        const headphone = headphoneRef.current;
        const glow = glowRef.current;

        if (!banner || !headphone || !glow) return;

        const checkLayout = () => {
            const isDesktop = window.innerWidth >= 768;
            if (!isDesktop) {
                // Clear any GSAP inline styles on mobile to ensure clean CSS layout
                gsap.set([headphone, glow, banner], { clearProps: "all" });
                return false;
            }
            return true;
        };

        // Run initial check
        const isDesktopInit = checkLayout();

        if (isDesktopInit) {
            gsap.set(headphone, {
                scale: 1.08,
                transformOrigin: "center center",
            });

            // GSAP manages percentage-based translate to avoid conflicts with Tailwind CSS classes
            gsap.set(glow, {
                opacity: 0.3,
                scale: 1,
                xPercent: -50,
                yPercent: -50,
                x: 0,
                y: 0,
                transformOrigin: "center center",
            });
        }

        const handleMove = (clientX: number, clientY: number) => {
            const rect = banner.getBoundingClientRect();

            // Calculate if cursor/touch is within the vertical proximity of the banner (with 350px buffer)
            const verticalBuffer = 350;
            const isNearBanner =
                clientY >= rect.top - verticalBuffer &&
                clientY <= rect.bottom + verticalBuffer;

            if (isNearBanner) {
                // Calculate offsets relative to the banner
                const x = (clientX - rect.left) / rect.width - 0.5;
                const y = (clientY - rect.top) / rect.height - 0.5;

                const mouseX = clientX - rect.left - rect.width / 2;
                const mouseY = clientY - rect.top - rect.height / 2;

                gsap.to(headphone, {
                    x: x * 65,
                    y: y * 45,
                    duration: 0.9,
                    ease: "power2.out",
                    overwrite: "auto",
                });

                // Smoothly move glow to follow the cursor/touch
                gsap.to(glow, {
                    opacity: 0.3,
                    x: mouseX,
                    y: mouseY,
                    duration: 0.8,
                    ease: "power2.out",
                    overwrite: "auto",
                });
            } else {
                handleReset();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth < 768) return;
            handleMove(e.clientX, e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (window.innerWidth < 768) return;
            if (e.touches && e.touches[0]) {
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const handleReset = () => {
            if (window.innerWidth < 768) return;
            gsap.to(headphone, {
                x: 0,
                y: 0,
                scale: 1.08,
                duration: 1.2,
                ease: "power3.out",
                overwrite: "auto",
            });
        };

        // Track cursor and touch globally on the window to support movement in the margins/paddings
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        // Reset if the cursor leaves the window or touch ends
        document.addEventListener("mouseleave", handleReset);
        window.addEventListener("touchend", handleReset);

        // Handle resize to dynamically clear/apply GSAP styles
        const handleResize = () => {
            if (checkLayout()) {
                // Re-apply desktop styling if resized back
                gsap.set(headphone, {
                    scale: 1.08,
                    transformOrigin: "center center",
                });
                gsap.set(glow, {
                    xPercent: -50,
                    yPercent: -50,
                    transformOrigin: "center center",
                });
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("mouseleave", handleReset);
            window.removeEventListener("touchend", handleReset);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <section
            ref={bannerRef}
            className="relative w-full max-w-[1400px] h-auto min-h-[500px] md:h-[580px] flex flex-col md:block items-center justify-center overflow-visible select-none cursor-pointer py-10 md:py-0"
        >
            {/* Background Panel with Premium Clip Path */}
            <div
                className="absolute inset-0 overflow-hidden bg-black z-0"
                style={{
                    clipPath: "polygon(32px 0, calc(100% - 32px) 0, 100% 32px, 100% calc(100% - 32px), calc(100% - 32px) 100%, 32px 100%, 0 calc(100% - 32px), 0 32px)"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-[#140600]" />

                {/* Hover Glow */}
                <div
                    ref={glowRef}
                    className="hidden md:block absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f26e11] blur-[140px] opacity-30"
                />
            </div>

            {/* Logo (Top Center on Desktop, relative on Mobile) */}
            <div className="relative md:absolute top-0 md:top-8 left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center gap-2.5 text-xs tracking-[5px] text-white/95 font-medium font-schein mb-8 md:mb-0 z-30">
                <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
                <span>MODEL EARS</span>
            </div>

            {/* Heading ("MODEL XRS" in Schein Sans, layered in the background, shifted left) */}
            <div className="relative md:absolute inset-y-0 left-0 w-full md:w-[72%] z-10 flex flex-col items-center justify-center pointer-events-none md:-translate-y-10 mt-4 md:mt-0">
                <h1 className="text-6xl sm:text-8xl md:text-[120px] font-medium text-white tracking-[-0.05em] leading-[1.1] md:leading-[1] font-schein">
                    MODEL
                </h1>
                <h1 className="text-6xl sm:text-8xl md:text-[120px] font-medium text-white tracking-[-0.05em] leading-[1.1] md:leading-[1] font-schein">
                    XRS
                </h1>
            </div>

            {/* Headphone Image Wrapper (Relative on Mobile, Absolute on Desktop) */}
            <div
                ref={headphoneRef}
                className="relative md:absolute inset-y-0 md:left-[-5%] w-full md:w-[85%] z-20 flex items-center justify-center pointer-events-none my-6 md:my-0"
            >
                {/* Desktop Image */}
                <Image
                    src="https://model-xrs.vercel.app/_astro/headphone.D5qdmteJ_11ckze.webp"
                    alt="Headphone Desktop"
                    width={1200}
                    height={700}
                    className="hidden md:block w-auto md:h-[120%] object-contain select-none pointer-events-none"
                    priority
                />
                {/* Mobile Image (Different premium headset) */}
                <Image
                    src="/headphone_premium.png"
                    alt="Headphone Mobile"
                    width={600}
                    height={600}
                    className="block md:hidden w-[85%] max-w-[320px] h-auto object-contain select-none pointer-events-none"
                    priority
                />
            </div>

            {/* Details & Purchase Controls (Relative on Mobile, Absolute on Desktop) */}
            <div className="relative md:absolute md:bottom-9 md:right-9 z-30 flex flex-col items-center md:items-end text-center md:text-right max-w-sm px-6 md:px-0 mt-6 md:mt-0 gap-4 md:gap-0">
                <p className="mb-4 text-[14px] leading-relaxed text-[#7c7c7c] font-light font-sans tracking-wide max-w-[320px]">
                    Lorem ipsum linus Karlsson Alexandra
                    <br className="hidden md:block" />
                    sjöberg i Signe Björk, Michael Jonsson.
                    <br className="hidden md:block" />
                    Viktor Blom Alexander Engström.
                    <br className="hidden md:block" />
                    Adam Gustavsson Astrid Lindgren.
                    <br className="hidden md:block" />
                    Adam Sundberg Viola Nyberg.
                </p>

                <div className="flex items-center gap-5">
                    <span className="text-[28px] font-medium text-white tracking-tight font-sans">
                        $169.99
                    </span>

                    <button className="relative group overflow-hidden rounded-full border border-[#f26e11] bg-black/45 active:scale-95 text-white px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-500 shadow-[0_4px_20px_rgba(242,110,17,0.15)] hover:shadow-[0_6px_30px_rgba(242,110,17,0.45)] cursor-pointer">
                        {/* Sliding background fill layer */}
                        <span className="absolute inset-0 w-full h-full bg-[#f26e11] transition-transform duration-500 ease-out transform -translate-x-full group-hover:translate-x-0 z-0" />

                        {/* Button text */}
                        <span className="relative z-10">
                            Buy Now
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}