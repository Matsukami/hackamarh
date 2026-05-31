import { TocantinsMap } from '@/components/transparencia/TocantinsMap';

export default function MapaInterativoPage() {
  return (
    <div className="flex h-[calc(100vh-80px)] flex-col bg-areia-jalapao p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-sora text-3xl font-bold text-cerrado-profundo">
            Mapa Interativo Territorial
          </h1>
          <p className="font-dm-sans text-gray-600">
            Explore as 8 regiões do estado e acompanhe os projetos em execução.
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 shadow-md">
        <TocantinsMap />
      </div>
    </div>
  );
}
