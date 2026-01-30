"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import "../navbar/navButton.css";
import { PROJECTS_DATA, MEGA_PROJECT } from "@/constants/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const megaRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const grid = gridRef.current;

        if (!section || !title || !grid) return;

        // --- FIX: DETEKSI SCROLLER OTOMATIS ---
        // Cek apakah .scroll-container ada di DOM. Jika tidak, fallback ke window.
        const scrollContainer = document.querySelector(".scroll-container");
        const scrollerTarget = scrollContainer ? ".scroll-container" : window;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                scroller: scrollerTarget, // PENTING: Gunakan scroll container kamu
                start: "top 70%", // Animasi mulai saat bagian atas section masuk 70% layar
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            },
        });

        // 1. Title Animation (Hapus opacity-0 dari HTML, handle di sini)
        tl.fromTo(
            title,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );

        // 2. Mega Project Animation
        const megaCard = megaRef.current;
        if (megaCard) {
            tl.fromTo(
                megaCard,
                { y: 80, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
                "-=0.4"
            );
        }

        // 3. Grid Animation (Stagger Effect)
        const cards = grid.querySelectorAll(".project-card");
        tl.fromTo(
            cards,
            { y: 100, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out", // Ganti easing yang lebih ringan
                stagger: 0.1
            },
            "-=0.6"
        );

        // Refresh ScrollTrigger agar sinkron dengan layout baru
        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="project"
            // Hapus overflow-hidden agar shadow/glow tidak terpotong
            // Tambah pb-32 agar konten paling bawah tidak kepentok
            className="relative w-full py-24 pb-32 bg-[#0a0a0a]"
        >
            {/* Background Tech Grid Pattern */}
            <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header Section */}
                {/* Hapus 'opacity-0' agar tetap terlihat jika JS error */}
                <div ref={titleRef} className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 text-center md:text-left">
                    <div>
                        <span className="text-[#008cff] font-mono text-sm tracking-widest uppercase mb-2 block">
              // Selected Works
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            Architecting <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                                Digital Reality.
                            </span>
                        </h2>
                    </div>
                    <p className="text-white/50 max-w-sm mt-6 md:mt-0 text-sm text-center md:text-right">
                        A showcase of systems I've engineered. <br />
                        Hover to compile the visual data.
                    </p>
                </div>

                {/* --- MEGA PROJECT SPOTLIGHT --- */}
                <div ref={megaRef} className="mb-12">
                    <h3 className="text-center text-[#008cff] font-mono text-sm tracking-widest uppercase mb-6">
                        // Mega Project
                    </h3>
                    
                    {/* ========== GRADIENT WRAPPER (Shimmer Border) ========== */}
                    {/* 
                      The wrapper creates the "border" effect:
                      - p-[2px] = border thickness
                      - bg-shimmer-prismatic-sync = the prismatic gradient
                      - animate-shimmer-sync = synchronized animation
                      The inner card blocks the center, leaving only the edge visible
                    */}
                    <div 
                        className="p-[2px] rounded-2xl bg-shimmer-prismatic-sync bg-[length:200%_100%] animate-shimmer-sync overflow-hidden"
                    >
                        {/* ========== INNER CARD (Dark Content Area) ========== */}
                        <Link
                            href={MEGA_PROJECT.link}
                            className="project-card group relative block w-full h-[350px] md:h-[400px] rounded-2xl bg-[#0a0a0a] overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(20,184,166,0.2)]"
                        >
                            {/* Status Badge */}
                            <div className="absolute top-4 right-4 z-20">
                                <span className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md ${
                                    MEGA_PROJECT.status === 'ongoing' 
                                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                }`}>
                                    {MEGA_PROJECT.status === 'ongoing' ? 'Ongoing' : 'Finished'}
                                </span>
                            </div>

                            {/* Premium Glow Effect */}
                            <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.1) 0%, transparent 70%)'
                                }}
                            />

                            {/* Image Layer */}
                            <div className="absolute inset-0 w-full h-full">
                                <div className="relative w-full h-full bg-[#0d0d0d] group-hover:scale-105 transition-transform duration-700 ease-in-out">
                                    <Image 
                                        src={MEGA_PROJECT.photo || "/placeholder.jpg"} 
                                        alt={MEGA_PROJECT.title} 
                                        fill 
                                        className="object-cover opacity-40 grayscale group-hover:opacity-70 group-hover:grayscale-0 transition-all duration-500" 
                                    />
                                    {/* Fallback Text */}
                                    <div className="absolute inset-0 flex items-center justify-center text-white/5 font-bold text-7xl md:text-9xl uppercase tracking-tighter -z-10">
                                        MEGA
                                    </div>
                                </div>
                                {/* Dark Overlay - Keeps description readable */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
                            </div>

                            {/* Corner Brackets */}
                            <div className="corner-bracket corner-tl" />
                            <div className="corner-bracket corner-tr" />
                            <div className="corner-bracket corner-bl" />
                            <div className="corner-bracket corner-br" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-10 pointer-events-none">
                                {/* Tech Pills */}
                                <div className="flex flex-wrap gap-2 transform md:-translate-y-4 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                                    {MEGA_PROJECT.tech.map((t, i) => (
                                        <span 
                                            key={i} 
                                            className="px-3 py-1 text-xs font-medium rounded-full backdrop-blur-md text-teal-400 bg-teal-500/15 border border-teal-500/30"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Title & Description */}
                                <div className="transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex justify-between items-end gap-4">
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs font-mono uppercase tracking-wider mb-2 block opacity-80 text-teal-400">
                                                {MEGA_PROJECT.category}
                                            </span>
                                            
                                            {/* ========== SYNCHRONIZED SHIMMER TITLE ========== */}
                                            {/* 
                                              Same gradient & animation as the border wrapper.
                                              This creates the "laser scan" passing through effect.
                                            */}
                                            <h3 
                                                className="text-3xl md:text-5xl font-outfit font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-shimmer-prismatic-sync bg-[length:200%_100%] animate-shimmer-sync"
                                            >
                                                {MEGA_PROJECT.title}
                                            </h3>
                                            
                                            {/* Description stays static/dark */}
                                            <p className="text-white/60 text-sm md:text-base line-clamp-2 md:line-clamp-3 max-w-2xl">
                                                {MEGA_PROJECT.description}
                                            </p>
                                        </div>

                                        {/* ========== SYNCHRONIZED SHIMMER ICON ========== */}
                                        {/* 
                                          The icon wrapper uses the same shimmer.
                                          Inner circle is dark, creating a "ring" effect.
                                        */}
                                        <div className="flex-shrink-0">
                                            <div className="p-[2px] rounded-full bg-shimmer-prismatic-sync bg-[length:200%_100%] animate-shimmer-sync">
                                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0a0a0a] flex items-center justify-center text-white cursor-pointer group-hover:rotate-45 transition-all duration-300">
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="md:w-6 md:h-6 text-teal-400 group-hover:text-white transition-colors"
                                                    >
                                                        <path d="M7 17L17 7" />
                                                        <path d="M7 7h10v10" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* --- BENTO GRID VAULT --- */}
                {/* Gunakan grid-flow-dense agar celah kosong terisi otomatis */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] grid-flow-dense mt-20">

                    {PROJECTS_DATA.map((project) => (
                        <Link
                            href={project.link}
                            key={project.id}
                            // Tambahkan class 'project-card' untuk target animasi GSAP
                            className={`project-card group relative rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:border-[#008cff]/50 transition-all duration-500 ${project.span}`}
                        >

                            {/* 1. IMAGE LAYER */}
                            <div className="absolute inset-0 w-full h-full">
                                {/* Image Background */}
                                <div className="relative w-full h-full bg-[#1a1a1a] group-hover:scale-105 transition-transform duration-700 ease-in-out">

                                    <Image 
                                        src={project.photo || "/placeholder.jpg"} 
                                        alt={project.title} 
                                        fill 
                                        className="object-cover opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" 
                                    />

                                    {/* Fallback Text (Shows behind image) */}
                                    <div className="absolute inset-0 flex items-center justify-center text-white/5 font-bold text-6xl uppercase tracking-tighter opacity-100 -z-10">
                                        {project.category.split(" ")[0]}
                                    </div>
                                </div>

                                {/* Dark Overlay (Fade out on hover) */}
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all duration-500" />
                            </div>

                            {/* 2. SCANNER EFFECT */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#008cff] shadow-[0_0_20px_#008cff] opacity-0 scan-effect pointer-events-none" />

                            {/* 3. CORNER BRACKETS */}
                            <div className="corner-bracket corner-tl" />
                            <div className="corner-bracket corner-tr" />
                            <div className="corner-bracket corner-bl" />
                            <div className="corner-bracket corner-br" />

                            {/* 4. CONTENT INFO */}
                            <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between z-10 pointer-events-none">

                                {/* Tech Pills (Top) */}
                                <div className="flex flex-wrap gap-1.5 md:gap-2 transform md:-translate-y-4 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-medium text-[#008cff] bg-[#008cff]/10 border border-[#008cff]/20 rounded-full backdrop-blur-md">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Title (Bottom) */}
                                <div className="transform md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex justify-between items-end gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg md:text-2xl font-bold text-white mb-1 group-hover:text-[#008cff] transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-white/60 text-xs md:text-sm line-clamp-2">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Arrow Icon */}
                                        <div
                                            role="button"
                                            aria-label="Open GitHub Repository"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open("https://github.com/VindSkiee", "_blank", "noopener,noreferrer");
                                            }}
                                            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center text-white cursor-pointer
             group-hover:bg-[#008cff] group-hover:rotate-45 transition-all duration-300 flex-shrink-0"
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="md:w-5 md:h-5"
                                            >
                                                <path d="M7 17L17 7" />
                                                <path d="M7 7h10v10" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </Link>
                    ))}

                </div>

                {/* View All Button */}
                <div className="mt-16 flex justify-center pb-10 p-10">
                    <button
                        type="button"
                        onClick={() =>
                            window.open("https://github.com/VindSkiee", "_blank", "noopener,noreferrer")
                        }
                        className="btn-neon"
                    >
                        View Entire Archive
                    </button>

                </div>

            </div>
        </section>
    );
}