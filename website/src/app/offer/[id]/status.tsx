'use client';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

type OfferStatus = {
  id: string;
  updates: string[];
  candidates: number[];
  maxSalary: number[];
  minSalary: number[];
  vacancies: number[];
  active: boolean[];
  updated: string[];
  killerQuestions: number[];
  openQuestions: number[];
};

export function OfferStatus({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [offerStatus, setOfferStatus] = useState<OfferStatus>(
    {} as OfferStatus
  );

  useEffect(() => {
    fetch(`https://api.jobcompass.dev/offer-updates/${id}`)
      .then((res) => res.json())
      .then((data) => setOfferStatus(data))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <section className="flex flex-col justify-start items-start w-full rounded-xl border border-gray-500/20 bg-gray-800/20 z-[999] mt-4 p-4">
      <h3 className="text-xl font-bold">Actualizaciones</h3>
      {loading && (
        <div className="flex flex-col justify-start items-start w-full">
          Cargando...
        </div>
      )}
      {!loading && offerStatus.updates?.length === 0 && (
        <div className="flex flex-col justify-start items-start w-full">
          No hay actualizaciones
        </div>
      )}
      {!loading && offerStatus.updates?.length > 0 && (
        <div className="flex flex-col justify-start items-start w-full">
          <hr className="w-full border-gray-500/20 my-1" />
          <h3 className="text-sm text-gray-400">Candidatos</h3>
          <Chart
            className="w-full"
            options={{
              chart: {
                id: 'basic-bar',
                toolbar: {
                  show: false,
                },
                fontFamily: '__Montserrat_656221',
                background: 'transparent',
                animations: {
                  enabled: false,
                },
                selection: {
                  enabled: false,
                },
              },
              theme: {
                mode: 'dark',
              },
              stroke: {
                curve: 'smooth',
                width: 5,
              },
              dataLabels: {
                enabled: false,
              },
              grid: {
                show: false,
              },
              legend: {
                show: false,
              },
              yaxis: {
                show: false,
              },
              fill: {
                colors: ['#4d07e3'],
              },
              xaxis: {
                categories: offerStatus.updates.map((update) =>
                  new Date(update).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })
                ),
              },
            }}
            series={[
              {
                name: 'Candidatos',
                data: [...offerStatus.candidates],
              },
            ]}
            type="line"
            width="100%"
            height="400px"
          />
        </div>
      )}
    </section>
  );
}
