'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  IconCheck,
  IconChecks,
  IconChartLine,
  IconLeaf,
  IconArrowRight,
  IconEdit,
} from '@tabler/icons-react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export default function ScorecardPage() {
  const targetScore = 82;
  const [score, setScore] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Easing function (easeOutQuad)
      const easeOut = 1 - (1 - progress) * (1 - progress);
      setScore(Math.round(targetScore * easeOut));

      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetScore]);

  // Dynamic Color
  const getColor = (val: number) => {
    if (val >= 80) return '#C8E063'; // buriti-vivo
    if (val >= 60) return '#FCD34D'; // amber-300
    return '#F87171'; // red-400
  };

  const currentColor = getColor(score);

  const data = [
    {
      name: 'Score',
      value: score,
      fill: currentColor,
    },
  ];

  return (
    <div className="container mx-auto flex max-w-4xl flex-col items-center px-4 py-12">
      <Card className="relative w-full overflow-hidden border-none bg-cerrado-profundo text-white shadow-2xl">
        <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-mata-alta opacity-30 blur-3xl"></div>

        <CardContent className="relative z-10 p-8 sm:p-12">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-400 animate-in fade-in zoom-in duration-700">
              Análise Preditiva de Proposta
            </p>
            <h2 className="font-sora text-3xl font-bold text-white animate-in slide-in-from-bottom-3 duration-500 delay-100">Scorecard de Viabilidade</h2>
          </div>

          <div className="mb-12 flex flex-col items-center justify-center gap-12 md:flex-row">
            {/* Radial Chart */}
            <div className="relative flex h-56 w-56 items-center justify-center animate-in zoom-in duration-1000">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="80%"
                  outerRadius="100%"
                  barSize={12}
                  data={data}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar
                    background={{ fill: '#396756' }}
                    dataKey="value"
                    cornerRadius={10}
                    animationDuration={1500}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-sora text-6xl font-bold transition-colors duration-500" style={{ color: currentColor }}>
                  {score}
                </span>
                <span className="text-sm font-bold text-gray-400">/ 100</span>
              </div>
            </div>

            {/* Score Interpretation */}
            <div className="max-w-xs text-center md:text-left animate-in slide-in-from-right-8 duration-700 delay-500 fill-mode-backwards">
              <div className="mb-4 inline-flex items-center rounded-full border border-mata-alta bg-mata-alta/30 px-3 py-1">
                <span className="mr-2 h-2 w-2 rounded-full transition-colors duration-500" style={{ backgroundColor: currentColor }}></span>
                <span className="text-sm font-bold transition-colors duration-500" style={{ color: currentColor }}>
                  {score >= 80 ? 'Alta Viabilidade' : score >= 60 ? 'Média Viabilidade' : 'Baixa Viabilidade'}
                </span>
              </div>
              <p className="font-dm-sans text-base text-gray-300">
                A proposta demonstra um forte alinhamento com os critérios do Fundo Climático.
                Pequenos ajustes na seção de impacto podem elevar a pontuação.
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-gray-300">
                  <IconCheck size={18} /> Elegibilidade
                </span>
                <span className="text-sm font-bold text-white">100%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-700">
                <div className="h-full bg-mata-alta" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-gray-300">
                  <IconChecks size={18} /> Completude
                </span>
                <span className="text-sm font-bold text-white">95%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-700">
                <div className="h-full bg-mata-alta" style={{ width: '95%' }}></div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-gray-300">
                  <IconChartLine size={18} /> Impacto Estimado
                </span>
                <span className="text-sm font-bold text-areia-jalapao">65%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-700">
                <div className="h-full bg-areia-jalapao" style={{ width: '65%' }}></div>
              </div>
              <p className="mt-2 text-xs text-gray-400">Requer detalhamento das métricas de CO2.</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-gray-300">
                  <IconLeaf size={18} /> Alinhamento Estratégico
                </span>
                <span className="text-sm font-bold text-white">88%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-700">
                <div className="h-full bg-mata-alta" style={{ width: '88%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <Link href="/inscricao">
              <Button
                variant="secondary"
                className="w-full gap-2 border-gray-500 bg-transparent text-gray-300 hover:bg-white/10 sm:w-auto"
              >
                <IconEdit size={18} /> Voltar e Melhorar
              </Button>
            </Link>
            <Link href="/painel">
              <Button variant="primary" className="w-full gap-2 sm:w-auto">
                Confirmar Submissão <IconArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
