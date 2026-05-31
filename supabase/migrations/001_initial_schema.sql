-- ============================================================
-- JREDD+ Tocantins — Schema Inicial
-- Migração 001: Tabelas, ENUMs, Triggers, RLS
-- Baseado na Especificação Técnica v1, seções 2.3 e 5
-- ============================================================

-- Extensões
CREATE EXTENSION IF NOT EXISTS "postgis" SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA extensions;

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE perfil_enum AS ENUM (
  'proponente', 'avaliador', 'admin', 'publico'
);

CREATE TYPE status_edital_enum AS ENUM (
  'aberto', 'em_breve', 'encerrado'
);

CREATE TYPE janela_financiamento_enum AS ENUM (
  'terra_indigena', 'quilombola', 'agricultor_familiar', 'fortalecimento_institucional'
);

CREATE TYPE status_kanban_enum AS ENUM (
  'recebido', 'em_analise', 'com_pendencia', 'aprovado', 'reprovado', 'cancelado'
);

CREATE TYPE status_parcela_enum AS ENUM (
  'bloqueado', 'liberado', 'pago'
);

CREATE TYPE status_autenticidade_enum AS ENUM (
  'pendente', 'autentica', 'suspeita', 'rejeitada'
);

CREATE TYPE grupo_etnico_enum AS ENUM (
  'indigena', 'quilombola', 'pardo', 'branco', 'preto', 'amarelo', 'nao_informado'
);

CREATE TYPE tipo_juridico_enum AS ENUM (
  'pessoa_fisica', 'ong', 'cooperativa', 'associacao', 'entidade_indigena', 'entidade_quilombola'
);

CREATE TYPE tipo_evidencia_enum AS ENUM (
  'foto', 'documento', 'relatorio'
);

CREATE TYPE tipo_interacao_enum AS ENUM (
  'submissao', 'aprovacao', 'reprovacao', 'pendencia', 'correcao',
  'liberacao_parcela', 'upload_evidencia', 'parecer', 'sistema'
);

CREATE TYPE origem_projeto_enum AS ENUM (
  'web', 'whatsapp'
);

-- ============================================================
-- TABELA: usuarios
-- ============================================================

CREATE TABLE public.usuarios (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  perfil perfil_enum NOT NULL DEFAULT 'proponente',
  telefone_whatsapp TEXT,
  modo_voz_ativo BOOLEAN NOT NULL DEFAULT FALSE,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABELA: editais
-- ============================================================

CREATE TABLE public.editais (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  status status_edital_enum NOT NULL DEFAULT 'em_breve',
  janela_financiamento janela_financiamento_enum NOT NULL,
  valor_total NUMERIC(15, 2) NOT NULL CHECK (valor_total > 0),
  data_abertura DATE NOT NULL,
  data_encerramento DATE NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (data_encerramento > data_abertura)
);

-- ============================================================
-- TABELA: projetos
-- ============================================================

CREATE TABLE public.projetos (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  edital_id UUID NOT NULL REFERENCES public.editais(id),
  proponente_id UUID NOT NULL REFERENCES public.usuarios(id),
  titulo TEXT NOT NULL,
  objetivo TEXT NOT NULL DEFAULT '',
  atividades TEXT NOT NULL DEFAULT '',
  tipo_juridico tipo_juridico_enum NOT NULL,
  categoria_beneficiario janela_financiamento_enum NOT NULL,
  numero_car TEXT NOT NULL CHECK (numero_car ~ '^[A-Z]{2}-\d{14}-\d{7}$'),
  latitude NUMERIC(9, 6) NOT NULL CHECK (latitude BETWEEN -13.45 AND -5.17),
  longitude NUMERIC(9, 6) NOT NULL CHECK (longitude BETWEEN -50.74 AND -45.67),
  area_hectares NUMERIC(12, 2) NOT NULL CHECK (area_hectares > 0),
  hectares_meta NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (hectares_meta >= 0),
  focos_incendio_anterior INTEGER NOT NULL DEFAULT 0 CHECK (focos_incendio_anterior >= 0),
  prazo_meses INTEGER NOT NULL CHECK (prazo_meses > 0),
  valor_solicitado NUMERIC(15, 2) NOT NULL CHECK (valor_solicitado > 0),
  status_kanban status_kanban_enum NOT NULL DEFAULT 'recebido',
  score_previo NUMERIC(5, 2),
  indicadores_sociais JSONB NOT NULL DEFAULT '{
    "beneficiarias_mulheres": 0,
    "beneficiarios_jovens": 0,
    "grupo_etnico": "nao_informado",
    "comunidades_atendidas": 0
  }'::jsonb,
  origem origem_projeto_enum NOT NULL DEFAULT 'web',
  data_limite_correcao TIMESTAMPTZ,
  avaliador_id UUID REFERENCES public.usuarios(id),
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Hard-stop HS-06: indicadores sociais obrigatórios
  CHECK ((indicadores_sociais->>'beneficiarias_mulheres')::int >= 0),
  CHECK ((indicadores_sociais->>'beneficiarios_jovens')::int >= 0)
);

