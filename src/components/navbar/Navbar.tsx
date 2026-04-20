"use client";
import React, { forwardRef } from "react";
import Link from "next/link";
import "./navButton.css";

// 1. Definisikan Interface Props (Biarkan kosong jika tidak ada props lain)
// Ini membantu TypeScript mengerti struktur komponen.
interface NavbarProps {
    className?: string; // Opsional: Berjaga-jaga jika nanti butuh custom class
    isInteractionLocked?: boolean;
}

// 2. Masukkan tipe generic: <TipeRef, TipeProps>
// TipeRef = HTMLElement (karena ini elemen <nav>)
// TipeProps = NavbarProps
const Navbar = forwardRef<HTMLElement, NavbarProps>(({ className, isInteractionLocked = false }, ref) => {
    const handleLockedClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (isInteractionLocked) {
            event.preventDefault();
        }
    };

    const menuItems = [
        { label: "About", href: "#about" },
        { label: "Skill", href: "#skill" },
        { label: "Project", href: "#project" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <nav
            ref={ref}
            // Gabungkan className default dengan props.className (jika ada)
            className={`absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 opacity-0 ${className || ""}`}
        >
            {/* Logo */}
            <div className="font-jakarta font-bold text-xl text-white tracking-tighter cursor-pointer">
                Vind&apos;s
            </div>

            {/* Menu Links */}
            <div className="hidden md:flex gap-8 font-jakarta text-sm font-medium text-white/80">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-disabled={isInteractionLocked}
                        tabIndex={isInteractionLocked ? -1 : 0}
                        onClick={handleLockedClick}
                        className={`transition-colors duration-300 ${isInteractionLocked
                            ? "cursor-not-allowed text-white/30"
                            : "hover:text-white"
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* CTA Button */}
            <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=arvindalaric321@gmail.com&su=Let's%20Work%20Together&body=Hi%20Arvind,%0A%0AI%20would%20like%20to%20discuss..."
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={isInteractionLocked}
                tabIndex={isInteractionLocked ? -1 : 0}
                onClick={handleLockedClick}
                className={`btn-neon inline-block ${isInteractionLocked ? "pointer-events-none opacity-40" : ""}`}
            >
                Let&apos;s Talk
            </a>


        </nav>
    );
});

// Wajib definisikan displayName untuk debugging di React DevTools
Navbar.displayName = "Navbar";

export default Navbar;