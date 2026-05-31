import React from 'react';
import Link from 'next/link';
import { 
  IconPlus, 
  IconAlertCircle, 
  IconClock, 
  IconFileText, 
  IconCheck, 
  IconProgress, 
  IconChevronRight 
} from '@tabler/icons-react';
import { fetchDashboardData } from '@/lib/services/projetoService';

export const metadata = {
  title: 'Painel do Proponente | JREDD+ Tocantins',
};

export default async function PainelProponentePage() {
  // Simulamos um ID de usuário logado para o MVP
  const { projetos, rascunhos } = await fetchDashboardData('usr-mock-123');

  // Contadores
  const totalProjetos = projetos.length;
  const aprovados = projetos.filter(p => p.status === 'aprovado').length;
  const emAnalise = projetos.filter(p => p.status === 'em_analise' || p.status === 'recebido').length;
  const pendencias = projetos.filter(p => p.status === 'com_pendencia');

  // Classes de cores para o status kanban
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'aprovado':
        return 'badge-aprovado';
      case 'em_analise':
      case 'recebido':
        return 'badge-recebido';
      case 'com_pendencia':
        return 'badge-pendencia';
      case 'reprovado':
        return 'badge-reprovado';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'aprovado': return 'Aprovado';
      case 'em_analise': return 'Em Análise';
      case 'recebido': return 'Recebido';
      case 'com_pendencia': return 'Pendente';
      case 'reprovado': return 'Reprovado';
      default: return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-areia min-h-screen">
      {/* Cabeçalho do Painel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-hero text-cerrado font-bold">Painel do Proponente</h1>
          <p className="text-gray-600">Monitore o status de suas propostas de conservação no Cerrado tocantinense.</p>
        </div>
        <Link href="/editais" className="btn-primary flex items-center gap-2">
          <IconPlus size={20} />
          Nova Proposta
        </Link>
      </div>

      {/* Alerta de Pendência Crítico */}
      {pendencias.length > 0 && (
        <div className="bg-ouro/10 border-l-4 border-ouro p-5 rounded-r-lg mb-8 flex items-start gap-4">
          <IconAlertCircle className="text-ouro shrink-0 mt-0.5" size={24} />
          <div className="flex-grow">
            <h3 className="font-bold text-gray-800 text-lg">Atenção: Proposta com Pendência</h3>
            <p className="text-gray-700 mt-1">
              O projeto <span className="font-semibold">"{pendencias[0].titulo}"</span> possui itens de conformidade a serem corrigidos.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
              <span className="text-sm font-bold text-perigo flex items-center gap-1">
                <IconClock size={16} />
                Prazo final para ajuste: {pendencias[0].data_limite_correcao}
              </span>
              <Link 
                href={`/projetos/${pendencias[0].id}/correcao`}
                className="text-cerrado font-bold text-sm underline hover:text-cerrado-dark"
              >
                Resolver pendência agora →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Grid de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg border border-areia-dark flex items-center gap-4 shadow-sm">
          <div className="bg-cerrado/10 p-3 rounded-full text-cerrado">
            <IconFileText size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Total Submetido</p>
            <p className="text-3xl font-bold text-gray-800">{totalProjetos}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-areia-dark flex items-center gap-4 shadow-sm">
          <div className="bg-mata/10 p-3 rounded-full text-mata">
            <IconCheck size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Projetos Aprovados</p>
            <p className="text-3xl font-bold text-gray-800">{aprovados}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-areia-dark flex items-center gap-4 shadow-sm">
          <div className="bg-ouro/10 p-3 rounded-full text-ouro">
            <IconProgress size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Em Análise / Pendentes</p>
            <p className="text-3xl font-bold text-gray-800">{emAnalise + pendencias.length}</p>
          </div>
        </div>
      </div>

      {/* Corpo do Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Tabela de Projetos (Esquerda/Centro) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-areia-dark p-6 shadow-sm">
          <h2 className="text-h2 text-cerrado mb-6 font-bold">Minhas Propostas</h2>
          
          {projetos.length > 0 ? (
            <div className="space-y-4">
              {projetos.map((p) => (
                <div 
                  key={p.id} 
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border border-gray-100 hover:border-areia-dark hover:bg-areia/5 transition-all gap-4"
                >
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-1">{p.titulo}</h3>
                    <p className="text-sm text-gray-500 mb-2">{p.editalTitulo}</p>
                    <div className="flex gap-4 text-xs text-gray-400">
                      <span>Área: {p.area_hectares.toFixed(2)} ha</span>
                      <span>Solicitado: {p.valor_solicitado}</span>
                      <span>Enviado em: {p.data_criacao}</span>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-end gap-3 w-full sm:w-auto justify-between sm:justify-start">
                    <span className={getStatusBadge(p.status)}>
                      {getStatusText(p.status)}
                    </span>
                    {p.status === 'aprovado' && (
                      <Link 
                        href={`/projetos/${p.id}/execucao`}
                        className="text-xs text-mata font-bold hover:underline flex items-center gap-1"
                      >
                        Acompanhar Execução <IconChevronRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum projeto cadastrado.</p>
            </div>
          )}
        </div>

        {/* Sidebar: Rascunhos e Atalhos (Direita) */}
        <div className="space-y-6">
          
          {/* Rascunhos em Andamento */}
          <div className="bg-white rounded-lg border border-areia-dark p-6 shadow-sm">
            <h2 className="text-h3 text-cerrado mb-4 font-bold">Rascunhos Salvos</h2>
            
            {rascunhos.length > 0 ? (
              <div className="space-y-4">
                {rascunhos.map((r) => (
                  <div key={r.id} className="p-4 rounded border border-dashed border-gray-200">
                    <h4 className="font-bold text-gray-700 text-sm mb-1">{r.edital.titulo}</h4>
                    <p className="text-xs text-gray-400 mb-3">
                      Etapa atual: {r.etapa_atual} de 5
                    </p>
                    <Link 
                      href={`/projetos/novo/${r.id}`}
                      className="btn-secondary text-xs w-full text-center block"
                    >
                      Continuar Inscrição
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Nenhum rascunho em andamento.</p>
            )}
          </div>

          {/* Card Informativo / Ajuda */}
          <div className="bg-cerrado text-white rounded-lg p-6 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10">
              <IconFileText size={150} className="translate-x-10 translate-y-10" />
            </div>
            <h3 className="font-bold text-lg mb-2">Dúvidas com as Salvaguardas?</h3>
            <p className="text-sm text-areia mb-4 leading-relaxed">
              O Tocantins segue rigorosamente os critérios socioambientais estabelecidos nas salvaguardas de Cancún para a liberação de recursos climáticos.
            </p>
            <a 
              href="https://semarh.to.gov.br/" 
              target="_blank" 
              className="text-ouro font-bold text-sm hover:underline"
            >
              Acessar Guia de Salvaguardas →
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
