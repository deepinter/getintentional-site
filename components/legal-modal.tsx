"use client";

import { useModal } from "./modal-context";
import ModalShell from "./ui/modal-shell";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="font-display font-bold text-h4 text-headline mb-3">{title}</h3>
      <div className="space-y-3 text-body text-stone-700 leading-relaxed">{children}</div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <>
      <p className="text-small text-stone-400 mb-8">Effective date: 23 May 2026 · Deep International Ltd</p>

      <Section title="Who we are">
        <p>Intentional is operated by Deep International Ltd, a company registered in Cyprus (Arch. Makariou III, 2–4, Capital Center 703, 1065 Nicosia, Cyprus). We are the data controller for personal information collected through this website and platform.</p>
        <p>Questions about this policy: <a href="mailto:hello@getintentional.ai" className="text-orange underline">hello@getintentional.ai</a></p>
      </Section>

      <Section title="What we collect">
        <p><strong>Information you give us</strong> — when you complete the enquiry form, we collect your name, email address and organisation name.</p>
        <p><strong>Information you provide using the platform</strong> — content, documents and brand materials you upload or input for analysis.</p>
        <p><strong>Usage data</strong> — pages visited, features used, session duration. We use privacy-first analytics (no cookies, no cross-site tracking).</p>
        <p><strong>Technical data</strong> — IP address, browser type and device type, collected automatically when you access the service.</p>
      </Section>

      <Section title="How we use it">
        <p>We use your personal data to: respond to enquiries and provide the Intentional service; improve and develop the platform; ensure the security and integrity of the service; comply with our legal obligations.</p>
        <p>We do not sell your data. We do not use it for advertising.</p>
      </Section>

      <Section title="Legal basis (GDPR)">
        <p><strong>Contract</strong> — processing necessary to deliver the service you have requested.</p>
        <p><strong>Legitimate interests</strong> — improving the service, preventing fraud, ensuring security.</p>
        <p><strong>Consent</strong> — where we ask for it explicitly (e.g. marketing communications).</p>
      </Section>

      <Section title="Third-party processors">
        <p>We share data only with processors necessary to operate the service, all bound by data processing agreements:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Vercel Inc. — hosting and infrastructure (USA, EU–US Data Privacy Framework)</li>
          <li>Anthropic PBC — AI processing (USA, standard contractual clauses)</li>
          <li>Resend Inc. — transactional email delivery (USA, standard contractual clauses)</li>
        </ul>
      </Section>

      <Section title="Retention">
        <p>We retain personal data for as long as necessary to deliver the service and meet our legal obligations. Enquiry data is retained for up to 24 months. Platform data is deleted within 30 days of account closure upon request.</p>
      </Section>

      <Section title="Your rights">
        <p>Under GDPR, you have the right to access, correct, delete or export your personal data; to object to or restrict certain processing; and to withdraw consent at any time. To exercise any right, contact <a href="mailto:hello@getintentional.ai" className="text-orange underline">hello@getintentional.ai</a>.</p>
        <p>You also have the right to lodge a complaint with the Cyprus Commissioner for Personal Data Protection (<a href="https://www.dataprotection.gov.cy" target="_blank" rel="noopener noreferrer" className="text-orange underline">dataprotection.gov.cy</a>).</p>
      </Section>

      <Section title="Cookies">
        <p>This website uses no third-party tracking cookies. Our analytics are privacy-first and collect no personally identifiable information. Essential session cookies may be used to operate the platform.</p>
      </Section>

      <Section title="Changes">
        <p>We may update this policy from time to time. Material changes will be communicated by email or a prominent notice on the site. Continued use of the service after changes constitutes acceptance.</p>
      </Section>
    </>
  );
}

