// ============================================================
// JREDD+ Tocantins — ENUMs e Tipos Jurídicos
// Baseado na Especificação Técnica v1, seções 2.3 e 3
// ============================================================

// --- ENUMs de domínio ---

export type StatusEdital = "aberto" | "em_breve" | "encerrado";

export type JanelaFinanciamento =
  | "terra_indigena"
  | "quilombola"
  | "agricultor_familiar"
  | "fortalecimento_institucional";

export type StatusKanban =
  | "recebido"
  | "em_analise"
  | "com_pendencia"
  | "aprovado"
  | "reprovado"
  | "cancelado";

export type StatusParcela = "bloqueado" | "liberado" | "pago";

export type StatusAutenticidade =
  | "pendente"
  | "autentica"
  | "suspeita"
  | "rejeitada";

export type GrupoEtnico =
  | "indigena"
  | "quilombola"
  | "pardo"
  | "branco"
  | "preto"
  | "amarelo"
  | "nao_informado";

export type TipoJuridico =
  | "pessoa_fisica"
  | "ong"
  | "cooperativa"
  | "associacao"
  | "entidade_indigena"
  | "entidade_quilombola";

export type Perfil = "proponente" | "avaliador" | "admin" | "publico";

export type TipoEvidencia = "foto" | "documento" | "relatorio";

export type TipoInteracao =
  | "submissao"
  | "aprovacao"
  | "reprovacao"
  | "pendencia"
  | "correcao"
  | "liberacao_parcela"
  | "upload_evidencia"
  | "parecer"
  | "sistema";

export type OrigemProjeto = "web" | "whatsapp";

// --- Interfaces de domínio ---

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil;
  telefone_whatsapp?: string;
  modo_voz_ativo: boolean;
  criado_em: string;
  atualizado_em: string;
}

export interface Edital {
  id: string;
  titulo: string;
  descricao: string;
  status: StatusEdital;
  janela_financiamento: JanelaFinanciamento;
  valor_total: number;
  data_abertura: string;
  data_encerramento: string;
  criado_em: string;
  atualizado_em: string;
}

export interface IndicadoresSociais {
  beneficiarias_mulheres: number;
  beneficiarios_jovens: number;
  grupo_etnico: GrupoEtnico;
  comunidades_atendidas: number;
  povo_indigena?: string;
}

export interface Projeto {
  id: string;
  edital_id: string;
  proponente_id: string;
  titulo: string;
  objetivo: string;
  atividades: string;
  tipo_juridico: TipoJuridico;
  categoria_beneficiario: JanelaFinanciamento;
  numero_car: string;
  latitude: number;
  longitude: number;
  area_hectares: number;
  hectares_meta: number;
  focos_incendio_anterior: number;
  prazo_meses: number;
  valor_solicitado: number;
  status_kanban: StatusKanban;
  score_previo?: number;
  indicadores_sociais: IndicadoresSociais;
  origem: OrigemProjeto;
  data_limite_correcao?: string;
  criado_em: string;
  atualizado_em: string;
}

export interface ParcelaProjeto {
  id: string;
  projeto_id: string;
  numero_parcela: number;
  valor: number;
  meta_fisica: string;
  status_liberacao: StatusParcela;
  criado_em: string;
  atualizado_em: string;
}

export interface Evidencia {
  id: string;
  projeto_id: string;
  parcela_id: string;
  tipo: TipoEvidencia;
  url_arquivo: string;
  descricao?: string;
  gps_lat?: number;
  gps_lng?: number;
  data_exif?: string;
  status_autenticidade: StatusAutenticidade;
  score_ia_sintetica?: number;
  criado_em: string;
}

export interface Interacao {
  id: string;
  projeto_id: string;
  usuario_id: string;
  tipo_evento: TipoInteracao;
  descricao: string;
  payload?: Record<string, unknown>;
  criado_em: string;
  // Nota: NÃO há atualizado_em — tabela imutável (Salvaguarda B de Cancún)
}

export interface RascunhoFormulario {
  id: string;
  usuario_id: string;
  edital_id: string;
  dados_parciais: Record<string, unknown>;
  etapa_atual: number;
  criado_em: string;
  atualizado_em: string;
}

// --- Constantes de validação (Hard-Stops) ---

/** Regex para validação do número CAR (Cadastro Ambiental Rural) */
export const CAR_REGEX = /^[A-Z]{2}-\d{14}-\d{7}$/;

/** Limites de coordenadas do Estado do Tocantins */
export const TOCANTINS_BOUNDS = {
  latitude: { min: -13.45, max: -5.17 },
  longitude: { min: -50.74, max: -45.67 },
} as const;

/** Categorias que requerem documentos específicos */
export const CATEGORIAS_COM_FUNAI: JanelaFinanciamento[] = ["terra_indigena"];
export const CATEGORIAS_COM_INCRA: JanelaFinanciamento[] = ["quilombola"];
