'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  IconLayoutKanban,
  IconFileAnalytics,
  IconUsers,
  IconSearch,
  IconBell,
  IconSettings,
} from '@tabler/icons-react';

const sidebarItems = [
  { href: '/avaliador/kanban', label: 'Kanban de Projetos', icon: IconLayoutKanban },
  { href: '/avaliador/validacao', label: 'Validação de Contas', icon: IconFileAnalytics },
  { href: '#', label: 'Especialistas', icon: IconUsers },
];

export default function AvaliadorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show the layout wrapper on the login page
  if (pathname === '/avaliador/entrar') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden w-[240px] shrink-0 flex-col border-r border-gray-200 bg-white lg:flex">
        <nav className="flex flex-col gap-1 p-4">
          {sidebarItems.map((item) => {
            const isActive = pathname.startsWith(item.href) && item.href !== '#';
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cerrado-profundo text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
