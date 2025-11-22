import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SupportWidget } from '../ui/SupportWidget';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 ">{children}</main>
      <Footer />
      <SupportWidget />
    </div>
  );
}
