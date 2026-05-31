import Link from 'next/link';
import { IconClock, IconCalendarEvent, IconCategory } from '@tabler/icons-react';
import { EditalViewData } from '@/lib/services/editalService';

interface EditalCardProps {
  edital: EditalViewData;
}

export function EditalCard({ edital }: EditalCardProps) {
  // Define o badge de status com base no enum
  let badgeClass = 'badge-recebido';
  let statusText = 'Em Breve';

  if (edital.status === 'aberto') {
    badgeClass = 'badge-aprovado'; // Verde (Mata Alta)
    statusText = 'Aberto';
  } else if (edital.status === 'encerrado') {
    badgeClass = 'badge-reprovado'; // Vermelho
    statusText = 'Encerrado';
  }

  // Formata o texto da janela (categoria)
  const categoriaText = edital.janela_financiamento
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Formatação de datas
  const dataAbertura = new Date(edital.data_abertura).toLocaleDateString('pt-BR');
  const dataEncerramento = new Date(edital.data_encerramento).toLocaleDateString('pt-BR');

  return (
    <div className="card flex flex-col h-full relative overflow-hidden">
      {/* Indicador de urgência lateral */}
      {edital.urgente && edital.status === 'aberto' && (
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-ouro"></div>
      )}

      <div className="flex justify-between items-start mb-4">
        <span className={badgeClass}>{statusText}</span>
        {edital.urgente && edital.status === 'aberto' && (
          <span className="flex items-center gap-1 text-ouro text-sm font-bold bg-ouro/10 px-2 py-1 rounded">
            <IconClock size={16} />
            Termina em {edital.dias_restantes} {edital.dias_restantes === 1 ? 'dia' : 'dias'}
          </span>
        )}
      </div>

      <h3 className="text-h2 mb-2 flex-grow">{edital.titulo}</h3>
      <p className="text-body text-gray-600 line-clamp-2 mb-6">
        {edital.descricao || 'Sem descrição fornecida.'}
      </p>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <IconCategory size={18} className="text-mata" />
          <span className="font-semibold">Categoria:</span>
          <span>{categoriaText}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <IconCalendarEvent size={18} className="text-mata" />
          <span className="font-semibold">Prazo:</span>
          <span>{dataAbertura} até {dataEncerramento}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="font-semibold text-cerrado">Total Disponível:</span>
          <span className="text-cerrado font-bold">{edital.valor_formatado}</span>
        </div>
      </div>

      <div className="mt-auto">
        <Link 
          href={`/projetos/novo/${edital.id}`}
          className={`block w-full text-center ${edital.status === 'aberto' ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed pointer-events-none'}`}
          aria-disabled={edital.status !== 'aberto'}
          tabIndex={edital.status !== 'aberto' ? -1 : 0}
        >
          {edital.status === 'aberto' ? 'Iniciar Inscrição' : 'Inscrições Fechadas'}
        </Link>
      </div>
    </div>
  );
}
