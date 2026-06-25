"use client";

export default function Footer() {
  return (
    <footer className="w-full  mx-auto px-0 md:px-6 pb-0 section-gap select-none">
      {/* Next-Gen Dark Glassmorphic Footer Panel with decreased bottom curves */}
      <div className="w-full bg-neutral-950 rounded-t-[32px] rounded-b-none border border-white/10 p-8 md:p-12 flex flex-col gap-12 overflow-hidden relative">
        {/* Decorative background blurs to match premium design language */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-[#f26e11] blur-[80px] opacity-10 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[#f26e11] blur-[80px] opacity-10 pointer-events-none" />

        {/* Top Section: Strict 2-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative z-10">
          {/* Brand Column (Left Column) */}
          <div className="flex flex-col items-start gap-4">
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
              Engineering elite acoustic stages and high-fidelity soundscapes.
              We merge premium craftsmanship with state-of-the-art DSP systems
              to redefine auditory luxury.
            </p>

            {/* Social Links with glowing hovers */}
            <div className="flex gap-3 mt-2">
              {[
                {
                  name: "twitter",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  name: "instagram",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  ),
                },
                {
                  name: "youtube",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                      <polygon points="10 15 15 12 10 9" />
                    </svg>
                  ),
                },
                {
                  name: "linkedin",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#f26e11]/10 border border-white/5 hover:border-[#f26e11]/30 flex items-center justify-center text-neutral-400 hover:text-[#f26e11] transition-all duration-300 active:scale-95 cursor-pointer"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Column (Right Column - Organized in 2 columns on mobile, 3 on desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 sm:gap-8">
            <div>
              <h4 className="text-[10px] tracking-[0.25em] font-semibold text-[#f26e11] uppercase mb-4 font-sans">
                Products
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs font-light text-neutral-400 font-sans">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    Model Lite
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    Model XRS
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    Model Pro
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    SoundStage EQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.25em] font-semibold text-[#f26e11] uppercase mb-4 font-sans">
                Technology
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs font-light text-neutral-400 font-sans">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    Drivers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    ANC Tech
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    Spatial
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    Codecs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.25em] font-semibold text-[#f26e11] uppercase mb-4 font-sans">
                Company
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs font-light text-neutral-400 font-sans">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Divider & Copyright */}
        <div className="border-t border-white/10 pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-[11px] font-light text-neutral-500 font-sans">
          <span>
            © {new Date().getFullYear()} MODEL EARS. Crafted for acoustic
            perfection.
          </span>

          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-neutral-300 transition-colors duration-200 cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-neutral-300 transition-colors duration-200 cursor-pointer"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-neutral-300 transition-colors duration-200 cursor-pointer"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
