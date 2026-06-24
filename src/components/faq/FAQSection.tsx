"use client";

import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs: FAQItem[] = [
        {
            question: "What is the battery life of the Model XRS?",
            answer: "The Model XRS offers an industry-leading 80 hours of continuous playback on a single charge with ANC off, and up to 50 hours with Hybrid ANC fully engaged. A quick 10-minute charge via the included high-speed USB-C cable provides up to 5 hours of listening time, ensuring you are never cut off from your soundscapes."
        },
        {
            question: "How does the 48dB Hybrid Active Noise Cancellation operate?",
            answer: "Our Hybrid ANC utilizes four high-sensitivity microphones (two external feed-forward, two internal feedback) to continuously analyze ambient environment noise at 48,000 times per second. A dedicated neural audio co-processor instantly generates precise phase-inverted soundwaves to cancel out up to 48dB of disruptive external frequencies, leaving you in pure acoustic isolation."
        },
        {
            question: "Can I customize the sound profile of the headphones?",
            answer: "Absolutely. With our integrated SoundStage Customizer, you can fine-tune the Bass, Mids, and Treble sliders in real-time to shape the sound signature to your unique hearing profile. Alternatively, you can select from our professionally engineered presets—Signature, Bass Boost, Clear Vocal, or Studio Reference—each calibrated for absolute acoustic fidelity."
        },
        {
            question: "What premium materials are used in the construction?",
            answer: "We believe luxury is felt as much as it is heard. The Model XRS features aerospace-grade anodized aluminum telescopic arms for light, structural rigidity. The head band and earcups are cushioned with custom-engineered multi-layered memory foam and wrapped in an ultra-soft, breathable protein-leather fabric, designed to distribute pressure evenly and prevent heat buildup."
        },
        {
            question: "Do these headphones support high-resolution codecs and spatial audio?",
            answer: "Yes. The Model XRS is fully certified for High-Res Audio Wireless, supporting advanced lossless codecs including LDAC, aptX Adaptive, and AAC. It also features built-in 3D Spatial Audio tracking, which utilizes motion sensors to dynamically position audio sources in virtual space around you, delivering an immersive, theater-like soundstage."
        }
    ];

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pb-8 section-gap select-none">
            {/* Dark Glassmorphic Container Panel */}
            <div className="w-full bg-neutral-950 rounded-[32px] border border-white/10 p-8 md:p-12 flex flex-col lg:flex-row gap-12 overflow-hidden relative">
                {/* Background decorative blurs */}
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#f26e11] blur-[80px] opacity-10 pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#f26e11] blur-[80px] opacity-10 pointer-events-none" />

                {/* Left Side: Titles and Branding */}
                <div className="w-full lg:w-[35%] flex flex-col justify-between relative z-10">
                    <div className="flex flex-col gap-3 section-body-gapp">
                        <span className="text-[10px] tracking-[0.25em] font-semibold text-[#f26e11] uppercase font-sans">
                            Support & Info
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-schein uppercase leading-tight">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xs text-neutral-400 font-light mt-3 max-w-sm leading-relaxed font-sans">
                            Got questions about the Model XRS? Find quick answers about performance, customization, and acoustic engineering.
                        </p>
                    </div>

                    {/* Decorative branding info */}
                    <div className="hidden lg:flex items-center gap-2 text-[9px] tracking-[0.2em] text-neutral-500 font-mono mt-8 uppercase">
                        <svg className="w-4 h-4 text-[#f26e11]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4M12 8h.01" />
                        </svg>
                        <span>Model Ears Support Hub</span>
                    </div>
                </div>

                {/* Right Side: Accordion Lists */}
                <div className="w-full lg:w-[65%] flex flex-col gap-4 relative z-10">
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div
                                key={index}
                                className={`border rounded-2xl transition-all duration-300 ${
                                    isOpen
                                        ? "bg-white/5 border-[#f26e11]/30 shadow-[0_4px_20px_rgba(242,110,17,0.05)]"
                                        : "bg-neutral-900/40 border-white/5 hover:border-white/10"
                                }`}
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer focus:outline-none"
                                >
                                    <span className="text-xs md:text-sm font-semibold text-white font-sans pr-4 transition-colors duration-300 hover:text-[#f26e11]">
                                        {faq.question}
                                    </span>
                                    {/* Rotating Chevron Icon */}
                                    <svg
                                        className={`w-4 h-4 text-[#f26e11] transform transition-transform duration-300 shrink-0 ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>

                                {/* Accordion Content with smooth height transitions */}
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${
                                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs text-neutral-400 font-light leading-relaxed font-sans border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