-- Índices para projetos
CREATE INDEX idx_projetos_edital ON public.projetos(edital_id);
CREATE INDEX idx_projetos_proponente ON public.projetos(proponente_id);
CREATE INDEX idx_projetos_status ON public.projetos(status_kanban);

-- ============================================================
-- TABELA: parcelas_projeto
-- ============================================================

CREATE TABLE public.parcelas_projeto (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  projeto_id UUID NOT NULL REFERENCES public.projetos(id) ON DELETE CASCADE,
  numero_parcela INTEGER NOT NULL CHECK (numero_parcela > 0),
  valor NUMERIC(15, 2) NOT NULL CHECK (valor > 0),
  meta_fisica TEXT NOT NULL DEFAULT '',
  status_liberacao status_parcela_enum NOT NULL DEFAULT 'bloqueado',
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (projeto_id, numero_parcela)
);

CREATE INDEX idx_parcelas_projeto ON public.parcelas_projeto(projeto_id);

-- ============================================================
-- TABELA: evidencias
-- ============================================================

CREATE TABLE public.evidencias (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  projeto_id UUID NOT NULL REFERENCES public.projetos(id),
  parcela_id UUID NOT NULL REFERENCES public.parcelas_projeto(id),
  tipo tipo_evidencia_enum NOT NULL DEFAULT 'foto',
  url_arquivo TEXT NOT NULL,
  descricao TEXT,
  gps_lat NUMERIC(9, 6),
  gps_lng NUMERIC(9, 6),
  data_exif TIMESTAMPTZ,
  status_autenticidade status_autenticidade_enum NOT NULL DEFAULT 'pendente',
  score_ia_sintetica NUMERIC(4, 3),
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_evidencias_projeto ON public.evidencias(projeto_id);
CREATE INDEX idx_evidencias_parcela ON public.evidencias(parcela_id);
CREATE INDEX idx_evidencias_autenticidade ON public.evidencias(status_autenticidade);

-- ============================================================
-- TABELA: interacoes (IMUTÁVEL — Salvaguarda B de Cancún)
-- SOMENTE INSERT. UPDATE e DELETE bloqueados para TODOS os papéis.
-- ============================================================

CREATE TABLE public.interacoes (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  projeto_id UUID NOT NULL REFERENCES public.projetos(id),
  usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
  tipo_evento tipo_interacao_enum NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  payload JSONB,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
  -- Nota: Sem atualizado_em — tabela imutável
);

CREATE INDEX idx_interacoes_projeto ON public.interacoes(projeto_id);
CREATE INDEX idx_interacoes_usuario ON public.interacoes(usuario_id);
CREATE INDEX idx_interacoes_tipo ON public.interacoes(tipo_evento);

-- ============================================================
-- TABELA: rascunhos_formulario
-- ============================================================

CREATE TABLE public.rascunhos_formulario (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
  edital_id UUID NOT NULL REFERENCES public.editais(id),
  dados_parciais JSONB NOT NULL DEFAULT '{}'::jsonb,
  etapa_atual INTEGER NOT NULL DEFAULT 1 CHECK (etapa_atual BETWEEN 1 AND 5),
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (usuario_id, edital_id)
);

-- ============================================================
-- TRIGGERS: atualizado_em automático
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_usuarios_atualizado_em
  BEFORE UPDATE ON public.usuarios
  FOR EACH ROW EXECUTE FUNCTION public.handle_atualizado_em();

CREATE TRIGGER trg_editais_atualizado_em
  BEFORE UPDATE ON public.editais
  FOR EACH ROW EXECUTE FUNCTION public.handle_atualizado_em();

CREATE TRIGGER trg_projetos_atualizado_em
  BEFORE UPDATE ON public.projetos
  FOR EACH ROW EXECUTE FUNCTION public.handle_atualizado_em();

CREATE TRIGGER trg_parcelas_atualizado_em
  BEFORE UPDATE ON public.parcelas_projeto
  FOR EACH ROW EXECUTE FUNCTION public.handle_atualizado_em();

CREATE TRIGGER trg_rascunhos_atualizado_em
  BEFORE UPDATE ON public.rascunhos_formulario
  FOR EACH ROW EXECUTE FUNCTION public.handle_atualizado_em();

-- ============================================================
-- TRIGGER: data_limite_correcao (15 dias úteis)
-- Quando status_kanban muda para 'com_pendencia', seta data limite
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_data_limite_correcao()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status_kanban = 'com_pendencia' AND OLD.status_kanban != 'com_pendencia' THEN
    NEW.data_limite_correcao = NOW() + INTERVAL '21 days'; -- ~15 dias úteis
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_data_limite_correcao
  BEFORE UPDATE ON public.projetos
  FOR EACH ROW EXECUTE FUNCTION public.handle_data_limite_correcao();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projetos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcelas_projeto ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rascunhos_formulario ENABLE ROW LEVEL SECURITY;

-- --- EDITAIS: público para leitura ---
CREATE POLICY "editais_select_public" ON public.editais
  FOR SELECT USING (true);

-- --- USUARIOS: próprio perfil ---
CREATE POLICY "usuarios_select_own" ON public.usuarios
  FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "usuarios_update_own" ON public.usuarios
  FOR UPDATE USING (auth.uid() = auth_id);

-- --- PROJETOS ---
CREATE POLICY "projetos_select_proponente" ON public.projetos
  FOR SELECT USING (
    proponente_id IN (SELECT id FROM public.usuarios WHERE auth_id = auth.uid())
  );

CREATE POLICY "projetos_select_avaliador" ON public.projetos
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.usuarios WHERE auth_id = auth.uid() AND perfil IN ('avaliador', 'admin'))
  );

