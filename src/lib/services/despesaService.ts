// Serviço de Despesas e Nota Fiscal OCR (MVP)

export interface DespesaItem {
  id: string;
  cnpj: string;
  razaoSocial: string;
  valor: number;
  dataEmissao: string;
  descricao: string;
  validadoIARisk: boolean;
  status: 'aprovado' | 'rejeitado' | 'analise_humana';
}

export interface ParcelaFinanceiro {
  id: string;
  numero: number;
  valorLiberado: number;
  valorGasto: number;
}

export async function fetchFinanceiroProjeto(projetoId: string): Promise<{
  resumo: { totalRecebido: number; totalGasto: number; saldoDisponivel: number };
  parcelas: ParcelaFinanceiro[];
  despesas: DespesaItem[];
}> {
  // Retorna os dados mockados de execução financeira
  return {
    resumo: {
      totalRecebido: 163333.32,
      totalGasto: 125000.00,
      saldoDisponivel: 38333.32,
    },
    parcelas: [
      { id: 'parc-1', numero: 1, valorLiberado: 81666.66, valorGasto: 81666.66 },
      { id: 'parc-2', numero: 2, valorLiberado: 81666.66, valorGasto: 43333.34 }
    ],
    despesas: [
      {
        id: 'desp-1',
        cnpj: '01.234.567/0001-89',
        razaoSocial: 'Madeireira Tocantins Ltda',
        valor: 45000.00,
        dataEmissao: '12/05/2026',
        descricao: 'Madeira para cercamento (meta da parcela 1)',
        validadoIARisk: true,
        status: 'aprovado'
      },
      {
        id: 'desp-2',
        cnpj: '98.765.432/0001-10',
        razaoSocial: 'Cerrado Mudas e Insumos',
        valor: 36666.66,
        dataEmissao: '14/05/2026',
        descricao: 'Postes e arame farpado',
        validadoIARisk: true,
        status: 'aprovado'
      },
      {
        id: 'desp-3',
        cnpj: '11.222.333/0001-44',
        razaoSocial: 'Palmas Sementes Florestais',
        valor: 43333.34,
        dataEmissao: '28/05/2026',
        descricao: 'Mudas de Baru e Baruzeiro (meta da parcela 2)',
        validadoIARisk: true,
        status: 'aprovado'
      }
    ]
  };
}

export async function processarNotaFiscalOCR(
  parcelaId: string,
  urlNota: string,
  simularErroLimite = false
): Promise<{
  sucesso: boolean;
  cnpj: string;
  razaoSocial: string;
  valor: number;
  itens: string[];
  alertaLimite?: boolean;
}> {
  // Simula o processamento da nota fiscal por uma IA (OCR/GPT-4o)
  
  if (simularErroLimite) {
    return {
      sucesso: false,
      cnpj: '22.333.444/0001-55',
      razaoSocial: 'Tratores e Implementos Porto Nacional',
      valor: 95000.00, // Maior que o saldo de R$ 38.333,32
      itens: ['Grade Aradora 14 discos'],
      alertaLimite: true // Indica que estourou o limite da parcela
    };
  }

  return {
    sucesso: true,
    cnpj: '44.555.666/0001-77',
    razaoSocial: 'Sementes Cerrado Verde Ltda',
    valor: 15000.00, // Dentro do limite
    itens: ['50kg Sementes de Capim Nativo', '100 mudas de Jatobá-do-Cerrado'],
  };
}
