'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  IconUpload,
  IconPhoto,
  IconCheck,
  IconAlertTriangle,
  IconMapPin,
  IconCalendar,
  IconBrain,
} from '@tabler/icons-react';

export default function EvidenciasPage() {
  const [fotos, setFotos] = useState([
    {
      id: 1,
      nome: 'plantio_muda_1.jpg',
      url: 'https://images.unsplash.com/photo-1611843467160-25afb8df1074?q=80&w=2070&auto=format&fit=crop',
      data: '2024-05-15T09:30:00Z',
      gps: '-10.1234, -48.1234',
      status_ia: 'autentica',
    },
    {
      id: 2,
      nome: 'cerca_area_app.jpg',
      url: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=2000&auto=format&fit=crop',
      data: '2024-05-16T14:20:00Z',
      gps: '-10.1238, -48.1239',
      status_ia: 'pendente',
    },
  ]);

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    // Mocking file upload and EXIF extraction
    const newFoto = {
      id: Date.now(),
      nome: files[0].name,
      url: URL.createObjectURL(files[0]),
      data: new Date().toISOString(),
      gps: '-10.1250, -48.1245',
      status_ia: 'suspeita', // Simulando a detecção do modelo anti-IA no MVP
    };
    setFotos([newFoto, ...fotos]);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 font-sora text-4xl font-bold text-cerrado-profundo">
          Evidências de Execução
        </h1>
        <p className="font-dm-sans text-lg text-gray-600">
          Envie fotos do campo para comprovar o avanço físico do projeto. As imagens passarão por validação automática.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Upload Section */}
        <Card className="h-fit border border-gray-200 shadow-md lg:col-span-1">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="font-sora text-lg font-bold text-cerrado-profundo">
              Enviar Fotos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/jpeg, image/png"
                className="hidden"
                onChange={handleChange}
              />
              <label
                htmlFor="file-upload"
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all ${
                  dragActive
                    ? 'border-mata-alta bg-mata-alta/5 scale-[1.02]'
                    : 'border-gray-300 bg-gray-50 hover:border-mata-alta hover:bg-gray-50/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className={`mb-4 rounded-full p-4 ${dragActive ? 'bg-mata-alta text-white' : 'bg-white text-gray-400 shadow-sm'}`}>
                  <IconUpload size={32} />
                </div>
                <h3 className="mb-1 font-sora text-sm font-bold text-cerrado-profundo">
                  Arraste suas fotos aqui
                </h3>
                <p className="text-xs text-gray-500">Ou clique para procurar (JPG, PNG)</p>
              </label>
            </form>

            <div className="mt-6 rounded-lg bg-blue-50 p-4 border border-blue-100">
              <h4 className="flex items-center gap-2 font-bold text-blue-800 text-sm mb-1">
                <IconBrain size={18} /> Validação Inteligente
              </h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                Todas as imagens são analisadas automaticamente em busca de padrões de IA generativa e validadas contra o polígono GPS do seu projeto.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Gallery Section */}
        <Card className="border border-gray-200 shadow-md lg:col-span-2">
          <CardHeader className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="font-sora text-lg font-bold text-cerrado-profundo">
                Galeria de Evidências
              </CardTitle>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
                {fotos.length} fotos enviadas
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fotos.map((foto) => (
                <div key={foto.id} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-video w-full overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={foto.url}
                      alt={foto.nome}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-4">
                    <p className="mb-3 truncate text-sm font-bold text-cerrado-profundo" title={foto.nome}>
                      {foto.nome}
                    </p>
                    
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <IconCalendar size={14} className="text-gray-400" />
                        <span>{new Date(foto.data).toLocaleString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <IconMapPin size={14} className="text-gray-400" />
                        <span>GPS: {foto.gps}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Status</span>
                      {foto.status_ia === 'autentica' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20">
                          <IconCheck size={12} /> Autêntica
                        </span>
                      )}
                      {foto.status_ia === 'pendente' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-xs font-bold text-gray-600 ring-1 ring-inset ring-gray-500/20">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-500"></span> Analisando
                        </span>
                      )}
                      {foto.status_ia === 'suspeita' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-bold text-red-700 ring-1 ring-inset ring-red-600/20">
                          <IconAlertTriangle size={12} /> Suspeita IA
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
