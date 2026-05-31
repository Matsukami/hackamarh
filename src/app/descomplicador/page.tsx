'use client';

import { useState } from 'react';
import { IconMessageChatbot, IconSend } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DescomplicadorPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Olá! Eu sou o Descomplicador, o seu consultor especialista em JREDD+. Como posso ajudar você a estruturar o seu projeto ou tirar dúvidas sobre os editais hoje?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');

    // Mock response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'No momento, estou operando em modo de demonstração. Mas estou pronto para analisar sua proposta ou detalhar as regras dos editais ativos!',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="container mx-auto flex h-[calc(100vh-80px)] max-w-5xl flex-col px-4 py-8">
      <div className="mb-6">
        <h1 className="flex items-center gap-3 font-sora text-3xl font-bold text-cerrado-profundo">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mata-alta/10 text-mata-alta">
            <IconMessageChatbot size={32} />
          </div>
          Descomplicador
        </h1>
        <p className="mt-2 font-dm-sans text-lg text-gray-600">
          Seu assistente virtual de IA para simplificar a criação de projetos e sanar dúvidas sobre
          o Fundo do Clima.
        </p>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden rounded-2xl border-gray-200 bg-white/50 shadow-lg backdrop-blur-sm">
        <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
          {/* Messages */}
          <div className="flex-1 space-y-6 overflow-y-auto bg-gray-50/50 p-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {msg.role === 'assistant' && (
                  <div className="mr-3 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mata-alta text-white shadow-sm">
                    <IconMessageChatbot size={20} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-4 text-base leading-relaxed md:max-w-[70%] ${
                    msg.role === 'user'
                      ? 'rounded-tr-none bg-cerrado-profundo text-white shadow-sm'
                      : 'rounded-tl-none border border-gray-200 bg-white text-gray-800 shadow-md'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 bg-white p-4">
            <form onSubmit={handleSend} className="mx-auto flex max-w-4xl items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte ao Descomplicador..."
                className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-6 py-4 text-base shadow-sm transition-all focus:border-mata-alta focus:outline-none focus:ring-2 focus:ring-mata-alta/20"
              />
              <Button
                type="submit"
                variant="primary"
                className="h-14 w-14 flex-shrink-0 rounded-full bg-mata-alta p-0 shadow-md transition-transform hover:scale-105"
              >
                <IconSend size={24} />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
