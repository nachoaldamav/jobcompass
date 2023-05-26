export function HomeCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <article className='flex flex-col items-start bg-gradient-to-b from-[#141521] via-[#141521]/40 to-transparent justify-center border border-[#7fcef3]/10 rounded-lg p-10 hover:border-[#7fcef3]/75 transition-all duration-300 ease-in-out bg-opacity-25'>
      <header>
        <h3 className='text-2xl font-bold text-left mt-2 text-[#7fcef3]'>
          {number}.
        </h3>
        <h3 className='text-2xl font-bold text-left mt-10'>{title}</h3>
      </header>
      <p className='text-lg text-left mt-4'>{description}</p>
    </article>
  );
}
