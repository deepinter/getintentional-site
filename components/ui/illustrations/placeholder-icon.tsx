import BrowserWindowIcon from "../browser-window-icon";

export default function PlaceholderIcon() {
  return (
    <BrowserWindowIcon>
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-stone-100 rounded-lg mx-auto mb-2" />
          <p className="text-xs text-stone-400">Iconography</p>
        </div>
      </div>
    </BrowserWindowIcon>
  );
}
