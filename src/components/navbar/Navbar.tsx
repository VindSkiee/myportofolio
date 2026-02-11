"use client";
import React, { forwardRef } from "react";
import Link from "next/link";
import "./navButton.css";

// 1. Definisikan Interface Props (Biarkan kosong jika tidak ada props lain)
// Ini membantu TypeScript mengerti struktur komponen.
interface NavbarProps {
    className?: string; // Opsional: Berjaga-jaga jika nanti butuh custom class
}

// 2. Masukkan tipe generic: <TipeRef, TipeProps>
// TipeRef = HTMLElement (karena ini elemen <nav>)
// TipeProps = NavbarProps
const Navbar = forwardRef<HTMLElement, NavbarProps>((props, ref) => {
    return (
        <nav
            ref={ref}
            // Gabungkan className default dengan props.className (jika ada)
            className={`absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 opacity-0 ${props.className || ""}`}
        >
            {/* Logo */}
            <div className="font-jakarta font-bold text-xl text-white tracking-tighter cursor-pointer">
                Vind's
            </div>

            {/* Menu Links */}
            <div className="hidden md:flex gap-8 font-jakarta text-sm font-medium text-white/80">
                <Link href="#about" className="hover:text-white transition-colors duration-300">
                    About
                </Link>
                <Link href="#services" className="hover:text-white transition-colors duration-300">
                    Services
                </Link>
                <Link href="#skill" className="hover:text-white transition-colors duration-300">
                    Skill
                </Link>
                <Link href="#project" className="hover:text-white transition-colors duration-300">
                    Project
                </Link>
                <Link href="#contact" className="hover:text-white transition-colors duration-300">
                    Contact
                </Link>
            </div>

            {/* CTA Button */}
            <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=arvindalaric321@gmail.com&su=Let's%20Work%20Together&body=Hi%20Arvind,%0A%0AI%20would%20like%20to%20discuss..."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon inline-block"
            >
                Let's Talk
            </a>


        </nav>
    );
});

// Wajib definisikan displayName untuk debugging di React DevTools
Navbar.displayName = "Navbar";

export default Navbar;