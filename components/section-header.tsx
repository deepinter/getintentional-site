import { cn } from "@/lib/utils";
import RevealText from "@/components/ui/reveal-text";

interface Props {
  title: string;
  subtitle?: React.ReactNode;
  label?: string;
  labelClassName?: string;
  dividerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function SectionHeader({ title, subtitle, label, labelClassName, dividerClassName, titleClassName, subtitleClassName }: Props) {
  return (
    <div className="prose">
      {label && <span className={`block text-small mb-3 ${labelClassName ?? "text-headline"}`}>{label}</span>}
      <div className={`h-px w-1/6 mb-8 ${dividerClassName ?? "bg-headline opacity-30"}`} />
      <RevealText className={titleClassName ?? "mb-6"}>{title}</RevealText>
      {subtitle && typeof subtitle === "string" && (
        <RevealText as="p" className={cn("text-sub", subtitleClassName)}>{subtitle}</RevealText>
      )}
      {subtitle && typeof subtitle !== "string" && (
        <p className={cn("text-sub", subtitleClassName)}>{subtitle}</p>
      )}
    </div>
  );
}
