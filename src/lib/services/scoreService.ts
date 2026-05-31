// Mock do motor de inferência Preditiva (MVP)

export interface ScoreBreakdown {
  dimensao: string;
  pontos: number;
  maximo: number;
  descricao: string;
}

export interface ScorecardResult {
  scoreTotal: number;
  scoreMaximo: number;
  probabilidadeAprovacao: 'ALTA' | 'MEDIA' | 'BAIXA';
  breakdown: ScoreBreakdown[];
  recomendacoes: string[];
}

export function calcularScorePreditivo(): ScorecardResult {
  // Num cenário real, isso passaria os dados do projeto por um modelo preditivo.
  // Aqui simulamos um score positivo baseado num projeto bem preenchido (visto que passou pelos Hard-Stops)
  
  const breakdown: ScoreBreakdown[] = [
    {
      dimensao: 'Impacto Social (Cancún)',
      pontos: 25,
      maximo: 30,
      descricao: 'Boa participação de mulheres e jovens.',
    },
    {
      dimensao: 'Eficiência Financeira',
      pontos: 18,
      maximo: 20,
      descricao: 'Valor por hectare dentro da média do bioma Cerrado.',
    },
    {
      dimensao: 'Mitigação de Riscos',
      pontos: 35,
      maximo: 40,
      descricao: 'Área com histórico moderado de queimadas.',
    },
    {
      dimensao: 'Documentação',
      pontos: 10,
      maximo: 10,
      descricao: 'Documentação obrigatória completa e verificada.',
    }
  ];

  const scoreTotal = breakdown.reduce((acc, curr) => acc + curr.pontos, 0);
  const scoreMaximo = breakdown.reduce((acc, curr) => acc + curr.maximo, 0);
  const percentual = scoreTotal / scoreMaximo;

  let probabilidade: 'ALTA' | 'MEDIA' | 'BAIXA' = 'BAIXA';
  if (percentual >= 0.8) probabilidade = 'ALTA';
  else if (percentual >= 0.6) probabilidade = 'MEDIA';

  return {
    scoreTotal,
    scoreMaximo,
    probabilidadeAprovacao: probabilidade,
    breakdown,
    recomendacoes: [
      'Aumentar o número estimado de jovens beneficiados pode elevar a pontuação social.',
      'O valor solicitado está excelente para a área da propriedade.'
    ]
  };
}
