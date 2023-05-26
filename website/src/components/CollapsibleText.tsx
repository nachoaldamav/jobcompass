'use client';
import { useEffect, useRef, useState } from 'react';
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
  const collapsibleRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);

  if (text.length <= maxLength) {
    return <p className={className}>{fmtText(text)}</p>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (showMore && collapsibleRef.current) {
      collapsibleRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [showMore]);

  return (
    <p
      className={twMerge(className, 'flex flex-col relative')}
      ref={collapsibleRef}
    >
      {showMore ? fmtText(text) : fmtText(text.slice(0, maxLength) + '...')}
      <button
        className={twMerge(
          'text-white absolute w-full bottom-0 right-0 left-0 h-24 text-lg font-bold pt-8 text-center bg-gradient-to-t from-gray-800 via-gray-800/75 to-transparent rounded-xl inline-flex gap-2 items-center justify-center',
          !showMore
            ? 'bg-opacity-100'
            : 'from-transparent to-transparent via-transparent opacity-0',
        )}
        onClick={() => setShowMore(!showMore)}
      >
        <span className='text-lg'>{showMore ? 'Ver menos' : 'Ver más'}</span>
        {!showMore ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 transform rotate-180'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75'
            />
          </svg>
        )}
      </button>
    </p>
  );
}

function fmtText(text: string) {
  // Normalize newlines, then split text by new line
  const textArr = text.replace(/\r\n|\r/g, '\n').split('\n');

  // Map over the text array and return each line as a JSX element
  return textArr.map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
}
