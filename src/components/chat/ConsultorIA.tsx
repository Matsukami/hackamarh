'use client';

import { useState } from 'react';
import { IconMessageChatbot, IconX, IconSend } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

export default function ConsultorIA() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Olá! Sou o Consultor de Projetos JREDD+. Como posso ajudar você a preencher o formulário?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');

    // Mock response after 1s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'No momento, estou operando em modo de demonstração. Mas lembre-se: preencha sempre o número do CAR com o formato exigido (TO-...)!',
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-mata-alta text-white shadow-lg transition-transform hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <IconMessageChatbot size={28} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Janela de Chat (Sidebar) */}
      {isOpen && (
        <div className="fixed top-0 right-0 z-50 flex h-full w-80 sm:w-[400px] flex-col overflow-hidden bg-white shadow-2xl border-l border-gray-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-mata-alta px-4 py-4 text-white shadow-md z-10">
            <div className="flex items-center gap-2">
              <IconMessageChatbot size={24} />
              <span className="font-sora text-base font-bold">Consultor IA</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-2 hover:bg-white/20 transition-colors">
              <IconX size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-cerrado-profundo text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex items-center border-t border-gray-200 bg-white p-3 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida..."
              className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:border-mata-alta focus:outline-none focus:ring-1 focus:ring-mata-alta"
            />
            <Button type="submit" variant="primary" className="h-9 w-9 rounded-full p-0 flex-shrink-0 bg-mata-alta">
              <IconSend size={16} />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
