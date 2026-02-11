"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import LegalModal from "./LegalModal";

type ModalType = "terms" | "refund" | null;

interface LegalContextType {
  openTerms: () => void;
  openRefund: () => void;
  closeModal: () => void;
}

const LegalContext = createContext<LegalContextType | null>(null);

export function useLegal() {
  const context = useContext(LegalContext);
  if (!context) {
    throw new Error("useLegal must be used within a LegalProvider");
  }
  return context;
}

export function LegalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openTerms = useCallback(() => setActiveModal("terms"), []);
  const openRefund = useCallback(() => setActiveModal("refund"), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  return (
    <LegalContext.Provider value={{ openTerms, openRefund, closeModal }}>
      {children}
      {activeModal && (
        <LegalModal
          isOpen={true}
          onClose={closeModal}
          type={activeModal}
        />
      )}
    </LegalContext.Provider>
  );
}
