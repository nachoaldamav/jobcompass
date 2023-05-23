export function BackgroundGrid() {
  return (
    <div className="flex mx-auto w-full -z-1 fixed flex-row h-screen justify-between left-0 lg:h-full lg:max-w-7xl lg:px-0 px-6 right-0">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="w-full h-full border-[#f5f5f510]/5 border-dashed border-x"
        />
      ))}
    </div>
  );
}
