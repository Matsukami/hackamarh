import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-mata-alta bg-cerrado-profundo text-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo Area */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded focus:outline-none focus:ring-4 focus:ring-mata-alta/25"
        >
          {/* Logo Ícone (Árvore Geométrica estilizada - placeholder SVG) */}
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-buriti-vivo">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-cerrado-profundo"
            >
              <path d="M12 21v-6M9 15c-2.5 0-4-1.5-4-4s1.5-4 4-4v8zM15 15c2.5 0 4-1.5 4-4s-1.5-4-4-4v8zM12 7c-2.5 0-4-1.5-4-4s1.5-4 4-4 4 1.5 4 4-1.5 4-4 4z" />
            </svg>
          </div>
          <span className="hidden font-sora text-xl font-bold tracking-tight sm:inline-block">
            GAIA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 font-dm-sans text-sm font-medium md:flex">
          <Link
            href="/editais"
            className="rounded px-2 py-1 transition-colors hover:text-buriti-vivo focus:text-buriti-vivo focus:outline-none"
          >
            Mural de Editais
          </Link>
          <Link
            href="/avaliador"
            className="rounded px-2 py-1 transition-colors hover:text-buriti-vivo focus:text-buriti-vivo focus:outline-none"
          >
            Portal do Avaliador
          </Link>
          <Link
            href="/transparencia"
            className="rounded px-2 py-1 transition-colors hover:text-buriti-vivo focus:text-buriti-vivo focus:outline-none"
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
