'use client';

import { useState } from 'react';
import { IconMessageChatbot, IconSend } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DescomplicadorPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Olá! Eu sou o Descomplicador, o seu consultor especialista em JREDD+. Como posso ajudar você a estruturar o seu projeto ou tirar dúvidas sobre os editais hoje?',
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
          content: 'No momento, estou operando em modo de demonstração. Mas estou pronto para analisar sua proposta ou detalhar as regras dos editais ativos!',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6">
        <h1 className="flex items-center gap-3 font-sora text-3xl font-bold text-cerrado-profundo">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mata-alta/10 text-mata-alta">
            <IconMessageChatbot size={32} />
          </div>
          Descomplicador
        </h1>
        <p className="font-dm-sans text-gray-600 mt-2 text-lg">
          Seu assistente virtual de IA para simplificar a criação de projetos e sanar dúvidas sobre o Fundo do Clima.
        </p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-gray-200 shadow-lg rounded-2xl bg-white/50 backdrop-blur-sm">
        <CardContent className="flex flex-1 flex-col p-0 overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                {msg.role === 'assistant' && (
                  <div className="mr-3 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mata-alta text-white shadow-sm">
                    <IconMessageChatbot size={20} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 text-base leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-cerrado-profundo text-white rounded-tr-none shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-md'
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
                className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-6 py-4 text-base focus:border-mata-alta focus:outline-none focus:ring-2 focus:ring-mata-alta/20 shadow-sm transition-all"
              />
              <Button type="submit" variant="primary" className="h-14 w-14 rounded-full p-0 flex-shrink-0 bg-mata-alta hover:scale-105 transition-transform shadow-md">
                <IconSend size={24} />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
