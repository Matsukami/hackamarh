import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IconMap, IconClipboardList, IconShieldCheck, IconWorld } from '@tabler/icons-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-areia-jalapao pb-32 pt-24"
        style={{
          backgroundImage: 'radial-gradient(#CCCCCC 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white/50 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-cerrado-profundo">
                <IconShieldCheck size={16} />
                <span>Programa JREDD+ Tocantins</span>
              </div>
              <h1 className="mb-6 font-sora text-4xl font-bold leading-tight text-cerrado-profundo md:text-5xl">
                O ecossistema público do <span className="text-mata-alta">Fundo Climático</span> do
                Tocantins
              </h1>
              <p className="mb-10 max-w-xl font-dm-sans text-lg text-gray-700">
                Conectando recursos globais a projetos locais de impacto socioambiental.
                Transparência, rastreabilidade e desenvolvimento sustentável em um só lugar.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/editais">
                  <Button
                    variant="primary"
                    size="lg"
                    className="gap-2 shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    Explorar Editais
                    <span className="text-xl">&rarr;</span>
                  </Button>
                </Link>
                <Link href="#conheca">
                  <Button variant="secondary" size="lg">
                    Conheça o JREDD+
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-[400px] w-full overflow-hidden rounded-xl border border-white/20 shadow-2xl md:h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=1200"
                alt="Floresta exuberante no Tocantins"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cerrado-profundo/80 via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between rounded-xl border border-cerrado-profundo/10 bg-white/70 p-6 backdrop-blur-md">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-cerrado-profundo">
                    Recursos Destinados
                  </p>
                  <p className="font-sora text-3xl font-bold text-cerrado-profundo">R$ 150M+</p>
                </div>
                <div className="flex -space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-mata-alta text-xs font-bold text-white">
                    IP
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-buriti-vivo text-xs font-bold text-cerrado-profundo">
                    QA
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-cerrado-profundo text-xs font-bold text-white">
                    +40
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section id="conheca" className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 font-sora text-3xl font-bold text-cerrado-profundo">
              Transparência em Cada Etapa
            </h2>
            <p className="font-dm-sans text-lg text-gray-600">
              Acompanhe a execução dos recursos do Fundo Climático com rastreabilidade total, desde
              a submissão até o impacto final no território.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Bento Card 1 */}
            <Card className="group relative col-span-1 overflow-hidden transition-shadow hover:shadow-lg md:col-span-2">
              <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/3 rounded-full bg-gray-100 blur-3xl transition-colors group-hover:bg-gray-200"></div>
              <CardContent className="relative z-10 flex h-full flex-col justify-between border-0 p-8">
                <div>
                  <IconMap size={32} className="mb-6 text-mata-alta" />
                  <h3 className="mb-2 font-sora text-2xl font-bold text-cerrado-profundo">
                    Mapeamento Territorial
                  </h3>
                  <p className="max-w-md font-dm-sans text-gray-600">
                    Visualize a distribuição dos projetos através de um mapa interativo, cruzando
                    dados de impacto ambiental e socioeconômico das comunidades atendidas.
                  </p>
                </div>
                <div className="mt-8 flex gap-2">
                  <span className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-bold text-gray-700">
                    Recursos
                  </span>
                  <span className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-bold text-gray-700">
                    Projetos Ativos
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Bento Card 2 */}
            <Card className="col-span-1 transition-shadow hover:shadow-lg">
              <CardContent className="border-0 p-8">
                <IconClipboardList size={32} className="mb-6 text-mata-alta" />
                <h3 className="mb-2 font-sora text-xl font-bold text-cerrado-profundo">
                  Editais Abertos
                </h3>
                <p className="mb-6 font-dm-sans text-gray-600">
                  Submeta sua proposta de forma digital, com validação inteligente de dados.
                </p>
                <Link
                  href="/editais"
                  className="flex items-center gap-1 font-bold text-mata-alta transition-all hover:gap-2"
                >
                  Ver oportunidades <span>&rarr;</span>
                </Link>
              </CardContent>
            </Card>

            {/* Bento Card 3 */}
            <Card className="col-span-1 border-0 bg-cerrado-profundo text-white transition-shadow hover:shadow-lg">
              <CardContent className="p-8">
                <IconShieldCheck size={32} className="mb-6 text-buriti-vivo" />
                <h3 className="mb-2 font-sora text-xl font-bold text-white">Portal do Avaliador</h3>
                <p className="mb-6 font-dm-sans text-gray-300">
                  Ambiente seguro para análise técnica e aprovação de propostas submetidas.
                </p>

                <div className="mt-4 rounded-xl border-l-4 border-buriti-vivo bg-white/10 p-3">
                  <p className="mb-1 text-xs text-gray-300">Assoc. Indígena Apinajé</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-buriti-vivo">Score: 88/100</span>
                    <span className="flex items-center gap-1 rounded-lg bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-buriti-vivo"></span> Aprovado
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bento Card 4 */}
            <Card className="col-span-1 flex flex-col items-center gap-8 p-8 transition-shadow hover:shadow-lg sm:flex-row md:col-span-2">
              <div className="flex-1">
                <IconWorld size={32} className="mb-6 text-cerrado-profundo" />
                <h3 className="mb-2 font-sora text-2xl font-bold text-cerrado-profundo">
                  Impacto Real
                </h3>
                <p className="font-dm-sans text-gray-600">
                  Conheça as histórias das comunidades impactadas e os resultados das políticas de
                  redução de emissões e desmatamento.
                </p>
              </div>
              <div className="h-48 w-full shrink-0 overflow-hidden rounded-xl border border-gray-200 sm:w-48">
                <img
                  src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80&w=400"
                  alt="Impacto Real"
                  className="h-full w-full object-cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
