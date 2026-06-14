import BrowserMockup from "@/components/ui/browser-mockup";
import Container from "@/components/container";
import SectionHeader from "@/components/section-header";
import SectionArc from "@/components/section-arc";

export default function Noise() {
  return (
    <section
      id="noise"
      className="relative bg-background px-6 pt-32"
      // padding-bottom = existing breathing room (8rem) + arc height so content never hides behind the SectionArc
      // Arc height formula matches SectionArc: (height / 1440) * 100vw  →  (115 / 1440) * 100 ≈ 7.99vw
      style={{ paddingBottom: 'calc(8rem + 12vw)' }}
    >
      <Container>
        <SectionHeader
          label="The noise"
          title="AI assistants are speaking for your brand right now."
          subtitle="Without your context, AI fills gaps with guesses — and your audiences trust them. But those same gaps can also reveal what's missing from your brand narrative..."
          subtitleClassName="mb-12"
        />
        <div
          className="-mx-6 noise-expand rounded-none md:rounded-[2rem] overflow-hidden p-6 md:p-8 bg-cover bg-center"
          style={{ backgroundImage: 'url(/desktop-background.jpg)' }}
        >
          <div className="max-w-4xl mx-auto">
            <BrowserMockup />
          </div>
        </div>
      </Container>
      <SectionArc fill="var(--needs-bg)" height={115} peak={0.3} radius={3200} />
    </section>
  );
}
