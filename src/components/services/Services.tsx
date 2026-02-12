"use client";
import React from "react";
import Link from "next/link";

const services = [
  {
    id: 1,
    slug: "backend-development",
    title: "Backend Development",
    description:
      "Scalable and secure server-side solutions using Node.js, Express, Laravel, and PostgreSQL. Includes API design, database optimization, and cloud deployment.",
    price: "Rp 5.000.000",
    priceNote: "Mulai dari",
    features: [
      "RESTful & GraphQL API",
      "Database Design & Optimization",
      "Authentication & Authorization",
      "Cloud Deployment (AWS/GCP)",
      "Performance Monitoring",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        />
      </svg>
    ),
  },
  {
    id: 2,
    slug: "web-application",
    title: "Web Application",
    description:
      "Full-stack web applications built with modern frameworks like Next.js and React. From landing pages to complex enterprise dashboards.",
    price: "Rp 8.000.000",
    priceNote: "Mulai dari",
    features: [
      "Responsive Design",
      "Modern UI/UX Implementation",
      "SEO Optimization",
      "Admin Dashboard",
      "Payment Integration",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    slug: "api-integration",
    title: "API Integration",
    description:
      "Seamless integration of third-party services including payment gateways (Midtrans, Stripe), shipping APIs, and enterprise systems.",
    price: "Rp 3.000.000",
    priceNote: "Mulai dari",
    features: [
      "Payment Gateway Integration",
      "Third-party API Connection",
      "Webhook Implementation",
      "Data Synchronization",
      "API Documentation",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full min-h-full py-32 bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* --- BACKGROUND ELEMENTS --- */}

      {/* 1. Grid Pattern */}
      <div className="absolute inset-0 z-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* 2. Radial Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[600px] rounded-full bg-[#008cff] opacity-5 blur-[150px]"></div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#008cff] font-mono text-sm tracking-widest uppercase mb-2 block">
            // Services & Pricing
          </span>
          <h2 className="font-jakarta text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Professional{" "}
            <br className="md:hidden" />
            <span className="inline-block pb-2 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Development Services.
            </span>
          </h2>
          <p className="font-jakarta text-white/50 text-sm md:text-base max-w-2xl mx-auto">
            High-quality software development services tailored to your business needs.
            All prices are in{" "}
            <span className="text-[#008cff] font-semibold">
              Indonesian Rupiah (IDR)
            </span>
            .
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative p-8 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm hover:border-[#008cff]/50 hover:bg-zinc-900/80 transition-all duration-500 flex flex-col"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-[#008cff]/10 border border-[#008cff]/20 flex items-center justify-center text-[#008cff] mb-6 group-hover:bg-[#008cff]/20 transition-colors">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="font-jakarta text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-white/60"
                  >
                    <svg
                      className="w-4 h-4 text-[#008cff] flex-shrink-0"
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
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="border-t border-white/10 pt-6 mb-6">
                <span className="text-white/40 text-xs uppercase tracking-wider block mb-1">
                  {service.priceNote}
                </span>
                <span className="text-2xl font-bold text-white">
                  {service.price}
                </span>
              </div>

              {/* CTA Button */}
              <Link
                href={`/services/${service.slug}`}
                className="w-full py-3 px-6 rounded-xl bg-[#008cff]/10 border border-[#008cff]/30 text-[#008cff] font-medium text-center hover:bg-[#008cff] hover:text-white transition-all duration-300 group-hover:border-[#008cff]"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-16">
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            Harga di atas adalah estimasi awal. Harga final akan ditentukan
            berdasarkan kompleksitas proyek setelah konsultasi.
          </p>
          <p className="text-white/30 text-xs mt-4">
            Pembayaran dapat dilakukan melalui Midtrans atau Transfer Bank.
            Semua transaksi menggunakan mata uang IDR (Rupiah Indonesia).
          </p>
          <Link
            href="/terms"
            className="inline-flex items-center gap-2 mt-6 text-[#008cff]/70 text-sm hover:text-[#008cff] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Read Terms & Conditions / Refund Policy
          </Link>
        </div>
      </div>
    </section>
  );
}
