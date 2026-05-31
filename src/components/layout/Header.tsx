'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const cleanPath = path === '/avaliador/entrar' ? '/avaliador' : path;
    const isActive = pathname === path || (cleanPath !== '/' && pathname?.startsWith(cleanPath));
    
    return `rounded px-2 py-1 transition-colors focus:outline-none ${
      isActive
        ? 'text-buriti-vivo font-bold'
        : 'text-white/95 hover:text-buriti-vivo focus:text-buriti-vivo'
    }`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-mata-alta bg-cerrado-profundo text-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo Area */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded focus:outline-none focus:ring-4 focus:ring-mata-alta/25"
        >
          <Image
            src="/logo-gaia.png"
            alt="GAIA Logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-contain"
          />
          <span className="hidden font-sora text-xl font-bold tracking-tight sm:inline-block">
            GAIA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 font-dm-sans text-sm font-medium lg:flex">
          <Link
            href="/editais"
            className={getLinkClass('/editais')}
          >
            Mural de Editais
          </Link>
          <Link
            href="/painel"
            className={getLinkClass('/painel')}
          >
            Painel do Proponente
          </Link>
          <Link
            href="/descomplicador"
            className={getLinkClass('/descomplicador')}
          >
            Descomplicador
          </Link>
          <Link
            href="/avaliador/entrar"
            className={getLinkClass('/avaliador/entrar')}
          >
            Portal do Avaliador
          </Link>
          <Link
            href="/transparencia"
            className={getLinkClass('/transparencia')}
          >
            Portal de Transparência
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/entrar" tabIndex={-1}>
            <Button variant="primary" size="sm" className="hidden sm:flex">
              Entrar / Cadastrar
            </Button>
          </Link>
          {/* Mobile menu button (placeholder) */}
          <button className="rounded p-2 text-white hover:text-buriti-vivo focus:outline-none focus:ring-4 focus:ring-mata-alta/25 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
