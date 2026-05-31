'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';

export default function AvaliadorLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      // In a real scenario, we should check if the user has the 'avaliador' role
      // before redirecting. For this MVP, we redirect to the avaliador dashboard.
      router.push('/avaliador/kanban');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  const handleBypassLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'avaliador@tocantins.gov.br',
        password: 'AvaliadorJredd2026!',
      });
      if (error) throw error;
      router.push('/avaliador/kanban');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao entrar com a conta de demonstração.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-cerrado-profundo px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="pb-2 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white shadow-md">
            <img
              src="/logo-gaia.png"
              alt="GAIA Logo"
              className="h-14 w-14 object-contain"
            />
          </div>
          <CardTitle>Portal do Avaliador</CardTitle>
          <CardDescription>Acesso restrito para equipe técnica JREDD+</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">E-mail Institucional</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="avaliador@tocantins.gov.br"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Aguarde...' : 'Acessar Backoffice'}
            </Button>

            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <span className="relative bg-white px-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                Acesso Rápido
              </span>
            </div>

            <Button
              type="button"
              variant="secondary"
              className="w-full border-buriti-vivo/30 transition-all duration-300 hover:border-buriti-vivo hover:bg-buriti-vivo/5"
              onClick={handleBypassLogin}
              disabled={loading}
            >
              🚀 Entrar como Avaliador Demo
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
