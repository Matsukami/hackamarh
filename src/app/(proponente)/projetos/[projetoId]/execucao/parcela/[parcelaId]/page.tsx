'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  IconArrowLeft, 
  IconCloudUpload, 
  IconMapPin, 
  IconShieldCheck, 
  IconSparkles 
} from '@tabler/icons-react';
import { processarUploadEvidencia } from '@/lib/services/evidenciaService';

interface PageProps {
  params: {
    projetoId: string;
    parcelaId: string;
  };
}

export default function UploadEvidenciaPage({ params }: PageProps) {
  const router = useRouter();
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState<'foto' | 'documento' | 'relatorio'>('foto');
  const [simulacaoGps, setSimulacaoGps] = useState<'correto' | 'incorreto' | 'sem_gps'>('correto');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Configura coordenadas artificiais baseadas na simulação para rodar o motor
    let gpsData = undefined;
    if (simulacaoGps === 'correto') {
      gpsData = { lat: -10.123900, lng: -48.123800, data_exif: new Date().toISOString() };
    } else if (simulacaoGps === 'incorreto') {
      gpsData = { lat: -23.550500, lng: -46.633300, data_exif: new Date().toISOString() }; // Coordenadas de SP
    }

    // Processa a submissão
    await processarUploadEvidencia(
      params.projetoId,
      params.parcelaId,
      tipo,
      tipo === 'foto' ? 'https://images.unsplash.com/photo-1448375240586-882707db888b' : 'https://example.com/doc.pdf',
      descricao,
      gpsData,
      -10.123456, // latRef do projeto
      -48.123456  // lngRef do projeto
    );

    alert("Evidência enviada e analisada pelo motor de IA!");
    router.push(`/projetos/${params.projetoId}/execucao`);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 bg-areia min-h-screen">
      <Link href={`/projetos/${params.projetoId}/execucao`} className="inline-flex items-center gap-2 text-cerrado hover:underline mb-8 font-semibold">
        <IconArrowLeft size={20} />
        Voltar para a Execução
      </Link>

      <div className="bg-white rounded-lg border border-areia-dark p-8 shadow-sm">
        <h1 className="text-hero text-cerrado font-bold mb-2">Enviar Comprovação Física</h1>
        <p className="text-gray-600 mb-8">
          Envie imagens ou documentos que atestem a realização das metas desta parcela. O sistema extrairá dados de GPS automaticamente.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-cerrado mb-2">Tipo de Evidência</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="tipo" 
                  value="foto" 
                  checked={tipo === 'foto'} 
                  onChange={() => setTipo('foto')}
                />
                Foto Campo
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="tipo" 
                  value="documento" 
                  checked={tipo === 'documento'} 
                  onChange={() => setTipo('documento')}
                />
                Nota Fiscal / Documento
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-cerrado mb-2">Descrição dos Trabalhos Realizados</label>
            <textarea
              required
              className="input-field min-h-[100px]"
              placeholder="Descreva detalhadamente o que foi executado..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          {/* Simulador Interativo para o Pitch */}
          {tipo === 'foto' && (
            <div className="p-5 border-2 border-ouro border-dashed rounded bg-ouro/5">
              <h3 className="font-bold text-gray-800 flex items-center gap-1.5 mb-2 text-sm">
                <IconSparkles size={18} className="text-ouro" />
                Painel de Simulação (Para Apresentação do Pitch)
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                Como as fotos reais extraem dados de GPS internos (EXIF), selecione abaixo o cenário que quer simular:
              </p>
              
              <div className="space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer text-sm">
                  <input 
                    type="radio" 
                    name="simulacao" 
                    value="correto"
                    checked={simulacaoGps === 'correto'}
                    onChange={() => setSimulacaoGps('correto')}
                    className="mt-0.5"
                  />
                  <div>
                    <span className="font-semibold text-gray-800 block">Cenário A: Foto Válida (Dentro da Propriedade)</span>
                    <span className="text-xs text-gray-500">Simula GPS exato do local do projeto. IA classificará como "Autêntica".</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-sm">
                  <input 
                    type="radio" 
                    name="simulacao" 
                    value="incorreto"
                    checked={simulacaoGps === 'incorreto'}
                    onChange={() => setSimulacaoGps('incorreto')}
                    className="mt-0.5"
                  />
                  <div>
                    <span className="font-semibold text-gray-800 block">Cenário B: Foto de Outra Região (Risco de Fraude)</span>
                    <span className="text-xs text-gray-500">Simula GPS em outra cidade (ex: Palmas ou SP). O validador pegará o desvio de distância e marcará como "Suspeita".</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-sm">
                  <input 
                    type="radio" 
                    name="simulacao" 
                    value="sem_gps"
                    checked={simulacaoGps === 'sem_gps'}
                    onChange={() => setSimulacaoGps('sem_gps')}
                    className="mt-0.5"
                  />
                  <div>
                    <span className="font-semibold text-gray-800 block">Cenário C: Foto Sem Metadados de Localização</span>
                    <span className="text-xs text-gray-500">Sem coordenadas embutidas. Marcado como "Suspeita" por violação de transparência.</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <IconShieldCheck size={16} />
              Salvaguardas de integridade física e georreferenciamento ativas.
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? 'Analisando Evidência...' : 'Anexar e Validar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
