'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  IconCamera,
  IconChartBar,
  IconReceipt,
  IconCheck,
  IconAlertTriangle,
  IconMapPin,
  IconClock,
  IconEye,
  IconEdit,
  IconChecklist,
  IconShieldCheck,
  IconQuestionMark,
} from '@tabler/icons-react';

const fotos = [
  {
    id: 1,
    titulo: 'Plantio – Setor Norte',
    url: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    coordenadas: '-15.7938, -47.8827',
    precisao: '3m',
    data: '10/10/2024 14:32 BRT',
    status: 'autentica' as const,
    confianca: 97,
  },
  {
    id: 2,
    titulo: 'Isolamento de Área',
    url: 'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    coordenadas: '-16.1234, -48.1122',
    precisao: '>50km do polígono',
    data: '09/10/2024 09:15 BRT',
    status: 'suspeita' as const,
    confianca: 23,
    motivo: 'Coordenadas inconsistentes',
  },
  {
    id: 3,
    titulo: 'Aceiro Preventivo Lote 3',
    url: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    coordenadas: '—',
    precisao: '—',
    data: '08/10/2024',
    status: 'sem_metadados' as const,
    confianca: 0,
  },
];

const acoes = [
  { id: '1.1', titulo: 'Plantio de Mudas Nativas', meta: '20.000 un.', realizado: '15.000 un.', percentual: 75, contratado: 70, statusContrato: 'Alinhado' },
  { id: '1.2', titulo: 'Cercamento de APP', meta: '10 km', realizado: '4.5 km', percentual: 45, contratado: 60, statusContrato: 'Atrasado', justificativa: 'Chuvas atípicas impediram acesso de maquinário.' },
];

const despesas = [
  { descricao: 'Aquisição de Mudas', fornecedor: 'Viveiro Central Ltda', valor: 'R$ 25.000,00', status: 'ok' },
  { descricao: 'Serviço de Máquinas', fornecedor: 'Recibo não fiscal', valor: 'R$ 12.500,00', status: 'alerta' },
  { descricao: 'Materiais Isolamento', fornecedor: 'Arame e Mourões', valor: 'R$ 7.700,00', status: 'ok' },
];

