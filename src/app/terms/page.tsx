"use client";
import React, { useState } from "react";
import Link from "next/link";

type Language = "en" | "id";

const content = {
  en: {
    title: "Terms & Conditions",
    subtitle: "Please read these terms carefully before using our services",
    lastUpdated: "Last updated: February 2026",
    sections: [
      {
        number: "1",
        title: "OVERVIEW",
        content:
          "These Terms & Conditions apply to the software development services provided by Vind's. By using our services or accessing our website, you agree to these terms. If you do not agree, you must discontinue use immediately.",
      },
      {
        number: "2",
        title: "SERVICE DESCRIPTIONS",
        content:
          "We provide custom software development services, including but not limited to Website Development, Backend Systems, and API Integration. We always try our best to display the information of the services as accurately as possible. However, the final output depends on the specific requirements (Statement of Work) agreed upon by both parties.",
      },
      {
        number: "3",
        title: "PAYMENT TERMS",
        content: "",
        bullets: [
          "All transactions are processed in Indonesian Rupiah (IDR).",
          "Work begins only after the agreed Down Payment (DP) is received.",
          "We have the right to adjust prices from time to time before a contract is signed.",
        ],
      },
      {
        number: "4",
        title: "REFUND POLICY",
        highlight: true,
        content:
          "Since our products are intangible services (Digital Services), we apply the following refund policy:",
        bullets: [
          "Cancellation Before Work Begins: If the client cancels the project before any development work has started, a full refund of the Down Payment will be issued, minus any administrative fees.",
          "Cancellation During Progress: If cancellation occurs after the project has started, the Down Payment is non-refundable to cover the resources and time already utilized.",
          "Completed Work: No refunds will be issued for projects that have been completed and delivered to the client.",
        ],
      },
      {
        number: "5",
        title: "PRIVACY POLICY",
        content:
          "Your information is safe with us. We understand that privacy concerns are extremely important to our customers. We only use your personal information to complete your order and do not sell it to third parties.",
      },
      {
        number: "6",
        title: "INDEMNITY",
        content:
          "You agree to indemnify, defend and hold Vind's harmless from any third-party claims, liabilities, or damages arising out of your use of our services.",
      },
      {
        number: "7",
        title: "APPLICABLE LAWS",
        content:
          "These Terms and Conditions are governed by the law in force in Indonesia.",
      },
      {
        number: "8",
        title: "QUESTIONS AND FEEDBACK",
        content:
          "If you have any questions about these terms, please contact us at: m.arvind.alaric@gmail.com",
      },
    ],
  },
  id: {
    title: "Syarat & Ketentuan",
    subtitle: "Harap baca syarat ini dengan seksama sebelum menggunakan layanan kami",
    lastUpdated: "Terakhir diperbarui: Februari 2026",
    sections: [
      {
        number: "1",
        title: "GAMBARAN UMUM",
        content:
          "Syarat & Ketentuan ini berlaku untuk layanan pengembangan perangkat lunak yang disediakan oleh Vind's. Dengan menggunakan layanan kami atau mengakses situs web kami, Anda menyetujui ketentuan ini. Jika Anda tidak setuju, Anda harus segera berhenti menggunakan layanan kami.",
      },
      {
        number: "2",
        title: "DESKRIPSI LAYANAN",
        content:
          "Kami menyediakan layanan pengembangan perangkat lunak kustom, termasuk namun tidak terbatas pada Pengembangan Website, Sistem Backend, dan Integrasi API. Kami selalu berusaha sebaik mungkin untuk menampilkan informasi layanan seakurat mungkin. Namun, hasil akhir bergantung pada persyaratan spesifik (Statement of Work) yang disepakati oleh kedua belah pihak.",
      },
      {
        number: "3",
        title: "KETENTUAN PEMBAYARAN",
        content: "",
        bullets: [
          "Semua transaksi diproses dalam mata uang Rupiah Indonesia (IDR).",
          "Pengerjaan dimulai hanya setelah Down Payment (DP) yang disepakati diterima.",
          "Kami berhak menyesuaikan harga dari waktu ke waktu sebelum kontrak ditandatangani.",
        ],
      },
      {
        number: "4",
        title: "KEBIJAKAN PENGEMBALIAN DANA",
        highlight: true,
        content:
          "Karena produk kami adalah layanan tidak berwujud (Layanan Digital), kami menerapkan kebijakan pengembalian dana berikut:",
        bullets: [
          "Pembatalan Sebelum Pengerjaan Dimulai: Jika klien membatalkan proyek sebelum pengerjaan dimulai, pengembalian dana penuh dari Down Payment akan diberikan, dikurangi biaya administrasi.",
          "Pembatalan Selama Proses Pengerjaan: Jika pembatalan terjadi setelah proyek dimulai, Down Payment tidak dapat dikembalikan untuk menutupi sumber daya dan waktu yang telah digunakan.",
          "Pekerjaan Selesai: Tidak ada pengembalian dana yang akan diberikan untuk proyek yang telah selesai dan diserahkan kepada klien.",
        ],
      },
      {
        number: "5",
        title: "KEBIJAKAN PRIVASI",
        content:
          "Informasi Anda aman bersama kami. Kami memahami bahwa masalah privasi sangat penting bagi pelanggan kami. Kami hanya menggunakan informasi pribadi Anda untuk menyelesaikan pesanan Anda dan tidak menjualnya kepada pihak ketiga.",
      },
      {
        number: "6",
        title: "GANTI RUGI",
        content:
          "Anda setuju untuk mengganti kerugian, membela, dan membebaskan Vind's dari klaim, kewajiban, atau kerusakan pihak ketiga yang timbul dari penggunaan layanan kami.",
      },
      {
        number: "7",
        title: "HUKUM YANG BERLAKU",
        content:
          "Syarat dan Ketentuan ini diatur oleh hukum yang berlaku di Indonesia.",
      },
      {
        number: "8",
        title: "PERTANYAAN DAN MASUKAN",
        content:
          "Jika Anda memiliki pertanyaan tentang ketentuan ini, silakan hubungi kami di: m.arvind.alaric@gmail.com",
      },
    ],
  },
};

