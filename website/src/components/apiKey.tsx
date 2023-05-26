'use client';
import { useEffect } from 'react';

export function SyncExtension({ api }: { api: string }) {
  useEffect(() => {
    async function setKey() {
      const syncExtension = document.getElementById('syncExtension');
      if (syncExtension) {
        syncExtension.setAttribute('data-key', api);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      syncExtension?.setAttribute('data-key', '');
    }

    // when recieving a message from the extension, set the key
    window.addEventListener('message', (event) => {
      if (event.data.type === 'syncextension') {
        setKey();
      }
    });
  }, [api]);

  return <span className='invisible' id='syncExtension' data-key={undefined} />;
}
