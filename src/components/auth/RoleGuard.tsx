import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Array<'proponente' | 'avaliador' | 'admin'>;
  redirectTo?: string;
}

export async function RoleGuard({
  children,
  allowedRoles,
  redirectTo = '/entrar',
}: RoleGuardProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(redirectTo);
  }

  // Fetch user role from public.usuarios
  const { data: profile } = await supabase
    .from('usuarios')
    .select('perfil')
    .eq('id', user.id)
    .single();

  const userRole = profile?.perfil || 'proponente'; // Default to proponente

  if (!allowedRoles.includes(userRole)) {
    // If user is avaliador but tries to access proponente area, or vice versa
    if (userRole === 'avaliador' || userRole === 'admin') {
      redirect('/avaliador/kanban');
    } else {
      redirect('/painel');
    }
  }

  return <>{children}</>;
}
