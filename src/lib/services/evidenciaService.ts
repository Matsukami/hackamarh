import { getParcelasByProjeto, getEvidenciasByParcela, salvarEvidencia } from '@/lib/repositories/evidenciaRepository';
import { Evidencia, StatusAutenticidade } from '@/lib/types/enums';

export interface ParcelaComEvidencia {
  id: string;
  numero_parcela: number;
  valor: string;
  meta_fisica: string;
  status_liberacao: 'bloqueado' | 'liberado' | 'pago';
  evidencias: any[];
}

export async function fetchExecucaoProjeto(projetoId: string): Promise<{
  tituloProjeto: string;
  area_hectares: number;
  latRef: number;
  lngRef: number;
  parcelas: ParcelaComEvidencia[];
}> {
  try {
    const dbParcelas = await getParcelasByProjeto(projetoId);
    
    const parcelasComEvidencias = await Promise.all(
      dbParcelas.map(async (p) => {
        const evidencias = await getEvidenciasByParcela(p.id);
        return {
          id: p.id,
          numero_parcela: p.numero_parcela,
          valor: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.valor),
          meta_fisica: p.meta_fisica,
          status_liberacao: p.status_liberacao,
          evidencias,
        };
      })
    );

    return {
      tituloProjeto: 'Restauração Agroflorestal Krahô', // Valor simplificado ou puxar via join
      area_hectares: 350.50,
      latRef: -10.123456,
      lngRef: -48.123456,
      parcelas: parcelasComEvidencias,
    };
  } catch (error) {
    console.warn('Usando dados de demonstração (fallback) para a execução do projeto.');
    
    // Dados de fallback para demonstração do Hackathon
    return {
      tituloProjeto: 'Restauração Agroflorestal Krahô',
      area_hectares: 350.50,
      latRef: -10.123456,
      lngRef: -48.123456,
      parcelas: [
        {
          id: 'parc-1',
          numero_parcela: 1,
          valor: 'R$ 81.666,66',
          meta_fisica: 'Cercamento de 50 hectares da área de preservação permanente.',
          status_liberacao: 'pago',
          evidencias: [
            {
              id: 'ev-1',
              tipo: 'foto',
              url_arquivo: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
              descricao: 'Cerca perimetral da área sul concluída.',
              gps_lat: -10.123900,
              gps_lng: -48.123800,
              status_autenticidade: 'autentica',
              score_ia_sintetica: 0.98,
              criado_em: new Date('2026-05-15').toISOString(),
            }
          ]
        },
        {
          id: 'parc-2',
          numero_parcela: 2,
          valor: 'R$ 81.666,66',
          meta_fisica: 'Aquisição de 5.000 mudas nativas do Cerrado (Baru, Jatobá, Cagaita).',
          status_liberacao: 'liberado',
          evidencias: []
        },
        {
          id: 'parc-3',
          numero_parcela: 3,
          valor: 'R$ 81.666,68',
          meta_fisica: 'Plantio efetivo das mudas e controle de focos de incêndio.',
          status_liberacao: 'bloqueado',
          evidencias: []
        }
      ]
    };
  }
}

// Analisa os metadados do arquivo simulado e cria a evidência
export async function processarUploadEvidencia(
  projetoId: string,
  parcelaId: string,
  tipo: 'foto' | 'documento' | 'relatorio',
  url: string,
  descricao: string,
  gpsData?: { lat: number; lng: number; data_exif?: string },
  latRef?: number,
  lngRef?: number
): Promise<any> {
  
  let status_autenticidade: StatusAutenticidade = 'pendente';
  let score_ia_sintetica = 1.0;
  
  if (tipo === 'foto' && gpsData && latRef && lngRef) {
    // 1. Calcula a distância entre o GPS da foto e as coordenadas de referência do projeto
    const R = 6371e3; // Metros
    const phi1 = (latRef * Math.PI) / 180;
    const phi2 = (gpsData.lat * Math.PI) / 180;
    const deltaPhi = ((gpsData.lat - latRef) * Math.PI) / 180;
    const deltaLambda = ((gpsData.lng - lngRef) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c; // em metros

    // Regra: Se a foto foi tirada a mais de 10km (10000m) da fazenda do projeto, marca como suspeita
    if (distancia > 10000) {
      status_autenticidade = 'suspeita';
      score_ia_sintetica = 0.25; // Baixo score de autenticidade
    } else {
      status_autenticidade = 'autentica';
      score_ia_sintetica = 0.95;
    }
  } else if (tipo === 'foto' && !gpsData) {
    // Foto sem GPS (metadados removidos): Risco de fraude
    status_autenticidade = 'suspeita';
    score_ia_sintetica = 0.10;
  } else {
    // Documentos / Relatórios entram como pendentes de avaliação humana
    status_autenticidade = 'pendente';
  }

  // Cria e persiste o registro
  const novaEvidencia = {
    projeto_id: projetoId,
    parcela_id: parcelaId,
    tipo,
    url_arquivo: url,
    descricao,
    gps_lat: gpsData?.lat || null,
    gps_lng: gpsData?.lng || null,
    data_exif: gpsData?.data_exif ? new Date(gpsData.data_exif).toISOString() : null,
    status_autenticidade,
    score_ia_sintetica,
  };

  try {
    return await salvarEvidencia(novaEvidencia);
  } catch (e) {
    // Fallback se DB falhar no mock local
    return {
      id: `ev-mock-${Date.now()}`,
      ...novaEvidencia,
      criado_em: new Date().toISOString()
    };
  }
}
