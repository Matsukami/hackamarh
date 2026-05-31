'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  IconArrowLeft,
  IconCheck,
  IconX,
  IconEdit,
  IconDownload,
  IconFileTypePdf,
  IconFileSpreadsheet,
  IconMapPin,
  IconBuilding,
  IconUsers,
  IconLeaf,
  IconFileDescription,
  IconFolder,
  IconMessage,
  IconSend,
  IconClock,
  IconAlertTriangle,
} from '@tabler/icons-react';

// Mock data for the proposal
const proposta = {
  id: 'PRJ-092',
  status: 'Em Análise',
  titulo: 'Restauração Ecológica Nascentes do Araguaia',
  identificacao: {
    proponente: 'Instituto Cerrado Vivo',
    cnpj: '12.345.678/0001-90',
    responsavel: 'Dra. Mariana Silva',
    registro: 'CREA-GO 98765/D',
  },
  territorio: {
    bioma: 'Cerrado',
    areaTotal: '450 hectares',
    municipio: 'Aruanã – GO',
    latitude: -15.7938,
    longitude: -47.8827,
  },
  descritivo: {
    objetivo:
      'Recuperar áreas degradadas de preservação permanente (APP) nas margens de afluentes do Rio Araguaia, utilizando técnicas de nucleação e plantio direto de espécies nativas do Cerrado.',
    metodologia:
      'O projeto empregará uma abordagem híbrida, combinando o isolamento da área para favorecer a regeneração natural com o plantio de mudas em ilhas de diversidade. Será realizado monitoramento semestral de sobrevivência e crescimento.',
  },
  social: {
    beneficiarios: '120 famílias',
    geracaoRenda: 'R$ 450k /ano est.',
    mulheres: 67,
    jovens: 34,
  },
  documentos: [
    {
      nome: 'Projeto_Tecnico_Detalhado.pdf',
      data: '12/10/2024',
      tamanho: '4.2 MB',
      icon: IconFileTypePdf,
    },
    {
      nome: 'Planilha_Orcamentaria_v2.xlsx',
      data: '14/10/2024',
      tamanho: '1.1 MB',
      icon: IconFileSpreadsheet,
    },
  ],
  score: {
    geral: 86,
    dimensoes: [
      { nome: 'Impacto Ambiental', valor: 92 },
      { nome: 'Viabilidade Financeira', valor: 78 },
      { nome: 'Engajamento Comunitário', valor: 88 },
    ],
  },
};

const historicoAcoes = [
  {
    data: 'Hoje, 09:41',
    acao: 'Em Análise',
    descricao: 'Proposta atribuída ao avaliador.',
    usuario: 'Sistema',
  },
  {
    data: 'Ontem, 14:20',
    acao: 'Recebido',
    descricao: 'Proposta submetida pelo proponente via portal web.',
    usuario: 'Instituto Cerrado Vivo',
  },
];

const mensagensIniciais = [
  {
    id: 1,
    remetente: 'fiscal',
    nome: 'Fiscal — Dra. Ana Beatriz',
    iniciais: 'AB',
    conteudo:
      'Prezado proponente, identificamos que o número do CAR preenchido na seção 3 difere do documento anexado. Por favor, verifique e atualize no sistema.',
    timestamp: '28/05/2024 14:30',
    tipo: 'notificação',
  },
  {
    id: 2,
    remetente: 'proponente',
    nome: 'Instituto Cerrado Vivo',
    iniciais: 'IC',
    conteudo:
      'Documento atualizado conforme solicitado. O CAR correto é TO-12345678901234-1234567.',
    timestamp: '29/05/2024 09:15',
    tipo: 'resposta',
  },
  {
    id: 3,
    remetente: 'fiscal',
    nome: 'Fiscal — Dra. Ana Beatriz',
    iniciais: 'AB',
    conteudo:
      'Recebido, obrigada. Documentação em conformidade. Prosseguiremos com a análise técnica.',
    timestamp: '29/05/2024 11:02',
    tipo: 'resposta',
  },
];

