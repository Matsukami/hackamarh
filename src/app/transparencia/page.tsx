'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { IconMap, IconChartPie, IconUsers, IconLeaf, IconArrowRight } from '@tabler/icons-react';
import { TocantinsMap } from '@/components/transparencia/TocantinsMap';

export default function TransparenciaHubPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-3 font-sora text-4xl font-bold text-cerrado-profundo">
          Portal da Transparência — JREDD+
        </h1>
        <p className="max-w-3xl font-dm-sans text-lg text-gray-600">
          Acompanhe em tempo real a alocação de recursos, a execução de projetos e os impactos
          sociais e ambientais no estado do Tocantins.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Main Map Section (spans 3 columns) */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] overflow-hidden border border-gray-200 shadow-md">
            <TocantinsMap />
          </Card>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              * Clique em uma região para ampliar e ver os projetos.
            </p>
            <Link
              href="/transparencia/mapa"
              className="flex items-center gap-2 text-sm font-bold text-mata-alta transition-colors hover:text-cerrado-profundo"
            >
              Ver mapa em tela cheia <IconArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Sidebar Navigation Cards */}
        <div className="flex flex-col gap-4">
          <Link href="/transparencia/dashboard" className="group block">
            <Card className="relative overflow-hidden border border-gray-200 transition-all duration-300 group-hover:border-mata-alta group-hover:shadow-md">
              <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-mata-alta/10 transition-colors group-hover:bg-mata-alta/20"></div>
              <CardContent className="p-6">
                <IconChartPie size={32} className="mb-4 text-mata-alta" />
                <h3 className="mb-2 font-sora text-lg font-bold text-cerrado-profundo">
                  Dashboard de Repartição
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Distribuição de recursos por janela de financiamento e região.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-mata-alta">
                  Acessar painel{' '}
                  <IconArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/transparencia/dashboard" className="group block">
            <Card className="relative overflow-hidden border border-gray-200 transition-all duration-300 group-hover:border-buriti-vivo group-hover:shadow-md">
              <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-buriti-vivo/20 transition-colors group-hover:bg-buriti-vivo/30"></div>
              <CardContent className="p-6">
                <IconUsers size={32} className="mb-4 text-buriti-vivo" />
                <h3 className="mb-2 font-sora text-lg font-bold text-cerrado-profundo">
                  Indicadores Sociais
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Dados sobre mulheres, jovens e comunidades tradicionais.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-buriti-vivo">
                  Ver indicadores{' '}
                  <IconArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/transparencia/dashboard" className="group block">
            <Card className="relative overflow-hidden border border-gray-200 transition-all duration-300 group-hover:border-ouro-tocantins group-hover:shadow-md">
              <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-ouro-tocantins/20 transition-colors group-hover:bg-ouro-tocantins/30"></div>
              <CardContent className="p-6">
                <IconLeaf size={32} className="mb-4 text-ouro-tocantins" />
                <h3 className="mb-2 font-sora text-lg font-bold text-cerrado-profundo">
                  Performance Ambiental
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Redução de focos de calor e áreas de conservação mantidas.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-ouro-tocantins">
                  Ver resultados{' '}
                  <IconArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
