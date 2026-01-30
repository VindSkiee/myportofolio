import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getAllProjectSlugs } from "@/constants/details";

// Generate static params for all projects
export function generateStaticParams() {
    const slugs = getAllProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    const project = getProjectBySlug(resolvedParams.slug);

    if (!project) {
        notFound();
    }

    // Theme colors based on isMega
    const theme = {
        primary: project.isMega ? "text-teal-400" : "text-[#008cff]",
        primaryHex: project.isMega ? "#14b8a6" : "#008cff",
        border: project.isMega ? "border-teal-500/20" : "border-blue-500/20",
        borderHover: project.isMega ? "hover:border-teal-500/50" : "hover:border-[#008cff]/50",
        bg: project.isMega ? "bg-teal-500/10" : "bg-[#008cff]/10",
        bgHover: project.isMega ? "hover:bg-teal-500/20" : "hover:bg-[#008cff]/20",
        glow: project.isMega 
            ? "shadow-[0_0_80px_rgba(20,184,166,0.15)]" 
            : "shadow-[0_0_80px_rgba(0,140,255,0.15)]",
        pill: project.isMega 
            ? "bg-teal-500/15 text-teal-400 border-teal-500/30" 
            : "bg-[#008cff]/10 text-[#008cff] border-[#008cff]/20",
    };

    const remainingPhotos = project.photos.slice(1);

    return (
        <main className="min-h-screen bg-[#0a0a0a]">
            {/* ========== BACK NAVIGATION ========== */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 py-4">
                    <a 
                        href="/#project" 
                        className={`inline-flex items-center gap-2 text-sm font-mono ${theme.primary} hover:text-white transition-colors`}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" />
                            <path d="M12 19l-7-7 7-7" />
                        </svg>
                        Let me take you back
                    </a>
                </div>
            </nav>

            {/* ========== SECTION 1: HERO ========== */}
            <section className="pt-24 pb-12 animate-fadeInUp">
                <div className="container mx-auto px-6">
                    {/* Type Badge */}
                    <div className="mb-4">
                        <span className={`inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border ${theme.pill}`}>
                            {project.type}
                        </span>
                        {project.isMega && (
                            <span className="ml-2 inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                Ongoing
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-6xl font-outfit font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-shimmer-prismatic-sync bg-[length:200%_100%] animate-shimmer-sync">
                        {project.title}
                    </h1>

                    {/* Hero Image */}
                    <div className={`relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden ${theme.glow}`}>
                        <Image
                            src={project.photos[0] || "/placeholder.jpg"}
                            alt={`${project.title} Hero`}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                        
                        {/* Fallback Text */}
                        <div className="absolute inset-0 flex items-center justify-center text-white/5 font-bold text-6xl md:text-9xl uppercase tracking-tighter -z-10">
                            {project.title}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== SECTION 2: SPLIT CONTENT ========== */}
            <section className="py-12 md:py-20 animate-fadeInUp animation-delay-200">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        
                        {/* Left Column: Description */}
                        <div className="lg:col-span-2 order-2 lg:order-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center md:text-start">
                                About This Project
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none">
                                {project.description.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="text-gray-300 leading-relaxed mb-6 text-xs text-center md:text-start md:text-lg">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Sticky Sidebar */}
                        <div className="lg:col-span-1 order-1 lg:order-2">
                            <div className={`sticky top-24 p-6 rounded-2xl bg-white/5 backdrop-blur-md border ${theme.border}`}>
                                
                                {/* Client */}
                                <div className="mb-6">
                                    <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
                                        Client
                                    </h4>
                                    <p className="text-white font-medium">
                                        {project.client || (
                                            <span className="text-white/60 italic">Personal Hobby Project</span>
                                        )}
                                    </p>
                                </div>

                                {/* Role & Year */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
                                            Role
                                        </h4>
                                        <p className="text-white font-medium text-sm">
                                            {project.role}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
                                            Year
                                        </h4>
                                        <p className={`font-medium text-sm ${theme.primary}`}>
                                            {project.year}
                                        </p>
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className="mb-6">
                                    <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
                                        Tech Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech, index) => (
                                            <span 
                                                key={index}
                                                className={`px-3 py-1 text-xs font-medium rounded-full border ${theme.pill}`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${theme.bg} ${theme.bgHover} ${theme.primary} border ${theme.border}`}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M2 12h20" />
                                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                            </svg>
                                            View Live Site
                                        </a>
                                    )}
                                    {project.repoUrl && (
                                        <a
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                            View Repository
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== SECTION 3: GALLERY ========== */}
            {remainingPhotos.length > 0 && (
                <section className="py-12 md:py-20 border-t border-white/5 animate-fadeInUp animation-delay-400">
                    <div className="container mx-auto px-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center md:text-start">
                            Project Gallery
                        </h2>

                        {/* Dynamic Grid based on image count */}
                        <div className={`grid gap-6 ${
                            remainingPhotos.length === 1 
                                ? 'grid-cols-1' 
                                : remainingPhotos.length === 2 
                                    ? 'grid-cols-1 md:grid-cols-2' 
                                    : 'grid-cols-1 md:grid-cols-2'
                        }`}>
                            {remainingPhotos.map((photo, index) => (
                                <div 
                                    key={index}
                                    className={`relative rounded-xl overflow-hidden group ${
                                        // Make the first image span full width if there are 3 images
                                        remainingPhotos.length === 3 && index === 0 
                                            ? 'md:col-span-2 h-[250px] md:h-[400px]' 
                                            : 'h-[250px] md:h-[300px]'
                                    }`}
                                    style={{
                                        opacity: 0,
                                        transform: 'translateY(20px)',
                                        animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.15}s forwards`
                                    }}
                                >
                                    <Image
                                        src={photo || "/placeholder.jpg"}
                                        alt={`${project.title} Screenshot ${index + 2}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Hover Overlay */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme.bg}`} />
                                    
                                    {/* Fallback */}
                                    <div className="absolute inset-0 flex items-center justify-center text-white/5 font-bold text-4xl uppercase tracking-tighter -z-10">
                                        Screenshot {index + 2}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ========== FOOTER CTA ========== */}
            <section className="py-16 border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-white/40 text-sm mb-4">Interested in working together?</p>
                    <a 
                        href="/#contact"
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium ${theme.bg} ${theme.primary} border ${theme.border} ${theme.borderHover} transition-all`}
                    >
                        Let&apos;s Connect
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </section>
        </main>
    );
}
