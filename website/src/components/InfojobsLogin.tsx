'use client';
import { twMerge } from 'tailwind-merge';

export function InfojobsLogin({ username }: { username?: string }) {
  return (
    <button
      className={twMerge(
        'bg-[#167DB7] inline-flex items-center rounded-lg px-4 py-2 transition duration-300 ease-in-out text-white font-semibold',
        username ? 'hover:bg-[#8C4839]' : 'hover:bg-[#1D668F]',
      )}
      onClick={() => {
        if (!username) {
          const scopes = ['candidate_profile_with_email', 'my_applications']
            .map((scope) => scope.toUpperCase())
            .join(',');

          window.location.href = `https://www.infojobs.net/api/oauth/user-authorize/index.xhtml?scope=${scopes}&client_id=${process.env.NEXT_PUBLIC_INFOJOBS_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_INFOJOBS_REDIRECT_URI}&response_type=code&state=OPTIONAL_CLIENT_LOCAL_STATE`;
        } else {
          // remove every cookie that starts with 'infojobs_'
          document.cookie
            .split(';')
            .map((cookie) => cookie.trim())
            .filter((cookie) => cookie.startsWith('infojobs_'))
            .forEach((cookie) => {
              const [key] = cookie.split('=');
              document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            });

          window.location.href = '/dashboard';
        }
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='26'
        height='26'
        fill='none'
        viewBox='0 0 64 64'
      >
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M25.886 43.02c.39 0 .682-.244.731-.587l3.508-29.045v-.098c0-.294-.147-.49-.439-.49H23.84c-.39.049-.438.196-.487.539l-3.459 29.045-.048.098c0 .343.292.538.633.538h5.407zm5.067 8.18c4.725 0 8.67-1.47 9.45-7.788l3.751-30.024c0-.294-.146-.49-.487-.49h-.097l-5.505-.098c-.341.049-.633.245-.682.588l-3.654 30.171c-.39 2.988-1.85 3.184-3.945 3.282-.395.022-.76.034-1.097.045-.41.014-.774.026-1.096.053-.633 0-.877.147-.974.833l-.292 2.35v.245c0 .532.38.587.718.635l.012.002.211.03c.622.087 1.186.166 3.687.166z'
          clipRule='evenodd'
        ></path>
      </svg>
      <span className='ml-2'>
        {username ? `${username}` : 'Login with Infojobs'}
      </span>
    </button>
  );
}
