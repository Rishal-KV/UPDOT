"use client";

export default function Footer() {
    return (
        <footer className="w-full max-w-[1400px] mx-auto px-3 md:px-6 pb-0 section-gap select-none">
            {/* Next-Gen Dark Glassmorphic Footer Panel with decreased bottom curves */}
            <div className="w-full bg-neutral-950 rounded-t-[32px] rounded-b-none border border-white/10 p-8 md:p-12 flex flex-col gap-12 overflow-hidden relative">

                {/* Decorative background blurs to match premium design language */}
                <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-[#f26e11] blur-[80px] opacity-10 pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[#f26e11] blur-[80px] opacity-10 pointer-events-none" />

                {/* Top Section: Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">

                    {/* Brand column (spans 2 columns on large screens) */}
                    <div className="lg:col-span-2 flex flex-col items-start gap-4">
                        <div className="flex items-center gap-2.5 text-sm tracking-[5px] text-white font-medium font-schein">
                            <svg
                                className="w-5 h-5 text-[#f26e11]"
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
                        <p className="text-xs text-neutral-400 max-w-sm leading-relaxed font-light font-sans">
                            Engineering elite acoustic stages and high-fidelity soundscapes. We merge premium craftsmanship with state-of-the-art DSP systems to redefine auditory luxury.
                        </p>

                        {/* Social Links with glowing hovers */}
                        <div className="flex gap-3 mt-2">
                            {["twitter", "instagram", "youtube", "linkedin"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#f26e11]/10 border border-white/5 hover:border-[#f26e11]/30 flex items-center justify-center text-neutral-400 hover:text-[#f26e11] transition-all duration-300 active:scale-95 cursor-pointer"
                                    aria-label={`Follow us on ${social}`}
                                >
                                    <span className="text-[10px] uppercase font-bold tracking-wider font-sans">{social.slice(0, 2)}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div>
                        <h4 className="text-[10px] tracking-[0.25em] font-semibold text-[#f26e11] uppercase mb-4 font-sans">
                            Products
                        </h4>
                        <ul className="flex flex-col gap-2.5 text-xs font-light text-neutral-400 font-sans">
                            <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Model Lite</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Model XRS</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Model Pro</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">SoundStage EQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] tracking-[0.25em] font-semibold text-[#f26e11] uppercase mb-4 font-sans">
                            Technology
                        </h4>
                        <ul className="flex flex-col gap-2.5 text-xs font-light text-neutral-400 font-sans">
                            <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Acoustic Drivers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">ANC Algorithms</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Spatial Audio</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">High-Res Codecs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] tracking-[0.25em] font-semibold text-[#f26e11] uppercase mb-4 font-sans">
                            Company
                        </h4>
                        <ul className="flex flex-col gap-2.5 text-xs font-light text-neutral-400 font-sans">
                            <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Press Kit</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Contact</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: Divider & Copyright */}
                <div className="border-t border-white/10 pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-[11px] font-light text-neutral-500 font-sans">
                    <span>
                        © {new Date().getFullYear()} MODEL EARS. Crafted for acoustic perfection.
                    </span>

                    <div className="flex gap-6">
                        <a href="#" className="hover:text-neutral-300 transition-colors duration-200 cursor-pointer">Privacy Policy</a>
                        <a href="#" className="hover:text-neutral-300 transition-colors duration-200 cursor-pointer">Terms of Service</a>
                        <a href="#" className="hover:text-neutral-300 transition-colors duration-200 cursor-pointer">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
