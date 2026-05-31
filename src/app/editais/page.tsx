import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import EditaisList from './EditaisList';

export const revalidate = 0; // Disable cache for MVP

export default async function EditaisPage() {
  const supabase = createClient();

  // Fetch editais from Supabase
  const { data: editais, error } = await supabase
    .from('editais')
    .select('*')
    .order('created_at', { ascending: false });

  // If there's an error or no data, we'll show mock data for the MVP presentation
  const mockEditais = [
    {
      id: 'mock-1',
      titulo: 'Edital JREDD+ Resiliência Indígena 2024',
      descricao:
        'Apoio a projetos de monitoramento territorial e bioeconomia em terras indígenas demarcadas.',
      categoria: 'Terras Indígenas',
      status: 'Aberto',
      data_encerramento: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'mock-2',
      titulo: 'Fomento Agroflorestal Familiar',
      descricao:
        'Implantação de sistemas agroflorestais para pequenos produtores e cooperativas locais.',
      categoria: 'Agricultores Familiares',
      status: 'Aberto',
      data_encerramento: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'mock-3',
      titulo: 'Preservação Hídrica Quilombola',
      descricao: 'Recuperação de nascentes e matas ciliares em territórios quilombolas do estado.',
      categoria: 'Quilombolas',
      status: 'Em breve',
      data_abertura: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const displayEditais = editais && editais.length > 0 ? editais : mockEditais;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 text-center md:text-left">
        <h1 className="mb-4 font-sora text-4xl font-bold text-cerrado-profundo">
          Mural de Editais
        </h1>
        <p className="max-w-2xl font-dm-sans text-lg text-gray-700 mx-auto md:mx-0">
          Explore as oportunidades ativas de financiamento para projetos de desenvolvimento ecológico e sustentável no estado do Tocantins.
        </p>
      </div>

      <EditaisList initialEditais={displayEditais} />
    </div>
  );
}
