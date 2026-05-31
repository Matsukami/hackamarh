-- 0001_initial_schema.sql
-- Extension for PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- ENUMs
CREATE TYPE janela_financiamento AS ENUM (
  'Terras Indígenas',
  'Quilombolas',
  'Agricultores Familiares',
  'Fortalecimento Institucional'
);

CREATE TYPE status_projeto AS ENUM (
  'Recebido',
  'Em Análise',
  'Com Pendência',
  'Aprovado',
  'Encerrado'
);

CREATE TYPE status_edital AS ENUM (
  'Aberto',
  'Em breve',
  'Encerrado'
);

CREATE TYPE status_parcela AS ENUM (
  'Bloqueada',
  'Liberada',
  'Paga',
  'Em análise'
);

CREATE TYPE categoria_despesa AS ENUM (
  'Capital',
  'Custeio'
);

CREATE TYPE status_anti_ia AS ENUM (
  'Aguardando análise',
  'Autêntica',
  'Suspeita',
  'Sem metadados'
);

CREATE TYPE perfil_usuario AS ENUM (
  'proponente',
  'avaliador',
  'admin'
);

-- Tables
CREATE TABLE public.usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  perfil perfil_usuario NOT NULL DEFAULT 'proponente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.regioes (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  geom geometry(Polygon, 4326)
);

CREATE TABLE public.municipios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  regiao_id INTEGER REFERENCES public.regioes(id)
);

CREATE TABLE public.editais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  categoria janela_financiamento NOT NULL,
  status status_edital NOT NULL DEFAULT 'Em breve',
  data_abertura TIMESTAMPTZ,
  data_encerramento TIMESTAMPTZ,
  criterios_elegibilidade JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.projetos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edital_id UUID NOT NULL REFERENCES public.editais(id),
  proponente_id UUID NOT NULL REFERENCES public.usuarios(id),
  fiscal_id UUID REFERENCES public.usuarios(id),
  titulo TEXT NOT NULL,
  categoria_beneficiario janela_financiamento NOT NULL,
  numero_car TEXT NOT NULL,
  coordenadas geometry(Point, 4326) NOT NULL,
  area_poligono geometry(Polygon, 4326),
  
  -- Indicadores sociais (Salvaguardas de Cancún)
  beneficiarias_mulheres INTEGER NOT NULL DEFAULT 0,
  beneficiarios_jovens INTEGER NOT NULL DEFAULT 0,
  grupo_etnico TEXT,
  
  status status_projeto NOT NULL DEFAULT 'Recebido',
  score_ia INTEGER,
  origem TEXT DEFAULT 'web', -- 'web' ou 'whatsapp'
  
  metadados_extras JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.parcelas_projeto (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id UUID NOT NULL REFERENCES public.projetos(id),
  numero INTEGER NOT NULL,
  valor NUMERIC(12,2) NOT NULL,
  status status_parcela NOT NULL DEFAULT 'Bloqueada',
  data_liberacao TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.evidencias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id UUID NOT NULL REFERENCES public.projetos(id),
  parcela_id UUID NOT NULL REFERENCES public.parcelas_projeto(id),
  url_arquivo TEXT NOT NULL,
  descricao TEXT,
  data_captura TIMESTAMPTZ,
  coordenada geometry(Point, 4326),
  percentual_conclusao NUMERIC(5,2),
  status_autenticidade status_anti_ia NOT NULL DEFAULT 'Aguardando análise',
  score_hive INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.despesas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id UUID NOT NULL REFERENCES public.projetos(id),
  parcela_id UUID NOT NULL REFERENCES public.parcelas_projeto(id),
  descricao TEXT NOT NULL,
  valor NUMERIC(12,2) NOT NULL,
  data_despesa DATE NOT NULL,
  categoria categoria_despesa NOT NULL,
  url_comprovante TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.interacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id UUID NOT NULL REFERENCES public.projetos(id),
  ator_id UUID NOT NULL REFERENCES public.usuarios(id),
  acao TEXT NOT NULL, -- ex: 'Aprovar', 'Solicitar correção', 'Reprovar'
  parecer TEXT,
  prazo_resposta TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projetos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcelas_projeto ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.despesas ENABLE ROW LEVEL SECURITY;

-- Policies

-- Usuarios: read their own data, admins read all
CREATE POLICY "Usuarios podem ver seus proprios dados" ON public.usuarios
  FOR SELECT USING (auth.uid() = id);

-- Projetos: proponentes veem seus proprios, avaliadores veem os atribuidos ou todos se admin
CREATE POLICY "Proponentes veem seus projetos" ON public.projetos
  FOR SELECT USING (auth.uid() = proponente_id);

-- Interacoes sao imutaveis (sem UPDATE ou DELETE)
CREATE POLICY "Insert apenas" ON public.interacoes FOR INSERT WITH CHECK (true);
CREATE POLICY "Select todos" ON public.interacoes FOR SELECT USING (true);

-- Triggers para interacoes imutaveis
CREATE OR REPLACE FUNCTION prevent_update_delete()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'This table is immutable. No updates or deletes allowed.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER interacoes_immutable
BEFORE UPDATE OR DELETE ON public.interacoes
FOR EACH ROW EXECUTE FUNCTION prevent_update_delete();
