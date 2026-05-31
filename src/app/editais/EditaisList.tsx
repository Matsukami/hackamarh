'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { IconClock, IconCategory, IconFlame } from '@tabler/icons-react';

export default function EditaisList({ initialEditais }: { initialEditais: any[] }) {
  const [filtro, setFiltro] = useState<string>('Todos');

  const categorias = [
    'Todos',
    'Terras Indígenas',
    'Quilombolas',
    'Agricultores Familiares',
    'Fortalecimento Institucional',
  ];

  const editaisFiltrados = initialEditais.filter((edital) => {
    if (filtro === 'Todos') return true;
    // Map visual names to DB categories or partial match
    return edital.categoria?.toLowerCase().includes(filtro.toLowerCase().replace('s', ''));
  });

  const checkUrgencia = (dataEncerramento: string) => {
    if (!dataEncerramento) return false;
    const diff = new Date(dataEncerramento).getTime() - new Date().getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return days > 0 && days <= 7;
  };

  return (
    <div>
      {/* Filtros Responsivos */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              filtro === cat
                ? 'bg-areia-jalapao border border-mata-alta text-mata-alta'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-mata-alta hover:text-mata-alta'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Editais */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {editaisFiltrados.map((edital) => {
          const isUrgente = edital.status === 'Aberto' && checkUrgencia(edital.data_encerramento);

          return (
            <Card
              key={edital.id}
              className={`relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                isUrgente ? 'border-red-400 ring-1 ring-red-100' : 'border-gray-200'
              }`}
            >
              {/* Faixa lateral de status */}
              <div
                className={`absolute left-0 top-0 h-full w-1.5 ${
                  edital.status === 'Aberto'
                    ? 'bg-ouro-tocantins'
                    : edital.status === 'Em breve'
                      ? 'bg-gray-400'
                      : 'bg-red-500'
                }`}
              ></div>

              <CardHeader className="pb-4">
                <div className="mb-4 flex items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-700">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        edital.status === 'Aberto'
                          ? 'bg-cerrado-profundo animate-pulse'
                          : edital.status === 'Em breve'
                            ? 'bg-gray-400'
                            : 'bg-red-500'
                      }`}
                    ></span>
                    {edital.status}
                  </span>

                  {isUrgente && (
                    <span className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600 animate-in zoom-in">
                      <IconFlame size={14} className="animate-pulse" />
                      Encerra em &lt; 7 dias!
                    </span>
                  )}
                  {!isUrgente && edital.status === 'Aberto' && edital.data_encerramento && (
                    <span className="flex items-center gap-1 text-xs font-bold text-ouro-tocantins">
                      <IconClock size={14} />
                      Ativo
                    </span>
                  )}
                </div>
                <CardTitle className="mb-2 text-xl text-cerrado-profundo">{edital.titulo}</CardTitle>
                <CardDescription className="text-gray-600 line-clamp-3">
                  {edital.descricao}
                </CardDescription>
              </CardHeader>

              <CardContent className="mt-auto pb-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <IconCategory size={18} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Público-Alvo
                      </span>
                      <span className="font-bold">{edital.categoria}</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-50/50 pt-4 border-t border-gray-100">
                {edital.status === 'Aberto' ? (
                  <Link href={`/inscricao?edital=${edital.id}`} className="w-full">
                    <Button
                      variant="primary"
                      className={`w-full group ${
                        isUrgente
                          ? 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200'
                          : ''
                      }`}
                    >
                      <span>Iniciar inscrição</span>
                      <span className="ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                        &rarr;
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <Button variant="secondary" className="w-full" disabled>
                    Aguardando lançamento
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {editaisFiltrados.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-500">
          Nenhum edital encontrado para esta categoria.
        </div>
      )}
    </div>
  );
}
