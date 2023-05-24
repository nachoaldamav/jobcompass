'use client';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type CollapsibleTextProps = {
  text: string;
  className: string;
  maxLength?: number;
};

export function CollapsibleText({
  text,
  className,
  maxLength = 100,
}: CollapsibleTextProps) {
  const [showMore, setShowMore] = useState(false);

  if (text.length <= maxLength) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={twMerge(className, 'flex flex-col relative')}>
      {showMore ? text : text.slice(0, maxLength) + '...'}
      <button
        className={twMerge(
          'text-white absolute bottom-0 right-0 left-0 h-24 text-lg font-bold pt-8 text-center bg-gradient-to-t from-gray-800 via-gray-800/75 to-transparent rounded-lg inline-flex gap-2 items-center justify-center',
          !showMore
            ? 'bg-opacity-100'
            : 'from-transparent to-transparent via-transparent opacity-0'
        )}
        onClick={() => setShowMore(!showMore)}
      >
        <span className="text-lg">{showMore ? 'Ver menos' : 'Ver más'}</span>
        {!showMore ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 transform rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
            />
          </svg>
        )}
      </button>
    </p>
  );
}