function StatusBadge({ status, confianca }: { status: 'autentica' | 'suspeita' | 'sem_metadados'; confianca: number }) {
  const configs = {
    autentica: {
      bg: 'bg-buriti-vivo',
      text: 'text-cerrado-profundo',
      icon: IconCheck,
      label: 'Autêntico',
    },
    suspeita: {
      bg: 'bg-red-100 border border-red-200',
      text: 'text-red-700',
      icon: IconAlertTriangle,
      label: 'Suspeito',
    },
    sem_metadados: {
      bg: 'bg-gray-200',
      text: 'text-gray-600',
      icon: IconQuestionMark,
      label: 'Sem Metadados',
    },
  };

  const c = configs[status];
  const Icon = c.icon;

  return (
    <div className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold shadow-md ${c.bg} ${c.text}`}>
      <Icon size={14} />
      <span>{c.label}</span>
      {confianca > 0 && <span className="opacity-70">({confianca}%)</span>}
    </div>
  );
}

export default function ValidacaoPrestacaoPage() {
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header with Breadcrumb */}
      <div className="border-b border-gray-200 bg-white px-6 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-gray-400">
              <span>Projeto ECO-2024-089</span>
              <span className="text-gray-300">&gt;</span>
              <span>Prestação de Contas</span>
              <span className="text-gray-300">&gt;</span>
              <span className="text-mata-alta">Parcela 03</span>
            </div>
            <h1 className="mb-1 font-sora text-2xl font-bold text-cerrado-profundo">
              Validação de Conta: Parcela 03
            </h1>
            <p className="font-dm-sans text-sm text-gray-600">
              Analise as evidências, o progresso físico e os comprovantes de despesa para aprovação da parcela.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              <IconClock size={16} className="text-gray-500" />
              <span className="text-xs font-bold text-gray-600">Submetido em: 12/10/2024</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-ouro-tocantins/30 bg-orange-50 px-3 py-2">
              <IconAlertTriangle size={16} className="text-ouro-tocantins" />
              <span className="text-xs font-bold text-ouro-tocantins">SLA: 3 dias restantes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1100px] space-y-8 px-6 py-8">
        {/* Section 1: Evidências de Campo */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cerrado-profundo">
            <IconCamera size={20} className="text-mata-alta" />
            Evidências de Campo
          </h2>
          <div className="space-y-6">
            {fotos.map((foto) => (
              <Card key={foto.id} className={`overflow-hidden border-gray-200 shadow-sm ${foto.status === 'suspeita' ? 'border-2 border-red-200' : ''}`}>
                <div className="relative">
                  <img
                    src={foto.url}
                    alt={foto.titulo}
                    className="h-64 w-full object-cover md:h-80"
                  />
                  <div className="absolute right-3 top-3">
                    <StatusBadge status={foto.status} confianca={foto.confianca} />
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="mb-2 text-base font-bold text-cerrado-profundo">{foto.titulo}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1">
                    <div className={`flex items-center gap-1.5 text-sm ${foto.status === 'suspeita' ? 'font-bold text-red-600' : 'text-gray-600'}`}>
                      <IconMapPin size={16} />
                      <span>{foto.coordenadas}</span>
                      {foto.precisao && <span className="text-gray-400">({foto.status === 'suspeita' ? `Distante > ${foto.precisao}` : `Precisão: ${foto.precisao}`})</span>}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <IconClock size={16} />
                      <span>{foto.data}</span>
                    </div>
                  </div>
                  {foto.motivo && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 p-2 text-xs font-bold text-red-700">
                      <IconAlertTriangle size={14} /> {foto.motivo}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 2: Progresso Físico */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cerrado-profundo">
              <IconChartBar size={20} className="text-mata-alta" />
              Progresso Físico
            </h2>
            <span className="text-xs font-bold text-gray-500">Meta Global: 60%</span>
          </div>
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="divide-y divide-gray-100 p-0">
              {acoes.map((acao) => (
                <div key={acao.id} className="p-5">
                  <div className="mb-3 flex items-end justify-between">
                    <div>
                      <span className="block text-xs font-bold uppercase text-gray-400">Ação {acao.id}</span>
                      <p className="text-sm font-bold text-cerrado-profundo">{acao.titulo}</p>
                    </div>
                    <span className={`text-xs font-bold ${acao.percentual >= 60 ? 'text-mata-alta' : 'text-ouro-tocantins'}`}>
                      {acao.realizado} / {acao.meta}
                    </span>
                  </div>
                  <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full transition-all ${acao.percentual >= 60 ? 'bg-mata-alta' : 'bg-ouro-tocantins'}`}
                      style={{ width: `${acao.percentual}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className={acao.percentual >= 60 ? 'text-mata-alta' : 'text-ouro-tocantins'}>
                      Declarado: {acao.percentual}%
                    </span>
                    <span className="text-gray-500">
                      Contratado: {acao.contratado}% ({acao.statusContrato})
                    </span>
                  </div>
                  {acao.justificativa && (
                    <div className="mt-3 flex gap-2 rounded-lg border border-orange-100 bg-orange-50 p-3">
                      <IconAlertTriangle size={16} className="mt-0.5 shrink-0 text-orange-600" />
                      <p className="text-xs text-orange-800">
                        Justificativa submetida: {acao.justificativa}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Parecer IA */}
          <Card className="mt-4 border-gray-200 bg-gray-50 shadow-sm">
            <CardContent className="p-5">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-cerrado-profundo">
                <IconChecklist size={18} /> Parecer Técnico Prévio (IA)
              </h4>
              <p className="text-sm leading-relaxed text-gray-600">
                O avanço do plantio compensa o atraso no cercamento. Recomenda-se aprovação parcial
                do progresso físico, com ressalva para monitoramento intensivo da Ação 1.2 na
                próxima medição.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Reconciliação Financeira */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cerrado-profundo">
              <IconReceipt size={20} className="text-mata-alta" />
              Reconciliação Financeira
            </h2>
            <span className="text-xs font-bold text-gray-500">Total: R$ 45.200,00</span>
          </div>
          <Card className="overflow-hidden border-gray-200 shadow-sm">
            <table className="w-full text-left">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs font-bold uppercase text-gray-500">
                <tr>
                  <th className="p-4">Despesa</th>
                  <th className="p-4 text-right">Valor Declarado</th>
                  <th className="p-4 text-center">NF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {despesas.map((d, idx) => (
                  <tr key={idx} className={d.status === 'alerta' ? 'border-l-4 border-l-red-500 bg-red-50/30 hover:bg-red-50' : 'hover:bg-gray-50'}>
                    <td className="p-4">
                      <p className="font-bold text-cerrado-profundo">{d.descricao}</p>
                      {d.status === 'alerta' ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-red-600">
                          <IconAlertTriangle size={12} /> {d.fornecedor}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">{d.fornecedor}</span>
                      )}
                    </td>
                    <td className="p-4 text-right font-bold text-cerrado-profundo">{d.valor}</td>
                    <td className="p-4 text-center">
                      <button className={`transition-colors ${d.status === 'alerta' ? 'text-red-600 hover:text-red-800' : 'text-mata-alta hover:text-cerrado-profundo'}`}>
                        <IconEye size={20} className="mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        {/* Actions */}
        <div className="flex flex-col items-center justify-end gap-4 border-t border-gray-200 pt-8 sm:flex-row">
          <Button
            onClick={() => setShowCorrectionModal(true)}
            variant="secondary"
            className="h-12 w-full gap-2 border-gray-300 px-8 text-gray-700 sm:w-auto"
          >
            <IconEdit size={20} /> Solicitar Correção
          </Button>
          <Button
            variant="primary"
            className="h-12 w-full gap-2 bg-mata-alta px-10 text-white shadow-lg hover:bg-cerrado-profundo sm:w-auto"
          >
            <IconCheck size={20} /> Aprovar Parcela
          </Button>
        </div>
      </div>

      {/* Correction Modal */}
      {showCorrectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
          <Card className="w-full max-w-md shadow-2xl animate-in zoom-in-95">
            <CardContent className="p-6">
              <h3 className="mb-4 font-sora text-lg font-bold text-cerrado-profundo">Solicitar Correção da Parcela</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700">Descrição da Pendência</label>
                  <textarea placeholder="Descreva o que precisa ser corrigido na prestação de contas..." className="min-h-[100px] w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-mata-alta focus:outline-none" />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <IconClock size={16} className="text-blue-600" />
                  <span className="text-sm text-blue-700">Prazo automático: <strong>+15 dias úteis</strong></span>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setShowCorrectionModal(false)}>Cancelar</Button>
                <Button variant="primary" className="flex-1" onClick={() => setShowCorrectionModal(false)}>Enviar Notificação</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
