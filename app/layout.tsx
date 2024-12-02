import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Layouts/Navbars/Navbars';
import Footer from '@/components/Layouts/Footer/Footer';

export const metadata: Metadata = {
  title: 'Jajan',
  description: 'Setiap Teguk, Setiap Cerita',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="flex flex-col min-h-screen overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