export default function TermsPage() {
  const [lang, setLang] = useState<Language>("en");
  const t = content[lang];

  return (
    <main className="min-h-screen bg-black">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Radial Glow */}
      <div className="fixed left-1/2 top-0 -translate-x-1/2 -z-10 h-[600px] w-[600px] rounded-full bg-[#008cff] opacity-5 blur-[150px]"></div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#008cff] transition-colors mb-6"
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
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>
            <span className="text-[#008cff] font-mono text-sm tracking-widest uppercase mb-2 block">
              // Legal Document
            </span>
            <h1 className="font-jakarta text-3xl md:text-5xl font-bold text-white mb-2">
              {t.title}
            </h1>
            <p className="text-white/50 text-sm md:text-base">{t.subtitle}</p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-white/10">
            <button
              onClick={() => setLang("en")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                lang === "en"
                  ? "bg-[#008cff] text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("id")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                lang === "id"
                  ? "bg-[#008cff] text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              ID
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          {t.sections.map((section) => (
            <div
              key={section.number}
              className={`mb-8 p-6 rounded-2xl border ${
                section.highlight
                  ? "border-[#008cff]/30 bg-[#008cff]/5"
                  : "border-white/10 bg-zinc-900/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#008cff]/10 border border-[#008cff]/20 flex items-center justify-center text-[#008cff] font-mono font-bold text-sm">
                  {section.number}
                </span>
                <div className="flex-1">
                  <h2
                    className={`font-jakarta text-lg font-semibold mb-3 ${
                      section.highlight ? "text-[#008cff]" : "text-white"
                    }`}
                  >
                    {section.title}
                    {section.highlight && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-[#008cff]/20 rounded-full">
                        {lang === "en" ? "Important" : "Penting"}
                      </span>
                    )}
                  </h2>
                  {section.content && (
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {section.content}
                    </p>
                  )}
                  {section.bullets && (
                    <ul className="space-y-3">
                      {section.bullets.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-white/60"
                        >
                          <svg
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              section.highlight
                                ? "text-[#008cff]"
                                : "text-white/40"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/30 text-xs text-center">{t.lastUpdated}</p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white/60 text-sm hover:border-[#008cff]/50 hover:text-white transition-all"
              >
                Back to Home
              </Link>
              <Link
                href="/#services"
                className="px-6 py-3 rounded-xl bg-[#008cff]/10 border border-[#008cff]/30 text-[#008cff] text-sm hover:bg-[#008cff] hover:text-white transition-all"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
