import React from 'react';
import Link from 'next/link';
import { IconMapPin, IconLeaf, IconArrowRight, IconX } from '@tabler/icons-react';
import { MockProject } from '@/lib/geo/mock-projects';

interface ProjectCardProps {
  project: MockProject;
  onClose: () => void;
}

export function ProjectCard({ project, onClose }: ProjectCardProps) {
  return (
    <div className="absolute right-6 top-6 w-80 animate-in fade-in slide-in-from-right-8 rounded-[12px] border border-[#CCCCCC] bg-white text-cerrado-profundo shadow-xl z-20">
      {/* Image Header */}
      <div className="relative h-40 w-full overflow-hidden rounded-t-[11px]">
        <img 
          src={project.imagem_url} 
          alt={project.titulo}
          className="h-full w-full object-cover"
        />
        <button 
          onClick={onClose}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <IconX size={18} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-cerrado-profundo backdrop-blur-md">
          <IconMapPin size={14} className="text-mata-alta" />
          {project.municipio}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="font-sora text-base font-bold leading-tight text-cerrado-profundo">
            {project.titulo}
          </h3>
        </div>

        {/* Status Badge */}
        <div className="mb-4 inline-flex items-center gap-1.5 rounded bg-gray-100 px-2 py-1 text-xs font-bold">
          <IconLeaf 
            size={14} 
            className={
              project.status === 'Concluído' ? 'text-mata-alta' : 
              project.status === 'Em Execução' ? 'text-ouro-tocantins' : 
              'text-gray-500'
            } 
          />
          <span className="text-gray-700">{project.status}</span>
        </div>

        <p className="mb-6 font-dm-sans text-sm text-gray-600 line-clamp-3">
          {project.descricao}
        </p>

        <Link 
          href={`/projetos/${project.id}`}
          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-cerrado-profundo px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-mata-alta"
        >
          Ver informações completas
          <IconArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
