"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image"; // Pastikan import Image
import "./ProfileCard.css"; // Import CSS khusus untuk About Section

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // ... (LOGIKA GSAP SAMA PERSIS SEPERTI SEBELUMNYA, TIDAK ADA YANG DIUBAH) ...
        const section = sectionRef.current;
        const content = contentRef.current;
        const image = imageRef.current;

        if (!section || !content || !image) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                scroller: ".scroll-container",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            },
        });

        tl.fromTo(
            image,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );

        tl.fromTo(
            content,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.5"
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden"
        >
            {/* Background Accents (Sama) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#008cff] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

                    {/* --- LEFT SIDE: 3D PROFILE CARD --- */}
                    <div ref={imageRef} className="w-full md:w-5/12 flex justify-center md:justify-end opacity-0">

                        {/* Wrapper untuk mengatur ukuran kartu */}
                        {/* WRAPPER UTAMA: Mengatur Ukuran Kartu di sini */}
                        <div className="w-[260px] h-[340px] md:w-[320px] md:h-[430px] relative mt-10 md:mb-16 md:right-24">

                            {/* IMPLEMENTASI CARD CSS */}
                            <div className="profile-card group cursor-pointer">

                                {/* CONTENT */}
                                <div className="profile-card-content relative grayscale group-hover:grayscale-0 transition-all duration-500">

                                    {/* GAMBAR */}
                                    <Image
                                        src="/images/myportofolio.png"
                                        alt="Profile Picture"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 300px"
                                    />

                                    {/* Overlay Biru Tipis (Hilang saat hover) */}
                                    <div className="absolute inset-0 bg-[#008cff]/20 mix-blend-overlay group-hover:bg-transparent transition-all duration-300"></div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* --- RIGHT SIDE: STORY (Sama seperti sebelumnya) --- */}
                    <div ref={contentRef} className="w-full md:w-7/12 opacity-0 text-center md:text-left">
                        {/* ... Content text sama persis ... */}
                        <div className="inline-block px-3 py-1 mb-6 border border-[#008cff]/30 rounded-full bg-[#008cff]/10 text-[#008cff] text-xs font-medium tracking-wider uppercase">
                            About Me
                        </div>

                        <h2 className="font-jakarta text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Bridging the gap between <br />
                            <span className="inline-block pb-2 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                Logic and Creativity.
                            </span>
                        </h2>

                        <div className="space-y-6 mt-10 font-jakarta text-white/60 text-sm md:text-base leading-relaxed">
                            <p>
                                I am a Software Engineering student at Telkom University with a deep focus on
                                <span className="text-white font-medium"> Backend Development</span>.
                                While my core strength lies in architecting robust systems using Node.js and Laravel,
                                I believe a great engineer understands the full picture.
                            </p>

                            <p>
                                That's why I'm expanding into Frontend to ensure the systems I build aren't just powerful,
                                but also beautiful and usable.
                            </p>

                            <p>
                                Beyond code, I live by the philosophy of
                                <span className="text-white font-medium"> "Balanced Excellence"</span>.
                                Consistent weight training keeps my discipline sharp, reinforcing the mindset that growth comes from progressive overload.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                            <div>
                                <h4 className="text-3xl font-bold text-white">2+</h4>
                                <p className="text-sm text-white/40 uppercase tracking-wider mt-1">Years Experience</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-white">10+</h4>
                                <p className="text-sm text-white/40 uppercase tracking-wider mt-1">Projects Completed</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}