CREATE POLICY "projetos_select_publico_aprovados" ON public.projetos
  FOR SELECT USING (status_kanban = 'aprovado');

CREATE POLICY "projetos_insert_proponente" ON public.projetos
  FOR INSERT WITH CHECK (
    proponente_id IN (SELECT id FROM public.usuarios WHERE auth_id = auth.uid() AND perfil = 'proponente')
  );

CREATE POLICY "projetos_update_avaliador" ON public.projetos
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.usuarios WHERE auth_id = auth.uid() AND perfil IN ('avaliador', 'admin'))
  );

-- PROJETOS: DELETE bloqueado — sem política de DELETE

-- --- PARCELAS ---
CREATE POLICY "parcelas_select_own" ON public.parcelas_projeto
  FOR SELECT USING (
    projeto_id IN (
      SELECT id FROM public.projetos 
      WHERE proponente_id IN (SELECT id FROM public.usuarios WHERE auth_id = auth.uid())
    )
  );

CREATE POLICY "parcelas_select_avaliador" ON public.parcelas_projeto
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.usuarios WHERE auth_id = auth.uid() AND perfil IN ('avaliador', 'admin'))
  );

CREATE POLICY "parcelas_update_avaliador" ON public.parcelas_projeto
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.usuarios WHERE auth_id = auth.uid() AND perfil IN ('avaliador', 'admin'))
  );

