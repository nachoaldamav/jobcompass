import type { Session } from 'next-auth';
import type { SingleOffer } from '../../../../types/infojobs/getOffer';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { CollapsibleText } from '@/components/CollapsibleText';
import { Card } from '@/components/SimpleCard';
import { Salary } from '@/components/SalaryInfo';

type OfferPageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: OfferPageProps) {
  const session = (await getServerSession(authOptions)) as Session;
  const offer: SingleOffer = await fetch(
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
          className="rounded-xl"
        />
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-2xl font-bold">{offer.title}</h1>
          <h2 className="text-xl">{offer.profile.name}</h2>
        </div>
      </header>
      <section className="flex flex-row justify-start items-center w-full mt-4 gap-2">
        <Card
          header={<h3 className="text-3xl font-bold">{offer.vacancies}</h3>}
          footer={
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-green-300"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Vacantes</p>
            </>
          }
        />
        <Card
          header={
            <h3 className="text-3xl font-bold">
              {offer.salaryDescription.includes('€') ? (
                <Salary
                  maxPay={offer.maxPay}
                  minPay={offer.minPay}
                  salaryDescription={offer.salaryDescription}
                  className="text-3xl"
                />
              ) : (
                <p>{offer.salaryDescription}</p>
              )}
            </h3>
          }
          footer={
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-red-400"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.902 7.098a3.75 3.75 0 013.903-.884.75.75 0 10.498-1.415A5.25 5.25 0 008.005 9.75H7.5a.75.75 0 000 1.5h.054a5.281 5.281 0 000 1.5H7.5a.75.75 0 000 1.5h.505a5.25 5.25 0 006.494 2.701.75.75 0 00-.498-1.415 3.75 3.75 0 01-4.252-1.286h3.001a.75.75 0 000-1.5H9.075a3.77 3.77 0 010-1.5h3.675a.75.75 0 000-1.5h-3c.105-.14.221-.274.348-.402z"
                  clipRule="evenodd"
                />
              </svg>

              <h3>Salario</h3>
            </>
          }
        />
        <Card
          header={
            <h3 className="text-2xl font-bold">
              {offer.multiProvince ? 'Varias provincias' : offer.province.value}
            </h3>
          }
          footer={
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-blue-300"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <h3>Localización</h3>
            </>
          }
        />
        <Card
          header={
            <h3 className="text-2xl font-bold">{offer.contractType.value}</h3>
          }
          footer={
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-yellow-300"
              >
                <path
                  fillRule="evenodd"
                  d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z"
                  clipRule="evenodd"
                />
              </svg>

              <p>Tipo de contrato</p>
            </>
          }
        />
      </section>
      <article className="flex flex-col justify-start items-start w-full rounded-xl border border-gray-500/20 bg-gray-800/20 z-[999] mt-4">
        <h3 className="text-xl font-bold p-4">Descripción</h3>
        <CollapsibleText
          text={offer.description}
          className="text-lg p-4 font-light w-full"
          maxLength={400}
        />
      </article>
      {offer.minRequirements && (
        <article className="flex flex-col justify-start items-start w-full rounded-xl border border-gray-500/20 bg-gray-800/20 z-[999] mt-4">
          <h3 className="text-xl font-bold p-4">Requisitos mínimos</h3>
          <CollapsibleText
            text={offer.minRequirements}
            className="text-lg p-4 font-light w-full"
            maxLength={400}
          />
        </article>
      )}
    </main>
  );
}
