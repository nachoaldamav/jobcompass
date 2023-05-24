export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-start items-start rounded-xl border border-gray-500/20 bg-gray-800/20 z-[999] p-4">
      {children}
    </div>
  );
}
