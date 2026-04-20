"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Beams from "../Beams";
import ShinyText from "../Shiny";
import Navbar from "../../navbar/Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const beamsContentRef = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLHeadingElement>(null);
  const secondTextWrapperRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [isScrollLocked, setIsScrollLocked] = useState(true);

  useLayoutEffect(() => {
    const scrollContainer = document.querySelector(".scroll-container") as HTMLElement | null;
    const blockedKeys = new Set([
      "Space",
      "PageUp",
      "PageDown",
      "End",
      "Home",
      "ArrowUp",
      "ArrowDown",
      " ",
    ]);

    let introRefreshTimeoutId: number | null = null;
    let isLockReleased = false;

    const preventWheel = (event: WheelEvent) => {
      event.preventDefault();
    };

    const preventTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    const preventScrollKeys = (event: KeyboardEvent) => {
      if (blockedKeys.has(event.code) || blockedKeys.has(event.key)) {
        event.preventDefault();
      }
    };

    const unlockScroll = (updateLockState: boolean = true) => {
      if (isLockReleased) return;
      isLockReleased = true;

      if (scrollContainer) {
        scrollContainer.classList.remove("scroll-locked");
        scrollContainer.removeAttribute("data-scroll-locked");
      }

      window.removeEventListener("wheel", preventWheel);
      window.removeEventListener("touchmove", preventTouchMove);
      window.removeEventListener("keydown", preventScrollKeys);

      if (updateLockState) {
        setIsScrollLocked(false);
      }
    };

    if (scrollContainer) {
      scrollContainer.classList.add("scroll-locked");
      scrollContainer.setAttribute("data-scroll-locked", "true");
      scrollContainer.scrollTop = 0;

      window.addEventListener("wheel", preventWheel, { passive: false });
      window.addEventListener("touchmove", preventTouchMove, { passive: false });
      window.addEventListener("keydown", preventScrollKeys, { passive: false });
    } else {
      setIsScrollLocked(false);
    }

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const strip = stripRef.current;
      const beamsContent = beamsContentRef.current;
      const firstText = firstTextRef.current;
      const secondText = secondTextWrapperRef.current;
      const nav = navRef.current;

      if (!container || !strip || !beamsContent || !firstText || !secondText) {
        unlockScroll();
        return;
      }

      // --- SETUP FIRST TEXT ---
      const firstTextContent = "I stand between backend and frontend";
      firstText.innerHTML = "";
      const chars: HTMLSpanElement[] = [];
      firstTextContent.split("").forEach((char) => {
        const span = document.createElement("span");
        span.innerHTML = char === " " ? "&nbsp;" : char;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        firstText.appendChild(span);
        chars.push(span);
      });

      // --- SETUP INITIAL STATES ---
      if (nav) gsap.set(nav, { y: -20, opacity: 0 });
      gsap.set(secondText, { opacity: 0, y: 20 });
      gsap.set(strip, { width: 0, height: "100px" });
      gsap.set(beamsContent, { width: "100vw", height: "100vh" });

      // --- INTRO ANIMATION ---
      const tl = gsap.timeline({
        onComplete: () => {
          // PENTING: Buat ScrollTrigger SETELAH animasi intro selesai
          // Gunakan .scroll-container sebagai scroller untuk menghindari stuttering
          const scrollContainerElement = document.querySelector(".scroll-container");
          
          if (secondText && container && scrollContainerElement) {
            gsap.to(secondText, {
              x: -500, 
              opacity: 0, 
              scrollTrigger: {
                trigger: container,
                scroller: scrollContainerElement, // Gunakan .scroll-container
                start: "top top", 
                end: "bottom top", 
                scrub: true, // Gunakan true untuk smoother animation
                // markers: true, // Uncomment untuk debugging
              }
            });
          }
          
          // Refresh ScrollTrigger setelah setup dengan delay lalu lepaskan scroll lock
          introRefreshTimeoutId = window.setTimeout(() => {
            ScrollTrigger.refresh();
            unlockScroll();
          }, 100);
        }
      });

      tl.to(strip, { width: "100%", duration: 1.5, ease: "power2.out" });
      tl.to(chars, { opacity: 1, duration: 0.05, stagger: 0.05, ease: "none" }, "-=0.5");
      tl.to({}, { duration: 0.8 });
      tl.to(firstText, { opacity: 0, duration: 0.4 });
      tl.to(strip, { height: "100vh", duration: 1.2, ease: "power2.inOut" });
      
      tl.to(secondText, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.2");
      if (nav) {
        tl.to(nav, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "<");
      }

    }, containerRef);

    return () => {
      if (introRefreshTimeoutId !== null) {
        window.clearTimeout(introRefreshTimeoutId);
      }
      ctx.revert();
      unlockScroll(false);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white">
      
      <Navbar ref={navRef} isInteractionLocked={isScrollLocked} />

      {/* STRIP WINDOW */}
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
          
          <h1
            ref={firstTextRef}
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 font-jakarta text-[1rem] md:text-4xl lg:text-5xl font-light text-white px-8 whitespace-nowrap"
          />

          <div ref={secondTextWrapperRef} className="opacity-0 "> 
            <ShinyText
              text="That's why I choose Full-Stack"
              disabled={false}
              speed={3}
              className="font-baloo-2 text-[1.2rem] md:text-5xl lg:text-6xl font-black px-8 pb-2 whitespace-nowrap"
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