-- --- EVIDENCIAS ---
CREATE POLICY "evidencias_select_own" ON public.evidencias
  FOR SELECT USING (
    projeto_id IN (
      SELECT id FROM public.projetos 
      WHERE proponente_id IN (SELECT id FROM public.usuarios WHERE auth_id = auth.uid())
    )
  );

CREATE POLICY "evidencias_select_avaliador" ON public.evidencias
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.usuarios WHERE auth_id = auth.uid() AND perfil IN ('avaliador', 'admin'))
  );

CREATE POLICY "evidencias_select_publico_autenticas" ON public.evidencias
  FOR SELECT USING (status_autenticidade = 'autentica');

CREATE POLICY "evidencias_insert_proponente" ON public.evidencias
  FOR INSERT WITH CHECK (
    projeto_id IN (
      SELECT id FROM public.projetos 
      WHERE proponente_id IN (SELECT id FROM public.usuarios WHERE auth_id = auth.uid())
    )
  );

-- --- INTERACOES (IMUTÁVEL) ---
-- SELECT: proponente (own), avaliador, admin, público
CREATE POLICY "interacoes_select_own" ON public.interacoes
  FOR SELECT USING (
    projeto_id IN (
      SELECT id FROM public.projetos 
      WHERE proponente_id IN (SELECT id FROM public.usuarios WHERE auth_id = auth.uid())
    )
  );

CREATE POLICY "interacoes_select_avaliador" ON public.interacoes
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.usuarios WHERE auth_id = auth.uid() AND perfil IN ('avaliador', 'admin'))
  );

CREATE POLICY "interacoes_select_publico" ON public.interacoes
  FOR SELECT USING (true);

-- INSERT: apenas via service_role (triggers de sistema)
-- Sem política de INSERT para anon/authenticated — inserções via triggers/admin

-- UPDATE e DELETE: BLOQUEADO para TODOS os papéis (Salvaguarda B de Cancún)
-- Regra crítica: criar regra que bloqueia mesmo service_role
CREATE OR REPLACE FUNCTION public.block_interacoes_mutation()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Tabela interacoes é imutável (Salvaguarda B de Cancún). UPDATE e DELETE não são permitidos.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_block_interacoes_update
  BEFORE UPDATE ON public.interacoes
  FOR EACH ROW EXECUTE FUNCTION public.block_interacoes_mutation();

CREATE TRIGGER trg_block_interacoes_delete
  BEFORE DELETE ON public.interacoes
  FOR EACH ROW EXECUTE FUNCTION public.block_interacoes_mutation();

-- --- RASCUNHOS ---
CREATE POLICY "rascunhos_select_own" ON public.rascunhos_formulario
  FOR SELECT USING (
    usuario_id IN (SELECT id FROM public.usuarios WHERE auth_id = auth.uid())
  );

CREATE POLICY "rascunhos_insert_own" ON public.rascunhos_formulario
  FOR INSERT WITH CHECK (
    usuario_id IN (SELECT id FROM public.usuarios WHERE auth_id = auth.uid())
  );

CREATE POLICY "rascunhos_update_own" ON public.rascunhos_formulario
  FOR UPDATE USING (
    usuario_id IN (SELECT id FROM public.usuarios WHERE auth_id = auth.uid())
  );

CREATE POLICY "rascunhos_delete_own" ON public.rascunhos_formulario
  FOR DELETE USING (
    usuario_id IN (SELECT id FROM public.usuarios WHERE auth_id = auth.uid())
  );
