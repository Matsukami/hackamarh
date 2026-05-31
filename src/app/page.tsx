import { redirect } from 'next/navigation';

export default function Home() {
  // Para o MVP, a landing page principal redireciona direto para o Portal do Proponente (Mural de Editais)
  redirect('/editais');
}
