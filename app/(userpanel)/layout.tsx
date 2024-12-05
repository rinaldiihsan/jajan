'use client';

import React from 'react';
import Navbar from '@/components/Layouts/Navbars/Navbars';
import Footer from '@/components/Layouts/Footer/Footer';
import { Toaster } from '@/components/ui/toaster';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Toaster />
      <Footer />
    </div>
  );
}
