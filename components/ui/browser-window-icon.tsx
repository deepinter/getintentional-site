interface BrowserWindowIconProps {
  children: React.ReactNode;
  className?: string;
}

export default function BrowserWindowIcon({ children, className = "" }: BrowserWindowIconProps) {
  return (
    <div className={`rounded-lg border border-stone-200 bg-white overflow-hidden shadow-sm aspect-[3/2] flex flex-col ${className}`}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-stone-100 bg-stone-50">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-stone-200" />
          <div className="w-2 h-2 rounded-full bg-stone-200" />
          <div className="w-2 h-2 rounded-full bg-stone-200" />
        </div>
        <div className="flex-1 h-4 rounded-sm bg-white border border-stone-200 flex items-center px-2 gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
          <span className="text-[8px] text-stone-400">analytics.com</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
