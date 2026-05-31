import dynamic from 'next/dynamic';
import { IconFilter, IconSearch, IconListDetails } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

// Dynamically import the Map component with SSR disabled
const InteractiveMap = dynamic(() => import('@/components/Map'), { ssr: false });

export default function MapaPage() {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar Panel */}
      <div className="z-10 flex w-96 shrink-0 flex-col border-r border-gray-200 bg-white shadow-lg">
        <div className="border-b border-gray-100 bg-gray-50 p-6">
          <h1 className="mb-4 font-sora text-xl font-bold text-cerrado-profundo">
            Mapa de Iniciativas JREDD+
          </h1>
          <div className="relative mb-4">
            <IconSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar por município ou projeto..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-mata-alta focus:ring-1 focus:ring-mata-alta"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="h-9 flex-1 gap-2 border-gray-300 text-xs">
              <IconFilter size={16} /> Filtros
            </Button>
            <Button variant="secondary" className="h-9 flex-1 gap-2 border-gray-300 text-xs">
              <IconListDetails size={16} /> Ver Lista
            </Button>
          </div>
        </div>

        {/* Project List */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <div className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-mata-alta">
            <div className="mb-2 flex items-start justify-between">
              <span className="rounded bg-mata-alta/10 px-2 py-0.5 text-xs font-bold uppercase text-mata-alta">
                Conservação
              </span>
              <span className="text-xs font-bold text-gray-500">ECO-2024-089</span>
            </div>
            <h3 className="mb-1 text-sm font-bold text-cerrado-profundo">
              Restauração de Nascentes
            </h3>
            <p className="mb-2 text-xs text-gray-600">Bacia do Rio Tocantins - Palmas/TO</p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-[75%] bg-mata-alta"></div>
            </div>
          </div>

          <div className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-mata-alta">
            <div className="mb-2 flex items-start justify-between">
              <span className="rounded bg-ouro-tocantins/10 px-2 py-0.5 text-xs font-bold uppercase text-ouro-tocantins">
                Pesquisa
              </span>
              <span className="text-xs font-bold text-gray-500">ECO-2024-042</span>
            </div>
            <h3 className="mb-1 text-sm font-bold text-cerrado-profundo">
              Levantamento Florístico
            </h3>
            <p className="mb-2 text-xs text-gray-600">Região Leste - Mateiros/TO</p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-[30%] bg-ouro-tocantins"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative z-0 flex-1 bg-gray-100">
        <InteractiveMap />
      </div>
    </div>
  );
}
