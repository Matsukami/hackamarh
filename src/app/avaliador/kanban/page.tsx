'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  IconFilter,
  IconCalendar,
  IconCheck,
  IconAlertTriangle,
  IconMessage,
  IconSparkles,
  IconGripVertical,
  IconArchive,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

type Status = 'recebidos' | 'em_analise' | 'pendencia' | 'aprovados' | 'encerrados';

type Projeto = {
  id: string;
  titulo: string;
  categoria: string;
  categoriaColor: string;
  status: Status;
  proponente: string;
  dataEntrada: string;
  prazo?: string;
  prazoRestante?: string;
  score?: number;
  progresso?: number;
  pendencia?: string;
  sugestaoFiscal?: { nome: string; iniciais: string; compatibilidade: number };
  mensagensNaoLidas?: number;
  edital: string;
};

const initialProjetos: Projeto[] = [
  {
    id: 'PRJ-092',
    titulo: 'Restauração de Nascentes Bacia Tocantins',
    categoria: 'CONSERVAÇÃO',
    categoriaColor: 'bg-mata-alta/10 text-mata-alta',
    status: 'recebidos',
    proponente: 'Mariana Costa',
    dataEntrada: 'Hoje',
    score: 86,
    edital: 'Edital FUNCLIMA 01/2024',
    sugestaoFiscal: { nome: 'Mariana Costa', iniciais: 'MC', compatibilidade: 98 },
  },
  {
    id: 'PRJ-091',
    titulo: 'Manejo Sustentável de Babaçu — Comunidade Apinajé',
    categoria: 'IMPLEMENTAÇÃO',
    categoriaColor: 'bg-buriti-vivo/20 text-cerrado-profundo',
    status: 'recebidos',
    proponente: 'Cacique Raoni J.',
    dataEntrada: 'Ontem',
    score: 72,
    edital: 'Edital FUNCLIMA 01/2024',
    sugestaoFiscal: { nome: 'Dr. Paulo Silva', iniciais: 'PS', compatibilidade: 91 },
  },
  {
    id: 'PRJ-090',
    titulo: 'Proteção de APP Rio Formoso',
    categoria: 'CONSERVAÇÃO',
    categoriaColor: 'bg-mata-alta/10 text-mata-alta',
    status: 'recebidos',
    proponente: 'ONG CerradoVivo',
    dataEntrada: '28/05',
    score: 64,
    edital: 'Edital FUNCLIMA 02/2024',
  },
  {
    id: 'PRJ-084',
    titulo: 'Levantamento Florístico Jalapão Leste',
    categoria: 'PESQUISA',
    categoriaColor: 'bg-blue-100 text-blue-700',
    status: 'em_analise',
    proponente: 'Roberto L.',
    dataEntrada: '20/05',
    prazo: '12 Out',
    progresso: 65,
    score: 79,
    edital: 'Edital FUNCLIMA 01/2024',
    mensagensNaoLidas: 2,
  },
  {
    id: 'PRJ-083',
    titulo: 'Corredor Ecológico Araguaia-Tocantins',
    categoria: 'CONSERVAÇÃO',
    categoriaColor: 'bg-mata-alta/10 text-mata-alta',
    status: 'em_analise',
    proponente: 'Assoc. Quilombola Kalunga',
    dataEntrada: '18/05',
    prazo: '05 Out',
    progresso: 40,
    score: 88,
    edital: 'Edital FUNCLIMA 02/2024',
  },
  {
    id: 'PRJ-075',
    titulo: 'Capacitação Agroflorestal Comunidade Kalunga',
    categoria: 'IMPLEMENTAÇÃO',
    categoriaColor: 'bg-buriti-vivo/20 text-cerrado-profundo',
    status: 'pendencia',
    proponente: 'Ana Silva',
    dataEntrada: '10/05',
    prazoRestante: '2h Restantes',
    pendencia: 'Aguardando certidão negativa de débitos.',
    edital: 'Edital FUNCLIMA 01/2024',
    mensagensNaoLidas: 1,
  },
  {
    id: 'PRJ-061',
    titulo: 'Monitoramento Fauna Silvestre Serra Geral',
    categoria: 'CONSERVAÇÃO',
    categoriaColor: 'bg-mata-alta/10 text-mata-alta',
    status: 'aprovados',
    proponente: 'Carlos Souza',
    dataEntrada: '01/04',
    score: 92,
    edital: 'Edital FUNCLIMA 01/2024',
  },
  {
    id: 'PRJ-055',
    titulo: 'Reflorestamento Nascentes Rio Sono',
    categoria: 'IMPLEMENTAÇÃO',
    categoriaColor: 'bg-buriti-vivo/20 text-cerrado-profundo',
    status: 'aprovados',
    proponente: 'Cooperativa AgroVerde',
    dataEntrada: '15/03',
    score: 95,
    edital: 'Edital FUNCLIMA 01/2024',
  },
  {
    id: 'PRJ-042',
    titulo: 'Inventário Carbono Florestal Bico do Papagaio',
    categoria: 'PESQUISA',
    categoriaColor: 'bg-blue-100 text-blue-700',
    status: 'encerrados',
    proponente: 'UFT - Dept. Ecologia',
    dataEntrada: '01/01',
    score: 90,
    edital: 'Edital FUNCLIMA 01/2023',
  },
];

