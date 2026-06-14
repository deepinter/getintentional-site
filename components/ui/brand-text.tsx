export default function BrandText({ text }: { text: string }) {
  const parts = text.split(/(Intentional)/g);
  return (
    <>
      {parts.map((part, i) =>
        part === "Intentional" ? <strong key={i}>{part}</strong> : part
      )}
    </>
  );
}
