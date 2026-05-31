import Link from 'next/link';
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
  IconChartLine,
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
      <div className="animate-in slide-in-from-top-4 mb-8 flex items-start gap-4 rounded-xl border-y border-l-4 border-r border-red-200 border-l-red-600 bg-red-50 p-4 shadow-sm">
        <div className="relative">
          <IconAlertTriangle size={24} className="mt-0.5 shrink-0 text-red-600" />
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
          </span>
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-red-800">Pendência: Aguarda o número do CAR</h3>
          <p className="text-red-700">
            Por favor, atualize o Cadastro Ambiental Rural para dar continuidade à análise da sua
            proposta.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-red-200 bg-white px-4 py-2 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">Prazo</span>
          <span className="text-lg font-black text-red-600">15 dias</span>
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
            <Link href="/inscricao/scorecard">
              <Button
                variant="secondary"
                className="text-md group h-14 w-full justify-start border-buriti-vivo px-6 font-bold text-buriti-vivo hover:bg-buriti-vivo/10"
              >
                <div className="flex flex-grow items-center gap-3">
                  <IconChartLine size={20} />
                  <span>Ver Scorecard Preditivo (T-03)</span>
                </div>
                <span className="opacity-50 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                  &rarr;
                </span>
              </Button>
            </Link>
            <Link href="/painel/prestacao/evidencias">
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
            </Link>
            <Link href="/painel/prestacao/despesas">
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
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Installment Schedule */}
        <Card className="border border-gray-200 shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50 p-6">
            <h3 className="flex items-center gap-2 font-sora text-lg font-bold text-cerrado-profundo">
              <IconCash size={20} className="text-mata-alta" /> Cronograma de Parcelas
            </h3>
          </div>
          <div className="p-6">
            <div className="relative ml-3 space-y-8 border-l-2 border-gray-200">
              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 ring-4 ring-white">
                  <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                </span>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-cerrado-profundo">01 - Inicial</h4>
                    <p className="mt-1 text-xs text-gray-500">Previsão: 15/11/2024</p>
                    <p className="mt-2 w-fit rounded border border-gray-100 bg-gray-50 px-2 py-1 text-sm text-gray-700">
                      <span className="mb-0.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Meta Física Vinculada
                      </span>
                      Implantação de Viveiro (100%)
                    </p>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <p className="font-bold text-gray-700">R$ 50.000,00</p>
                    <span className="mt-1 inline-block rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                      Bloqueada
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 ring-4 ring-white">
                  <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                </span>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-cerrado-profundo">02 - Execução</h4>
                    <p className="mt-1 text-xs text-gray-500">Previsão: 15/02/2025</p>
                    <p className="mt-2 w-fit rounded border border-gray-100 bg-gray-50 px-2 py-1 text-sm text-gray-700">
                      <span className="mb-0.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Meta Física Vinculada
                      </span>
                      Plantio de 10.000 Mudas Nativas
                    </p>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <p className="font-bold text-gray-700">R$ 120.000,00</p>
                    <span className="mt-1 inline-block rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                      Bloqueada
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Communication History */}
        <Card className="flex h-[450px] flex-col border border-gray-200 shadow-sm">
          <div className="flex-shrink-0 border-b border-gray-200 bg-gray-50 p-6">
            <h3 className="flex items-center gap-2 font-sora text-lg font-bold text-cerrado-profundo">
              <IconMessage size={20} className="text-mata-alta" /> Histórico de Comunicação
            </h3>
          </div>
          <div className="flex-grow space-y-6 overflow-y-auto bg-gray-50/50 p-6">
            {/* Message from Fiscal Agent */}
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cerrado-profundo text-xs font-bold text-white shadow-sm">
                AF
              </div>
              <div className="relative rounded-2xl rounded-tl-none border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-1 flex items-baseline justify-between gap-4">
                  <span className="text-sm font-bold text-cerrado-profundo">Agente Fiscal</span>
                  <span className="text-[10px] uppercase text-gray-400">Ontem, 14:30</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">
                  Identificamos que o número do CAR preenchido na seção 3 difere do documento
                  anexado. Por favor, verifique e atualize no sistema.
                </p>
              </div>
            </div>

            <div className="my-4 flex justify-center">
              <div className="flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-bold text-yellow-700 shadow-sm">
                Status alterado para &quot;Com Pendência&quot;
              </div>
            </div>

            {/* Message from Proponent */}
            <div className="flex flex-row-reverse items-start gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-mata-alta text-xs font-bold text-white shadow-sm">
                VO
              </div>
              <div className="relative rounded-2xl rounded-tr-none border border-mata-alta/20 bg-mata-alta/5 p-4 text-right shadow-sm">
                <div className="mb-1 flex items-baseline justify-end gap-4">
                  <span className="text-[10px] uppercase text-gray-400">Hoje, 09:15</span>
                  <span className="text-sm font-bold text-cerrado-profundo">Você</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-800">
                  Documento atualizado conforme solicitado.
                </p>
              </div>
            </div>
          </div>
          {/* Reply Input */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite sua resposta..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-mata-alta focus:outline-none focus:ring-1 focus:ring-mata-alta"
              />
              <Button variant="primary" className="bg-mata-alta px-4 py-2 text-sm">
                Enviar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
