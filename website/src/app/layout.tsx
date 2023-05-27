import "./globals.css";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { AuthProvider } from "@/components/authContext";
import { GradientBackground } from "@/components/GradientBrackground";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "sonner"

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Infojobs hackathon",
  description:
    "Keep track of the companies you are applying to and get notifications about how they are going.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Infojobs hackathon</title>
        <meta
          name="description"
          content="Keep track of the companies you are applying to and get notifications about how they are going."
        />
      </Head>
      <body className={montserrat.className}>
        <GradientBackground />
        <BackgroundGrid />
        <AuthProvider>
          {/* @ts-expect-error */}
          <Navbar />
          <div className="pt-10 z-50">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
