import { getEditais } from '@/lib/repositories/editalRepository';
import { Edital } from '@/lib/types/enums';

export interface EditalViewData extends Edital {
  dias_restantes: number;
  urgente: boolean;
  valor_formatado: string;
}

export async function fetchEditaisViewData(): Promise<EditalViewData[]> {
  const editais = await getEditais();
  const hoje = new Date();
  
  // Zera a hora para não ter problemas de fuso na comparação de dias
  hoje.setHours(0, 0, 0, 0);

  return editais.map((edital) => {
    // T-01 spec: Lógica para "dias restantes" e "urgência"
    const dataFim = new Date(edital.data_encerramento);
    dataFim.setHours(0, 0, 0, 0);
    
    const diffTime = dataFim.getTime() - hoje.getTime();
    const dias_restantes = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      ...edital,
      dias_restantes,
      urgente: dias_restantes > 0 && dias_restantes <= 7, // Considerado urgente se < 7 dias
      valor_formatado: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(edital.valor_total),
    };
  });
}
