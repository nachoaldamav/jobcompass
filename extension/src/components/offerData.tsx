import React, { useEffect, useState } from 'react';
import type { Offer } from '../types/offer';
import { toast } from 'sonner';

export function Offer({ offerId }: { offerId: string }) {
  const [data, setData] = useState<Offer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [savingAlert, setSavingAlert] = useState<boolean>(false);
  const [isApiSet, setIsApiSet] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.jobcompass.dev/offer/${offerId}`
        );
        const data = await response.json();
        setData(data);
      } catch (error: any) {
        setError(true);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
        chrome.storage.sync.get(['key'], (result) => {
          if (result.key) {
            setIsApiSet(true);
            setApiKey(result.key);
          }
        });
      }
    }
    if (offerId) fetchData();
  }, [offerId]);

  return (
    <div className="flex flex-col mt-4 ml-1 w-full h-full">
      {loading && <p className="text-sm text-gray-400">Cargando...</p>}
      {error && <p className="text-sm text-gray-400">{errorMessage}</p>}
      {data && (
        <>
          <h2 className="text-lg font-medium text-white">{data.title}</h2>
          <p className="text-sm text-gray-400">
            {data.profile.name} - {data.profile.province.value}
          </p>
          <p className="text-gray-200 text-base mt-2 mb-1 font-bold">
            {data.salaryDescription}
          </p>
          <hr className="border-gray-600 my-1" />
          <div className="grid grid-cols-2">
            <span className="text-sm text-gray-200">Creación</span>
            <span className="text-sm text-gray-200">Última actualización</span>
            <span className="text-sm text-gray-400">
              {new Date(data.creationDate).toLocaleDateString()}
            </span>
            <span className="text-sm text-gray-400">
              {new Date(data.updateDate).toLocaleDateString()} -{' '}
              {/* change to relative time */}
              {new Date(data.updateDate).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div className="grid grid-cols-2 mt-2">
            <span className="text-sm text-gray-200 inline-flex items-center gap-1">
              Solicitudes
              {data.applications > 100 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-5 text-yellow-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                  />
                </svg>
              )}
            </span>
            <span className="text-sm text-gray-200">Tipo de contrato</span>
            <span className="text-sm text-gray-400">{data.applications}</span>
            <span className="text-sm text-gray-400">
              {data.contractType.value}
            </span>
          </div>
          <div className="flex flex-col w-full mt-2 p-4">
            <button
              className={
                isApiSet
                  ? 'bg-blue-500 hover:bg-blue-700 text-white text-lg font-medium gap-3 py-2 px-4 rounded inline-flex items-center justify-center text-center'
                  : 'bg-gray-500 hover:bg-gray-700 text-white text-lg font-medium gap-3 py-2 px-4 rounded inline-flex items-center justify-center text-center cursor-not-allowed'
              }
              disabled={!isApiSet}
              onClick={async () => {
                setSavingAlert(true);
                try {
                  console.log({
                    offerId: data.id,
                    userId: apiKey,
                  });

                  const res = await fetch(`https://api.jobcompass.dev/alert`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      offerId: data.id,
                      userId: apiKey,
                    }),
                  });
                  const json = await res.json();
                  if (json.error) {
                    toast.error(json.error);
                  } else {
                    toast.success('Alerta creada correctamente');
                  }
                } catch (error: any) {
                  setError(true);
                  setErrorMessage(error.message);
                }
                setSavingAlert(false);
              }}
            >
              Crear alerta{' '}
              {savingAlert ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 animate-swing"
                >
                  <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
                  <path
                    fillRule="evenodd"
                    d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </>
      )}
      {!data && !loading && !error && (
        <div className="flex flex-col justify-center items-center w-full h-full text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <p className="text-sm text-gray-400 text-center">
            Entra en una oferta para poder añadirla a JobCompass
          </p>
        </div>
      )}
    </div>
  );
}
