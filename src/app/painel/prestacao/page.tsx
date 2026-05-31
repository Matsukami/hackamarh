'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  IconUpload,
  IconReceipt,
  IconTrash,
  IconEye,
  IconAlertTriangle,
  IconSend,
} from '@tabler/icons-react';

export default function PrestacaoContasPage() {
  const [despesas, setDespesas] = useState([
    {
      id: 1,
      descricao: 'Locação de Trator (Horas/Máquina)',
      data: '2024-05-12',
      categoria: 'Custeio',
      valor: 15000,
      status: 'validado',
    },
    {
      id: 2,
      descricao: 'Mudas Nativas do Cerrado (Lote 1)',
      data: '2024-05-05',
      categoria: 'Custeio',
      valor: 42300,
      status: 'validado',
    },
    {
      id: 3,
      descricao: 'Equipamentos de EPI (Equipe Campo)',
      data: '2024-04-28',
      categoria: 'Capital',
      valor: 8150,
      status: 'pendente',
    },
  ]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 font-sora text-4xl font-bold text-cerrado-profundo">
          Prestação de Contas
        </h1>
        <p className="font-dm-sans text-lg text-gray-600">
          Lançamento de Despesas e Comprovantes — Projeto Reflorestamento Nascentes
        </p>
      </div>

      {/* Budget Summary */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border border-gray-200 shadow-md">
          <CardContent className="p-6">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">
              Valor Liberado
            </span>
            <span className="mb-4 block font-sora text-3xl font-bold text-cerrado-profundo">
              R$ 250.000,00
            </span>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-full bg-cerrado-profundo"></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-md">
          <CardContent className="p-6">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">
              Total Lançado
            </span>
            <span className="mb-4 block font-sora text-3xl font-bold text-mata-alta">
              R$ 65.450,00
            </span>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[26%] bg-mata-alta"></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-ouro-tocantins bg-ouro-tocantins/10 shadow-md">
          <CardContent className="p-6">
            <div className="mb-2 flex items-start justify-between">
              <span className="block text-xs font-bold uppercase tracking-wider text-ouro-tocantins">
                Saldo Restante
              </span>
              <IconAlertTriangle size={20} className="text-ouro-tocantins" />
            </div>
            <span className="mb-4 block font-sora text-3xl font-bold text-ouro-tocantins">
              R$ 184.550,00
            </span>
            <p className="text-xs font-bold text-ouro-tocantins">
              Atenção: Mantenha os comprovantes legíveis e organizados.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Form */}
        <Card className="sticky top-24 h-fit border border-gray-200 shadow-md lg:col-span-5">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="flex items-center gap-2 font-sora text-xl font-bold text-cerrado-profundo">
              <IconReceipt size={24} /> Novo Lançamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700">Descrição da Despesa</label>
              <Input placeholder="Ex: Aquisição de mudas nativas" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Valor (R$)</label>
                <Input placeholder="0,00" type="number" step="any" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Data da Nota</label>
                <Input type="date" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700">Categoria de Gasto *</label>
              <select className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-dm-sans text-sm focus:border-mata-alta focus:outline-none focus:ring-4 focus:ring-mata-alta/25">
                <option value="">Selecione a rubrica...</option>
                <option value="capital">Despesa de Capital (Equipamentos/Obras)</option>
                <option value="custeio">Despesa de Custeio (Serviços/Insumos)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700">Comprovante (NF/Recibo)</label>
              <div className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-mata-alta hover:bg-gray-50">
                <IconUpload
                  size={32}
                  className="mb-2 text-gray-400 transition-colors group-hover:text-mata-alta"
                />
                <span className="text-sm font-bold text-cerrado-profundo">
                  Clique para anexar ou arraste
                </span>
                <span className="mt-1 text-xs text-gray-500">PDF, JPG ou PNG (Max 5MB)</span>
                <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
              </div>
            </div>

            <Button
              variant="primary"
              className="text-md mt-4 h-12 w-full bg-buriti-vivo font-bold text-cerrado-profundo hover:bg-buriti-vivo/90"
            >
              Adicionar Lançamento
            </Button>
          </CardContent>
        </Card>

        {/* List */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div className="flex items-end justify-between">
            <h2 className="font-sora text-2xl font-bold text-cerrado-profundo">Itens Lançados</h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-600">
              3 Itens
            </span>
          </div>

          <Card className="overflow-hidden border border-gray-200 shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-xs font-bold uppercase text-gray-500">
                    <th className="w-12 p-4">St.</th>
                    <th className="p-4">Descrição & Data</th>
                    <th className="p-4">Categoria</th>
                    <th className="p-4 text-right">Valor</th>
                    <th className="w-24 p-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {despesas.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-gray-50">
                      <td className="p-4">
                        <div
                          className={`h-3 w-3 rounded-full ${item.status === 'validado' ? 'bg-mata-alta' : 'bg-ouro-tocantins'}`}
                          title={item.status}
                        ></div>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-cerrado-profundo">{item.descricao}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(item.data).toLocaleDateString('pt-BR')} • Recibo S/N
                        </p>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600">
                          {item.categoria}
                        </span>
                      </td>
                      <td className="p-4 text-right font-bold text-cerrado-profundo">
                        R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="flex justify-center gap-2 p-4">
                        <button className="text-gray-400 transition-colors hover:text-cerrado-profundo">
                          <IconEye size={20} />
                        </button>
                        <button className="text-gray-400 transition-colors hover:text-red-600">
                          <IconTrash size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Submit Action */}
          <Card className="mt-6 border-0 border-t-4 border-t-mata-alta bg-areia-jalapao shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <IconSend size={48} className="mb-4 text-mata-alta" />
              <h3 className="mb-2 font-sora text-xl font-bold text-cerrado-profundo">
                Finalizar Competência
              </h3>
              <p className="mb-6 max-w-md font-dm-sans text-gray-600">
                Verifique se todos os lançamentos e comprovantes estão corretos antes de enviar ao
                fiscal para análise.
              </p>
              <Button
                variant="primary"
                className="text-md group h-12 gap-2 px-8 font-bold shadow-lg"
              >
                Enviar relatório ao fiscal{' '}
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
