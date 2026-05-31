import React from 'react';
import { IconCheck } from '@tabler/icons-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

export function StepIndicator({ currentStep, totalSteps, completedSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between w-full mb-8 relative">
      <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
      
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isCurrent = currentStep === step;
        const isCompleted = completedSteps.includes(step);
        
        let bgColor = 'bg-white border-2 border-gray-300 text-gray-400';
        if (isCurrent) bgColor = 'bg-ouro text-white border-2 border-ouro';
        if (isCompleted && !isCurrent) bgColor = 'bg-mata text-white border-2 border-mata';
        
        return (
          <div 
            key={step} 
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${bgColor} transition-colors`}
            aria-current={isCurrent ? 'step' : undefined}
          >
            {isCompleted && !isCurrent ? <IconCheck size={20} /> : step}
          </div>
        );
      })}
    </div>
  );
}
