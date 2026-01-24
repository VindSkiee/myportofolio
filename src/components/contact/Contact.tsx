"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import "./stackedForm.css"

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        "service_77ex519", // Ganti dengan Service ID dari EmailJS
        "template_eveuy4h", // Ganti dengan Template ID dari EmailJS
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "F3KRRNWroKN2m4y0g" // Ganti dengan Public Key dari EmailJS
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Reset form
      
      // Reset status setelah 5 detik
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("error");
      
      // Reset status setelah 5 detik
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const leftSide = leftSideRef.current;
    const form = formRef.current;

    if (!section || !leftSide || !form) return;

    // Pastikan scroller target benar. 
    // Jika '.scroll-container' tidak ditemukan, ScrollTrigger akan fallback ke window (default).
    // Ini aman untuk debugging.
    const scrollContainer = document.querySelector(".scroll-container");
    const scrollerTarget = scrollContainer ? ".scroll-container" : window;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scroller: scrollerTarget, // Otomatis deteksi
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animasi Kiri
    tl.fromTo(
      leftSide,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Animasi Form (Kanan)
    tl.fromTo(
      form,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Definisi ClipPath untuk Squircle (Hanya perlu sekali di sini) */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5"></path>
          </clipPath>
        </defs>
      </svg>

      {/* Background Accent */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#008cff] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">
          
          {/* --- LEFT SIDE: HEADLINE & SOCIAL DOCK (KODE KAMU) --- */}
          <div ref={leftSideRef} className="opacity-0 text-center md:text-left">
            <span className="text-[#008cff] font-mono text-sm tracking-widest uppercase mb-4 block">
              // Get In Touch
            </span>
            <h2 className="font-jakarta text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Let's build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008cff] to-[#00c6ff]">
                legendary together.
              </span>
            </h2>
            
            <p className="font-jakarta text-white/60 text-sm md:text-base mb-12 max-w-md mx-auto md:mx-0">
              Have a project in mind or just want to discuss backend architecture? 
              I'm always open to new opportunities and connections.
            </p>

            {/* --- YOUR SOCIAL DOCK IMPLEMENTATION --- */}
            <div className="relative inline-block">
              {/* Glass Background Wrapper */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl scale-110" />

              {/* Icon Container */}
              <div className="relative flex items-end gap-x-4 p-4">
                
                {/* 1. GITHUB */}
                <Link href="https://github.com/VindSkiee" target="_blank" className="relative group">
                  <div
                    style={{ clipPath: "url(#squircleClip)" }}
                    className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-lg border border-gray-600/50 cursor-pointer transform transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-cyan-500/20"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                </Link>

                {/* 2. LINKEDIN */}
                <Link href="https://www.linkedin.com/in/muhammad-arvind-alaric-717b082a1/" target="_blank" className="relative group">
                  <div
                    style={{ clipPath: "url(#squircleClip)" }}
                    className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-blue-500/30"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                </Link>

              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: 3D FORM --- */}
          <div className="w-full flex justify-center md:justify-end">
            
            {/* HAPUS opacity-0 PADA FORM */}
            {/* Tambahkan 'pt-10' (padding top) agar ujung 3D atas tidak kepotong */}
            <form ref={formRef} className="w-full pt-10" onSubmit={handleSubmit}>
              
              <ul className="stack-form-wrapper md:right-10">
                {/* 1. NAME */}
                <li style={{ "--i": 4 } as React.CSSProperties}>
                  <input 
                    className="input" 
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </li>

                {/* 2. EMAIL */}
                <li style={{ "--i": 3 } as React.CSSProperties}>
                  <input 
                    className="input" 
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </li>

                {/* 3. MESSAGE */}
                <li style={{ "--i": 2 } as React.CSSProperties}>
                  <textarea 
                    className="input pt-4"
                    name="message"
                    placeholder="Your Message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </li>

                {/* 4. BUTTON */}
                <button 
                  type="submit"
                  style={{ "--i": 1 } as React.CSSProperties} 
                  className="stack-btn uppercase tracking-wider"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : submitStatus === "success" ? "Message Sent!" : submitStatus === "error" ? "Failed. Try Again" : "Send Message"}
                </button>
              </ul>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}