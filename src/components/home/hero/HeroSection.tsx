"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Beams from "../Beams"; // Pastikan path ini benar

export default function HeroSection() {
  const stripRef = useRef<HTMLDivElement>(null);
  const whiteTopRef = useRef<HTMLDivElement>(null);
  const whiteBottomRef = useRef<HTMLDivElement>(null);
  // Ubah tipe ref ke HTMLHeadingElement karena kita akan pasang di h1
  const firstTextRef = useRef<HTMLHeadingElement>(null);
  const secondTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const whiteTop = whiteTopRef.current;
    const whiteBottom = whiteBottomRef.current;
    const firstText = firstTextRef.current;
    const secondText = secondTextRef.current;

    if (!strip || !whiteTop || !whiteBottom || !firstText || !secondText) return;

    const firstTextContent = "I stand between backend and frontend";
    const secondTextContent = "That's why I choose Full-Stack";

    // FIX 1 & 2: Bersihkan konten lama sebelum inject (mencegah duplikasi)
    firstText.innerHTML = '';
    secondText.innerHTML = '';

    // Split text into characters
    const firstChars = firstTextContent.split("").map((char) => {
      const span = document.createElement("span");
      span.innerHTML = char === " " ? "&nbsp;" : char; // Gunakan innerHTML untuk spasi aman
      span.style.opacity = "0";
      span.style.display = "inline-block"; // Penting agar transform bekerja per huruf
      firstText.appendChild(span);
      return span;
    });

    const secondChars = secondTextContent.split("").map((char) => {
      const span = document.createElement("span");
      span.innerHTML = char === " " ? "&nbsp;" : char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      secondText.appendChild(span);
      return span;
    });

    const tl = gsap.timeline();

    // Initial state
    gsap.set(strip, {
      width: 0,
      height: "100px",
      left: 0,
      top: "50%",
      y: "-50%",
      opacity: 1
    });

    // Phase 1: Strip expands horizontally
    tl.to(strip, {
      width: "100%",
      duration: 1.5,
      ease: "power2.out",
    });

    // Phase 2: Typing first text
    tl.to(
      firstChars,
      {
        opacity: 1,
        duration: 0.05,
        stagger: 0.05,
        ease: "none",
      },
      "-=0.5"
    );

    // Phase 3: Pause reading time
    tl.to({}, { duration: 1.5 }); // Sedikit diperlama agar terbaca

    // Phase 4: Fade out first text
    tl.to(firstText, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    // Phase 5: Strip expands vertically (Menjadi background penuh)
    tl.to(
      strip,
      {
        top: 0,
        y: 0,
        height: "100%",
        duration: 1.2,
        ease: "power2.inOut",
      },
      "-=0.2"
    );

    // White overlays shrink (Reveal effect)
    tl.to(
      [whiteTop, whiteBottom], 
      {
        height: 0,
        duration: 1.2,
        ease: "power2.inOut",
      },
      "<" // Jalankan bersamaan dengan strip expand
    );

    // FIX 3: Fade out strip agar Background Beams terlihat 
    // (Asumsi Beams punya background hitam sendiri atau transparan di atas body hitam)
    // Jika Beams backgroundnya transparan, hapus bagian ini.
    tl.to(strip, {
       opacity: 0, // Atau 0 jika ingin beams terlihat jelas sepenuhnya
       duration: 1
    }, "-=0.5");

    // Phase 6: Show second text
    tl.to(secondText, { opacity: 1, duration: 0.1 }); // Pastikan container visible

    tl.to(
      secondChars,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "power2.out",
      },
      "<"
    );

    return () => {
      tl.kill();
      // Cleanup DOM tidak wajib jika kita mengandalkan innerHTML='' di awal, 
      // tapi good practice untuk mengembalikan state
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Beams Background */}
      <div className="absolute inset-0 z-0">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* White Overlay Top */}
      <div
        ref={whiteTopRef}
        className="absolute top-0 left-0 right-0 bg-white z-20" // Z-index dinaikkan
        style={{ height: "50%" }}
      />

      {/* White Overlay Bottom */}
      <div
        ref={whiteBottomRef}
        className="absolute bottom-0 left-0 right-0 bg-white z-20" // Z-index dinaikkan
        style={{ height: "50%" }}
      />

      {/* Animated Black Strip */}
      {/* Z-Index 30 agar di atas putih saat expand awal */}
      <div
        ref={stripRef}
        className="absolute z-30 bg-black flex items-center justify-center pointer-events-none"
      />

      {/* Text Container - Z-Index tertinggi (40) agar selalu di atas strip */}
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
        <div className="relative w-full text-center">
          
          {/* First Text - Absolute agar menumpuk di tengah */}
          <h1
            ref={firstTextRef}
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 font-jakarta text-3xl md:text-4xl lg:text-5xl font-light text-white px-8 whitespace-nowrap"
          >
            {/* Kosong karena diisi JS */}
          </h1>

          {/* Second Text */}
          <h1
            ref={secondTextRef}
            className="font-jakarta text-3xl md:text-4xl lg:text-5xl font-light text-white px-8 whitespace-nowrap opacity-0"
          >
             {/* Kosong karena diisi JS */}
          </h1>

        </div>
      </div>
    </section>
  );
}