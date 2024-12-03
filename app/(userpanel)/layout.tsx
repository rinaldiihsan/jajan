import React from 'react';
import Navbar from '@/components/Layouts/Navbars/Navbars';
import Footer from '@/components/Layouts/Footer/Footer';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
