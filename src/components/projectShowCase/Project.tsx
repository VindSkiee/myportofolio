"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import "../navbar/navButton.css"
// import Image from "next/image"; // Aktifkan jika sudah ada gambar

gsap.registerPlugin(ScrollTrigger);

// --- DATA PROJECTS ---
const projects = [
  // --- ROW 1 (Span 2 + Span 1 = Full Width) ---
  {
    id: 1,
    title: "Papertech IoT Core",
    category: "IoT System",
    description: "Real-time truck monitoring system processing 5k+ data points/sec via MQTT.",
    tech: ["Laravel", "Redis", "MQTT"],
    image: "/project1.jpg", 
    span: "md:col-span-2", // Kartu Besar (Dominan)
  },
  {
    id: 2,
    title: "GymOS & Store",
    category: "SaaS Ecosystem",
    description: "All-in-one gym membership engine merged with full-stack e-commerce.",
    tech: ["Node.js", "Stripe", "PostgreSQL"],
    image: "/project2.jpg",
    span: "md:col-span-1", // Kartu Kecil (Compact)
  },

  // --- ROW 2 (Span 1 + Span 2 = Full Width) ---
  {
    id: 3,
    title: "AI Microservice",
    category: "AI Infrastructure",
    description: "Dedicated Python service for handling LLM prompts with rate-limiting.",
    tech: ["Python", "FastAPI", "Docker"],
    image: "/project3.jpg",
    span: "md:col-span-1", // Kartu Kecil
  },
  {
    id: 4,
    title: "Wedding Platform",
    category: "Fullstack SaaS",
    description: "Digital invitation platform with customizable themes and RSVP management.",
    tech: ["Next.js", "Prisma", "AWS S3"],
    image: "/project4.jpg",
    span: "md:col-span-2", // Kartu Besar (Visual Heavy)
  },

  // --- ROW 3 (Span 1 + Span 2 = Full Width) ---
  {
    id: 5,
    title: "CyberSec Scanner",
    category: "Security Tool",
    description: "Internal CLI tool to scan backend endpoints for vulnerabilities.",
    tech: ["Golang", "Linux", "Bash"],
    image: "/project5.jpg",
    span: "md:col-span-1", // Kartu Kecil
  },
  {
    id: 6,
    title: "Distributed Gateway",
    category: "Backend Architecture",
    description: "Centralized entry point handling auth, load balancing, and routing.",
    tech: ["Nginx", "Lua", "Redis"],
    image: "/project6.jpg",
    span: "md:col-span-2", // Kartu Besar (Penutup yang kuat)
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
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

    // 2. Grid Animation (Stagger Effect)
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
        <div ref={titleRef} className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-[#008cff] font-mono text-sm tracking-widest uppercase mb-2 block">
              // Selected Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Digital Reality.
              </span>
            </h2>
          </div>
          <p className="text-white/50 max-w-sm mt-6 md:mt-0 text-sm md:text-right">
            A showcase of systems I've engineered. <br/>
            Hover to compile the visual data.
          </p>
        </div>

        {/* --- BENTO GRID VAULT --- */}
        {/* Gunakan grid-flow-dense agar celah kosong terisi otomatis */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] grid-flow-dense">
          
          {projects.map((project) => (
            <Link
              href={`/project/${project.id}`} 
              key={project.id}
              // Tambahkan class 'project-card' untuk target animasi GSAP
              className={`project-card group relative rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:border-[#008cff]/50 transition-all duration-500 ${project.span}`}
            >
              
              {/* 1. IMAGE LAYER */}
              <div className="absolute inset-0 w-full h-full">
                {/* Placeholder Background */}
                <div className="relative w-full h-full bg-[#1a1a1a] group-hover:scale-105 transition-transform duration-700 ease-in-out">
                   
                   {/* Jika nanti pakai Image Next.js: */}
                   {/* <Image 
                     src={project.image || "/placeholder.jpg"} 
                     alt={project.title} 
                     fill 
                     className="object-cover opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" 
                   /> 
                   */}
                   
                   {/* Placeholder Text (Hapus jika sudah ada gambar) */}
                   <div className="absolute inset-0 flex items-center justify-center text-white/5 font-bold text-6xl uppercase tracking-tighter opacity-100">
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
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
                
                {/* Tech Pills (Top) */}
                <div className="flex flex-wrap gap-2 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium text-[#008cff] bg-[#008cff]/10 border border-[#008cff]/20 rounded-full backdrop-blur-md">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Title (Bottom) */}
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-end">
                    <div>
                       <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#008cff] transition-colors">
                         {project.title}
                       </h3>
                       <p className="text-white/60 text-sm line-clamp-2 max-w-md">
                         {project.description}
                       </p>
                    </div>

                    {/* Arrow Icon */}
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#008cff] group-hover:rotate-45 transition-all duration-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <button className="btn-neon">
                View Entire Archive
            </button>
        </div>

      </div>
    </section>
  );
}