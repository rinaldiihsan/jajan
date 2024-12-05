'use client';

import { Toaster } from '@/components/ui/toaster';

// app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Toaster />
      <main>{children}</main>
    </div>
  );
}
