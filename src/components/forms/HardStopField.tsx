'use client';

import React from 'react';
import { IconCheck, IconAlertTriangle } from '@tabler/icons-react';
import { ValidationResult } from '@/lib/validators/hard-stops';

interface HardStopFieldProps {
  label: string;
  id: string;
  error?: ValidationResult;
  isTouched: boolean;
  children: React.ReactNode;
}

export function HardStopField({ label, id, error, isTouched, children }: HardStopFieldProps) {
  const hasError = isTouched && error && !error.valid;
  const isSuccess = isTouched && error && error.valid;

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block font-semibold text-cerrado mb-2">
        {label}
        {hasError && <span className="ml-2 text-xs font-bold text-perigo">[{error.hardStopCode}]</span>}
      </label>
      
      <div className="relative">
        {children}
        
        {/* Ícone indicativo (feedback visual imediato) */}
        <div className="absolute right-3 top-3 pointer-events-none">
          {hasError && <IconAlertTriangle size={20} className="text-perigo" />}
          {isSuccess && <IconCheck size={20} className="text-mata" />}
        </div>
      </div>
      
      {/* Mensagem de erro */}
      {hasError && (
        <p className="mt-2 text-sm text-perigo flex items-start gap-1">
          <IconAlertTriangle size={16} className="shrink-0 mt-0.5" />
          {error.message}
        </p>
      )}
    </div>
  );
}
