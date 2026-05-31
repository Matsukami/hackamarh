import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { IconClock, IconCategory, IconCash } from '@tabler/icons-react';

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
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="mb-4 font-sora text-4xl font-bold text-cerrado-profundo">
          Mural de Editais
        </h1>
        <p className="max-w-2xl font-dm-sans text-lg text-gray-700">
          Explore as oportunidades ativas de financiamento para projetos de desenvolvimento
          ecológico e sustentável no estado do Tocantins.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <button className="rounded-full border border-mata-alta bg-areia-jalapao px-4 py-2 text-sm font-bold text-mata-alta">
          Todos
        </button>
        <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 hover:border-mata-alta hover:text-mata-alta">
          Terra Indígena
        </button>
        <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 hover:border-mata-alta hover:text-mata-alta">
          Quilombola
        </button>
        <button className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 hover:border-mata-alta hover:text-mata-alta">
          Agricultura Familiar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayEditais.map((edital) => (
          <Card
            key={edital.id}
            className="relative flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg"
          >
            <div
              className={`absolute left-0 top-0 h-full w-1 ${edital.status === 'Aberto' ? 'bg-ouro-tocantins' : edital.status === 'Em breve' ? 'bg-gray-400' : 'bg-red-500'}`}
            ></div>
            <CardHeader className="pb-4">
              <div className="mb-4 flex items-start justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-700">
                  <span
                    className={`h-2 w-2 rounded-full ${edital.status === 'Aberto' ? 'bg-cerrado-profundo' : edital.status === 'Em breve' ? 'bg-gray-400' : 'bg-red-500'}`}
                  ></span>
                  {edital.status}
                </span>
                {edital.status === 'Aberto' && edital.data_encerramento && (
                  <span className="flex items-center gap-1 text-xs font-bold text-ouro-tocantins">
                    <IconClock size={14} />
                    Encerra em breve
                  </span>
                )}
              </div>
              <CardTitle className="mb-2 text-xl text-cerrado-profundo">{edital.titulo}</CardTitle>
              <CardDescription className="text-gray-600">{edital.descricao}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pb-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <IconCategory size={18} className="text-gray-400" />
                  <span className="font-bold">Categoria:</span>
                  <span>{edital.categoria}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {edital.status === 'Aberto' ? (
                <Link href={`/inscricao?edital=${edital.id}`} className="w-full">
                  <Button variant="primary" className="w-full">
                    Iniciar inscrição
                  </Button>
                </Link>
              ) : (
                <Button variant="secondary" className="w-full" disabled>
                  Aguardando lançamento
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
