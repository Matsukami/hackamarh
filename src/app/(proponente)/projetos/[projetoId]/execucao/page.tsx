import React from 'react';
import Link from 'next/link';
import { 
  IconArrowLeft, 
  IconPhoto, 
  IconCheck, 
  IconLock, 
  IconCloudUpload, 
  IconMapPin, 
  IconAlertTriangle 
} from '@tabler/icons-react';
import { fetchExecucaoProjeto } from '@/lib/services/evidenciaService';

export const metadata = {
  title: 'Execução Física do Projeto | JREDD+ Tocantins',
};

interface PageProps {
  params: {
    projetoId: string;
  };
}

export default async function ExecucaoProjetoPage({ params }: PageProps) {
  const { tituloProjeto, area_hectares, latRef, lngRef, parcelas } = await fetchExecucaoProjeto(params.projetoId);

  const getStatusInstallmentBadge = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-mata text-white px-2 py-1 rounded text-xs font-bold uppercase';
      case 'liberado':
        return 'bg-ouro text-white px-2 py-1 rounded text-xs font-bold uppercase';
      case 'bloqueado':
      default:
        return 'bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-bold uppercase';
    }
  };

  const getStatusInstallmentText = (status: string) => {
    switch (status) {
      case 'pago': return 'Paga (Liberada)';
      case 'liberado': return 'Aguardando Evidência';
      case 'bloqueado': return 'Bloqueada (Aguarde)';
      default: return status;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-areia min-h-screen">
      <Link href="/painel" className="inline-flex items-center gap-2 text-cerrado hover:underline mb-8 font-semibold">
        <IconArrowLeft size={20} />
        Voltar para o Painel
      </Link>

      {/* Header do Projeto */}
      <div className="bg-white rounded-lg border border-areia-dark p-6 mb-8 shadow-sm">
        <h1 className="text-hero text-cerrado font-bold mb-2">{tituloProjeto}</h1>
        <p className="text-gray-600 mb-4">Acompanhamento físico e comprovação de metas para liberação de parcelas.</p>
        <div className="flex flex-wrap gap-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
          <span className="flex items-center gap-1">
            <IconMapPin size={18} className="text-cerrado" />
            Coordenadas Ref: <span className="font-bold text-gray-700">{latRef.toFixed(6)}, {lngRef.toFixed(6)}</span>
          </span>
          <span>Área: <span className="font-bold text-gray-700">{area_hectares.toFixed(2)} hectares</span></span>
        </div>
      </div>

      {/* Timeline de Parcelas */}
      <h2 className="text-h2 text-cerrado mb-6 font-bold">Cronograma de Desembolso e Metas</h2>
      
      <div className="space-y-6">
        {parcelas.map((p) => {
          const isPago = p.status_liberacao === 'pago';
          const isLiberado = p.status_liberacao === 'liberado';
          const isBloqueado = p.status_liberacao === 'bloqueado';

          return (
            <div 
              key={p.id} 
              className={`bg-white rounded-lg border p-6 shadow-sm transition-all ${
                isPago ? 'border-mata/30 bg-mata/5' : 
                isLiberado ? 'border-ouro/30 bg-ouro/5' : 'border-gray-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-cerrado text-white flex items-center justify-center font-bold text-sm">
                    {p.numero_parcela}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Parcela {p.numero_parcela}</h3>
                    <p className="text-xl font-bold text-cerrado">{p.valor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={getStatusInstallmentBadge(p.status_liberacao)}>
                    {getStatusInstallmentText(p.status_liberacao)}
                  </span>
                </div>
              </div>

              <div className="bg-white/80 p-4 rounded border border-gray-100 mb-6">
                <h4 className="text-sm font-bold text-gray-700 mb-1">Meta Física Associada:</h4>
                <p className="text-gray-600 text-sm">{p.meta_fisica}</p>
              </div>

              {/* Seção de Evidências Anexadas */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3">Evidências Físicas Enviadas:</h4>
                
                {p.evidencias.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {p.evidencias.map((ev) => {
                      const isAutentica = ev.status_autenticidade === 'autentica';
                      const isSuspeita = ev.status_autenticidade === 'suspeita';

                      return (
                        <div key={ev.id} className="bg-white p-4 rounded border border-gray-100 flex gap-4 shadow-sm">
                          {ev.tipo === 'foto' && ev.url_arquivo && (
                            <div className="w-20 h-20 rounded bg-gray-100 overflow-hidden shrink-0 relative">
                              <img 
                                src={ev.url_arquivo} 
                                alt={ev.descricao} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-grow">
                            <p className="text-sm text-gray-800 font-semibold line-clamp-1">{ev.descricao}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Enviado em {new Date(ev.criado_em).toLocaleDateString('pt-BR')}
                            </p>
                            
                            {/* Badges de Validação de IA */}
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              {isAutentica && (
                                <span className="inline-flex items-center gap-0.5 bg-mata/10 text-mata px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                  <IconCheck size={10} />
                                  Autêntica (EXIF OK)
                                </span>
                              )}
                              {isSuspeita && (
                                <span className="inline-flex items-center gap-0.5 bg-perigo/10 text-perigo px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                  <IconAlertTriangle size={10} />
                                  Suspeita (Fora da Área)
                                </span>
                              )}
                              {ev.score_ia_sintetica && (
                                <span className="text-[10px] text-gray-500 font-semibold bg-gray-100 px-2 py-0.5 rounded">
                                  Confiança IA: {(ev.score_ia_sintetica * 100).toFixed(0)}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">Nenhuma evidência anexada a esta parcela.</p>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="mt-6 flex justify-end">
                {isLiberado && (
                  <Link 
                    href={`/projetos/${params.projetoId}/execucao/parcela/${p.id}`}
                    className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
                  >
                    <IconCloudUpload size={18} />
                    Enviar Comprovação Física
                  </Link>
                )}
                {isBloqueado && (
                  <span className="text-gray-400 text-sm flex items-center gap-1 font-semibold">
                    <IconLock size={16} />
                    Finalize a parcela anterior para liberar esta
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
