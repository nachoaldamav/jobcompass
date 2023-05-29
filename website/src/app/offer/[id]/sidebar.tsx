import { Card } from '@/components/SimpleCard';
import type { SingleOffer } from 'types/infojobs/getOffer';
import { Salary } from '@/components/SalaryInfo';
import { SinglePerson } from '@/components/icons/SinglePerson';
import { PaperClip } from '@/components/icons/PaperClip';
import { MapPin } from '@/components/icons/MapPin';
import { ManyPersons } from '@/components/icons/ManyPersons';
import { EuroCoin } from '@/components/icons/EuroCoin';
import { StatusUpdates } from '@/components/statusUpdates';
import { BoltIcon } from '@/components/icons/BoltIcon';
import { ApplyCard } from '@/components/ApplyCard';

export function Sidebar({ offer }: { offer: SingleOffer }) {
  return (
    <aside className="flex flex-col justify-start items-start gap-4 w-full col-span-2">
      <ApplyCard offerId={offer.id} />
      <Card
        header={<h3 className="text-2xl font-bold">{offer.vacancies}</h3>}
        footer={
          <>
            <SinglePerson />
            <p>Vacantes</p>
            <StatusUpdates statusKey="vacancies" />
          </>
        }
      />
      <Card
        header={<h3 className="text-2xl font-bold">{offer.applications}</h3>}
        footer={
          <>
            <ManyPersons />
            <p>Solicitudes</p>
            <StatusUpdates statusKey="candidates" />
          </>
        }
      />
      <Card
        header={
          <h3 className="text-xl font-bold">
            {offer.salaryDescription.includes('€') &&
            !offer.salaryDescription.includes('Más de') ? (
              <Salary
                maxPay={offer.maxPay}
                minPay={offer.minPay}
                salaryDescription={offer.salaryDescription}
                className=""
              />
            ) : (
              <p>{offer.salaryDescription}</p>
            )}
          </h3>
        }
        footer={
          <>
            <EuroCoin />
            <h3>Salario</h3>
          </>
        }
      />
      <Card
        header={
          <h3 className="text-xl font-bold">{offer.hasKillerQuestions}</h3>
        }
        footer={
          <>
            <BoltIcon />
            <p>Preguntas Decisivas</p>
          </>
        }
      />
      <Card
        header={
          <h3 className="text-xl font-bold">
            {offer.multiProvince ? 'Varias provincias' : offer.province.value}
          </h3>
        }
        footer={
          <>
            <MapPin />
            <h3>Localización</h3>
          </>
        }
      />
      <Card
        header={
          <h3 className="text-xl font-bold">{offer.contractType.value}</h3>
        }
        footer={
          <>
            <PaperClip />
            <p>Tipo de contrato</p>
          </>
        }
      />
    </aside>
  );
}
