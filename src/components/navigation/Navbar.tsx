"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState("overview");

    useEffect(() => {
        const handleScroll = () => {
            // Show navbar when scrolled down past 120px
            if (window.scrollY > 120) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Detect which section is currently active/in viewport
            const sections = ["overview", "features", "customizer", "faq"];
            for (const sectionId of sections) {
                const el = document.getElementById(sectionId);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // If the section occupies the upper part of the viewport
                    if (rect.top <= 160 && rect.bottom >= 160) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Run once initially
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            className={`fixed left-1/2 -translate-x-1/2 w-[92%] max-w-[1100px] h-14 z-50 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between px-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible 
                    ? "top-4 opacity-100 translate-y-0 scale-100" 
                    : "top-0 opacity-0 -translate-y-10 scale-95 pointer-events-none"
            }`}
        >
            {/* Logo */}
            <button 
                onClick={() => scrollToSection("overview")}
                className="flex items-center gap-2 text-[10px] tracking-[4px] text-white font-medium font-schein uppercase hover:opacity-80 transition-opacity cursor-pointer border-none bg-transparent p-0"
            >
                <svg
                    className="w-4 h-4 text-[#f26e11]"
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
                <span className="hidden sm:inline">MODEL EARS</span>
            </button>

            {/* Nav Links (Desktop Only) */}
            <div className="hidden md:flex items-center gap-8">
                {[
                    { id: "overview", label: "Overview" },
                    { id: "features", label: "Specs" },
                    { id: "customizer", label: "Customizer" },
                    { id: "faq", label: "FAQ" }
                ].map((link) => (
                    <button
                        key={link.id}
                        onClick={() => scrollToSection(link.id)}
                        className={`text-[10px] font-bold tracking-widest uppercase transition-all duration-300 relative py-1 cursor-pointer border-none bg-transparent`}
                    >
                        <span className={activeSection === link.id ? "text-[#f26e11]" : "text-neutral-400 hover:text-white"}>
                            {link.label}
                        </span>
                        {activeSection === link.id && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#f26e11] rounded-full shadow-[0_0_8px_rgba(242,110,17,0.8)]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Right Side Action (Buy Button) */}
            <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-xs font-mono font-bold text-white/60 mr-1">$169.99</span>
                <button 
                    onClick={() => scrollToSection("overview")}
                    className="relative overflow-hidden rounded-full border border-[#f26e11] bg-black px-5 py-2 text-[9px] font-bold tracking-widest uppercase text-white transition-all duration-300 shadow-[0_4px_15px_rgba(242,110,17,0.15)] hover:shadow-[0_6px_25px_rgba(242,110,17,0.4)] active:scale-95 cursor-pointer group"
                >
                    <span className="absolute inset-0 w-full h-full bg-[#f26e11] transition-transform duration-500 ease-out transform -translate-x-full group-hover:translate-x-0 z-0" />
                    <span className="relative z-10">Buy Now</span>
                </button>
            </div>
        </nav>
    );
}
