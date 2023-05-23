import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function SyncExtension({
  setKey,
  syncing,
  setSyncing,
}: {
  setKey: (key: string) => void;
  syncing: boolean;
  setSyncing: (syncing: boolean) => void;
}) {
  const [canSync, setCanSync] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id as number },
            func: () => {
              const syncExtension = document.getElementById('syncExtension');

              if (syncExtension) {
                return true;
              }

              return false;
            },
          },
          (result) => {
            setCanSync(result[0].result);
          }
        );
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <button
      className={twMerge(
        canSync
          ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'
          : 'bg-gray-500 text-white font-bold py-2 px-4 rounded inline-flex items-center cursor-not-allowed opacity-50 disable'
      )}
      disabled={!canSync}
      onClick={() => {
        setSyncing(true);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript(
            {
              target: { tabId: tabs[0].id as number },
              func: async () => {
                window.postMessage({ type: 'syncextension', data: {} }, '*');

                await new Promise((resolve) => setTimeout(resolve, 1000));

                const syncExtension = document.getElementById('syncExtension');

                if (syncExtension) {
                  const key = syncExtension.getAttribute('data-key');

                  return key;
                }
              },
            },
            (result) => {
              const key = result[0].result;
              chrome.storage.sync.set({ key: key });
              toast.success('API Key guardada', {
                duration: 1500,
              });
              setSyncing(false);
              setKey(key as string);
            }
          );
        });
      }}
    >
      Sincronizar API Key{' '}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={syncing ? 'animate-spin h-5 w-5 ml-2' : 'h-5 w-5 ml-2'}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </button>
  );
}
