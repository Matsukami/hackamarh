import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ProjetoDetalhePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/transparencia"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-mata-alta transition-colors hover:text-cerrado-profundo"
      >
        <IconArrowLeft size={16} />
        Voltar para o Portal da Transparência
      </Link>

      <Card className="overflow-hidden border-gray-200">
        <div className="flex h-48 w-full items-center justify-center bg-gray-100">
          <span className="font-sora font-bold uppercase tracking-widest text-gray-400">
            Imagem do Projeto
          </span>
        </div>
        <CardContent className="p-8">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded bg-gray-100 px-2 py-1 text-xs font-bold text-gray-700">
            ID: {params.id}
          </div>
          <h1 className="mb-4 font-sora text-3xl font-bold text-cerrado-profundo">
            Detalhes do Projeto
          </h1>
          <p className="mb-6 font-dm-sans text-gray-600">
            Esta página está em construção. Aqui serão exibidos todos os detalhes, metas e
            indicadores financeiros específicos do projeto JREDD+ selecionado.
          </p>
          <div className="my-8 h-px w-full bg-gray-200"></div>
          <p className="font-dm-sans text-sm text-gray-500">
            Volte para o mapa interativo para explorar mais projetos da região.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
