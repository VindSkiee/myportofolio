"use client";
import React from "react";

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "Prisma", "Supabase", "Redis"],
  },
  {
    category: "Tools & Others",
    items: ["Git", "Docker", "Figma", "AWS", "Vercel", "CI/CD"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skill" className="relative w-full min-h-full py-32 bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      
      {/* 1. Grid Pattern (Dibuat dengan CSS Gradient) */}
      <div className="absolute inset-0 z-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* 2. Radial Glow (Cyan - Matching dengan Hero Button) */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-[#008cff] opacity-10 blur-[120px]"></div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-jakarta text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Technical Proficiency
          </h2>
          <p className="font-jakarta text-white/50 text-lg max-w-2xl mx-auto">
            A curated list of technologies I use to build robust and scalable applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#008cff]/50 hover:bg-[#008cff]/5 transition-all duration-500"
            >
              {/* Category Title */}
              <h3 className="font-jakarta text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#008cff] rounded-full opacity-50 group-hover:opacity-100 transition-opacity"/>
                {skillGroup.category}
              </h3>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 text-sm font-medium text-white/70 bg-white/5 rounded-lg border border-white/5 group-hover:text-white group-hover:border-white/20 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}