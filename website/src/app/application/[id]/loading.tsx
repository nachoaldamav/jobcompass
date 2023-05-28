export default function Loading() {
  return (
    <div className="flex flex-col gap-4 w-full p-4 rounded-lg bg-gray-800/50 shadow-md backdrop-filter backdrop-blur-sm hover:bg-gray-800/70 transition duration-300 ease-in-out">
      <div className="animate-pulse rounded-xl col-span-1 bg-gray-700 w-full h-96" />
      <div className="animate-pulse rounded-xl col-span-1 bg-gray-700 w-12 h-12" />
      <div className="flex flex-col items-start justify-start gap-2 col-span-11 ml-2">
        <div className="animate-pulse rounded-lg bg-gray-700 w-1/2 h-4" />
        <div className="animate-pulse rounded-lg bg-gray-700 w-1/4 h-4" />
        <div className="animate-pulse rounded-lg bg-gray-700 w-1/3 h-4" />
        <div className="animate-pulse rounded-lg bg-gray-700 w-1/2 h-4" />
        <div className="animate-pulse rounded-lg bg-gray-700 w-1/4 h-4" />
        <div className="animate-pulse rounded-lg bg-gray-700 w-1/5 h-4" />
      </div>
    </div>
  );
}