export default function PropostaAnalysisPage() {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [parecer, setParecer] = useState('');
  const [mensagens, setMensagens] = useState(mensagensIniciais);
  const [novaMensagem, setNovaMensagem] = useState('');

  const enviarMensagem = () => {
    if (!novaMensagem.trim()) return;
    setMensagens([
      ...mensagens,
      {
        id: mensagens.length + 1,
        remetente: 'fiscal',
        nome: 'Fiscal — Dra. Ana Beatriz',
        iniciais: 'AB',
        conteudo: novaMensagem,
        timestamp: new Date().toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        tipo: 'notificação',
      },
    ]);
    setNovaMensagem('');
  };

  const getScoreColor = (val: number) => {
    if (val >= 80) return 'text-mata-alta';
    if (val >= 60) return 'text-ouro-tocantins';
    return 'text-red-600';
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Top bar */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-md bg-mata-alta/10 px-2.5 py-1 text-xs font-bold uppercase text-mata-alta">
                {proposta.status}
              </span>
              <span className="text-xs text-gray-500">ID: {proposta.id}</span>
            </div>
            <h1 className="font-sora text-2xl font-bold text-cerrado-profundo">
              {proposta.titulo}
            </h1>
          </div>
          <Link
            href="/avaliador/kanban"
            className="flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-cerrado-profundo"
          >
            <IconArrowLeft size={16} /> Voltar para Fila
          </Link>
        </div>
      </div>

      {/* Main Content - 2 columns */}
      <div className="grid grid-cols-1 gap-6 p-6 xl:grid-cols-[1fr_400px]">
        {/* Left Column - Proposal Data */}
        <div className="space-y-6">
          {/* Identificação */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-cerrado-profundo">
                <IconBuilding size={20} /> Identificação
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6 p-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Proponente
                </p>
                <p className="text-sm font-bold text-cerrado-profundo">
                  {proposta.identificacao.proponente}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">CNPJ</p>
                <p className="text-sm font-bold text-cerrado-profundo">
                  {proposta.identificacao.cnpj}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Responsável Técnico
                </p>
                <p className="text-sm font-bold text-cerrado-profundo">
                  {proposta.identificacao.responsavel}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Registro Profissional
                </p>
                <p className="text-sm font-bold text-cerrado-profundo">
                  {proposta.identificacao.registro}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Território */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-cerrado-profundo">
                <IconMapPin size={20} /> Território
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Bioma
                    </p>
                    <span className="mt-1 inline-block rounded-md border border-gray-200 px-2 py-0.5 text-sm font-bold text-cerrado-profundo">
                      {proposta.territorio.bioma}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Área Total
                    </p>
                    <p className="text-sm font-bold text-cerrado-profundo">
                      {proposta.territorio.areaTotal}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Município/UF
                    </p>
                    <p className="text-sm font-bold text-cerrado-profundo">
                      {proposta.territorio.municipio}
                    </p>
                  </div>
                </div>
                <div className="h-48 w-60 overflow-hidden rounded-lg border border-gray-200 bg-areia-jalapao">
                  <div className="relative flex h-full w-full items-center justify-center bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-47.88,-15.79,8,0/300x200@2x?access_token=pk.placeholder')] bg-cover bg-center">
                    <div className="flex h-full w-full items-center justify-center bg-areia-jalapao/50">
                      <IconMapPin size={32} className="text-mata-alta drop-shadow-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Descritivo */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-cerrado-profundo">
                <IconFileDescription size={20} /> Descritivo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Objetivo Principal
                </p>
                <p className="mt-1 rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm leading-relaxed text-gray-700">
                  {proposta.descritivo.objetivo}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Metodologia
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-700">
                  {proposta.descritivo.metodologia}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Social */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-cerrado-profundo">
                <IconUsers size={20} /> Social
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Beneficiários Diretos
                  </p>
                  <p className="mt-1 font-sora text-2xl font-bold text-cerrado-profundo">
                    {proposta.social.beneficiarios}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Geração de Renda
                  </p>
                  <p className="mt-1 font-sora text-2xl font-bold text-cerrado-profundo">
                    {proposta.social.geracaoRenda}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentos */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-cerrado-profundo">
                <IconFolder size={20} /> Documentos Anexados
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-gray-100 p-0">
              {proposta.documentos.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <doc.icon size={24} className="text-red-600" />
                    <div>
                      <p className="text-sm font-bold text-cerrado-profundo">{doc.nome}</p>
                      <p className="text-xs text-gray-500">
                        Enviado em {doc.data} – {doc.tamanho}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 transition-colors hover:text-cerrado-profundo">
                    <IconDownload size={20} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Canal de Comunicação Auditável */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-cerrado-profundo">
                <IconMessage size={20} /> Canal de Comunicação Oficial
                <span className="ml-auto rounded-full bg-areia-jalapao px-2 py-0.5 text-[10px] font-bold text-gray-500">
                  Auditável — Salvaguardas de Cancún
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages */}
              <div className="max-h-[400px] space-y-4 overflow-y-auto bg-gray-50/50 p-6">
                {mensagens.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.remetente === 'fiscal' ? 'justify-start' : 'flex-row-reverse'} items-start gap-3`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${msg.remetente === 'fiscal' ? 'bg-cerrado-profundo' : 'bg-mata-alta'}`}
                    >
                      {msg.iniciais}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${msg.remetente === 'fiscal' ? 'rounded-tl-none border border-gray-200 bg-white' : 'rounded-tr-none border border-mata-alta/10 bg-mata-alta/5'}`}
                    >
                      <div
                        className={`mb-1 flex items-baseline gap-3 ${msg.remetente !== 'fiscal' ? 'justify-end' : ''}`}
                      >
                        <span className="text-xs font-bold text-cerrado-profundo">{msg.nome}</span>
                        <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-700">{msg.conteudo}</p>
                      <div className="mt-1 flex items-center gap-1 text-[9px] text-gray-400">
                        <IconClock size={10} /> Registro imutável #
                        {msg.id.toString().padStart(4, '0')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Input */}
              <div className="border-t border-gray-200 bg-white p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()}
                    placeholder="Enviar notificação oficial ao proponente..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-mata-alta focus:outline-none focus:ring-1 focus:ring-mata-alta"
                  />
                  <Button
                    onClick={enviarMensagem}
                    variant="primary"
                    className="gap-2 bg-cerrado-profundo px-4"
                  >
                    <IconSend size={16} /> Enviar
                  </Button>
                </div>
                <p className="mt-2 text-[10px] text-gray-400">
                  ⚠️ Todas as mensagens são registradas com timestamp imutável para fins de
                  auditoria pública.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Score + Actions (Sticky) */}
        <div className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          {/* Score Preditivo */}
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Score Preditivo GAIA
              </h3>
              <div className="mb-6 flex items-end gap-3">
                <span
                  className={`font-sora text-5xl font-bold ${getScoreColor(proposta.score.geral)}`}
                >
                  {proposta.score.geral}
                </span>
                <span className="mb-1 text-lg text-gray-400">/100</span>
                <span className="mb-1 ml-auto rounded-md bg-mata-alta/10 px-2 py-1 text-xs font-bold uppercase text-mata-alta">
                  Alto Potencial
                </span>
              </div>
              <div className="space-y-4">
                {proposta.score.dimensoes.map((dim, idx) => (
                  <div key={idx}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-gray-600">{dim.nome}</span>
                      <span className={`font-bold ${getScoreColor(dim.valor)}`}>{dim.valor}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full transition-all ${dim.valor >= 80 ? 'bg-mata-alta' : dim.valor >= 60 ? 'bg-ouro-tocantins' : 'bg-red-400'}`}
                        style={{ width: `${dim.valor}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Parecer Técnico */}
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                Parecer Técnico
              </h3>
              <label className="mb-2 block text-sm font-bold text-cerrado-profundo">
                Justificativa da Decisão
              </label>
              <textarea
                value={parecer}
                onChange={(e) => setParecer(e.target.value)}
                placeholder="Insira suas observações técnicas detalhadas aqui..."
                className="min-h-[120px] w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-mata-alta focus:outline-none focus:ring-1 focus:ring-mata-alta"
              />
              <div className="mt-4 space-y-3">
                <Button
                  onClick={() => setShowApproveModal(true)}
                  variant="primary"
                  className="w-full gap-2 bg-mata-alta py-3 text-sm font-bold shadow-md hover:bg-cerrado-profundo"
                >
                  <IconCheck size={18} /> Aprovar Proposta
                </Button>
                <Button
                  onClick={() => setShowCorrectionModal(true)}
                  variant="secondary"
                  className="w-full gap-2 border-gray-300 py-3 text-sm font-bold"
                >
                  <IconEdit size={18} /> Solicitar Correção
                </Button>
                <Button
                  onClick={() => setShowRejectModal(true)}
                  variant="secondary"
                  className="w-full gap-2 border-red-200 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
                >
                  <IconX size={18} /> Reprovar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Histórico de Ações */}
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Histórico de Ações
              </h3>
              <div className="relative space-y-5 border-l-2 border-gray-200 pl-6">
                {historicoAcoes.map((acao, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 ring-4 ring-white">
                      <div className="h-2 w-2 rounded-full bg-gray-400" />
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs font-bold text-cerrado-profundo">{acao.acao}</span>
                        <span className="text-[10px] text-gray-400">{acao.data}</span>
                      </div>
                      <p className="mt-1 text-xs text-gray-600">{acao.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {showApproveModal && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Card className="animate-in zoom-in-95 w-full max-w-md shadow-2xl">
            <CardContent className="p-6">
              <h3 className="mb-4 font-sora text-lg font-bold text-cerrado-profundo">
                Confirmar Aprovação
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700">
                    Valor Total do Contrato (R$)
                  </label>
                  <input
                    type="number"
                    defaultValue={170000}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-mata-alta focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700">
                    Número de Parcelas
                  </label>
                  <input
                    type="number"
                    defaultValue={3}
                    min={1}
                    max={12}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-mata-alta focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowApproveModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  className="flex-1 bg-mata-alta"
                  onClick={() => setShowApproveModal(false)}
                >
                  Confirmar Aprovação
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showCorrectionModal && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Card className="animate-in zoom-in-95 w-full max-w-md shadow-2xl">
            <CardContent className="p-6">
              <h3 className="mb-4 font-sora text-lg font-bold text-cerrado-profundo">
                Solicitar Correção
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700">
                    Descrição da Pendência
                  </label>
                  <textarea
                    placeholder="Descreva o que precisa ser corrigido..."
                    className="min-h-[100px] w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-mata-alta focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <IconClock size={16} className="text-blue-600" />
                  <span className="text-sm text-blue-700">
                    Prazo automático: <strong>+15 dias úteis</strong>
                  </span>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowCorrectionModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => setShowCorrectionModal(false)}
                >
                  Enviar Notificação
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showRejectModal && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Card className="animate-in zoom-in-95 w-full max-w-md shadow-2xl">
            <CardContent className="p-6">
              <h3 className="mb-2 font-sora text-lg font-bold text-red-600">Reprovar Proposta</h3>
              <p className="mb-4 text-sm text-gray-600">
                Esta ação é irreversível e requer justificativa obrigatória.
              </p>
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Justificativa da Reprovação *
                </label>
                <textarea
                  placeholder="Campo obrigatório para auditoria..."
                  className="min-h-[120px] w-full rounded-lg border border-red-200 p-3 text-sm focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-200"
                />
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowRejectModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => setShowRejectModal(false)}
                >
                  Confirmar Reprovação
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
