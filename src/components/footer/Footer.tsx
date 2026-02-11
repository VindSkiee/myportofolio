"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [time, setTime] = useState("");

  // Logic untuk Jam Real-time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit", // Detik memberikan kesan presisi backend
          hour12: false,
          timeZone: "Asia/Jakarta", // Sesuaikan zona waktu
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector(".scroll-container");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-black border-t border-white/10 pt-20 overflow-hidden">
      
      {/* Background Grid Pattern (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
          
          {/* COLUMN 1: BRAND & MISSION */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">
              Vind's<span className="text-[#008cff]">.</span>
            </h3>
            <p className="text-white/50 max-w-sm text-lg leading-relaxed">
              Crafting robust backend systems with a focus on scalability, security, and clean architecture.
              <br /><br />
              <span className="text-white/30 text-sm">
                "Balanced Excellence" — Code & Iron.
              </span>
            </p>
          </div>

          {/* COLUMN 2: NAVIGATION */}
          <div>
            <h4 className="font-mono text-sm text-[#008cff] uppercase tracking-widest mb-6">
              // Navigation
            </h4>
            <ul className="space-y-4">
              {[
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Skills", href: "#skill" },
                { label: "Project", href: "#project" },
                { label: "Contact", href: "#contact" }
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#008cff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SYSTEM STATUS (The Creative Part) */}
          <div>
            <h4 className="font-mono text-sm text-[#008cff] uppercase tracking-widest mb-6">
              // System Status
            </h4>
            
            <div className="space-y-4 font-mono text-sm text-white/60">
              
              {/* Location */}
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>Location</span>
                <span className="text-white">Indonesia, ID</span>
              </div>

              {/* Local Time */}
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>Local Time</span>
                <span className="text-white tabular-nums">{time}</span>
              </div>

              {/* Status Indicator */}
              <div className="flex justify-between items-center pt-2">
                <span>Availability</span>
                <div className="flex items-center gap-2 text-[#00ff9d]">
                  <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-blink" />
                  <span>Online</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM BAR: COPYRIGHT & SCROLL UP */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 py-8 gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} Vind's. All rights reserved.
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link
                href="/terms"
                className="text-white/40 hover:text-[#008cff] transition-colors"
              >
                Terms & Conditions
              </Link>
              <span className="text-white/20">|</span>
              <Link
                href="/terms#4"
                className="text-white/40 hover:text-[#008cff] transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>

          {/* Tombol Back to Top yang Unik */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 hover:bg-[#008cff] border border-white/10 hover:border-[#008cff] transition-all duration-300"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-white/60 group-hover:text-white">
              Initialize Uplink
            </span>
            <svg 
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
              className="text-white/60 group-hover:text-white group-hover:-translate-y-1 transition-transform"
            >
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* --- GIANT RUNNING TEXT (MARQUEE) --- */}
      {/* Efek ini memberikan kesan "Industrial Tape" di bagian paling bawah */}
      <div className="w-full bg-[#008cff] py-3 overflow-hidden select-none">
        <div className="animate-marquee flex gap-8">
          {/* Ulangi teks agar loop terlihat seamless */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-black font-bold text-lg md:text-xl tracking-wider uppercase">
              <span>Backend Engineering</span>
              <span className="w-2 h-2 bg-black rounded-full" />
              <span>System Architecture</span>
              <span className="w-2 h-2 bg-black rounded-full" />
              <span>Open for Collaboration</span>
              <span className="w-2 h-2 bg-black rounded-full" />
              <span>Let's Build Scale</span>
              <span className="w-2 h-2 bg-black rounded-full" />
            </div>
          ))}
        </div>
      </div>

    </footer>
  );
}