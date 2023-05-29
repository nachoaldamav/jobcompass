'use client';
import { useState } from 'react';
import { randomUUID } from 'crypto';
import { Event, EventType, EventsDictionary } from './getApplication';
import { sendEvent } from './sendEvent';

export function EventsForm({ applicationId }: { applicationId: string }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Event> | null>(null);
  const [sending, setSending] = useState(false);

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        onClick={() => setOpen(true)}
      >
        Añadir evento
      </button>
      <dialog
        open={open}
        className="fixed z-10 overflow-y-auto top-0 left-0 w-full h-full bg-gray-800/50"
      >
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full max-w-md p-6 mx-auto bg-gray-700/20 border border-gray-300/10 rounded-lg shadow-md backdrop-filter backdrop-blur-sm">
            <form
              className="relative flex flex-col w-full p-6 space-y-4 rounded-lg shadow-md"
              onSubmit={async (e) => {
                e.preventDefault();
                setSending(true);
                await sendEvent({
                  ...formData,
                  ApplicationId: applicationId,
                } as Event);
                setSending(false);
                setOpen(false);
                window.location.reload();
              }}
            >
              <h1 className="text-2xl font-bold text-white">Añadir evento</h1>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="type"
                  className="text-sm font-medium text-white"
                >
                  Tipo
                </label>
                <select
                  id="type"
                  name="type"
                  className="block w-full px-3 py-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData?.type}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      type: e.target.value as unknown as EventType,
                    });
                  }}
                  defaultValue={EventType.CV_RECEIVED}
                >
                  {Object.entries(EventsDictionary).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="date"
                  className="text-sm font-medium text-white"
                >
                  Fecha
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  id="date"
                  className="block w-full px-3 py-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData?.date}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      date: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-white"
                >
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full px-3 py-2 text-base border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData?.description}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    });
                  }}
                ></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  /* onClick={async () => {
                    setSending(true);
                    await sendEvent({
                      ...formData,
                      ApplicationId: applicationId,
                    } as Event);
                    setSending(false);
                    setOpen(false);
                    window.location.reload();
                  }} */
                >
                  {sending ? 'Enviando...' : 'Añadir evento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
