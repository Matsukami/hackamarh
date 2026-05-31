import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 font-dm-sans text-sm text-gray-600 md:flex-row">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <p className="font-semibold text-cerrado-profundo">Governo do Estado do Tocantins</p>
            <p>Secretaria do Meio Ambiente e Recursos Hídricos</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/editais" className="transition-colors hover:text-cerrado-profundo">
              Editais
            </Link>
            <Link href="/transparencia" className="transition-colors hover:text-cerrado-profundo">
              Transparência
            </Link>
            <Link href="/entrar" className="transition-colors hover:text-cerrado-profundo">
              Acesso
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} GAIA - Plataforma de Governança Climática do Tocantins.
          Programa JREDD+.
        </div>
      </div>
    </footer>
  );
}
