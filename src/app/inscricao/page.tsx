'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema, type FormValues } from './schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { IconCheck, IconAlertTriangle } from '@tabler/icons-react';

const STEPS = ['Identificação', 'Território', 'Descritivo', 'Indicadores', 'Documentação'];

export default function InscricaoPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
    watch,
  } = useForm<FormValues>({
    // @ts-expect-error Type mismatch between react-hook-form and hookform/resolvers versions
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
  });

  const nextStep = async () => {
    // Determine which fields to validate based on current step
    let fieldsToValidate: any[] = [];
    if (currentStep === 0)
      fieldsToValidate = ['nome', 'documento', 'tipo_juridico', 'categoria_beneficiario', 'email'];
    if (currentStep === 1)
      fieldsToValidate = [
        'numero_car',
        'latitude',
        'longitude',
        'hectares_area',
        'tipo_posse_terra',
      ];
    if (currentStep === 2)
      fieldsToValidate = [
        'titulo',
        'objetivo_geral',
        'atividades_previstas',
        'hectares_preservados_meta',
        'focos_incendio_ano_anterior',
        'prazo_execucao',
        'valor_solicitado',
      ];
    if (currentStep === 3)
      fieldsToValidate = ['beneficiarias_mulheres', 'beneficiarios_jovens', 'grupo_etnico'];
    if (currentStep === 4) fieldsToValidate = ['comprovante_car', 'documento_identidade'];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = (data: FormValues) => {
    console.log('Submitting data:', data);
    alert('Proposta submetida com sucesso! Scorecard será calculado a seguir.');
    // TODO: Send data to Supabase and redirect to Painel
  };

  const renderError = (field: keyof FormValues) => {
    if (errors[field]) {
      return (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
          <IconAlertTriangle size={14} />
          {errors[field]?.message}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 font-sora text-3xl font-bold text-cerrado-profundo">
          Formulário de Inscrição (T-02)
        </h1>
        <p className="font-dm-sans text-gray-600">
          Preencha os dados do projeto. Validações automáticas estão ativas.
        </p>
      </div>

      {/* Stepper */}
      <div className="relative mb-8 flex items-center justify-between">
        <div className="absolute left-0 top-1/2 -z-10 h-1 w-full -translate-y-1/2 bg-gray-200"></div>
        <div
          className="absolute left-0 top-1/2 -z-10 h-1 -translate-y-1/2 bg-mata-alta transition-all"
          style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
        ></div>

        {STEPS.map((step, index) => (
          <div key={step} className="flex flex-col items-center gap-2 bg-areia-jalapao px-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${index < currentStep ? 'border-mata-alta bg-mata-alta text-white' : index === currentStep ? 'border-mata-alta bg-white text-mata-alta' : 'border-gray-300 bg-white text-gray-400'}`}
            >
              {index < currentStep ? <IconCheck size={16} /> : index + 1}
            </div>
            <span
              className={`text-xs font-bold ${index <= currentStep ? 'text-cerrado-profundo' : 'text-gray-400'} hidden md:block`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-6 sm:p-10">
          <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
            {/* ETAPA 1 */}
            {currentStep === 0 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4">
                <h2 className="mb-6 font-sora text-xl font-bold text-cerrado-profundo">
                  Identificação do Proponente
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">Nome / Razão Social *</label>
                    <Input
                      {...register('nome')}
                      placeholder="Nome completo"
                      error={!!errors.nome}
                    />
                    {renderError('nome')}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">CPF ou CNPJ *</label>
                    <Input
                      {...register('documento')}
                      placeholder="Apenas números"
                      error={!!errors.documento}
                    />
                    {renderError('documento')}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">Tipo Jurídico *</label>
                    <select
                      {...register('tipo_juridico')}
                      className={`flex h-11 w-full rounded-lg border px-3 py-2 font-dm-sans text-sm focus:outline-none focus:ring-4 focus:ring-mata-alta/25 ${errors.tipo_juridico ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-mata-alta'}`}
                    >
                      <option value="">Selecione...</option>
                      <option value="pessoa_fisica">Pessoa Física</option>
                      <option value="ong">ONG</option>
                      <option value="cooperativa">Cooperativa</option>
                      <option value="associacao">Associação</option>
                      <option value="entidade_indigena">Entidade Indígena</option>
                      <option value="entidade_quilombola">Entidade Quilombola</option>
                    </select>
                    {renderError('tipo_juridico')}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">
                      Categoria de Beneficiário (HS-01) *
                    </label>
                    <select
                      {...register('categoria_beneficiario')}
                      className={`flex h-11 w-full rounded-lg border px-3 py-2 font-dm-sans text-sm focus:outline-none focus:ring-4 focus:ring-mata-alta/25 ${errors.categoria_beneficiario ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-mata-alta'}`}
                    >
                      <option value="">Selecione a janela legal...</option>
                      <option value="terra_indigena">Terra Indígena</option>
                      <option value="quilombola">Quilombola</option>
                      <option value="agricultor_familiar">Agricultor Familiar</option>
                      <option value="fortalecimento_institucional">
                        Fortalecimento Institucional
                      </option>
                    </select>
                    {renderError('categoria_beneficiario')}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">E-mail *</label>
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder="email@exemplo.com"
                      error={!!errors.email}
                    />
                    {renderError('email')}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">Telefone / WhatsApp</label>
                    <Input {...register('telefone')} placeholder="(DD) XXXXX-XXXX" />
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 2 */}
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4">
                <h2 className="mb-6 font-sora text-xl font-bold text-cerrado-profundo">
                  Dados da Propriedade / Território
                </h2>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">
                    Número do CAR (HS-02 / HS-03) *
                  </label>
                  <Input
                    {...register('numero_car')}
                    placeholder="UF-XXXXXXXXXXXXX-YYYYYYY"
                    error={!!errors.numero_car}
                  />
                  <p className="text-xs text-gray-500">Ex: TO-12345678901234-1234567</p>
                  {renderError('numero_car')}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">
                      Latitude (HS-04 / HS-05) *
                    </label>
                    <Input
                      {...register('latitude')}
                      type="number"
                      step="any"
                      placeholder="-10.12345"
                      error={!!errors.latitude}
                    />
                    <p className="text-xs text-gray-500">Limites TO: -13.45 a -5.17</p>
                    {renderError('latitude')}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">
                      Longitude (HS-04 / HS-05) *
                    </label>
                    <Input
                      {...register('longitude')}
                      type="number"
                      step="any"
                      placeholder="-48.12345"
                      error={!!errors.longitude}
                    />
                    <p className="text-xs text-gray-500">Limites TO: -50.74 a -45.67</p>
                    {renderError('longitude')}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">
                      Área Total (Hectares) *
                    </label>
                    <Input
                      {...register('hectares_area')}
                      type="number"
                      step="any"
                      min="0"
                      error={!!errors.hectares_area}
                    />
                    {renderError('hectares_area')}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">Tipo de Posse *</label>
                    <select
                      {...register('tipo_posse_terra')}
                      className={`flex h-11 w-full rounded-lg border px-3 py-2 font-dm-sans text-sm focus:outline-none focus:ring-4 focus:ring-mata-alta/25 ${errors.tipo_posse_terra ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-mata-alta'}`}
                    >
                      <option value="">Selecione...</option>
                      <option value="propriedade_rural">Propriedade Rural</option>
                      <option value="posse_indigena">Posse Indígena</option>
                      <option value="territorio_quilombola">Território Quilombola</option>
                      <option value="assentamento">Assentamento</option>
                      <option value="arrendamento">Arrendamento</option>
                    </select>
                    {renderError('tipo_posse_terra')}
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 3 */}
            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4">
                <h2 className="mb-6 font-sora text-xl font-bold text-cerrado-profundo">
                  Descritivo do Projeto
                </h2>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Título do Projeto *</label>
                  <Input
                    {...register('titulo')}
                    placeholder="Título sucinto"
                    error={!!errors.titulo}
                  />
                  {renderError('titulo')}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Objetivo Geral *</label>
                  <textarea
                    {...register('objetivo_geral')}
                    className={`flex min-h-24 w-full rounded-lg border px-3 py-2 font-dm-sans text-sm focus:outline-none focus:ring-4 focus:ring-mata-alta/25 ${errors.objetivo_geral ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-mata-alta'}`}
                  ></textarea>
                  {renderError('objetivo_geral')}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Atividades Previstas *</label>
                  <textarea
                    {...register('atividades_previstas')}
                    className={`flex min-h-24 w-full rounded-lg border px-3 py-2 font-dm-sans text-sm focus:outline-none focus:ring-4 focus:ring-mata-alta/25 ${errors.atividades_previstas ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-mata-alta'}`}
                  ></textarea>
                  {renderError('atividades_previstas')}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">
                      Hectares a preservar (Meta) *
                    </label>
                    <Input
                      {...register('hectares_preservados_meta')}
                      type="number"
                      min="0"
                      error={!!errors.hectares_preservados_meta}
                    />
                    {renderError('hectares_preservados_meta')}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">
                      Focos de incêndio (Ano ant.) *
                    </label>
                    <Input
                      {...register('focos_incendio_ano_anterior')}
                      type="number"
                      min="0"
                      error={!!errors.focos_incendio_ano_anterior}
                    />
                    {renderError('focos_incendio_ano_anterior')}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">
                      Prazo de execução (meses) *
                    </label>
                    <Input
                      {...register('prazo_execucao')}
                      type="number"
                      min="1"
                      max="60"
                      error={!!errors.prazo_execucao}
                    />
                    {renderError('prazo_execucao')}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">
                      Valor Solicitado (R$) *
                    </label>
                    <Input
                      {...register('valor_solicitado')}
                      type="number"
                      step="any"
                      min="0"
                      error={!!errors.valor_solicitado}
                    />
                    {renderError('valor_solicitado')}
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 4 */}
            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4">
                <h2 className="mb-2 font-sora text-xl font-bold text-cerrado-profundo">
                  Indicadores Sociais
                </h2>
                <p className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-gray-600">
                  Salvaguardas de Cancún: Obrigatório pela UNFCCC para certificação de créditos de
                  carbono. Valores ZERO são aceitos, não deixe em branco.
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">
                      Mulheres beneficiadas (HS-06) *
                    </label>
                    <Input
                      {...register('beneficiarias_mulheres')}
                      type="number"
                      min="0"
                      error={!!errors.beneficiarias_mulheres}
                    />
                    {renderError('beneficiarias_mulheres')}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">
                      Jovens beneficiados (HS-06) *
                    </label>
                    <Input
                      {...register('beneficiarios_jovens')}
                      type="number"
                      min="0"
                      error={!!errors.beneficiarios_jovens}
                    />
                    {renderError('beneficiarios_jovens')}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">Mulheres em liderança</label>
                    <Input {...register('mulheres_lideranca')} type="number" min="0" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">
                      Autodeclaração Étnica (HS-06) *
                    </label>
                    <select
                      {...register('grupo_etnico')}
                      className={`flex h-11 w-full rounded-lg border px-3 py-2 font-dm-sans text-sm focus:outline-none focus:ring-4 focus:ring-mata-alta/25 ${errors.grupo_etnico ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-mata-alta'}`}
                    >
                      <option value="">Selecione...</option>
                      <option value="indigena">Indígena</option>
                      <option value="quilombola">Quilombola</option>
                      <option value="pardo">Pardo</option>
                      <option value="branco">Branco</option>
                      <option value="preto">Preto</option>
                      <option value="amarelo">Amarelo</option>
                      <option value="nao_informado">Prefiro não informar</option>
                    </select>
                    {renderError('grupo_etnico')}
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 5 */}
            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4">
                <h2 className="mb-6 font-sora text-xl font-bold text-cerrado-profundo">
                  Documentação Comprobatória
                </h2>

                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Comprovante do CAR (PDF/Imagem) (HS-07) *
                    </label>
                    <Input
                      {...register('comprovante_car')}
                      type="file"
                      accept=".pdf,image/*"
                      error={!!errors.comprovante_car}
                    />
                    {renderError('comprovante_car')}
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Documento de Identidade do Responsável (HS-07) *
                    </label>
                    <Input
                      {...register('documento_identidade')}
                      type="file"
                      accept=".pdf,image/*"
                      error={!!errors.documento_identidade}
                    />
                    {renderError('documento_identidade')}
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Documentos Adicionais (Condicional)
                    </label>
                    <p className="mb-2 text-xs text-gray-500">
                      Certidão Fundiária, Autorização FUNAI ou INCRA dependendo da categoria
                      escolhida.
                    </p>
                    <Input {...register('documento_extra')} type="file" accept=".pdf" />
                  </div>
                </div>

                {!isValid && (
                  <div className="mt-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <IconAlertTriangle size={20} className="mt-0.5 shrink-0" />
                    <div>
                      <strong>Hard-Stops Pendentes:</strong>
                      <p>
                        Existem erros de validação nas etapas anteriores ou documentação faltante.
                        Verifique os campos obrigatórios para liberar o envio.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Controls */}
            <div className="mt-8 flex justify-between border-t pt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Voltar
              </Button>

              {currentStep < STEPS.length - 1 ? (
                <Button type="button" variant="primary" onClick={nextStep}>
                  Avançar
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  className="bg-mata-alta text-white hover:bg-mata-alta/90"
                  disabled={!isValid}
                >
                  Submeter Proposta
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
