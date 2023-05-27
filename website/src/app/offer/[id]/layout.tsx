import { OfferStatusProvider } from "./context";

export const metadata = {
  title: "%s | JobCompass",
  description: "%s",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full lg:w-3/4 grid grid-cols-8 gap-5 justify-start mx-auto items-start p-10">
      <OfferStatusProvider>{children}</OfferStatusProvider>
    </main>
  );
}
