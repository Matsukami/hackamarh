import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  IconAlertTriangle,
  IconCalendar,
  IconFingerprint,
  IconUpload,
  IconReceipt,
  IconMessage,
  IconCash,
} from '@tabler/icons-react';

export const revalidate = 0;

export default async function PainelPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch projects (mock if empty)
  const { data: projetos } = await supabase
    .from('projetos')
    .select('*')
    .eq('usuario_id', user?.id || '');

  // For the MVP Presentation, we will always show a mock project if the user has none
  const hasProjects = projetos && projetos.length > 0;

  const mockProjeto = {
    id: 'mock-prn-2024',
    titulo: 'Projeto Reflorestamento Nascentes (PRN-2024)',
    status: 'em_analise',
    numero_car: 'TO-12345678901234-1234567',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  };

  const displayProjeto = hasProjects ? projetos[0] : mockProjeto;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="mb-2 font-sora text-4xl font-bold text-cerrado-profundo">
            Painel do Proponente
          </h1>
          <p className="font-dm-sans text-lg text-gray-600">
            Acompanhe o status e a execução dos seus projetos.
          </p>
        </div>

        <div className="w-full md:w-auto">
          <select className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 font-bold text-cerrado-profundo focus:border-mata-alta focus:ring-4 focus:ring-mata-alta/25 md:w-80">
            <option>{displayProjeto.titulo}</option>
            {!hasProjects && <option>Implementação Agroflorestal (IA-2023)</option>}
          </select>
        </div>
      </div>

      {/* Notification Banner */}
      <div className="mb-8 flex items-start gap-4 rounded-xl border border-red-200 bg-red-50 p-4">
        <IconAlertTriangle size={24} className="mt-0.5 shrink-0 text-red-600" />
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-red-800">Pendência: Aguarda o número do CAR</h3>
          <p className="text-red-700">
            Por favor, atualize o Cadastro Ambiental Rural para dar continuidade à análise da sua
            proposta.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-red-100 bg-white px-3 py-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">Prazo</span>
          <span className="text-sm font-bold text-red-600">15 dias</span>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Status */}
        <Card className="relative overflow-hidden border-0 bg-areia-jalapao shadow-lg lg:col-span-2">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-mata-alta/10 blur-3xl"></div>
          <CardContent className="relative z-10 p-8">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">
              Status Atual
            </span>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-4 w-4 rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.5)]"></span>
              <h2 className="font-sora text-3xl font-bold text-cerrado-profundo">
                Sua proposta está em análise
              </h2>
            </div>
            <p className="mb-8 max-w-2xl text-gray-700">
              Nossa equipe técnica está avaliando a documentação enviada. Fique atento às
              notificações para possíveis ajustes ou solicitações de evidências.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/50 px-4 py-2">
                <IconCalendar size={18} className="text-gray-500" />
                <span className="text-sm font-bold text-cerrado-profundo">
                  Enviado: {new Date(displayProjeto.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/50 px-4 py-2">
                <IconFingerprint size={18} className="text-gray-500" />
                <span className="text-sm font-bold text-cerrado-profundo">ID: PRN-2024-089</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-cerrado-profundo">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button
              variant="primary"
              className="text-md group h-14 w-full justify-start px-6 font-bold"
            >
              <div className="flex flex-grow items-center gap-3">
                <IconUpload size={20} />
                <span>Enviar Evidências (T-05)</span>
              </div>
              <span className="opacity-50 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                &rarr;
              </span>
            </Button>
            <Button
              variant="secondary"
              className="text-md group h-14 w-full justify-start px-6 font-bold"
            >
              <div className="flex flex-grow items-center gap-3">
                <IconReceipt size={20} />
                <span>Lançar Despesas (T-06)</span>
              </div>
              <span className="opacity-50 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                &rarr;
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Installment Schedule */}
        <Card className="border border-gray-200 shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50 p-6">
            <h3 className="flex items-center gap-2 font-sora text-lg font-bold text-cerrado-profundo">
              <IconCash size={20} /> Cronograma de Parcelas
            </h3>
          </div>
          <div className="overflow-x-auto p-0">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="p-4">Parcela</th>
                  <th className="p-4">Data Prevista</th>
                  <th className="p-4">Valor</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="p-4 font-bold">01 - Inicial</td>
                  <td className="p-4 text-gray-500">15/11/2024</td>
                  <td className="p-4">R$ 50.000,00</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span> Bloqueada
                    </span>
                  </td>
                </tr>
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="p-4 font-bold">02 - Execução</td>
                  <td className="p-4 text-gray-500">15/02/2025</td>
                  <td className="p-4">R$ 120.000,00</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span> Bloqueada
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Communication History */}
        <Card className="flex h-[400px] flex-col border border-gray-200 shadow-sm">
          <div className="flex-shrink-0 border-b border-gray-200 bg-gray-50 p-6">
            <h3 className="flex items-center gap-2 font-sora text-lg font-bold text-cerrado-profundo">
              <IconMessage size={20} /> Histórico de Comunicação
            </h3>
          </div>
          <div className="flex-grow space-y-6 overflow-y-auto bg-gray-50 p-6">
            {/* Message from Fiscal Agent */}
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cerrado-profundo text-xs font-bold text-white">
                AF
              </div>
              <div className="relative rounded-2xl rounded-tl-none border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-1 flex items-baseline justify-between gap-4">
                  <span className="text-sm font-bold text-cerrado-profundo">
                    Agente Fiscal (Sistema)
                  </span>
                  <span className="text-xs text-gray-500">Ontem, 14:30</span>
                </div>
                <p className="text-sm text-gray-700">
                  Identificamos que o número do CAR preenchido na seção 3 difere do documento
                  anexado. Por favor, verifique e atualize no sistema.
                </p>
              </div>
            </div>

            {/* System Event */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-bold text-gray-500 shadow-sm">
                Status alterado para "Em Análise"
              </div>
            </div>

            {/* Message from Proponent */}
            <div className="flex flex-row-reverse items-start gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-mata-alta text-xs font-bold text-white">
                VO
              </div>
              <div className="relative rounded-2xl rounded-tr-none border border-gray-200 bg-white p-4 text-right shadow-sm">
                <div className="mb-1 flex items-baseline justify-end gap-4">
                  <span className="text-xs text-gray-500">12/10/2024, 09:15</span>
                  <span className="text-sm font-bold text-cerrado-profundo">Você</span>
                </div>
                <p className="text-sm text-gray-700">
                  Proposta enviada com todos os anexos obrigatórios.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
