"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import BackToServices from "@/components/services/BackToService";
import { techIcons } from "@/components/services/TechIcons";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export interface ServiceData {
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  description: string;
  heroGradient: string; // tailwind gradient classes for hero visual
  heroEmoji: string;
  techStack: { name: string; desc: string }[];
  benefits: string[];
  deliverables: string[];
  process: { step: number; title: string; desc: string }[];
  faq: { q: string; a: string }[];
}

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const childFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
/* ------------------------------------------------------------------ */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-white/80 font-medium pr-4">{q}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="w-5 h-5 text-[#008cff] flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-4 text-white/50 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function ServiceDetailClient({
  service,
}: {
  service: ServiceData;
  slug: string;
}) {
  const whatsappNumber = "6281317099362";
  const whatsappMessage = encodeURIComponent(
    `Halo, saya tertarik dengan layanan ${service.title}. Boleh konsultasi lebih lanjut?`
  );

  return (
    <main className="min-h-screen bg-black">
      {/* Background grid */}
      <div className="fixed inset-0 z-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="fixed left-1/2 top-0 -translate-x-1/2 z-0 h-[600px] w-[600px] rounded-full bg-[#008cff] opacity-5 blur-[150px]" />

      <div className="relative z-10 container mx-auto px-6 py-12 md:py-20 max-w-6xl">
        {/* Back */}
        <BackToServices />

        {/* ============================================================ */}
        {/*  HERO                                                         */}
        {/* ============================================================ */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >
          {/* Left – text */}
          <div>
            <motion.span
              variants={childFade}
              className="text-[#008cff] font-mono text-sm tracking-widest uppercase mb-3 block"
            >
              {"// Service Details"}
            </motion.span>

            <motion.h1
              variants={childFade}
              className="font-jakarta text-3xl md:text-5xl font-bold text-white mb-3 leading-tight"
            >
              {service.title}
            </motion.h1>

            <motion.p variants={childFade} className="text-white/50 text-lg mb-8">
              {service.subtitle}
            </motion.p>

            {/* Price */}
            <motion.div
              variants={childFade}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900 border border-white/10"
            >
              <span className="text-white/40 text-sm">{service.priceNote}</span>
              <span className="text-2xl md:text-3xl font-bold text-[#008cff]">
                {service.price}
              </span>
              <span className="text-white/40 text-sm">IDR</span>
            </motion.div>
          </div>

          {/* Right – hero visual */}
          <motion.div
            variants={childFade}
            className={`relative aspect-square max-w-[380px] mx-auto w-full rounded-3xl ${service.heroGradient} flex items-center justify-center overflow-hidden`}
          >
            {/* Animated concentric rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[1, 2, 3].map((r) => (
                <motion.div
                  key={r}
                  className="absolute rounded-full border border-white/[0.06]"
                  style={{
                    width: `${r * 33}%`,
                    height: `${r * 33}%`,
                  }}
                  animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    delay: r * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <span className="text-7xl md:text-8xl relative z-10">{service.heroEmoji}</span>
          </motion.div>
        </motion.section>

        {/* ============================================================ */}
        {/*  MAIN GRID  (content left + sidebar right)                    */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ---- Left 2/3 ---- */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-white/10"
            >
              <h2 className="font-jakarta text-xl font-semibold text-white mb-4">
                About This Service
              </h2>
              <p className="text-white/60 leading-relaxed">{service.description}</p>
            </motion.div>

            {/* ------------------------------------------------------ */}
            {/*  TECH STACK – icon grid                                  */}
            {/* ------------------------------------------------------ */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-white/10"
            >
              <motion.h2
                variants={childFade}
                className="font-jakarta text-xl font-semibold text-white mb-6"
              >
                Technology Stack
              </motion.h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {service.techStack.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={childFade}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#008cff]/30 transition-colors"
                  >
                    {/* SVG icon or fallback */}
                    <div className="w-10 h-10 flex items-center justify-center">
                      {techIcons[tech.name] ?? (
                        <span className="text-2xl font-bold text-[#008cff]">
                          {tech.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <span className="text-white/80 text-sm font-medium text-center">
                      {tech.name}
                    </span>
                    {tech.desc && (
                      <span className="text-white/40 text-xs text-center leading-snug">
                        {tech.desc}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ------------------------------------------------------ */}
            {/*  BENEFITS                                                */}
            {/* ------------------------------------------------------ */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-white/10"
            >
              <motion.h2
                variants={childFade}
                className="font-jakarta text-xl font-semibold text-white mb-6"
              >
                Key Benefits
              </motion.h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    variants={childFade}
                    className="flex items-start gap-3 text-white/60"
                  >
                    <svg
                      className="w-5 h-5 text-[#008cff] flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* ------------------------------------------------------ */}
            {/*  DEVELOPMENT PROCESS – vertical timeline                 */}
            {/* ------------------------------------------------------ */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-white/10"
            >
              <motion.h2
                variants={childFade}
                className="font-jakarta text-xl font-semibold text-white mb-8"
              >
                Development Process
              </motion.h2>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#008cff]/60 via-[#008cff]/20 to-transparent" />

                <div className="space-y-8">
                  {service.process.map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={childFade}
                      className="flex items-start gap-6 relative"
                    >
                      {/* Node */}
                      <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-[#008cff]/10 border-2 border-[#008cff]/40 flex items-center justify-center shadow-[0_0_16px_rgba(0,140,255,0.15)]">
                        <span className="text-[#008cff] font-mono font-bold text-sm">
                          {item.step}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="pt-1.5">
                        <h3 className="text-white font-medium mb-1">{item.title}</h3>
                        <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ------------------------------------------------------ */}
            {/*  FAQ                                                      */}
            {/* ------------------------------------------------------ */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-white/10"
            >
              <motion.h2
                variants={childFade}
                className="font-jakarta text-xl font-semibold text-white mb-6"
              >
                Frequently Asked Questions
              </motion.h2>

              <motion.div variants={childFade} className="space-y-3">
                {service.faq.map((item, idx) => (
                  <FAQItem key={idx} q={item.q} a={item.a} />
                ))}
              </motion.div>
            </motion.div>

            {/* ------------------------------------------------------ */}
            {/*  PAYMENT INFO                                            */}
            {/* ------------------------------------------------------ */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="p-6 md:p-8 rounded-2xl bg-[#008cff]/5 border border-[#008cff]/20"
            >
              <h2 className="font-jakarta text-xl font-semibold text-[#008cff] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Payment Information
              </h2>
              <ul className="space-y-2 text-white/60 text-sm mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008cff]/60" />
                  All prices in IDR (Rupiah)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008cff]/60" />
                  50% Down Payment to start
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008cff]/60" />
                  Payment via Midtrans / Bank Transfer
                </li>
              </ul>
              <Link
                href="/terms"
                className="inline-flex items-center gap-1 text-[#008cff]/70 text-sm hover:text-[#008cff] transition-colors"
              >
                Read Terms &amp; Refund Policy
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ---- Sidebar (1/3) ---- */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 lg:sticky lg:top-6"
            >
              <h2 className="font-jakarta text-xl font-semibold text-white mb-6">
                What You Get
              </h2>
              <ul className="space-y-3 mb-8">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/60 text-sm">
                    <svg
                      className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="border-t border-white/10 pt-6">
                <p className="text-white/40 text-xs mb-4 text-center">
                  Ready to start your project?
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-xl bg-[#008cff] text-white font-semibold text-center hover:bg-[#0070cc] transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Book via WhatsApp
                </a>
                <p className="text-white/30 text-xs mt-4 text-center">
                  Or email: m.arvind.alaric@gmail.com
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  Mobile sticky CTA                                            */}
        {/* ============================================================ */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/80 backdrop-blur-lg border-t border-white/10 lg:hidden">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-xl bg-[#008cff] text-white font-semibold text-center flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Book via WhatsApp — {service.price}
          </a>
        </div>

        {/* spacer for mobile sticky CTA */}
        <div className="h-20 lg:hidden" />
      </div>
    </main>
  );
}
