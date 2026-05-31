import { z } from 'zod';

export const FormSchema = z.object({
  // Etapa 1
  nome: z.string().min(5, 'Nome deve ter pelo menos 5 caracteres.'),
  documento: z.string().min(11, 'CPF ou CNPJ inválido.'),
  tipo_juridico: z.enum(
    [
      'pessoa_fisica',
      'ong',
      'cooperativa',
      'associacao',
      'entidade_indigena',
      'entidade_quilombola',
    ],
    {
      errorMap: () => ({ message: 'Selecione um tipo jurídico.' }),
    },
  ),
  categoria_beneficiario: z.enum(
    ['terra_indigena', 'quilombola', 'agricultor_familiar', 'fortalecimento_institucional'],
    {
      errorMap: () => ({
        message:
          'HS-01: Selecione uma categoria de beneficiário para continuar. Este campo determina a janela legal de financiamento do projeto.',
      }),
    },
  ),
  email: z.string().email('E-mail inválido.'),
  telefone: z.string().optional(),

  // Etapa 2
  numero_car: z
    .string()
    .min(
      1,
      'HS-02: O número do CAR é obrigatório. Informe o Cadastro Ambiental Rural da propriedade.',
    )
    .regex(
      /^[A-Z]{2}-\d{14}-\d{7}$/,
      'HS-03: Formato de CAR inválido. O formato correto é: UF-XXXXXXXXXXXXX-YYYYYYY (ex: TO-12345678901234-1234567).',
    ),
  latitude: z.coerce
    .number({
      required_error:
        'HS-04: Informe as coordenadas geográficas (latitude e longitude) da área do projeto.',
      invalid_type_error: 'Latitude deve ser um número.',
    })
    .min(
      -13.45,
      'HS-05: As coordenadas informadas estão fora dos limites do Estado do Tocantins. Verifique os valores.',
    )
    .max(
      -5.17,
      'HS-05: As coordenadas informadas estão fora dos limites do Estado do Tocantins. Verifique os valores.',
    ),
  longitude: z.coerce
    .number({
      required_error:
        'HS-04: Informe as coordenadas geográficas (latitude e longitude) da área do projeto.',
      invalid_type_error: 'Longitude deve ser um número.',
    })
    .min(
      -50.74,
      'HS-05: As coordenadas informadas estão fora dos limites do Estado do Tocantins. Verifique os valores.',
    )
    .max(
      -45.67,
      'HS-05: As coordenadas informadas estão fora dos limites do Estado do Tocantins. Verifique os valores.',
    ),
  hectares_area: z.coerce.number().positive('Área deve ser maior que zero.'),
  tipo_posse_terra: z.enum(
    [
      'propriedade_rural',
      'posse_indigena',
      'territorio_quilombola',
      'assentamento',
      'arrendamento',
    ],
    {
      errorMap: () => ({ message: 'Selecione o tipo de posse da terra.' }),
    },
  ),

  // Etapa 3
  titulo: z.string().min(10, 'Mínimo 10 caracteres.').max(200, 'Máximo 200 caracteres.'),
  objetivo_geral: z.string().min(50, 'Mínimo 50 caracteres.'),
  atividades_previstas: z.string().min(100, 'Mínimo 100 caracteres.'),
  hectares_preservados_meta: z.coerce.number().positive('Valor deve ser maior que zero.'),
  focos_incendio_ano_anterior: z.coerce.number().nonnegative('Valor deve ser zero ou maior.'),
  prazo_execucao: z.coerce.number().min(1, 'Mínimo 1 mês.').max(60, 'Máximo 60 meses.'),
  valor_solicitado: z.coerce.number().positive('Valor solicitado deve ser maior que zero.'),

  // Etapa 4
  beneficiarias_mulheres: z.coerce
    .number({
      required_error:
        'HS-06: Os indicadores sociais são obrigatórios. Preencha o número de mulheres beneficiadas.',
      invalid_type_error: 'Deve ser um número.',
    })
    .nonnegative('Valor deve ser zero ou maior.'),
  beneficiarios_jovens: z.coerce
    .number({
      required_error:
        'HS-06: Os indicadores sociais são obrigatórios. Preencha o número de jovens beneficiados.',
      invalid_type_error: 'Deve ser um número.',
    })
    .nonnegative('Valor deve ser zero ou maior.'),
  mulheres_lideranca: z.coerce.number().nonnegative().optional().default(0),
  grupo_etnico: z.enum(
    ['indigena', 'quilombola', 'pardo', 'branco', 'preto', 'amarelo', 'nao_informado'],
    {
      errorMap: () => ({
        message:
          'HS-06: Os indicadores sociais são obrigatórios. Preencha a autodeclaração étnica.',
      }),
    },
  ),
  comunidades_impactadas: z.coerce.number().positive().optional(),
  nome_comunidade: z.string().optional(),

  // Etapa 5
  // For MVP, we'll just check if files were 'uploaded' (strings of URLs or placeholders)
  comprovante_car: z.string().min(1, 'HS-07: Comprovante do CAR é obrigatório.'),
  documento_identidade: z.string().min(1, 'HS-07: Documento de identidade é obrigatório.'),
  // Condicionais we'll handle in component logic or refine here, but for MVP keep it simple.
  documento_extra: z.string().optional(),
});

export type FormValues = z.infer<typeof FormSchema>;