function TermsOfService() {
  return (
    <>
      <p className="text-small text-stone-400 mb-8">Effective date: 23 May 2026 · Deep International Ltd</p>

      <Section title="Agreement">
        <p>By accessing or using Intentional, you agree to these Terms of Service. If you are using Intentional on behalf of an organisation, you represent that you have authority to bind that organisation.</p>
        <p>These terms form a legally binding agreement between you and Deep International Ltd (Arch. Makariou III, 2–4, Capital Center 703, 1065 Nicosia, Cyprus).</p>
      </Section>

      <Section title="The service">
        <p>Intentional is an AI-powered communications platform that helps organisations monitor, understand and shape how AI systems represent their brand and narrative. We provide access to the platform and, where agreed, strategic advisory services.</p>
        <p>We reserve the right to modify, suspend or discontinue any aspect of the service with reasonable notice.</p>
      </Section>

      <Section title="Your account">
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Notify us immediately at <a href="mailto:hello@getintentional.ai" className="text-orange underline">hello@getintentional.ai</a> if you suspect unauthorised access.</p>
        <p>You must provide accurate information and keep it up to date.</p>
      </Section>

      <Section title="Acceptable use">
        <p>You agree not to: use the service for any unlawful purpose; attempt to gain unauthorised access to any part of the service or its infrastructure; upload content that infringes third-party intellectual property rights; use the service to generate harmful, misleading or deceptive content; resell or sublicense access to the platform without our written consent.</p>
      </Section>

      <Section title="Your content">
        <p>You retain ownership of all content you upload or input into Intentional. By using the service, you grant Deep International Ltd a limited licence to process that content solely to provide and improve the service.</p>
        <p>You are responsible for ensuring you have the rights to any content you submit.</p>
      </Section>

      <Section title="Intellectual property">
        <p>The Intentional platform, including its design, technology, brand and all original content, is the property of Deep International Ltd and protected by applicable intellectual property laws. Nothing in these terms transfers any ownership to you.</p>
      </Section>

      <Section title="Confidentiality">
        <p>We treat your organisational data, strategy and communications materials as confidential. We will not disclose your information to third parties except as set out in our Privacy Policy or as required by law.</p>
      </Section>

      <Section title="Limitation of liability">
        <p>To the maximum extent permitted by applicable law, Deep International Ltd shall not be liable for any indirect, incidental, special or consequential damages arising from your use of the service. Our total liability to you in any 12-month period shall not exceed the fees paid by you in that period.</p>
        <p>The service is provided "as is". We do not warrant that it will be error-free or uninterrupted.</p>
      </Section>

      <Section title="Termination">
        <p>Either party may terminate the agreement by giving 30 days' written notice. We may suspend or terminate your access immediately if you breach these terms or if we reasonably believe your use poses a risk to others or to the service.</p>
      </Section>

      <Section title="Governing law">
        <p>These terms are governed by the laws of Cyprus. Any dispute arising from or related to these terms shall be subject to the exclusive jurisdiction of the courts of Cyprus.</p>
      </Section>

      <Section title="Changes">
        <p>We may update these terms from time to time. We will notify you of material changes by email or via the platform. Continued use after the effective date of changes constitutes acceptance.</p>
      </Section>

      <Section title="Contact">
        <p>For any questions about these terms, contact us at <a href="mailto:hello@getintentional.ai" className="text-orange underline">hello@getintentional.ai</a>.</p>
      </Section>
    </>
  );
}

const titles: Record<string, string> = {
  privacy: "Privacy policy",
  terms:   "Terms of service",
};

export default function LegalModal() {
  const { isOpen, modalType } = useModal();
  const isLegal = modalType === "privacy" || modalType === "terms";

  return (
    <ModalShell isOpen={isOpen && isLegal}>
      <div className="flex flex-col h-full">

        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 px-6 md:px-10 pt-8 pb-4 border-b border-stone-100 shrink-0">
          <div className="col-span-12 md:col-start-3 md:col-span-8">
            <h2 className="font-display font-bold text-h3 text-headline">{titles[modalType!]}</h2>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-12 gap-x-6 px-6 md:px-10 py-8">
            <div className="col-span-12 md:col-start-3 md:col-span-8">
              {modalType === "privacy" && <PrivacyPolicy />}
              {modalType === "terms"   && <TermsOfService />}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-12 gap-x-6 px-6 md:px-10 pb-6 pt-4 border-t border-stone-100 shrink-0">
          <div className="col-span-12 md:col-start-3 md:col-span-8">
            <p className="text-small text-stone-400">Deep International Ltd · Nicosia, Cyprus · <a href="mailto:hello@getintentional.ai" className="text-orange">hello@getintentional.ai</a></p>
          </div>
        </div>

      </div>
    </ModalShell>
  );
}
