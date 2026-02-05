'use client';

import { Header } from './Header';
import type { UserRole } from '@/types';

interface PageLayoutProps {
  children: React.ReactNode;
  userId: string;
  role: UserRole;
}

export function PageLayout({ children, userId, role }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userId={userId} role={role} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
