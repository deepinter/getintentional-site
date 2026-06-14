import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: Props) {
  return (
    <div className={cn("max-w-[1280px] mx-auto", className)}>
      {children}
    </div>
  );
}
