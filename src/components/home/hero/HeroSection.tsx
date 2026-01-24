"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Beams from "../Beams";
import ShinyText from "../Shiny";
import Navbar from "../../navbar/Navbar"; // IMPORT NAVBAR DARI FILE BARU

export default function HeroSection() {
  const stripRef = useRef<HTMLDivElement>(null);
  const beamsContentRef = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLHeadingElement>(null);
  const secondTextWrapperRef = useRef<HTMLDivElement>(null);
  
  // Ref khusus untuk Navbar
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 1. Definisikan Element
    const strip = stripRef.current;
    const beamsContent = beamsContentRef.current;
    const firstText = firstTextRef.current;
    const secondTextWrapper = secondTextWrapperRef.current;
    const nav = navRef.current; // Navbar Element

    // Safety Check
    if (!strip || !beamsContent || !firstText || !secondTextWrapper || !nav) return;

    // --- SETUP FIRST TEXT ---
    const firstTextContent = "I stand between backend and frontend";
    firstText.innerHTML = "";
    const firstChars = firstTextContent.split("").map((char) => {
      const span = document.createElement("span");
      span.innerHTML = char === " " ? "&nbsp;" : char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      firstText.appendChild(span);
      return span;
    });

    // --- SETUP INITIAL STATES ---
    // Navbar: Mulai sedikit di atas (-20px) dan invisible
    gsap.set(nav, { y: -20, opacity: 0 });
    
    // Content lain
    gsap.set(secondTextWrapper, { opacity: 0, y: 20 });
    gsap.set(strip, { width: 0, height: "100px" });
    gsap.set(beamsContent, { width: "100vw", height: "100vh" });

    // --- ANIMATION TIMELINE ---
    const tl = gsap.timeline();

    // Phase 1: Strip Melebar
    tl.to(strip, { width: "100%", duration: 1.5, ease: "power2.out" });

    // Phase 2: First Text Typing
    tl.to(firstChars, { opacity: 1, duration: 0.05, stagger: 0.05, ease: "none" }, "-=0.5");

    // Phase 3: Pause
    tl.to({}, { duration: 0.8 });

    // Phase 4: First Text Hilang
    tl.to(firstText, { opacity: 0, duration: 0.4 });

    // Phase 5: Strip Membesar Vertikal (Full Screen)
    tl.to(strip, { height: "100vh", duration: 1.2, ease: "power2.inOut" });

    // Phase 6: Shiny Text + Navbar Masuk
    // Keduanya masuk bersamaan secara elegan
    tl.to(secondTextWrapper, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.2");
    
    tl.to(nav, { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power2.out" 
    }, "<"); // Simbol '<' berarti mulai bersamaan dengan animasi sebelumnya

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      
      {/* PASSING REF KE KOMPONEN NAVBAR 
          Ini memungkinkan kita mengontrol animasi Navbar dari file HeroSection ini.
      */}
      <Navbar ref={navRef} />

      {/* STRIP WINDOW (Masker) */}
      <div
        ref={stripRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 overflow-hidden bg-black shadow-2xl"
      >
        <div
          ref={beamsContentRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black"
        >
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
      </div>

      {/* TEXT CONTAINER */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="relative w-full text-center">
          
          {/* Text 1: Typing Effect */}
          <h1
            ref={firstTextRef}
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 font-jakarta text-[1rem] md:text-4xl lg:text-5xl font-light text-white px-8 whitespace-nowrap"
          />

          {/* Text 2: Shiny Effect */}
          <div ref={secondTextWrapperRef} className="opacity-0"> 
            <ShinyText
              text="That's why I choose Full-Stack"
              disabled={false}
              speed={3}
              className="font-baloo-2 text-[1.2rem] md:text-5xl lg:text-6xl font-black px-8 whitespace-nowrap"
              color="#b5b5b5"
              shineColor="#ffffff"
              spread={120}
              direction="left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}