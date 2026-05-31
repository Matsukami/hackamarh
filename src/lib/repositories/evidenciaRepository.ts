import { createServerSupabaseClient } from '@/lib/supabase/server';
import { Evidencia } from '@/lib/types/enums';

export async function getParcelasByProjeto(projetoId: string): Promise<any[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('parcelas_projeto')
    .select('*')
    .eq('projeto_id', projetoId)
    .order('numero_parcela', { ascending: true });

  if (error) {
    console.error('Erro ao buscar parcelas:', error);
    throw new Error('Falha ao carregar parcelas do projeto.');
  }

  return data;
}

export async function getEvidenciasByParcela(parcelaId: string): Promise<any[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('evidencias')
    .select('*')
    .eq('parcela_id', parcelaId)
    .order('criado_em', { ascending: false });

  if (error) {
    console.error('Erro ao buscar evidências:', error);
    return [];
  }

  return data;
}

export async function salvarEvidencia(evidencia: Omit<Evidencia, 'id' | 'criado_em'>): Promise<Evidencia> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('evidencias')
    .insert(evidencia)
    .select()
    .single();

  if (error) {
    console.error('Erro ao salvar evidência:', error);
    throw new Error('Falha ao salvar metadados da evidência.');
  }

  return data as Evidencia;
}
