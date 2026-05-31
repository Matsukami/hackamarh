import { getProjetosByProponente, getRascunhosByProponente } from '@/lib/repositories/projetoRepository';
import { Projeto, StatusKanban } from '@/lib/types/enums';

export interface DashboardProjectData {
  id: string;
  titulo: string;
  editalTitulo: string;
  status: StatusKanban;
  area_hectares: number;
  valor_solicitado: string;
  data_criacao: string;
  data_limite_correcao?: string;
  score_previo?: number;
}

export async function fetchDashboardData(usuarioId: string): Promise<{
  projetos: DashboardProjectData[];
  rascunhos: any[];
}> {
  try {
    const dbProjetos = await getProjetosByProponente(usuarioId);
    const dbRascunhos = await getRascunhosByProponente(usuarioId);

    const formatado = dbProjetos.map((p: any) => ({
      id: p.id,
      titulo: p.titulo,
      editalTitulo: p.edital?.titulo || 'Edital Geral',
      status: p.status_kanban,
      area_hectares: p.area_hectares,
      valor_solicitado: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.valor_solicitado),
      data_criacao: new Date(p.criado_em).toLocaleDateString('pt-BR'),
      data_limite_correcao: p.data_limite_correcao ? new Date(p.data_limite_correcao).toLocaleDateString('pt-BR') : undefined,
      score_previo: p.score_previo || undefined,
    }));

    return {
      projetos: formatado,
      rascunhos: dbRascunhos,
    };
  } catch (error) {
    console.warn('Usando dados de demonstração (fallback) para o painel do proponente.');
    
    // Fallback rico para a demonstração do Hackathon
    return {
      projetos: [
        {
          id: 'proj-1',
          titulo: 'Restauração Agroflorestal Krahô',
          editalTitulo: 'Janela Indígena - Edital 01/2026',
          status: 'aprovado',
          area_hectares: 350.50,
          valor_solicitado: 'R$ 245.000,00',
          data_criacao: '10/05/2026',
          score_previo: 88,
        },
        {
          id: 'proj-2',
          titulo: 'Manejo Sustentável de Frutos do Cerrado - Jalapão',
          editalTitulo: 'Agricultura Familiar - Edital 02/2026',
          status: 'com_pendencia',
          area_hectares: 120.00,
          valor_solicitado: 'R$ 95.000,00',
          data_criacao: '20/05/2026',
          data_limite_correcao: '15/06/2026',
          score_previo: 62,
        },
        {
          id: 'proj-3',
          titulo: 'Proteção Contra Incêndios em Área Quilombola Kalunga',
          editalTitulo: 'Janela Quilombola - Edital 01/2026',
          status: 'em_analise',
          area_hectares: 500.00,
          valor_solicitado: 'R$ 410.000,00',
          data_criacao: '28/05/2026',
          score_previo: 75,
        }
      ],
      rascunhos: [
        {
          id: 'rasc-1',
          edital: { titulo: 'Fortalecimento Institucional - Edital 04/2026' },
          etapa_atual: 3,
          atualizado_em: new Date().toISOString(),
        }
      ]
    };
  }
}
