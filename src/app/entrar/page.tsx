'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/painel');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nome: name,
            },
          },
        });
        if (error) throw error;
        router.push('/painel');
      }
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
        email: 'proponente@teste.com',
        password: 'ProponenteJredd2026!',
      });
      if (error) throw error;
      router.push('/painel');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao entrar com a conta de demonstração.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg">
        <img
          src="/logo-gaia.png"
          alt="GAIA Logo"
          className="h-16 w-16 object-contain"
        />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{isLogin ? 'Entrar na Plataforma' : 'Criar Nova Conta'}</CardTitle>
          <CardDescription>
            {isLogin
              ? 'Acesse com seu e-mail e senha para continuar.'
              : 'Faça seu cadastro para submeter propostas e acompanhar resultados.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
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
              {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Cadastrar'}
            </Button>

            {isLogin && (
              <>
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
                  className="w-full border-mata-alta/30 transition-all duration-300 hover:border-mata-alta hover:bg-mata-alta/5"
                  onClick={handleBypassLogin}
                  disabled={loading}
                >
                  🚀 Entrar como Proponente Demo
                </Button>
              </>
            )}
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-sm text-mata-alta hover:underline focus:outline-none"
            >
              {isLogin
                ? 'Ainda não tem conta? Clique aqui para cadastrar'
                : 'Já tem uma conta? Clique aqui para entrar'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
