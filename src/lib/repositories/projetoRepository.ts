import { createServerSupabaseClient } from '@/lib/supabase/server';
import { Projeto } from '@/lib/types/enums';

export async function getProjetosByProponente(proponenteId: string): Promise<Projeto[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('projetos')
    .select('*, edital:editais(titulo)')
    .eq('proponente_id', proponenteId)
    .order('criado_em', { ascending: false });

  if (error) {
    console.error('Erro ao buscar projetos do proponente:', error);
    throw new Error('Falha ao carregar projetos.');
  }

  return data as (Projeto & { edital: { titulo: string } })[];
}

export async function getRascunhosByProponente(usuarioId: string): Promise<any[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('rascunhos_formulario')
    .select('*, edital:editais(titulo)')
    .eq('usuario_id', usuarioId)
    .order('atualizado_em', { ascending: false });

  if (error) {
    console.error('Erro ao buscar rascunhos:', error);
    return [];
  }

  return data;
}

export async function salvarProjeto(projeto: Omit<Projeto, 'id' | 'criado_em' | 'atualizado_em'>): Promise<Projeto> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('projetos')
    .insert(projeto)
    .select()
    .single();

  if (error) {
    console.error('Erro ao salvar projeto:', error);
    throw new Error('Falha ao registrar proposta.');
  }

  return data as Projeto;
}
