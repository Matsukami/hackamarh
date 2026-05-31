import { fetchEditaisViewData } from '@/lib/services/editalService';
import { EditalCard } from '@/components/ui/EditalCard';
import { IconFilter, IconLeaf } from '@tabler/icons-react';

export const metadata = {
  title: 'Editais Disponíveis | JREDD+ Tocantins',
};

// Next.js Server Component
export default async function EditaisPage() {
  // Busca os editais usando o Service (com cookies da sessão e tipagem segura)
  const editais = await fetchEditaisViewData();

  // Para o MVP: separar editais abertos do resto para dar destaque
  const editaisAbertos = editais.filter((e) => e.status === 'aberto');
  const editaisOutros = editais.filter((e) => e.status !== 'aberto');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header do Mural */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-buriti/20 p-3 rounded-full text-mata">
            <IconLeaf size={32} />
          </div>
          <h1 className="text-hero text-cerrado">Fundo Climático do Tocantins</h1>
        </div>
        <p className="text-h2 text-gray-700 max-w-3xl">
          Mural de editais públicos para financiamento de projetos REDD+ e conservação ambiental.
          Selecione uma janela de financiamento para iniciar sua inscrição.
        </p>
      </div>

      {/* Controles e Filtros (MVP: Visual apenas, a implementação total do filtro pode ser via query params depois) */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-md shadow-sm border border-areia-dark">
        <div className="flex items-center gap-2 text-cerrado font-semibold">
          <IconFilter size={20} />
          <span>Filtros:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="badge bg-mata text-white hover:bg-mata-light transition">Todos</button>
          <button className="badge bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Terra Indígena</button>
          <button className="badge bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Quilombola</button>
          <button className="badge bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Agricultura Familiar</button>
        </div>
      </div>

      {/* Lista de Editais Abertos */}
      <div className="mb-12">
        <h2 className="text-h1 mb-6 flex items-center gap-2">
          Inscrições Abertas
          <span className="bg-mata text-white text-sm px-2 py-1 rounded-full font-body">{editaisAbertos.length}</span>
        </h2>
        
        {editaisAbertos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editaisAbertos.map((edital) => (
              <EditalCard key={edital.id} edital={edital} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-md border border-areia-dark text-center">
            <p className="text-gray-600 text-lg">Nenhum edital aberto no momento.</p>
          </div>
        )}
      </div>

      {/* Outros Editais (Em breve / Encerrados) */}
      {editaisOutros.length > 0 && (
        <div>
          <h2 className="text-h1 mb-6 text-gray-500">Outros Editais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
            {editaisOutros.map((edital) => (
              <EditalCard key={edital.id} edital={edital} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
