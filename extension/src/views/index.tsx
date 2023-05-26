import React, { useEffect, useState } from 'react';
import infojobsLogo from '../infojobs.png';
import { Link } from 'react-router-dom';
import { Offer } from '../components/offerData';

export default function Content() {
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab | null>(null);
  const [title, setTitle] = useState<string>('');
  const [jobName, setJobName] = useState<string>('');
  const [offerId, setOfferId] = useState<string>('');
  const [key, setKey] = useState<string>('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setCurrentTab(tabs[0]);
    });

    chrome.storage.sync.get(['key'], (result) => {
      setKey(result.key);
    });
  }, []);

  useEffect(() => {
    if (currentTab) {
      setTitle(currentTab.title || '');
      chrome.scripting.executeScript(
        {
          target: { tabId: currentTab.id as number },
          func: () => {
            const element = document.getElementById(
              'prefijoPuesto',
            ) as HTMLInputElement;

            const url = new URL(window.location.href);

            const urlWithoutQuery = url.origin + url.pathname;

            const offerId = urlWithoutQuery.split('/').pop();

            return {
              jobTitle: element.innerText,
              offerId: offerId?.replace('of-i', ''),
            };
          },
        },
        (result) => {
          setJobName(result[0].result.jobTitle);
          setOfferId(result[0].result.offerId as string);

          chrome.storage.sync.set({
            jobName: result[0].result.jobTitle,
            offerId: result[0].result.offerId,
          });
        },
      );
    }
  }, [currentTab]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.jobcompass.dev/offer/${offerId}`,
      );

      const data = await response.json();

      console.log(data);
    }
    if (offerId) {
      fetchData();
    }
  }, [offerId]);

  return (
    <div className='w-full h-full relative'>
      <span className='absolute top-0 right-0'>
        <Link
          to='/config'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'
        >
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
              d='M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33'
            />
          </svg>
        </Link>
      </span>
      <div className='flex flex-col p-6 max-w-sm mx-auto items-start w-full h-full'>
        <div className='flex-shrink-0 inline-flex items-center gap-2 rounded-md shadow'>
          <img className='h-12 w-12' src={infojobsLogo} alt='InfoJobs' />
          <h1 className='text-xl font-medium text-white'>JobCompass</h1>
        </div>
        <Offer offerId={offerId} />
      </div>
    </div>
  );
}
