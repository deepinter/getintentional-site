"use client";

import { ModalProvider } from "@/components/modal-context";
import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import Noise from "@/components/sections/noise";
import Needs from "@/components/sections/needs";
import Platform from "@/components/sections/platform";
import Intelligence from "@/components/sections/intelligence";
import Inquire from "@/components/sections/inquire";
import FAQ from "@/components/sections/faq";
import Footer from "@/components/sections/footer";
import InquireModal from "@/components/inquire-modal";
import LegalModal from "@/components/legal-modal";
import SignInModal from "@/components/sign-in-modal";

export default function Home() {
  return (
    <ModalProvider>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Noise />
        <Needs />
        <Platform />
        <Intelligence />
        <Inquire />
        <FAQ />
      </main>
      <Footer />
      <InquireModal />
      <LegalModal />
      <SignInModal />
    </ModalProvider>
  );
}
