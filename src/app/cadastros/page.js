'use client';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import { Building, DollarSign, FileText, Shield, Truck, Briefcase, Users, Package } from 'lucide-react';

export default function CadastrosPage() {
  const router = useRouter();

  const cadastros = [
    { id: 'empresasCastanheiras', nome: 'Empresas Castanheiras', icon: Building, color: 'blue' },
    { id: 'empresasImportadoras', nome: 'Empresas Importadoras', icon: Users, color: 'green' },
    { id: 'financeiras', nome: 'Financeiras', icon: DollarSign, color: 'purple' },
    { id: 'despachantes', nome: 'Despachantes', icon: FileText, color: 'orange' },
    { id: 'seguradoras', nome: 'Seguradoras', icon: Shield, color: 'red' },
    { id: 'transportadoras', nome: 'Transportadoras', icon: Truck, color: 'yellow' },
    { id: 'corretoras', nome: 'Corretoras', icon: Briefcase, color: 'indigo' },
    { id: 'produtos', nome: 'Produtos', icon: Package, color: 'pink' }
  ];

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500'
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-menuGreen mb-2">Cadastros</h1>
          <p className="text-gray-600 text-sm sm:text-base">Gerencie todas as entidades do sistema</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cadastros.map((cadastro) => {
            const Icon = cadastro.icon;
            return (
              <button
                key={cadastro.id}
                onClick={() => router.push(`/cadastros/${cadastro.id}`)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-left border-2 border-transparent hover:border-menuGreen"
              >
                <div className={`w-12 h-12 ${colorClasses[cadastro.color]} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-base">{cadastro.nome}</h3>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
