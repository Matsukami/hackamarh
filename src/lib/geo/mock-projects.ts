export interface MockProject {
  id: string;
  titulo: string;
  descricao: string;
  municipio: string;
  regiao_id: string;
  status: 'Em Execução' | 'Concluído' | 'Em Análise';
  imagem_url: string;
  latitude: number;
  longitude: number;
}

export const MOCK_PROJECTS: MockProject[] = [
  {
    id: 'eco-2024-001',
    titulo: 'Restauração de Nascentes do Ribeirão Taquaruçu',
    descricao: 'Projeto de recuperação ambiental de 15 nascentes e APP ao longo da bacia do ribeirão, beneficiando 50 famílias.',
    municipio: 'Palmas',
    regiao_id: '17004',
    status: 'Em Execução',
    imagem_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80',
    latitude: -10.3,
    longitude: -48.25,
  },
  {
    id: 'eco-2024-002',
    titulo: 'Agrofloresta Indígena Xerente',
    descricao: 'Implementação de sistemas agroflorestais em terras indígenas, promovendo segurança alimentar e conservação.',
    municipio: 'Tocantínia',
    regiao_id: '17003',
    status: 'Em Execução',
    imagem_url: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=500&q=80',
    latitude: -9.56,
    longitude: -48.37,
  },
  {
    id: 'eco-2024-003',
    titulo: 'Manejo Sustentável do Capim Dourado',
    descricao: 'Capacitação de artesãos e implantação de boas práticas de colheita na região do Jalapão.',
    municipio: 'Mateiros',
    regiao_id: '17007',
    status: 'Concluído',
    imagem_url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=500&q=80',
    latitude: -10.54,
    longitude: -46.42,
  },
  {
    id: 'eco-2024-004',
    titulo: 'Prevenção a Focos de Calor - Bico',
    descricao: 'Monitoramento comunitário e formação de brigadistas voluntários no norte do estado.',
    municipio: 'Araguatins',
    regiao_id: '17001',
    status: 'Em Análise',
    imagem_url: 'https://images.unsplash.com/photo-1611273426858-450d8e81430e?w=500&q=80',
    latitude: -5.65,
    longitude: -48.12,
  },
  {
    id: 'eco-2024-005',
    titulo: 'Viveiro Comunitário Quilombola',
    descricao: 'Produção de mudas nativas do Cerrado para recuperação de áreas degradadas na comunidade Mumbuca.',
    municipio: 'Mateiros',
    regiao_id: '17007',
    status: 'Em Execução',
    imagem_url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&q=80',
    latitude: -10.3,
    longitude: -46.7,
  },
  {
    id: 'eco-2024-006',
    titulo: 'Mulheres Extrativistas do Babaçu',
    descricao: 'Fortalecimento da cadeia produtiva e infraestrutura para quebra de coco, empoderando 120 mulheres.',
    municipio: 'Axixá do Tocantins',
    regiao_id: '17001',
    status: 'Em Execução',
    imagem_url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&q=80',
    latitude: -5.61,
    longitude: -47.77,
  },
  {
    id: 'eco-2024-007',
    titulo: 'Restauração de Pastagens Degradadas',
    descricao: 'Técnicas de ILPF (Integração Lavoura-Pecuária-Floresta) para pequenos produtores.',
    municipio: 'Gurupi',
    regiao_id: '17005',
    status: 'Em Execução',
    imagem_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80',
    latitude: -11.72,
    longitude: -49.06,
  },
  {
    id: 'eco-2024-008',
    titulo: 'Biocombustíveis a partir de Resíduos',
    descricao: 'Geração de energia limpa em comunidades isoladas usando biomassa residual da agricultura.',
    municipio: 'Porto Nacional',
    regiao_id: '17006',
    status: 'Em Análise',
    imagem_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80',
    latitude: -10.7,
    longitude: -48.41,
  },
  {
    id: 'eco-2024-009',
    titulo: 'Expansão de Áreas de Preservação Permanentes',
    descricao: 'Mapeamento e isolamento de novas APPs ao redor de nascentes importantes da região sudeste.',
    municipio: 'Dianópolis',
    regiao_id: '17008',
    status: 'Concluído',
    imagem_url: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=500&q=80',
    latitude: -11.62,
    longitude: -46.82,
  },
  {
    id: 'eco-2024-010',
    titulo: 'Consórcio Agroecológico Familiar',
    descricao: 'Produção diversificada sem uso de defensivos químicos, conectando famílias a mercados locais.',
    municipio: 'Araguaína',
    regiao_id: '17002',
    status: 'Em Execução',
    imagem_url: 'https://images.unsplash.com/photo-1592982537447-6f23b20909af?w=500&q=80',
    latitude: -7.19,
    longitude: -48.2,
  }
];
