"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import Image from "next/image";
import type { ModalProjectData, MegaProjectItem } from "@/constants/projects";

// ============================================
// TYPE DEFINITIONS
// ============================================
interface ProjectModalProps {
    project: ModalProjectData | null;
    isOpen: boolean;
    onClose: () => void;
}

// Type guard to check if project is MegaProject
const isMegaProject = (project: ModalProjectData): project is MegaProjectItem => {
    return 'status' in project && 'brandColor' in project;
};

// ============================================
// ICONS
// ============================================
const LockIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const GitHubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const ConstructionIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
        <path d="M2 20h20" />
        <path d="M5 20v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
        <path d="M12 14V6" />
        <path d="M8 6h8" />
        <path d="M10 6V4a2 2 0 0 1 4 0v2" />
    </svg>
);

// ============================================
// MODAL COMPONENT
// ============================================
export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const backdropRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    
    // Track if component is mounted (client-side only)
    const [isMounted, setIsMounted] = useState(false);

    // Determine if project is under development
    const isLocked = project?.isUnderDevelopment ?? false;
    const isMega = project ? isMegaProject(project) : false;
    const accentColor = isMega && project ? (project as MegaProjectItem).brandColor : "#008cff";

    // ========== MOUNT DETECTION ==========
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    // ========== GSAP ANIMATION ==========
    const animateIn = useCallback(() => {
        if (!backdropRef.current || !modalRef.current) return;

        // Kill any existing timeline
        timelineRef.current?.kill();

        const tl = gsap.timeline();
        timelineRef.current = tl;

        tl.set(backdropRef.current, { display: "flex" })
            .fromTo(
                backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            )
            .fromTo(
                modalRef.current,
                { opacity: 0, scale: 0.9, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" },
                "-=0.15"
            );
    }, []);

    const animateOut = useCallback(() => {
        if (!backdropRef.current || !modalRef.current) return;

        // Kill any existing timeline
        timelineRef.current?.kill();

        const tl = gsap.timeline({
            onComplete: () => {
                if (backdropRef.current) {
                    gsap.set(backdropRef.current, { display: "none" });
                }
                onClose();
            }
        });
        timelineRef.current = tl;

        tl.to(modalRef.current, {
            opacity: 0,
            scale: 0.9,
            y: 20,
            duration: 0.25,
            ease: "power2.in"
        })
            .to(backdropRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
    }, [onClose]);

    // ========== EFFECTS ==========
    useEffect(() => {
        if (isOpen && project) {
            animateIn();
            // Lock body scroll
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, project, animateIn]);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                animateOut();
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, animateOut]);

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === backdropRef.current) {
            animateOut();
        }
    };

    // ========== PORTAL RENDER ==========
    // Don't render until mounted on client to prevent hydration mismatch
    if (!isMounted) return null;

    const modalContent = (
        <div
            ref={backdropRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[9999] items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-md"
            style={{ display: "none" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Modal Container */}
            <div
                ref={modalRef}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]/95 backdrop-blur-xl shadow-2xl"
                style={{
                    boxShadow: `0 0 60px ${accentColor}20, 0 25px 50px -12px rgba(0, 0, 0, 0.8)`
                }}
            >
                {/* Neon Border Glow */}
                <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        background: `linear-gradient(135deg, ${accentColor}20 0%, transparent 50%, ${accentColor}10 100%)`,
                    }}
                />

                {/* Close Button */}
                <button
                    onClick={animateOut}
                    className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
                    aria-label="Close modal"
                >
                    <CloseIcon />
                </button>

                {/* Scrollable Content */}
                <div className="relative z-10 overflow-y-auto max-h-[90vh] custom-scrollbar">
                    {project && (
                        <>
                            {/* ========== LOCKED STATE (Under Development) ========== */}
                            {isLocked ? (
                                <div className="p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center text-center">
                                    

                                    {/* Title */}
                                    <h2
                                        id="modal-title"
                                        className="text-3xl md:text-5xl font-outfit font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-shimmer-prismatic-sync bg-[length:200%_100%] animate-shimmer-sync"
                                        style={{ color: accentColor }}
                                    >
                                        {project.title}
                                    </h2>

                                    {/* Category */}
                                    <span className="text-white/40 text-sm font-mono uppercase tracking-widest mb-6">
                                        {project.category}
                                    </span>

                                    {/* Coming Soon Badge */}
                                    <div className="px-6 py-3 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
                                        <span className="text-amber-400 font-semibold tracking-wide">
                                            Under Development
                                        </span>
                                    </div>

                                    {/* Message */}
                                    <p className="text-white/50 max-w-md leading-relaxed">
                                        This project is currently under active development.
                                        Details, screenshots, and demo links will be available once the project reaches completion.
                                    </p>

                                    {/* Tech Stack Preview */}
                                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                                        {project.tech.map((t, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/40 border border-white/10"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                /* ========== FINISHED PROJECT STATE ========== */
                                <div className="p-6 md:p-8">
                                    {/* Header */}
                                    <div className="mb-6 pr-12">
                                        <span
                                            className="text-xs font-mono uppercase tracking-widest mb-2 block"
                                            style={{ color: accentColor }}
                                        >
                                            {project.category}
                                        </span>
                                        <h2
                                            id="modal-title"
                                            className="text-2xl md:text-4xl font-bold text-white mb-2"
                                        >
                                            {project.title}
                                        </h2>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((t, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1.5 text-xs font-medium rounded-full backdrop-blur-md border"
                                                style={{
                                                    color: accentColor,
                                                    backgroundColor: `${accentColor}15`,
                                                    borderColor: `${accentColor}30`,
                                                }}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Description */}
                                    <div className="mb-8">
                                        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">
                                            Overview
                                        </h3>
                                        <p className="text-white/60 leading-relaxed">
                                            {project.fullDescription || project.description}
                                        </p>
                                    </div>

                                    {/* Images Grid (Max 2) */}
                                    {project.images && project.images.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">
                                                Preview
                                            </h3>
                                            <div className={`grid gap-4 ${project.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                                {project.images.slice(0, 2).map((img, i) => (
                                                    <div
                                                        key={i}
                                                        className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-white/5 group/img"
                                                    >
                                                        {/* Image */}
                                                        <Image
                                                            src={img}
                                                            alt={`${project.title} screenshot ${i + 1}`}
                                                            fill
                                                            className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                        />
                                                        {/* Gradient overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105"
                                                style={{
                                                    backgroundColor: accentColor,
                                                    color: '#0a0a0a',
                                                }}
                                            >
                                                <ExternalLinkIcon />
                                                Live Demo
                                            </a>
                                        )}
                                        {project.repoUrl && (
                                            <a
                                                href={project.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                                            >
                                                <GitHubIcon />
                                                View Source
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Bottom Gradient Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none" />
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
