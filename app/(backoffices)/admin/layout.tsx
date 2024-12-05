'use client';

import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ModeToggle } from '@/components/mode-toggle';
import { Separator } from '@/components/ui/separator';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="antialiased">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
              <SidebarTrigger className="-ml-1" />
              <ModeToggle />
            </header>
            <main className="p-8">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </ThemeProvider>
    </div>
  );
}
