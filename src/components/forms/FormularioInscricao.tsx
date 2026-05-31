'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StepIndicator } from './StepIndicator';
import { HardStopField } from './HardStopField';
import { 
  validarCategoria, validarCAR, validarCoordenadas, 
  validarIndicadoresSociais, ValidationResult 
} from '@/lib/validators/hard-stops';
import { JanelaFinanciamento } from '@/lib/types/enums';

interface FormularioProps {
  editalId: string;
}

export function FormularioInscricao({ editalId }: FormularioProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Estado do formulário
  const [formData, setFormData] = useState({
    categoria: '' as JanelaFinanciamento | '',
    car: '',
    latitude: '',
    longitude: '',
    mulheres: '',
    jovens: '',
    titulo: '',
    objetivo: '',
  });

  // Estado de validação (Hard-Stops)
  const [errors, setErrors] = useState<Record<string, ValidationResult>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Atualiza validação em tempo real (HS-01 a HS-06)
  useEffect(() => {
    const newErrors: Record<string, ValidationResult> = {
      categoria: validarCategoria(formData.categoria),
      car: validarCAR(formData.car),
      coordenadas: validarCoordenadas(parseFloat(formData.latitude), parseFloat(formData.longitude)),
      sociais: validarIndicadoresSociais(parseInt(formData.mulheres), parseInt(formData.jovens))
    };
    setErrors(newErrors);
  }, [formData]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleNext = () => {
    // Verifica se a etapa atual tem algum hard-stop ativo
    let canProceed = true;
    
    if (step === 1 && !errors.categoria?.valid) canProceed = false;
    if (step === 2 && (!errors.car?.valid || !errors.coordenadas?.valid)) canProceed = false;
    if (step === 4 && !errors.sociais?.valid) canProceed = false;

    if (canProceed) {
      if (!completedSteps.includes(step)) {
        setCompletedSteps([...completedSteps, step]);
      }
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Força mostrar os erros da etapa atual
      if (step === 1) setTouched(prev => ({ ...prev, categoria: true }));
      if (step === 2) setTouched(prev => ({ ...prev, car: true, latitude: true, longitude: true }));
      if (step === 4) setTouched(prev => ({ ...prev, mulheres: true, jovens: true }));
    }
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simula a submissão e redireciona para o scorecard (T-03)
    alert("Inscrição submetida com sucesso! Redirecionando para o Scorecard Preditivo...");
    router.push(`/projetos/novo/${editalId}/scorecard`);
  };

  // Helper para classes dos inputs
  const getInputClass = (field: string, errorKey: string) => {
    if (!touched[field]) return 'input-field';
    return errors[errorKey]?.valid ? 'input-field-success' : 'input-field-error';
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-areia-dark max-w-3xl mx-auto">
      <StepIndicator currentStep={step} totalSteps={5} completedSteps={completedSteps} />
      
      <form onSubmit={step === 5 ? handleSubmit : (e) => e.preventDefault()}>
        
        {/* ETAPA 1: Identificação (HS-01) */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-h1 mb-6">1. Identificação</h2>
            
            <HardStopField 
              id="categoria" 
              label="Categoria de Beneficiário" 
              error={errors.categoria} 
              isTouched={!!touched.categoria}
            >
              <select 
                id="categoria"
                className={getInputClass('categoria', 'categoria')}
                value={formData.categoria}
                onChange={(e) => handleChange('categoria', e.target.value)}
              >
                <option value="">Selecione uma categoria...</option>
                <option value="terra_indigena">Terra Indígena</option>
                <option value="quilombola">Quilombola</option>
                <option value="agricultor_familiar">Agricultura Familiar</option>
                <option value="fortalecimento_institucional">Fortalecimento Institucional</option>
              </select>
            </HardStopField>
          </div>
        )}

        {/* ETAPA 2: Propriedade (HS-02, HS-03, HS-04, HS-05) */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-h1 mb-6">2. Dados da Propriedade</h2>
            
            <HardStopField 
              id="car" 
              label="Número do CAR (Cadastro Ambiental Rural)" 
              error={errors.car} 
              isTouched={!!touched.car}
            >
              <input 
                type="text" 
                id="car"
                className={getInputClass('car', 'car')}
                placeholder="TO-12345678901234-1234567"
                value={formData.car}
                onChange={(e) => handleChange('car', e.target.value)}
              />
            </HardStopField>

            <div className="grid grid-cols-2 gap-4">
              <HardStopField 
                id="latitude" 
                label="Latitude" 
                error={errors.coordenadas} 
                isTouched={!!touched.latitude}
              >
                <input 
                  type="number" 
                  step="0.000001"
                  id="latitude"
                  className={getInputClass('latitude', 'coordenadas')}
                  placeholder="-10.123456"
                  value={formData.latitude}
                  onChange={(e) => handleChange('latitude', e.target.value)}
                />
              </HardStopField>

              <HardStopField 
                id="longitude" 
                label="Longitude" 
                error={errors.coordenadas} 
                isTouched={!!touched.longitude}
              >
                <input 
                  type="number" 
                  step="0.000001"
                  id="longitude"
                  className={getInputClass('longitude', 'coordenadas')}
                  placeholder="-48.123456"
                  value={formData.longitude}
                  onChange={(e) => handleChange('longitude', e.target.value)}
                />
              </HardStopField>
            </div>
          </div>
        )}

        {/* ETAPA 3: Descritivo */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-h1 mb-6">3. Descritivo do Projeto</h2>
            <div className="mb-4">
              <label className="block font-semibold text-cerrado mb-2">Título do Projeto</label>
              <input 
                type="text" 
                className="input-field"
                value={formData.titulo}
                onChange={(e) => handleChange('titulo', e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-cerrado mb-2">Objetivo Principal</label>
              <textarea 
                className="input-field min-h-[100px]"
                value={formData.objetivo}
                onChange={(e) => handleChange('objetivo', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* ETAPA 4: Indicadores Sociais (HS-06) */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h2 className="text-h1 mb-6">4. Indicadores Sociais (Salvaguardas)</h2>
            <div className="grid grid-cols-2 gap-4">
              <HardStopField 
                id="mulheres" 
                label="Mulheres Beneficiadas" 
                error={errors.sociais} 
                isTouched={!!touched.mulheres}
              >
                <input 
                  type="number" 
                  id="mulheres"
                  min="0"
                  className={getInputClass('mulheres', 'sociais')}
                  value={formData.mulheres}
                  onChange={(e) => handleChange('mulheres', e.target.value)}
                />
              </HardStopField>

              <HardStopField 
                id="jovens" 
                label="Jovens Beneficiados" 
                error={errors.sociais} 
                isTouched={!!touched.jovens}
              >
                <input 
                  type="number" 
                  id="jovens"
                  min="0"
                  className={getInputClass('jovens', 'sociais')}
                  value={formData.jovens}
                  onChange={(e) => handleChange('jovens', e.target.value)}
                />
              </HardStopField>
            </div>
          </div>
        )}

        {/* ETAPA 5: Documentação (HS-07) */}
        {step === 5 && (
          <div className="animate-fade-in">
            <h2 className="text-h1 mb-6">5. Documentação</h2>
            <p className="mb-4 text-gray-600">Faça o upload dos documentos comprobatórios.</p>
            
            {formData.categoria === 'terra_indigena' && (
              <div className="mb-4 p-4 border-2 border-ouro border-dashed rounded bg-ouro/5">
                <p className="font-bold text-ouro mb-2">[HS-07] Obrigatório para Terra Indígena:</p>
                <p>Anexe a Autorização da FUNAI.</p>
                <input type="file" className="mt-2" />
              </div>
            )}
            
            {formData.categoria === 'quilombola' && (
              <div className="mb-4 p-4 border-2 border-ouro border-dashed rounded bg-ouro/5">
                <p className="font-bold text-ouro mb-2">[HS-07] Obrigatório para Quilombola:</p>
                <p>Anexe a Certidão do INCRA.</p>
                <input type="file" className="mt-2" />
              </div>
            )}
            
            <div className="mb-4 p-4 border-2 border-gray-300 border-dashed rounded">
              <p className="font-bold text-gray-700 mb-2">Comprovante do CAR</p>
              <input type="file" className="mt-2" />
            </div>
          </div>
        )}

        {/* Navegação Inferior */}
        <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
          <button 
            type="button" 
            onClick={handleBack}
            className={`btn-secondary ${step === 1 ? 'invisible' : ''}`}
          >
            Voltar
          </button>
          
          {step < 5 ? (
            <button 
              type="button" 
              onClick={handleNext}
              className="btn-primary"
            >
              Avançar
            </button>
          ) : (
            <button 
              type="submit" 
              className="btn-primary"
            >
              Submeter Inscrição
            </button>
          )}
        </div>
        
      </form>
    </div>
  );
}
