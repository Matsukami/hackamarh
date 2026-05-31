'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  IconSearch,
  IconFilter,
  IconCalendar,
  IconCheck,
  IconClock,
  IconAlertTriangle,
} from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Status = 'recebidos' | 'em_analise' | 'pendencia' | 'aprovados';

type Projeto = {
  id: string;
  titulo: string;
  categoria: string;
  status: Status;
  proponente: string;
  dataEntrada?: string;
  prazo?: string;
  nota?: number;
};

const initialProjetos: Projeto[] = [
  {
    id: 'PRJ-092',
    titulo: 'Restauração de Nascentes Bacia Tocantins',
    categoria: 'Conservação',
    status: 'recebidos',
    proponente: 'Mariana Costa',
    dataEntrada: 'Hoje',
  },
  {
    id: 'PRJ-084',
    titulo: 'Levantamento Florístico Jalapão Leste',
    categoria: 'Pesquisa',
    status: 'em_analise',
    proponente: 'Roberto L.',
    prazo: '12 Out',
  },
  {
    id: 'PRJ-075',
    titulo: 'Capacitação Agroflorestal Comunidade Kalunga',
    categoria: 'Implementação',
    status: 'pendencia',
    proponente: 'Ana Silva',
    prazo: 'Hoje',
  },
  {
    id: 'PRJ-061',
    titulo: 'Monitoramento Fauna Silvestre',
    categoria: 'Conservação',
    status: 'aprovados',
    proponente: 'Carlos Souza',
    nota: 9.8,
  },
];

export default function AvaliadorKanbanPage() {
  const [projetos, setProjetos] = useState<Projeto[]>(initialProjetos);

  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent, status: Status) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    setProjetos((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const renderColumn = (title: string, status: Status, count: number, dotColor: string) => (
    <div
      className="flex max-h-full w-[320px] shrink-0 flex-col rounded-lg border border-gray-200 bg-gray-100/50"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-lg border-b border-gray-200 bg-gray-100 p-3">
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600">
          <span className={`h-2 w-2 rounded-full ${dotColor}`}></span>
          {title}
          <span className="rounded bg-white px-1.5 py-0.5 text-[10px] text-gray-800 shadow-sm">
            {count}
          </span>
        </h2>
      </div>
      <div className="flex h-[calc(100vh-250px)] flex-1 flex-col gap-3 overflow-y-auto p-3 pb-10">
        {projetos
          .filter((p) => p.status === status)
          .map((p) => (
            <div
              key={p.id}
              draggable
              onDragStart={(e) => onDragStart(e, p.id)}
              className="cursor-grab rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-transform hover:-translate-y-0.5 active:cursor-grabbing"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <span className="rounded bg-mata-alta/10 px-2 py-0.5 text-[10px] font-bold uppercase text-mata-alta">
                  {p.categoria}
                </span>
                <span className="text-[10px] text-gray-500">#{p.id}</span>
              </div>
              <h3 className="mb-3 text-sm font-bold leading-snug text-cerrado-profundo">
                {p.titulo}
              </h3>
              <div className="flex items-end justify-between border-t border-gray-100 pt-2">
                <div className="flex items-center gap-1 text-gray-500">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cerrado-profundo text-[10px] font-bold text-white">
                    {p.proponente.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[11px] font-bold">{p.proponente}</span>
                </div>
                {p.prazo && (
                  <span
                    className={`text-[10px] font-bold ${p.status === 'pendencia' ? 'text-red-600' : 'text-gray-500'}`}
                  >
                    {status === 'pendencia' ? 'Vence Hoje' : `Prazo: ${p.prazo}`}
                  </span>
                )}
                {p.dataEntrada && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                    <IconCalendar size={12} /> {p.dataEntrada}
                  </span>
                )}
                {p.nota && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-mata-alta">
                    <IconCheck size={12} /> Nota: {p.nota}
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Filters Header */}
      <div className="shrink-0 border-b border-gray-200 bg-white px-8 py-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-sora text-2xl font-bold text-cerrado-profundo">
            Monitoramento de Editais
          </h1>
          <Button variant="primary" className="h-9 gap-2 px-4 text-xs font-bold">
            Novo Filtro
          </Button>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <div className="relative min-w-[200px] flex-1">
            <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] font-bold text-gray-500">
              Edital
            </label>
            <select className="w-full appearance-none rounded border border-gray-300 px-3 py-2 font-dm-sans text-sm text-gray-800 outline-none focus:border-mata-alta focus:ring-1 focus:ring-mata-alta">
              <option>Todos os Editais (2024)</option>
              <option>Conservação Cerrado</option>
            </select>
          </div>
          <div className="relative min-w-[150px] flex-1">
            <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] font-bold text-gray-500">
              Categoria
            </label>
            <select className="w-full appearance-none rounded border border-gray-300 px-3 py-2 font-dm-sans text-sm text-gray-800 outline-none focus:border-mata-alta focus:ring-1 focus:ring-mata-alta">
              <option>Todas</option>
              <option>Pesquisa</option>
            </select>
          </div>
          <div className="relative min-w-[150px] flex-1">
            <label className="absolute -top-2 left-2 bg-white px-1 text-[11px] font-bold text-gray-500">
              Fiscal
            </label>
            <input
              type="text"
              placeholder="Nome..."
              className="w-full rounded border border-gray-300 px-3 py-2 font-dm-sans text-sm text-gray-800 outline-none focus:border-mata-alta focus:ring-1 focus:ring-mata-alta"
            />
          </div>
          <Button variant="secondary" className="h-9 border-gray-300 px-3">
            <IconFilter size={16} className="text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden bg-gray-50 p-6">
        <div className="flex h-full min-w-max items-start gap-4">
          {renderColumn(
            'Recebidos',
            'recebidos',
            projetos.filter((p) => p.status === 'recebidos').length,
            'bg-gray-400',
          )}
          {renderColumn(
            'Em Análise',
            'em_analise',
            projetos.filter((p) => p.status === 'em_analise').length,
            'bg-mata-alta',
          )}
          {renderColumn(
            'Com Pendência',
            'pendencia',
            projetos.filter((p) => p.status === 'pendencia').length,
            'bg-ouro-tocantins',
          )}
          {renderColumn(
            'Aprovados',
            'aprovados',
            projetos.filter((p) => p.status === 'aprovados').length,
            'bg-buriti-vivo',
          )}
        </div>
      </div>
    </div>
  );
}
