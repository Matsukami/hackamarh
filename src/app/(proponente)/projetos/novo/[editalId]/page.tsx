import { FormularioInscricao } from '@/components/forms/FormularioInscricao';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export const metadata = {
  title: 'Nova Inscrição | JREDD+ Tocantins',
};

export default function NovaInscricaoPage({ params }: { params: { editalId: string } }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-areia min-h-screen">
      <Link href="/editais" className="inline-flex items-center gap-2 text-cerrado hover:underline mb-8 font-semibold">
        <IconArrowLeft size={20} />
        Voltar para Editais
      </Link>
      
      <div className="text-center mb-10">
        <h1 className="text-hero text-cerrado mb-2">Inscrição de Projeto REDD+</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Preencha os dados com atenção. Este formulário possui validações automáticas (Hard-Stops) 
          que garantem o enquadramento do seu projeto nas salvaguardas socioambientais (Cancún).
        </p>
      </div>

      <FormularioInscricao editalId={params.editalId} />
    </div>
  );
}
