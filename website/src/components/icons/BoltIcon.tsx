import { twMerge } from 'tailwind-merge';

export function BoltIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={twMerge('h-4 w-4 text-red-700', className)}
    >
      <path
        fillRule='evenodd'
        d='M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z'
        clipRule='evenodd'
      />
    </svg>
  );
}
