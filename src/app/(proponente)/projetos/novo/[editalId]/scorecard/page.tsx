import { calcularScorePreditivo } from '@/lib/services/scoreService';
import { ScoreGauge } from '@/components/ui/ScoreGauge';
import { IconTarget, IconCheck, IconBulb } from '@tabler/icons-react';
import Link from 'next/link';

export default async function ScorecardPage() {
  const result = calcularScorePreditivo();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-sm border border-areia-dark p-8 mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-mata/10 text-mata mb-6">
          <IconCheck size={32} />
        </div>
        <h1 className="text-hero text-cerrado mb-4">Inscrição Recebida!</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          Sua proposta foi registrada com sucesso. O motor de IA do JREDD+ 
          já realizou uma análise preliminar preditiva baseada nas Salvaguardas de Cancún.
        </p>

        {/* Scorecard Box */}
        <div className="bg-areia/30 rounded-xl p-8 border border-areia-dark flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0 text-center w-full md:w-auto">
            <h2 className="text-h2 text-cerrado mb-2">Score Preditivo</h2>
            <p className="text-sm text-gray-500 mb-6">Probabilidade de Aprovação</p>
            <div className="flex justify-center">
              <ScoreGauge score={result.scoreTotal} max={result.scoreMaximo} />
            </div>
            <div className={`mt-6 inline-block px-4 py-1 rounded-full font-bold text-sm ${
              result.probabilidadeAprovacao === 'ALTA' ? 'bg-mata/10 text-mata' : 
              result.probabilidadeAprovacao === 'MEDIA' ? 'bg-ouro/10 text-ouro' : 'bg-perigo/10 text-perigo'
            }`}>
              CHANCE {result.probabilidadeAprovacao}
            </div>
          </div>

          <div className="flex-grow text-left w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <IconTarget className="text-ouro" />
              Detalhamento da Análise
            </h3>
            <div className="space-y-4">
              {result.breakdown.map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-md border border-gray-100 shadow-sm hover:shadow transition-shadow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-800">{item.dimensao}</span>
                    <span className="text-sm font-bold text-mata bg-mata/10 px-2 py-0.5 rounded">
                      {item.pontos}/{item.maximo} pts
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{item.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-ouro/10 border border-ouro/20 rounded-lg p-6 mb-8 flex items-start gap-4">
        <IconBulb className="text-ouro shrink-0 mt-1" size={24} />
        <div>
          <h3 className="font-bold text-gray-800 mb-2">Recomendações (IA):</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {result.recomendacoes.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center">
        <Link href="/painel" className="btn-primary inline-flex">
          Ir para meu Painel
        </Link>
      </div>
    </div>
  );
}
