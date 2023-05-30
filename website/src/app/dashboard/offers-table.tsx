import { columns, SavedOffer } from '@/components/tables/SavedOffers/columns';
import { DataTable } from '@/components/tables/SavedOffers/data-table';
import { SingleOffer } from 'types/infojobs/getOffer';

export async function OffersTable({
  offers,
}: {
  offers: {
    AlertId: string;
    UserId: string;
    OfferId: string;
    CreationDate: string;
  }[];
}) {
  const data: (SavedOffer | null)[] = await Promise.all(
    offers.map(async (offer) => {
      try {
        const offerData = (await fetch(
          `https://api.jobcompass.dev/offer/${offer.OfferId}`
        ).then((response) => response.json())) as SingleOffer;

        const response: SavedOffer = {
          id: offer.OfferId,
          applications: offerData.applications,
          company: offerData.profile.name,
          contractType: offerData.contractType.value,
          deleted: offerData.deleted,
          location: offerData.multiProvince
            ? 'Varias provincias'
            : offerData.province.value,
          maxSalary: offerData.maxPay?.amount ?? 0,
          minSalary: offerData.minPay?.amount ?? 0,
          period: offerData.minPay?.periodValue ?? 'Sin definir',
          title: offerData.title,
          vacancies: offerData.vacancies,
        };

        return response;
      } catch (e) {
        console.error(e);
        return null;
      }
    })
  );

  return (
    <DataTable<SavedOffer, string>
      columns={columns}
      // @ts-ignore
      data={data.filter(Boolean)}
    />
  );
}
