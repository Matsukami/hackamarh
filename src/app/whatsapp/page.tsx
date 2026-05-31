'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IconBrandWhatsapp, IconQrcode, IconCheck, IconRefresh } from '@tabler/icons-react';
import { useState } from 'react';

export default function WhatsAppConfigPage() {
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  const handleConnect = () => {
    setStatus('connecting');
    // Simulate connection delay
    setTimeout(() => {
      setStatus('connected');
    }, 3000);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-6">
        <div className="rounded-xl bg-[#25D366]/10 p-3 text-[#25D366]">
          <IconBrandWhatsapp size={40} />
        </div>
        <div>
          <h1 className="font-sora text-3xl font-bold text-cerrado-profundo">
            Integração WhatsApp
          </h1>
          <p className="mt-1 font-dm-sans text-gray-600">
            Conecte a plataforma GAIA ao WhatsApp via Evolution API + n8n para notificações e
            consultoria com IA (Claude).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Status Card */}
        <Card className="h-full border-gray-200 shadow-md">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <CardTitle className="text-sm font-bold uppercase text-gray-500">
              Status da Conexão
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            {status === 'disconnected' && (
              <>
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <IconBrandWhatsapp size={48} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-cerrado-profundo">Não conectado</h3>
                <p className="mb-6 text-sm text-gray-600">
                  Escaneie o QR code para autenticar a Evolution API com a instância n8n.
                </p>
                <Button
                  onClick={handleConnect}
                  variant="primary"
                  className="gap-2 border-none bg-[#25D366] font-bold text-white hover:bg-[#128C7E]"
                >
                  <IconQrcode size={20} /> Gerar QR Code
                </Button>
              </>
            )}

            {status === 'connecting' && (
              <>
                <div className="mb-6 h-24 w-24 animate-spin rounded-full border-4 border-gray-100 border-t-[#25D366]"></div>
                <h3 className="mb-2 text-xl font-bold text-cerrado-profundo">
                  Aguardando Leitura...
                </h3>
                <p className="mb-6 text-sm text-gray-600">
                  Abra o WhatsApp no seu celular, vá em Aparelhos Conectados e escaneie o código.
                </p>
                {/* Mock QR Code */}
                <div className="flex h-48 w-48 items-center justify-center border-4 border-white bg-gray-200 p-2 opacity-50 shadow-lg blur-[2px]">
                  <IconQrcode size={100} className="text-gray-400" />
                </div>
              </>
            )}

            {status === 'connected' && (
              <>
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366]">
                  <IconCheck size={48} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-cerrado-profundo">Conectado!</h3>
                <p className="mb-6 text-sm text-gray-600">
                  Instância: <strong className="text-cerrado-profundo">gaia-bot-prod</strong>
                  <br />
                  Webhook n8n ativo.
                </p>
                <Button
                  onClick={() => setStatus('disconnected')}
                  variant="secondary"
                  className="gap-2 border-red-200 font-bold text-red-600 hover:bg-red-50"
                >
                  <IconRefresh size={20} /> Desconectar
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <div className="space-y-6">
          <Card className="border-gray-200 shadow-md">
            <CardHeader className="border-b border-gray-100 bg-gray-50 py-3">
              <CardTitle className="text-sm font-bold uppercase text-gray-500">
                Fluxos Ativos (n8n)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-100">
                <li className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50">
                  <div>
                    <strong className="block text-sm text-cerrado-profundo">
                      Consultor IA (Claude)
                    </strong>
                    <span className="text-xs text-gray-500">Responde dúvidas sobre editais</span>
                  </div>
                  <span className="flex items-center gap-1 rounded bg-mata-alta/10 px-2 py-0.5 text-xs font-bold text-mata-alta">
                    <IconCheck size={12} /> Ativo
                  </span>
                </li>
                <li className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50">
                  <div>
                    <strong className="block text-sm text-cerrado-profundo">
                      Alertas de Prazos
                    </strong>
                    <span className="text-xs text-gray-500">Notifica sobre SLA de prestação</span>
                  </div>
                  <span className="flex items-center gap-1 rounded bg-mata-alta/10 px-2 py-0.5 text-xs font-bold text-mata-alta">
                    <IconCheck size={12} /> Ativo
                  </span>
                </li>
                <li className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50">
                  <div>
                    <strong className="block text-sm text-cerrado-profundo">
                      Status de Avaliação
                    </strong>
                    <span className="text-xs text-gray-500">
                      Notifica o proponente sobre mudanças
                    </span>
                  </div>
                  <span className="flex items-center gap-1 rounded bg-mata-alta/10 px-2 py-0.5 text-xs font-bold text-mata-alta">
                    <IconCheck size={12} /> Ativo
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-gray-50 shadow-md">
            <CardContent className="p-4">
              <h4 className="mb-2 text-sm font-bold text-cerrado-profundo">
                Webhooks Configurados
              </h4>
              <div className="overflow-x-auto rounded bg-gray-900 p-3 font-mono text-xs text-green-400">
                <p>POST https://n8n.jredd.to.gov.br/webhook/whatsapp-in</p>
                <p className="mt-2 text-gray-500">
                  # Evolution API envia as mensagens recebidas para este endpoint.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
