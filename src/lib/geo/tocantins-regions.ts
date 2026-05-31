export interface Region {
  id: string;
  nome: string;
  cor: string;
}

export const TOCANTINS_REGIONS: Record<string, Region> = {
  '17001': { id: '17001', nome: 'Bico do Papagaio', cor: '#1A6B4A' }, // mata-alta
  '17002': { id: '17002', nome: 'Araguaína', cor: '#E8A020' }, // ouro-tocantins
  '17003': { id: '17003', nome: 'Miracema do Tocantins', cor: '#2F8858' }, // verde-medio
  '17004': { id: '17004', nome: 'Rio Formoso', cor: '#E07A5F' }, // terra-indigena
  '17005': { id: '17005', nome: 'Gurupi', cor: '#8B5A2B' }, // tronco-forte
  '17006': { id: '17006', nome: 'Porto Nacional', cor: '#4A90E2' }, // azul-araguaia
  '17007': { id: '17007', nome: 'Jalapão', cor: '#F4A261' }, // buriti-vivo
  '17008': { id: '17008', nome: 'Dianópolis', cor: '#C8E063' }, // verde-claro
};
