"use client";
import React, { useEffect, useCallback } from "react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "refund";
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  // Handle ESC key to close modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const termsContent = (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">
        Terms & Conditions
      </h2>
      <p className="text-white/40 text-sm mb-6">
        Syarat dan Ketentuan Layanan
      </p>

      <div className="space-y-6 text-white/70 text-sm leading-relaxed">
        <div>
          <h3 className="text-white font-semibold mb-2">1. Scope of Service (Ruang Lingkup Layanan)</h3>
          <p>
            We provide custom software development services as described in the agreed Statement of Work (SOW). 
            Kami menyediakan layanan pengembangan software custom sesuai dengan yang tertera dalam Statement of Work (SOW) yang telah disepakati bersama.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">2. Payment (Pembayaran)</h3>
          <p>
            All transactions are processed in Indonesian Rupiah (IDR). Work begins after the agreed Down Payment is received via Midtrans or Bank Transfer.
            <br /><br />
            Semua transaksi diproses dalam mata uang Rupiah Indonesia (IDR). Pengerjaan proyek dimulai setelah Down Payment (DP) yang disepakati diterima melalui Midtrans atau Transfer Bank.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">3. Revision (Revisi)</h3>
          <p>
            The client is entitled to 2 (two) rounds of minor revisions during the development phase. Additional revisions beyond this will be subject to additional charges based on the scope of changes requested.
            <br /><br />
            Klien berhak mendapatkan 2 (dua) kali revisi minor selama fase pengembangan. Revisi tambahan di luar ketentuan ini akan dikenakan biaya tambahan berdasarkan lingkup perubahan yang diminta.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">4. Intellectual Property (Hak Kekayaan Intelektual)</h3>
          <p>
            Upon full payment, all source code and deliverables become the exclusive property of the client. Until full payment is received, all work remains the property of the developer.
            <br /><br />
            Setelah pembayaran lunas, semua source code dan deliverables menjadi hak milik eksklusif klien. Sebelum pembayaran lunas, semua hasil pekerjaan tetap menjadi milik developer.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">5. Timeline (Waktu Pengerjaan)</h3>
          <p>
            Project timelines will be specified in the SOW. Delays caused by client's late feedback or scope changes may extend the delivery date.
            <br /><br />
            Timeline proyek akan ditentukan dalam SOW. Keterlambatan yang disebabkan oleh feedback klien yang lambat atau perubahan scope dapat memperpanjang tanggal pengiriman.
          </p>
        </div>
      </div>
    </>
  );

  const refundContent = (
    <>
      <h2 className="text-2xl font-bold text-white mb-6">
        Refund Policy
      </h2>
      <p className="text-white/40 text-sm mb-6">
        Kebijakan Pengembalian Dana
      </p>

      <div className="space-y-6 text-white/70 text-sm leading-relaxed">
        <div className="p-4 rounded-xl bg-[#008cff]/10 border border-[#008cff]/20">
          <p className="text-white/80">
            <strong className="text-[#008cff]">Important Notice:</strong> Since our products are digital services (intangible goods), the following refund policies apply.
            <br /><br />
            <strong className="text-[#008cff]">Pemberitahuan Penting:</strong> Karena produk kami adalah layanan digital (barang tidak berwujud), kebijakan pengembalian dana berikut berlaku.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs">1</span>
            Cancellation Before Work Begins (Pembatalan Sebelum Pengerjaan)
          </h3>
          <p>
            If the client cancels the project before work begins, a <strong className="text-green-400">100% refund</strong> of the Down Payment will be issued within 7 business days.
            <br /><br />
            Jika klien membatalkan proyek sebelum pengerjaan dimulai, <strong className="text-green-400">100% pengembalian dana</strong> dari Down Payment akan diproses dalam 7 hari kerja.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-xs">2</span>
            Cancellation During Development (Pembatalan Saat Pengerjaan)
          </h3>
          <p>
            If cancellation occurs after development has started, the Down Payment is <strong className="text-yellow-400">non-refundable</strong> to cover the resources already utilized. Any remaining balance (if applicable) will be refunded.
            <br /><br />
            Jika pembatalan terjadi setelah pengerjaan dimulai, Down Payment <strong className="text-yellow-400">tidak dapat dikembalikan</strong> untuk menutupi sumber daya yang telah digunakan. Sisa saldo (jika ada) akan dikembalikan.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs">3</span>
            After Final Delivery (Setelah Penyerahan Final)
          </h3>
          <p>
            <strong className="text-red-400">No refunds</strong> are issued after the source code or final application has been delivered to the client and accepted.
            <br /><br />
            <strong className="text-red-400">Tidak ada pengembalian dana</strong> yang diberikan setelah source code atau aplikasi final telah diserahkan kepada klien dan diterima.
          </p>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="text-white font-semibold mb-2">Contact for Disputes (Kontak untuk Sengketa)</h3>
          <p>
            For any disputes or questions regarding refunds, please contact us via email or WhatsApp. We are committed to fair resolution.
            <br /><br />
            Untuk sengketa atau pertanyaan mengenai pengembalian dana, silakan hubungi kami melalui email atau WhatsApp. Kami berkomitmen untuk penyelesaian yang adil.
          </p>
        </div>
      </div>
    </>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Mono Label */}
        <span className="text-[#008cff] font-mono text-xs tracking-widest uppercase mb-4 block">
          // {type === "terms" ? "Legal Document" : "Refund Policy"}
        </span>

        {/* Content */}
        {type === "terms" ? termsContent : refundContent}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-white/30 text-xs text-center">
            Last updated: February 2026 | Terakhir diperbarui: Februari 2026
          </p>
        </div>
      </div>
    </div>
  );
}
