import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  IconCamera,
  IconChartBar,
  IconReceipt,
  IconCheck,
  IconAlertTriangle,
  IconLocation,
  IconClock,
  IconEye,
  IconEdit,
  IconChecklist,
} from '@tabler/icons-react';

export default function ValidacaoPrestacaoPage() {
  return (
    <div className="container mx-auto max-w-[1400px] px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase text-gray-500">
            <span>Projeto ECO-2024-089</span>
            <span>&gt;</span>
            <span>Prestação de Contas</span>
            <span>&gt;</span>
            <span className="text-mata-alta">Parcela 03</span>
          </div>
          <h1 className="mb-1 font-sora text-3xl font-bold text-cerrado-profundo">
            Validação de Conta: Parcela 03
          </h1>
          <p className="font-dm-sans text-gray-600">
            Analise as evidências, o progresso físico e os comprovantes de despesa para aprovação.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-3 py-2">
            <IconClock size={18} className="text-gray-500" />
            <span className="text-sm font-bold text-gray-600">Submetido: 12/10/2024</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-ouro-tocantins/30 bg-orange-50 px-3 py-2">
            <IconAlertTriangle size={18} className="text-ouro-tocantins" />
            <span className="text-sm font-bold text-ouro-tocantins">SLA: 3 dias restantes</span>
          </div>
        </div>
      </div>

      {/* 3 Panels */}
      <div className="mb-8 grid h-full grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Panel 1: Evidências de Campo */}
        <Card className="flex h-[600px] flex-col border-gray-200 shadow-md">
          <CardHeader className="shrink-0 border-b border-gray-100 bg-gray-50 py-4">
            <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase text-cerrado-profundo">
              <IconCamera size={20} className="text-mata-alta" /> Evidências de Campo
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 space-y-4 overflow-y-auto bg-gray-50/50 p-4">
            {/* Photo 1 */}
            <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="relative h-48 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Plantio"
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-2 top-2 flex items-center gap-1 rounded bg-buriti-vivo px-2 py-1 text-xs font-bold text-cerrado-profundo shadow-md">
                  <IconCheck size={14} /> Autêntico
                </div>
              </div>
              <div className="p-3">
                <p className="mb-2 text-sm font-bold text-cerrado-profundo">
                  Plantio - Setor Norte
                </p>
                <div className="mb-1 flex items-center gap-1 text-xs text-gray-500">
                  <IconLocation size={14} /> -15.7938, -47.8827 (Precisão: 3m)
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <IconClock size={14} /> 10/10/2024 14:32 BRT
                </div>
              </div>
            </div>

            {/* Photo 2 */}
            <div className="group overflow-hidden rounded-lg border-2 border-red-200 bg-white shadow-sm">
              <div className="relative h-48 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Cerca"
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-2 top-2 flex items-center gap-1 rounded border border-red-200 bg-red-100 px-2 py-1 text-xs font-bold text-red-700 shadow-md">
                  <IconAlertTriangle size={14} /> Suspeito: Coordenadas
                </div>
              </div>
              <div className="p-3">
                <p className="mb-2 text-sm font-bold text-cerrado-profundo">Isolamento de Área</p>
                <div className="mb-1 flex items-center gap-1 text-xs font-bold text-red-600">
                  <IconLocation size={14} /> -16.1234, -48.1122 (&gt;50km do polígono)
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <IconClock size={14} /> 09/10/2024 09:15 BRT
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Panel 2: Progresso Físico */}
        <Card className="flex h-[600px] flex-col border-gray-200 shadow-md">
          <CardHeader className="flex shrink-0 flex-row items-center justify-between space-y-0 border-b border-gray-100 bg-gray-50 py-4">
            <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase text-cerrado-profundo">
              <IconChartBar size={20} className="text-mata-alta" /> Progresso Físico
            </CardTitle>
            <span className="text-xs font-bold text-gray-500">Meta Global: 60%</span>
          </CardHeader>
          <CardContent className="flex-1 space-y-6 overflow-y-auto p-5">
            {/* Item 1 */}
            <div>
              <div className="mb-2 flex items-end justify-between">
                <div>
                  <span className="block text-xs font-bold uppercase text-gray-400">Ação 1.1</span>
                  <p className="text-sm font-bold text-cerrado-profundo">
                    Plantio de Mudas Nativas
                  </p>
                </div>
                <span className="text-xs font-bold text-mata-alta">15.000 / 20.000 un.</span>
              </div>
              <div className="mb-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full bg-mata-alta" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-500">
                <span>Declarado: 75%</span>
                <span>Contratado: 70% (Alinhado)</span>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Item 2 */}
            <div>
              <div className="mb-2 flex items-end justify-between">
                <div>
                  <span className="block text-xs font-bold uppercase text-gray-400">Ação 1.2</span>
                  <p className="text-sm font-bold text-cerrado-profundo">Cercamento de APP</p>
                </div>
                <span className="text-xs font-bold text-ouro-tocantins">4.5 / 10 km</span>
              </div>
              <div className="mb-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full bg-ouro-tocantins" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-ouro-tocantins">Declarado: 45%</span>
                <span className="text-gray-500">Contratado: 60% (Atrasado)</span>
              </div>
              <div className="mt-3 flex gap-2 rounded border border-orange-100 bg-orange-50 p-2">
                <IconAlertTriangle size={16} className="shrink-0 text-orange-600" />
                <p className="text-xs text-orange-800">
                  Justificativa: Chuvas atípicas impediram acesso de maquinário.
                </p>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Parecer IA */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="mb-1 flex items-center gap-1 text-sm font-bold text-cerrado-profundo">
                <IconChecklist size={16} /> Parecer Técnico Prévio (IA)
              </h4>
              <p className="text-xs leading-relaxed text-gray-600">
                O avanço do plantio compensa o atraso no cercamento. Recomenda-se aprovação parcial
                do progresso físico, com ressalva para monitoramento intensivo da Ação 1.2 na
                próxima medição.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Panel 3: Reconciliação Financeira */}
        <Card className="flex h-[600px] flex-col border-gray-200 shadow-md">
          <CardHeader className="flex shrink-0 flex-row items-center justify-between space-y-0 border-b border-gray-100 bg-gray-50 py-4">
            <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase text-cerrado-profundo">
              <IconReceipt size={20} className="text-mata-alta" /> Financeiro
            </CardTitle>
            <span className="text-xs font-bold text-gray-500">Total: R$ 45.200,00</span>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            <table className="w-full text-left">
              <thead className="sticky top-0 border-b border-gray-200 bg-gray-50 text-xs font-bold uppercase text-gray-500">
                <tr>
                  <th className="p-3">Despesa</th>
                  <th className="p-3 text-right">Valor</th>
                  <th className="p-3 text-center">NF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                <tr className="hover:bg-gray-50">
                  <td className="p-3">
                    <p className="font-bold text-cerrado-profundo">Aquisição de Mudas</p>
                    <span className="text-xs text-gray-500">Viveiro Central Ltda</span>
                  </td>
                  <td className="p-3 text-right font-bold text-cerrado-profundo">R$ 25.000,00</td>
                  <td className="p-3 text-center">
                    <button className="text-mata-alta hover:text-cerrado-profundo">
                      <IconEye size={18} className="mx-auto" />
                    </button>
                  </td>
                </tr>
                <tr className="border-l-2 border-l-red-500 bg-red-50/30 hover:bg-red-50">
                  <td className="p-3">
                    <p className="font-bold text-cerrado-profundo">Serviço de Máquinas</p>
                    <span className="flex items-center gap-1 text-xs font-bold text-red-600">
                      <IconAlertTriangle size={12} /> Recibo não fiscal
                    </span>
                  </td>
                  <td className="p-3 text-right font-bold text-cerrado-profundo">R$ 12.500,00</td>
                  <td className="p-3 text-center">
                    <button className="text-red-600 hover:text-red-800">
                      <IconEye size={18} className="mx-auto" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-3">
                    <p className="font-bold text-cerrado-profundo">Materiais Isolamento</p>
                    <span className="text-xs text-gray-500">Arame e Mourões</span>
                  </td>
                  <td className="p-3 text-right font-bold text-cerrado-profundo">R$ 7.700,00</td>
                  <td className="p-3 text-center">
                    <button className="text-mata-alta hover:text-cerrado-profundo">
                      <IconEye size={18} className="mx-auto" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center justify-end gap-4 border-t border-gray-200 pt-6 sm:flex-row">
        <Button
          variant="secondary"
          className="h-12 w-full gap-2 border-gray-300 px-6 text-gray-700 sm:w-auto"
        >
          <IconEdit size={20} /> Solicitar Correção
        </Button>
        <Button
          variant="primary"
          className="h-12 w-full gap-2 bg-mata-alta px-8 text-white shadow-lg hover:bg-cerrado-profundo sm:w-auto"
        >
          <IconCheck size={20} /> Aprovar Parcela
        </Button>
      </div>
    </div>
  );
}
