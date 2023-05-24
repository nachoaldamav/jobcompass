import Image from 'next/image';
import { Offer } from '../../../../types/infojobs/getOffers';
import { CollapsibleText } from '@/components/CollapsibleText';
import { Card } from '@/components/SimpleCard';

type OfferPageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: OfferPageProps) {
  const offer: Offer = await fetch(
    `https://api.jobcompass.dev/offer/${params.id}`
  ).then((res) => res.json());

  if (!offer) {
    return <div>Offer not found</div>;
  }

  return (
    <main className="min-h-screen w-full lg:w-3/4 flex flex-col justify-start mx-auto items-center p-10 z-50">
      <header className="flex flex-row justify-start gap-4 items-center w-full rounded-xl p-4 border border-gray-500/20 bg-gray-800/40">
        <Image
          src={offer.profile.logoUrl || '/infojobs.png'}
          alt={offer.profile.name}
          width={60}
          height={60}
        />
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-2xl font-bold">{offer.title}</h1>
          <h2 className="text-xl">{offer.profile.name}</h2>
        </div>
      </header>
      {/* show here, in cards, some info as the vacancies, the salary range, location and the contract type */}
      <section className="flex flex-row justify-start items-center w-full mt-4 gap-2">
        <Card>
          <header className="flex flex-row justify-start items-center gap-2">
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <h3 className="text-xl font-bold">Vacantes</h3>
          </header>
          <p className="text-lg">{offer.vacancies}</p>
        </Card>
        <Card>
          <header className="flex flex-row justify-start items-center gap-2">
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
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
            <h3 className="text-xl font-bold">Salario</h3>
          </header>
          <p className="text-lg">{offer.salaryDescription}</p>
        </Card>
        <Card>
          <header className="flex flex-row justify-start items-center gap-2">
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
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <h3 className="text-xl font-bold">
              {offer.multiProvince ? 'Provincias' : 'Provincia'}
            </h3>
          </header>
          <p className="text-lg">
            {offer.multiProvince ? 'Varias' : offer.province.value}
          </p>
        </Card>
        <Card>
          <header className="flex flex-row justify-start items-center gap-2">
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
                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
              />
            </svg>
            <h3 className="text-xl font-bold">Tipo de contrato</h3>
          </header>
          <p className="text-lg">{offer.contractType.value}</p>
        </Card>
      </section>
      <article className="flex flex-col justify-start items-start w-full rounded-xl border border-gray-500/20 bg-gray-800/20 z-[999] mt-4">
        <h3 className="text-xl font-bold p-4">Descripción</h3>
        <CollapsibleText
          text={offer.description}
          className="text-lg p-4 font-light"
          maxLength={400}
        />
      </article>
    </main>
  );
}
