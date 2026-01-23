"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Beams from "../Beams"; 

export default function HeroSection() {
  const stripRef = useRef<HTMLDivElement>(null);
  const beamsContentRef = useRef<HTMLDivElement>(null); 
  const firstTextRef = useRef<HTMLHeadingElement>(null);
  const secondTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const beamsContent = beamsContentRef.current;
    const firstText = firstTextRef.current;
    const secondText = secondTextRef.current;

    if (!strip || !beamsContent || !firstText || !secondText) return;

    // --- SETUP TEXT ---
    const firstTextContent = "I stand between backend and frontend";
    const secondTextContent = "That's why I choose Full-Stack";

    firstText.innerHTML = '';
    secondText.innerHTML = '';

    const firstChars = firstTextContent.split("").map((char) => {
      const span = document.createElement("span");
      span.innerHTML = char === " " ? "&nbsp;" : char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
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

    // 1. Initial State
    // Strip mulai dari lebar 0, tinggi 100px.
    // Posisi (left/top) sudah diatur via CSS Tailwind, jadi kita tidak perlu set x/y/left disini.
    gsap.set(strip, {
      width: 0,
      height: "100px",
    });

    // PENTING: Beams Content (Isi Jendela)
    // Kita set ukurannya Full Screen
    gsap.set(beamsContent, {
      width: "100vw",
      height: "100vh",
    });

    // --- ANIMASI ---

    // Phase 1: Strip Melebar ke Kanan
    // Karena strip di-anchor di kiri (left-0), width 100% akan membuatnya tumbuh ke kanan.
    tl.to(strip, {
      width: "100%",
      duration: 1.5,
      ease: "power2.out",
    });

    // Phase 2: Typing First Text
    tl.to(firstChars, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.05,
      ease: "none",
    }, "-=0.5");

    // Phase 3: Pause
    tl.to({}, { duration: 1.5 });

    // Phase 4: Fade Out First Text
    tl.to(firstText, { opacity: 0, duration: 0.4 });

    // Phase 5: Strip Membesar Vertikal (Full Screen)
    tl.to(strip, {
      height: "100vh", 
      duration: 1.2,
      ease: "power2.inOut",
    });

    // Phase 6: Show Second Text
    tl.to(secondText, { opacity: 1, duration: 0.1 }); 
    tl.to(secondChars, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: "power2.out",
    }, "<");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      
      {/* STRIP WINDOW (MASKER)
          Perubahan:
          1. 'absolute' -> Agar bebas diposisikan.
          2. 'left-0' -> Memaksa strip menempel di sisi KIRI layar.
          3. 'top-1/2 -translate-y-1/2' -> Menjaga strip tetap di tengah secara vertikal.
      */}
      <div 
        ref={stripRef} 
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 overflow-hidden bg-black shadow-2xl"
      >
        
        {/* BEAMS CONTAINER
            Perubahan:
            1. 'absolute'
            2. 'left-0' -> Menempel di kiri strip (yang juga menempel di kiri layar).
            3. 'top-1/2 -translate-y-1/2' -> Menjaga Beams tetap vertikal tengah.
            
            Logika: Karena strip menempel di kiri layar, dan Beams menempel di kiri strip,
            maka Beams akan terlihat pas di tengah layar (karena width Beams 100vw).
        */}
        <div 
          ref={beamsContentRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black"
        >
          <Beams
            beamWidth={3}
            beamHeight={30}
            beamNumber={20}
            lightColor="#00d8ff" // Cyan Neon
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>
      </div>

      {/* TEXT CONTAINER */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="relative w-full text-center">
          <h1 ref={firstTextRef} className="absolute left-0 right-0 top-1/2 -translate-y-1/2 font-jakarta text-1xl md:text-4xl lg:text-5xl font-light text-white px-8 whitespace-nowrap"></h1>
          <h1 ref={secondTextRef} className="font-jakarta text-1xl md:text-4xl lg:text-5xl font-extrabold text-white px-8 whitespace-nowrap opacity-0"></h1>
        </div>
      </div>

    </section>
  );
}