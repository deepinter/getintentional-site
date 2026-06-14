import AnimatedChat from "./animated-chat";

export default function BrowserMockup() {
  return (
    <div className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-[0_24px_60px_rgba(28,25,23,0.10)] flex flex-col h-[600px]">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-100 bg-stone-50 flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
        </div>
        <div className="flex-1 h-6 rounded-md bg-white border border-stone-200 flex items-center px-3 gap-2">
          <div className="w-2 h-2 rounded-full bg-stone-300 flex-shrink-0" />
          <span className="text-[11px] text-stone-400">answer-engine.ai</span>
        </div>
      </div>

      {/* Animated chat */}
      <AnimatedChat />
    </div>
  );
}
