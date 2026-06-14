"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ModalType = "inquire" | "privacy" | "terms" | "contact" | "signin";

interface ModalContextType {
  isOpen: boolean;
  modalType: ModalType | null;
  openModal: (type?: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const openModal = (type: ModalType = "inquire") => {
    setModalType(type);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setModalType(null), 400);
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalType, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
}
