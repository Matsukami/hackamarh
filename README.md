# GAIA - Sistema de Governança Climática do Tocantins (JREDD+) 🌿

Este projeto foi desenvolvido como parte do **Hackamarh 2026**. O **GAIA** é um ecossistema digital criado para otimizar, desburocratizar e dar transparência aos processos de submissão e avaliação de projetos ambientais, distribuição de recursos e preservação de biomas no estado do Tocantins.

## 🚀 Principais Funcionalidades (MVP)

1. **Portal da Transparência (Mapa Interativo)**: Visualização em tempo real das 8 macrorregiões do estado (Araguaína, Jalapão, etc.), com dados de projetos ativos e % de orçamento alocado usando mapas geográficos vetoriais.
2. **Submissão de Projetos (Formulário T-02)**: Cadastro em etapas (Wizard) guiado para proponentes, contendo validações rígidas de negócio (Hard-Stops, como limites geográficos e de CAR) para evitar retrabalho de fiscais.
3. **Descomplicador de Editais (IA)**: Uma interface estilo "Chatbot" alimentada por inteligência artificial, projetada para ler jargões burocráticos e explicá-los para agricultores familiares, indígenas e quilombolas de forma simples.
4. **Painel do Avaliador (Kanban e Score Preditivo)**: Fluxo de aprovação inteligente onde fiscais analisam evidências fotográficas geolocalizadas, acompanham metas físicas e aprovam etapas financeiras.

---

## 🛠 Tecnologias Utilizadas e Motivação

Optamos por um stack moderno e robusto que nos garantisse velocidade de entrega para o hackathon, mantendo qualidade e escalabilidade para um projeto governamental real.

- **Next.js 14 (App Router) & React**: Escolhido pela facilidade na criação de rotas, renderização Server-Side (SSR) e suporte nativo a SEO. Ideal para construir um sistema rápido e responsivo.
- **TailwindCSS**: Utilizado para estilização. Permitiu adotar de forma ágil o **Design System e a Identidade Visual do GAIA**, entregando uma interface "premium", limpa e altamente profissional com suporte a animações fluídas (micro-interações).
- **Supabase**: Backend como serviço (BaaS) utilizado para Autenticação e Banco de Dados PostgreSQL. Permite implementar login e persistência rapidamente sem precisar configurar servidores do zero.
- **D3-geo & SVG**: Utilizado para renderizar o mapa do Tocantins com altíssima qualidade visual, permitindo animações e interação avançada de _hover_ e zoom sem depender de APIs de mapas externas pesadas.
- **Zod & React Hook Form**: Garantem a integridade dos formulários (T-02), aplicando checagens automáticas no lado do cliente.

---

## 🤖 Uso de Inteligência Artificial

Este projeto foi construído utilizando **Engenharia de Prompt Avançada e Assistentes de IA (Gemini / Antigravity IDE)** no modelo _Pair Programming_ (Programação em Par) contínua para acelerar a escrita de código, estilização de interfaces e correção de bugs (como tipagens TypeScript).

**Alguns dos principais direcionamentos/prompts utilizados com a IA:**
> _"Crie a tela do Portal da Transparência utilizando d3-geo, consumindo o JSON oficial da malha do Tocantins e agrupando as 139 cidades em 8 macrorregiões clicáveis. Siga as cores da Identidade Visual do JREDD+."_

> _"Implemente o formulário T-02 (Inscrição de Proposta). Converta as validações e os Hard-Stops do documento de Especificação Técnica em validações reais usando Zod. O formulário deve ter 5 etapas."_

> _"Faça com que a região fique pintada no mapa e coloque um botão opcional para ver a porcentagem de orçamento diretamente em cima das regiões."_

> _"Identifique e corrija o erro de build que está acontecendo na Vercel causado por divergências do Prettier (LF vs CRLF) e variáveis de ambiente do Supabase."_

O uso da IA nos ajudou a focar nas regras de negócio e na experiência do usuário, delegando a escrita do código *boilerplate* para o assistente.

---

## 💻 Como Rodar o Projeto Localmente

**Pré-requisitos:**
- Node.js (v18 ou superior)
- NPM, Yarn ou PNPM.

1. Clone o repositório:
```bash
git clone https://github.com/Matsukami/hackamarh.git
cd hackamarh
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto com as chaves do seu Supabase.
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse o projeto no navegador em: `http://localhost:3000`

---
*Feito com 💚 para o Hackamarh 2026.*
