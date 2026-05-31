'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  IconArrowLeft, 
  IconReceipt, 
  IconSparkles, 
  IconCurrencyDollar, 
  IconCheck, 
  IconAlertTriangle, 
  IconAlertCircle 
} from '@tabler/icons-react';
import { fetchFinanceiroProjeto, processarNotaFiscalOCR, DespesaItem } from '@/lib/services/despesaService';

interface PageProps {
  params: {
    projetoId: string;
  };
}

export default function DespesasProjetoPage({ params }: PageProps) {
  const [resumo, setResumo] = useState({ totalRecebido: 0, totalGasto: 0, saldoDisponivel: 0 });
  const [despesas, setDespesas] = useState<DespesaItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulacaoOcr, setSimulacaoOcr] = useState<'sucesso' | 'erro_limite'>('sucesso');
  const [resultadoOCR, setResultadoOCR] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchFinanceiroProjeto(params.projetoId);
      setResumo(data.resumo);
      setDespesas(data.despesas);
    }
    loadData();
  }, [params.projetoId]);

  const handleUploadNota = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResultadoOCR(null);

    // Roda a simulação do OCR
    const res = await processarNotaFiscalOCR(
      'parc-2',
      'https://example.com/notafiscal.pdf',
      simulacaoOcr === 'erro_limite'
    );

    setResultadoOCR(res);

    if (res.sucesso) {
      // Adiciona na lista local para exibição visual
      const novaDespesa: DespesaItem = {
        id: `desp-mock-${Date.now()}`,
        cnpj: res.cnpj,
        razaoSocial: res.razaoSocial,
        valor: res.valor,
        dataEmissao: new Date().toLocaleDateString('pt-BR'),
        descricao: `Compra de: ${res.itens.join(', ')}`,
        validadoIARisk: true,
        status: 'aprovado'
      };

      setDespesas(prev => [novaDespesa, ...prev]);
      setResumo(prev => ({
        ...prev,
        totalGasto: prev.totalGasto + res.valor,
        saldoDisponivel: prev.saldoDisponivel - res.valor
      }));
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-areia min-h-screen">
      <Link href={`/projetos/${params.projetoId}/execucao`} className="inline-flex items-center gap-2 text-cerrado hover:underline mb-8 font-semibold">
        <IconArrowLeft size={20} />
        Voltar para a Execução
      </Link>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-hero text-cerrado font-bold">Gestão de Despesas</h1>
          <p className="text-gray-600 font-body">Submissão e prestação de contas de notas fiscais vinculadas ao projeto.</p>
        </div>
      </div>

      {/* Grid Financeiro */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg border border-areia-dark flex items-center gap-4 shadow-sm">
          <div className="bg-mata/10 p-3 rounded-full text-mata">
            <IconCurrencyDollar size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Recebido (Pago)</p>
            <p className="text-2xl font-bold text-gray-800">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resumo.totalRecebido)}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-areia-dark flex items-center gap-4 shadow-sm">
          <div className="bg-cerrado/10 p-3 rounded-full text-cerrado">
            <IconReceipt size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Total Comprovado</p>
            <p className="text-2xl font-bold text-gray-800">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resumo.totalGasto)}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-areia-dark flex items-center gap-4 shadow-sm">
          <div className="bg-ouro/10 p-3 rounded-full text-ouro">
            <IconAlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Saldo a Comprovar</p>
            <p className="text-2xl font-bold text-gray-800">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resumo.saldoDisponivel)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Histórico de Despesas */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-areia-dark p-6 shadow-sm">
          <h2 className="text-h2 text-cerrado mb-6 font-bold">Comprovantes Enviados</h2>
          
          <div className="space-y-4">
            {despesas.map((d) => (
              <div key={d.id} className="flex justify-between items-center p-4 rounded-lg border border-gray-100 hover:border-areia-dark transition-all">
                <div>
                  <h3 className="font-bold text-gray-800">{d.razaoSocial}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">CNPJ: {d.cnpj} • Emissão: {d.dataEmissao}</p>
                  <p className="text-sm text-gray-600 mt-2">{d.descricao}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-cerrado text-lg">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(d.valor)}
                  </p>
                  <span className="inline-flex items-center gap-0.5 bg-mata/10 text-mata px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-2">
                    <IconCheck size={10} />
                    Validado IA
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enviar Novo Comprovante */}
        <div className="bg-white rounded-lg border border-areia-dark p-6 shadow-sm h-fit">
          <h2 className="text-h3 text-cerrado mb-4 font-bold">Lançar Nota Fiscal</h2>
          <p className="text-sm text-gray-500 mb-6">Arraste a nota fiscal em PDF/Imagem para extrairmos os dados com OCR.</p>

          <form onSubmit={handleUploadNota} className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-cerrado transition-colors">
              <IconReceipt className="text-gray-400 mx-auto mb-2" size={32} />
              <span className="text-sm font-semibold text-gray-600 block">Selecionar arquivo PDF</span>
              <span className="text-xs text-gray-400">Tamanho máximo: 10MB</span>
            </div>

            {/* Configuração de Simulação OCR */}
            <div className="p-4 bg-ouro/5 border border-ouro/20 rounded">
              <h4 className="font-bold text-gray-800 text-xs flex items-center gap-1 mb-2">
                <IconSparkles size={14} className="text-ouro" />
                Simular Leitura OCR
              </h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input 
                    type="radio" 
                    name="simulacaoOcr" 
                    value="sucesso"
                    checked={simulacaoOcr === 'sucesso'}
                    onChange={() => setSimulacaoOcr('sucesso')}
                  />
                  Nota de R$ 15.000,00 (OK)
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input 
                    type="radio" 
                    name="simulacaoOcr" 
                    value="erro_limite"
                    checked={simulacaoOcr === 'erro_limite'}
                    onChange={() => setSimulacaoOcr('erro_limite')}
                  />
                  Nota de R$ 95.000,00 (Estoura Saldo)
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex justify-center items-center gap-2"
            >
              {isSubmitting ? 'Processando OCR...' : 'Processar Nota Fiscal'}
            </button>
          </form>

          {/* Resultado do OCR */}
          {resultadoOCR && (
            <div className="mt-6 p-4 rounded border">
              {resultadoOCR.sucesso ? (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-mata flex items-center gap-1">
                    <IconCheck size={16} /> Nota Processada com Sucesso!
                  </p>
                  <p className="text-xs text-gray-600"><strong>Fornecedor:</strong> {resultadoOCR.razaoSocial}</p>
                  <p className="text-xs text-gray-600"><strong>CNPJ:</strong> {resultadoOCR.cnpj}</p>
                  <p className="text-xs text-gray-600"><strong>Valor Extraído:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resultadoOCR.valor)}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-perigo flex items-center gap-1">
                    <IconAlertTriangle size={16} /> Bloqueio de Segurança Financeira
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    A nota de <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resultadoOCR.valor)}</strong> excede o saldo a comprovar de <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resumo.saldoDisponivel)}</strong>. Lançamento recusado.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
