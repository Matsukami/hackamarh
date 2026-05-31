'use client';

import React from 'react';

interface ScoreGaugeProps {
  score: number;
  max: number;
}

export function ScoreGauge({ score, max }: ScoreGaugeProps) {
  const percentage = (score / max) * 100;
  
  // Cálculo do SVG Dash Array para o círculo
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  let colorClass = 'text-perigo';
  if (percentage >= 80) colorClass = 'text-mata';
  else if (percentage >= 60) colorClass = 'text-ouro';

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-48 h-48 transform -rotate-90">
        {/* Círculo de fundo */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-gray-200"
        />
        {/* Círculo de progresso */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${colorClass} transition-all duration-1000 ease-out`}
        />
      </svg>
      {/* Texto central */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold font-hero ${colorClass}`}>
          {score}
        </span>
        <span className="text-gray-500 font-semibold text-sm">
          de {max}
        </span>
      </div>
    </div>
  );
}
