import { createServerSupabaseClient } from '@/lib/supabase/server';
import { Edital } from '@/lib/types/enums';

export async function getEditais(): Promise<Edital[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('editais')
    .select('*')
    .order('data_encerramento', { ascending: true });

  if (error) {
    console.error('Erro ao buscar editais:', error);
    throw new Error('Falha ao carregar os editais.');
  }

  return data as Edital[];
}
