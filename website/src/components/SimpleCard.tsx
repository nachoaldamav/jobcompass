type CardProps = {
  header: React.ReactNode;
  footer: React.ReactNode;
};

export function Card({ header, footer }: CardProps) {
  return (
    <div className="flex flex-col justify-between items-start rounded-xl border border-gray-500/20 h-24 gap-1 bg-gray-800/20 z-[999] p-4">
      <header className="flex flex-row justify-start items-center gap-2 pl-1">
        {header}
      </header>
      <footer className="flex flex-row justify-start items-center gap-2 text-gray-400 text-base">
        {footer}
      </footer>
    </div>
  );
}
