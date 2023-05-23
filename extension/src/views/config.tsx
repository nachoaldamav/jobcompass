import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SyncExtension } from '../components/syncApiKey';
import { twMerge } from 'tailwind-merge';

type UserData = {
  UserID: string;
  Email: string;
  Name: string;
  RegistrationDate: string;
};

export function ConfigPage() {
  const [key, setKey] = useState<string>('');
  const [syncing, setSyncing] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    chrome.storage.sync.get(['key'], (result) => {
      setKey(result.key);
    });
  }, []);

  useEffect(() => {
    async function getUserData() {
      const data = await fetch('https://api.jobcompass.dev/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });
      const json = await data.json();
      setUserData(json[0]);
    }
    getUserData();
  }, [key]);

  console.log(userData);

  return (
    <div className="flex flex-col items-center justify-center py-2 h-full w-full relative">
      <span className="absolute top-0 left-0">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
      </span>
      <h1 className="text-4xl font-bold text-white">Configuración</h1>
      <p className="text-gray-500">Aquí podrás configurar la extensión</p>
      <div className="inline-flex items-center justify-center gap-2 mt-4">
        <SyncExtension
          setKey={setKey}
          syncing={syncing}
          setSyncing={setSyncing}
        />
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded inline-flex items-center"
          onClick={() => {
            chrome.storage.sync.remove(['key'], () => {
              setKey('');
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full mt-2">
        <div
          className={twMerge(
            'flex flex-col justify-center items-center w-full gap-2 border border-gray-500 rounded-lg p-4 h-72 border-dashed bg-gray-800/40',
            key
              ? 'border-green-500 text-green-500'
              : 'border-red-500 text-red-500'
          )}
        >
          <span className="text-lg font-semibold text-center">
            {key ? 'Vinculada' : 'No vinculada'}
          </span>
          {!key && (
            <span className="text-sm text-center">
              Inicia sesión en jobcompass.dev para vincular tu cuenta desde el
              dashboard
            </span>
          )}
          {key ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
