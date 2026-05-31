import { CAR_REGEX, TOCANTINS_BOUNDS, JanelaFinanciamento } from '@/lib/types/enums';

// Result wrapper for hard stops
export interface ValidationResult {
  valid: boolean;
  message?: string;
  hardStopCode?: string;
}

// HS-01: Categoria de Beneficiário Válida
export function validarCategoria(categoria: JanelaFinanciamento | ''): ValidationResult {
  if (!categoria) {
    return { valid: false, message: 'Selecione uma categoria de beneficiário.', hardStopCode: 'HS-01' };
  }
  return { valid: true };
}

// HS-02 / HS-03: Formato do CAR
export function validarCAR(car: string): ValidationResult {
  if (!car) {
    return { valid: false, message: 'O número do CAR é obrigatório.', hardStopCode: 'HS-02' };
  }
  if (!CAR_REGEX.test(car)) {
    return { valid: false, message: 'Formato inválido. Use o padrão exigido.', hardStopCode: 'HS-02' };
  }
  // HS-03 seria a verificação na base oficial. Aqui assumiremos aprovação de formato.
  return { valid: true };
}

// HS-04 / HS-05: Coordenadas geográficas dentro do Tocantins
export function validarCoordenadas(lat: number, lng: number): ValidationResult {
  if (isNaN(lat) || isNaN(lng)) {
    return { valid: false, message: 'Coordenadas inválidas.', hardStopCode: 'HS-04' };
  }
  if (lat < TOCANTINS_BOUNDS.latitude.min || lat > TOCANTINS_BOUNDS.latitude.max) {
    return { 
      valid: false, 
      message: `Latitude fora do TO. Permitido: ${TOCANTINS_BOUNDS.latitude.min} a ${TOCANTINS_BOUNDS.latitude.max}`, 
      hardStopCode: 'HS-04' 
    };
  }
  if (lng < TOCANTINS_BOUNDS.longitude.min || lng > TOCANTINS_BOUNDS.longitude.max) {
    return { 
      valid: false, 
      message: `Longitude fora do TO. Permitido: ${TOCANTINS_BOUNDS.longitude.min} a ${TOCANTINS_BOUNDS.longitude.max}`, 
      hardStopCode: 'HS-05' 
    };
  }
  return { valid: true };
}

// HS-06: Indicadores sociais (Mulheres e Jovens >= 0)
export function validarIndicadoresSociais(mulheres: number, jovens: number): ValidationResult {
  if (isNaN(mulheres) || mulheres < 0) {
    return { valid: false, message: 'Número de mulheres beneficiadas deve ser ≥ 0.', hardStopCode: 'HS-06' };
  }
  if (isNaN(jovens) || jovens < 0) {
    return { valid: false, message: 'Número de jovens beneficiados deve ser ≥ 0.', hardStopCode: 'HS-06' };
  }
  return { valid: true };
}

// HS-07: Documentação obrigatória
export function validarDocumentos(categoria: JanelaFinanciamento, arquivosIds: string[], temDocumentosEspecificos: Record<string, boolean>): ValidationResult {
  if (!arquivosIds || arquivosIds.length === 0) {
    return { valid: false, message: 'Nenhum documento anexado.', hardStopCode: 'HS-07' };
  }
  
  if (categoria === 'terra_indigena' && !temDocumentosEspecificos['funai']) {
    return { valid: false, message: 'Autorização da FUNAI é obrigatória para esta categoria.', hardStopCode: 'HS-07' };
  }
  
  if (categoria === 'quilombola' && !temDocumentosEspecificos['incra']) {
    return { valid: false, message: 'Certidão do INCRA é obrigatória para esta categoria.', hardStopCode: 'HS-07' };
  }
  
  return { valid: true };
}