const columns: { title: string; status: Status; dotColor: string }[] = [
  { title: 'Recebidos', status: 'recebidos', dotColor: 'bg-gray-400' },
  { title: 'Em Análise', status: 'em_analise', dotColor: 'bg-mata-alta' },
  { title: 'Com Pendência', status: 'pendencia', dotColor: 'bg-ouro-tocantins' },
  { title: 'Aprovados', status: 'aprovados', dotColor: 'bg-buriti-vivo' },
  { title: 'Encerrados', status: 'encerrados', dotColor: 'bg-gray-600' },
];

export default function AvaliadorKanbanPage() {
  const [projetos, setProjetos] = useState<Projeto[]>(initialProjetos);
  const router = useRouter();

  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  const onDrop = (e: React.DragEvent, status: Status) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    setProjetos((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const renderCard = (p: Projeto) => (
    <div
      key={p.id}
      draggable
      onDragStart={(e) => onDragStart(e, p.id)}
      onClick={() => router.push(`/avaliador/proposta/${p.id}`)}
      className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing"
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <span
          className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${p.categoriaColor}`}
        >
          {p.categoria}
        </span>
        <div className="flex items-center gap-2">
          {p.mensagensNaoLidas && (
            <span className="flex items-center gap-1 rounded-full bg-buriti-vivo px-1.5 py-0.5 text-[10px] font-bold text-cerrado-profundo">
              <IconMessage size={10} /> {p.mensagensNaoLidas}
            </span>
          )}
          <span className="text-[10px] text-gray-400">#{p.id}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-sm font-bold leading-snug text-cerrado-profundo transition-colors group-hover:text-mata-alta">
        {p.titulo}
      </h3>

      {/* Sugestão IA (only for recebidos) */}
      {p.sugestaoFiscal && p.status === 'recebidos' && (
        <div className="mb-3 rounded-lg border border-gray-100 bg-gray-50 p-2.5">
          <p className="mb-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <IconSparkles size={12} /> Sugestão de Atribuição (IA)
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cerrado-profundo text-[10px] font-bold text-white">
                {p.sugestaoFiscal.iniciais}
              </div>
              <span className="text-xs font-bold text-gray-700">{p.sugestaoFiscal.nome}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="rounded-md bg-cerrado-profundo px-2.5 py-1 text-[10px] font-bold text-white transition-colors hover:bg-mata-alta"
            >
              Atribuir
            </button>
          </div>
          <p className="mt-1.5 flex items-center gap-1 text-[10px] text-mata-alta">
            <IconCheck size={12} /> {p.sugestaoFiscal.compatibilidade}% compatibilidade
          </p>
        </div>
      )}

      {/* Progress bar (Em Análise) */}
      {p.progresso !== undefined && p.status === 'em_analise' && (
        <div className="mb-3">
          <div className="mb-1 flex justify-between text-[10px] font-bold text-gray-500">
            <span>Progresso da Análise</span>
            <span>{p.progresso}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-cerrado-profundo transition-all"
              style={{ width: `${p.progresso}%` }}
            />
          </div>
        </div>
      )}

      {/* Pendencia alert */}
      {p.pendencia && p.status === 'pendencia' && (
        <div className="mb-3 flex items-start gap-2 rounded-lg border border-orange-100 bg-orange-50 p-2">
          <IconAlertTriangle size={14} className="mt-0.5 shrink-0 text-orange-600" />
          <p className="text-[11px] text-orange-800">{p.pendencia}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-end justify-between border-t border-gray-100 pt-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cerrado-profundo text-[9px] font-bold text-white">
            {p.proponente.substring(0, 2).toUpperCase()}
          </div>
          <span className="text-[11px] font-bold text-gray-700">{p.proponente}</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          {p.prazoRestante && (
            <span className="flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
              <IconAlertTriangle size={10} /> {p.prazoRestante}
            </span>
          )}
          {p.score && !p.prazoRestante && (
            <span className="text-[10px] font-bold text-mata-alta">Score: {p.score}/100</span>
          )}
          <span className="flex items-center gap-1 text-[10px] text-gray-400">
            <IconCalendar size={10} /> {p.dataEntrada}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col">
      {/* Filters Header */}
      <div className="shrink-0 border-b border-gray-200 bg-white px-6 py-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-sora text-2xl font-bold text-cerrado-profundo">
            Monitoramento de Editais
          </h1>
          <Button variant="primary" className="h-9 gap-2 px-4 text-xs font-bold">
            + Novo Filtro
          </Button>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div className="relative min-w-[180px] flex-1">
            <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] font-bold text-gray-500">
              Edital
            </label>
            <select className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 font-dm-sans text-sm text-gray-800 outline-none focus:border-mata-alta focus:ring-1 focus:ring-mata-alta">
              <option>Todos os Editais (2024)</option>
              <option>FUNCLIMA 01/2024</option>
              <option>FUNCLIMA 02/2024</option>
            </select>
          </div>
          <div className="relative min-w-[140px] flex-1">
            <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] font-bold text-gray-500">
              Categoria
            </label>
            <select className="w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 font-dm-sans text-sm text-gray-800 outline-none focus:border-mata-alta focus:ring-1 focus:ring-mata-alta">
              <option>Todas</option>
              <option>Conservação</option>
              <option>Implementação</option>
              <option>Pesquisa</option>
            </select>
          </div>
          <div className="relative min-w-[140px] flex-1">
            <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] font-bold text-gray-500">
              Fiscal
            </label>
            <input
              type="text"
              placeholder="Nome do fiscal..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 font-dm-sans text-sm text-gray-800 outline-none focus:border-mata-alta focus:ring-1 focus:ring-mata-alta"
            />
          </div>
          <div className="relative min-w-[140px] flex-1">
            <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] font-bold text-gray-500">
              Data Limite
            </label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 font-dm-sans text-sm text-gray-800 outline-none focus:border-mata-alta focus:ring-1 focus:ring-mata-alta"
            />
          </div>
          <Button variant="secondary" className="h-[38px] border-gray-300 px-3">
            <IconFilter size={16} className="text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
        <div className="flex h-full min-w-max items-start gap-4">
          {columns.map((col) => {
            const items = projetos.filter((p) => p.status === col.status);
            return (
              <div
                key={col.status}
                className="flex h-full w-[300px] shrink-0 flex-col rounded-xl border border-gray-200 bg-gray-100/50"
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, col.status)}
              >
                <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-100 px-4 py-3">
                  <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600">
                    <span className={`h-2.5 w-2.5 rounded-full ${col.dotColor}`} />
                    {col.title}
                    <span className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold text-gray-800 shadow-sm">
                      {items.length}
                    </span>
                  </h2>
                </div>
                <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-3 pb-10">
                  {items.map(renderCard)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
