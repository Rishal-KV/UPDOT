"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface CarouselItem {
  id: number;
  name: string;
  image: string;
  filterClass: string;
  price: string;
  colorName: string;
}

export default function RangeCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const tooltipRef = useRef<HTMLDivElement>(null);

  const items: CarouselItem[] = [
    {
      id: 0,
      name: "MODEL LITE",
      image: "/headphone_blue_v3.png",
      filterClass: "", // Real premium blue headphone image!
      price: "$129.99",
      colorName: "Ocean Blue",
    },
    {
      id: 1,
      name: "MODEL XRS",
      image: "/headphone_black_v3.png", // Real premium black/chrome headphone image!
      filterClass: "",
      price: "$169.99",
      colorName: "Stealth Black",
    },
    {
      id: 2,
      name: "MODEL PRO",
      image: "/headphone_gray_v3.png", // Real premium slate gray headphone image!
      filterClass: "",
      price: "$249.99",
      colorName: "Slate Gray",
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    // Threshold of 50px to prevent accidental swipes
    if (diffX > 50) {
      handleNext();
    } else if (diffX < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Auto-slide effect (ticks every 4 seconds, pauses on mouse hover)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, activeIndex]);

  // Initialize tooltip positional offsets on mount
  useEffect(() => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    gsap.set(tooltip, {
      xPercent: -50,
      yPercent: -100, // Centers above the cursor point
      opacity: 0,
      scale: 0.5,
      pointerEvents: "none",
    });
  }, []);

  // Fade out tooltip if active index changes mid-hover
  useEffect(() => {
    gsap.to(tooltipRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.2,
      ease: "power2.in",
      overwrite: "auto",
    });
  }, [activeIndex]);

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full pb-8 flex flex-col items-center justify-center overflow-visible section-gap select-none bg-white"
    >
      {/* Massive Background Heading ("OUR RANGE") - No Container, Spans Full Screen Width */}
      <div className="absolute inset-x-0 top-0 z-0 flex justify-center pointer-events-none select-none overflow-visible section-body-gapp">
        <h2 className="w-full text-center text-[clamp(5rem,15vw,14rem)] font-black text-[#f4f4f4] tracking-[-0.03em] uppercase font-schein leading-none">
          OUR RANGE
        </h2>
      </div>

      {/* 3D Carousel Container (True screen-edge-to-screen-edge layout with an even more spacious gap from the heading) */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[360px] md:h-[480px] z-10 flex items-center justify-center overflow-visible mt-16 md:mt-48"
      >
        {items.map((item, index) => {
          let positionClass = "";
          let isActive = false;

          if (index === activeIndex) {
            isActive = true;
            positionClass =
              "left-1/2 -translate-x-1/2 z-30 scale-125 md:scale-140 blur-none opacity-100";
          } else if (
            index ===
            (activeIndex - 1 + items.length) % items.length
          ) {
            // Left item positioned to bleed off the left screen edge
            positionClass =
              "left-[-2%] sm:left-[8%] md:left-[12%] lg:left-[15%] xl:left-[18%] -translate-x-1/2 z-10 scale-[0.68] md:scale-[0.75] blur-[7px] hover:blur-none opacity-40 hover:opacity-100 cursor-pointer";
          } else {
            // Right item positioned to bleed off the right screen edge
            positionClass =
              "left-[102%] sm:left-[92%] md:left-[88%] lg:left-[85%] xl:left-[82%] -translate-x-1/2 z-10 scale-[0.68] md:scale-[0.75] blur-[7px] hover:blur-none opacity-40 hover:opacity-100 cursor-pointer";
          }

          return (
            <div
              key={item.id}
              onClick={() => !isActive && setActiveIndex(index)}
              onMouseEnter={() => {
                if (isActive) {
                  gsap.to(tooltipRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(1.5)",
                    overwrite: "auto",
                  });
                }
              }}
              onMouseMove={(e) => {
                if (isActive) {
                  // Move tooltip smoothly with cursor coordinates
                  gsap.to(tooltipRef.current, {
                    x: e.clientX,
                    y: e.clientY - 15, // Float 15px above the mouse pointer
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                }
              }}
              onMouseLeave={() => {
                gsap.to(tooltipRef.current, {
                  opacity: 0,
                  scale: 0.5,
                  duration: 0.25,
                  ease: "power2.in",
                  overwrite: "auto",
                });
              }}
              className={`absolute top-1/2 -translate-y-1/2 w-[260px] md:w-[360px] h-[260px] md:h-[360px] transition-all duration-700 ease-out flex items-center justify-center ${positionClass} cursor-pointer group`}
            >
              {/* Glow behind active item on hover */}
              {isActive && (
                <div className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full bg-[#f26e11]/20 blur-[65px] md:blur-[90px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
              )}
              <Image
                src={item.image}
                alt={item.name}
                width={800}
                height={800}
                className={`w-full h-full object-contain select-none transition-all duration-700 ${item.filterClass} relative z-10`}
                priority={item.id === 1}
              />
            </div>
          );
        })}
      </div>

      {/* Interactive Details & Navigation Buttons Below Active Headphone */}
      <div className="z-20 text-center mt-6 flex flex-col items-center gap-1.5 transition-all duration-500">
        <span className="text-[10px] tracking-[0.25em] font-semibold text-[#f26e11] uppercase font-sans">
          {items[activeIndex].colorName}
        </span>
        <h3 className="text-[26px] md:text-[32px] font-medium text-[#111111] tracking-tight font-schein">
          {items[activeIndex].name}
        </h3>
        <span className="text-lg font-medium text-neutral-500 font-sans">
          {items[activeIndex].price}
        </span>

        {/* Circular Navigation Arrows side-by-side as in the image */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-[#f26e11] flex items-center justify-center text-[#f26e11] hover:bg-[#f26e11] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-[#f26e11] flex items-center justify-center text-[#f26e11] hover:bg-[#f26e11] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Running Tooltip (Cursor-following Marquee Badge) */}
      <div
        ref={tooltipRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 z-50 pointer-events-none opacity-0 scale-50"
      >
        <div className="relative overflow-hidden bg-[#f26e11] text-white rounded-full w-[180px] h-[34px] shadow-lg">
          <div className="whitespace-nowrap animate-marquee text-[11px] font-semibold uppercase tracking-[0.12em] leading-[34px]">
            Check This Out • Check This Out • Check This Out •
          </div>
        </div>

        {/* Arrow pointing directly down to the cursor tip */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-transparent border-t-[#f26e11]" />
      </div>
    </section>
  );
}
