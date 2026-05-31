'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  IconUsers,
  IconWoman,
  IconSchool,
  IconMap,
  IconDownload,
  IconTrendingUp,
  IconInfoCircle,
} from '@tabler/icons-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function TransparenciaPage() {
  const pieData = [
    { name: 'Terras Indígenas', value: 15820000, color: '#00261b' },
    { name: 'Agricultores Familiares', value: 13560000, color: '#1c2300' },
    { name: 'Quilombolas', value: 11300000, color: '#1a6b4a' },
    { name: 'Fortalecimento Institucional', value: 4520000, color: '#a0d1bc' },
  ];

  const barData = [
    { name: 'Jan', anoAnterior: 800, anoAtual: 600 },
    { name: 'Fev', anoAnterior: 700, anoAtual: 500 },
    { name: 'Mar', anoAnterior: 600, anoAtual: 400 },
    { name: 'Abr', anoAnterior: 400, anoAtual: 250 },
    { name: 'Mai', anoAnterior: 900, anoAtual: 700 },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 font-sora text-4xl font-bold text-cerrado-profundo">
            Dashboard de Repartição de Benefícios
          </h1>
          <p className="max-w-3xl font-dm-sans text-lg text-gray-600">
            Visão geral da alocação de recursos e impacto direto nas comunidades locais do estado do
            Tocantins.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-sm font-bold text-cerrado-profundo transition-colors hover:text-mata-alta">
            <IconMap size={20} /> Ver no mapa
          </button>
          <button className="flex items-center gap-2 rounded-full border border-gray-300 px-6 py-2 text-sm font-bold text-cerrado-profundo transition-colors hover:bg-gray-100">
            <IconDownload size={20} /> Exportar CSV
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="group relative overflow-hidden border border-gray-200 shadow-md transition-shadow hover:shadow-lg">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-cerrado-profundo/5"></div>
          <CardContent className="relative z-10 p-6">
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-sm font-bold uppercase text-gray-500">Total de Beneficiários</h3>
              <IconUsers className="text-cerrado-profundo" />
            </div>
            <p className="mb-2 font-sora text-5xl font-bold text-cerrado-profundo">14.285</p>
            <div className="flex items-center gap-2 text-sm font-bold text-mata-alta">
              <IconTrendingUp size={16} /> +12% no último trimestre
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border border-gray-200 shadow-md transition-shadow hover:shadow-lg">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-mata-alta/5"></div>
          <CardContent className="relative z-10 p-6">
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-sm font-bold uppercase text-gray-500">Mulheres Beneficiadas</h3>
              <IconWoman className="text-mata-alta" />
            </div>
            <p className="mb-2 font-sora text-5xl font-bold text-cerrado-profundo">7.850</p>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
              55% do total
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border border-gray-200 shadow-md transition-shadow hover:shadow-lg">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-buriti-vivo/20"></div>
          <CardContent className="relative z-10 p-6">
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-sm font-bold uppercase text-gray-500">Jovens Beneficiados</h3>
              <IconSchool className="text-buriti-vivo" />
            </div>
            <p className="mb-2 font-sora text-5xl font-bold text-cerrado-profundo">3.420</p>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
              24% do total (15 a 29 anos)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Card className="mb-12 border border-gray-200 shadow-md">
        <div className="border-b border-gray-100 p-8">
          <h2 className="font-sora text-2xl font-bold text-cerrado-profundo">
            Distribuição de Recursos por Janela Legal
          </h2>
        </div>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Pie Chart */}
            <div className="relative flex h-80 w-full items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `R$ ${(value as number).toLocaleString('pt-BR')}`}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xs font-bold uppercase text-gray-500">Total Distribuído</span>
                <span className="font-sora text-2xl font-bold text-cerrado-profundo">R$ 45.2M</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-4">
              {pieData.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border-l-4 bg-gray-50 p-4"
                  style={{ borderLeftColor: item.color }}
                >
                  <div>
                    <p className="font-bold text-cerrado-profundo">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.name === 'Terras Indígenas' && 'Comunidades originárias'}
                      {item.name === 'Agricultores Familiares' && 'Produção sustentável'}
                      {item.name === 'Quilombolas' && 'Comunidades tradicionais'}
                      {item.name === 'Fortalecimento Institucional' && 'Capacitação e infra'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-cerrado-profundo">
                      R$ {item.value.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-xs font-bold text-gray-500">
                      {((item.value / 45200000) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart Section */}
      <Card className="border border-gray-200 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-8">
          <h2 className="font-sora text-2xl font-bold text-cerrado-profundo">
            Performance Ecológica: Focos de Calor
          </h2>
          <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
            <IconInfoCircle size={14} /> Dados baseados no INPE
          </span>
        </div>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-6 md:col-span-1">
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="mb-1 text-xs font-bold uppercase text-gray-500">Redução Geral</h4>
                <p className="font-sora text-3xl font-bold text-mata-alta">-28%</p>
                <p className="mt-2 text-xs text-gray-500">
                  Comparado ao mesmo período do ano anterior
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="mb-1 text-xs font-bold uppercase text-gray-500">Área Monitorada</h4>
                <p className="font-sora text-3xl font-bold text-cerrado-profundo">2.4M ha</p>
                <p className="mt-2 text-xs text-gray-500">Territórios com projetos ativos</p>
              </div>
            </div>

            <div className="h-72 md:col-span-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip cursor={{ fill: '#f3f4f6' }} />
                  <Legend
                    iconType="square"
                    align="right"
                    verticalAlign="top"
                    wrapperStyle={{ paddingBottom: '20px' }}
                  />
                  <Bar
                    dataKey="anoAnterior"
                    name="Ano Anterior"
                    fill="#e5e7eb"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                  <Bar
                    dataKey="anoAtual"
                    name="Ano Atual"
                    fill="#0B3D2E"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
