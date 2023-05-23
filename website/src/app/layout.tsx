import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { AuthProvider } from '@/components/authContext';
import { GradientBackground } from '@/components/GradientBrackground';
import { BackgroundGrid } from '@/components/BackgroundGrid';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Infojobs hackathon',
  description:
    'Keep track of the companies you are applying to and get notifications about how they are going.',
};

export default function RootLayout({
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
      <body className={inter.className}>
        <GradientBackground />
        <BackgroundGrid />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
