'use client';
import { useRouter } from 'next/navigation';
import useStore from '@/lib/store';
import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import { ArrowLeft, DollarSign, Plus, Edit, Trash2 } from 'lucide-react';

export default function FinanceirasPage() {
  const router = useRouter();
  const { financeiras } = useStore();

  const columns = [
    {
      key: 'nome',
      label: 'Nome',
      render: (row) => (
        <div className="font-medium text-gray-900">{row.nome}</div>
      )
    },
    {
      key: 'taxa',
      label: 'Taxa (%)',
      render: (row) => (
        <div className="text-gray-700">{row.taxa}%</div>
      )
    },
    {
      key: 'prazo',
      label: 'Prazo (dias)',
      render: (row) => (
        <div className="text-gray-600">{row.prazo} dias</div>
      )
    },
    {
      key: 'contato',
      label: 'Contato',
      render: (row) => (
        <div className="text-gray-600 text-sm">{row.contato}</div>
      )
    },
    {
      key: 'acoes',
      label: 'Ações',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar"
          >
            <Edit size={18} />
          </button>
          <button
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Excluir"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <button
          onClick={() => router.push('/cadastros')}
          className="flex items-center gap-2 text-gray-600 hover:text-menuGreen mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Voltar para Cadastros</span>
        </button>

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-menuGreen mb-2">
              Financeiras
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Gerencie instituições financeiras parceiras
            </p>
          </div>
          <button
            onClick={() => router.push('/cadastros/financeiras/nova')}
            className="flex items-center gap-2 px-6 py-3 bg-menuGreen text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
          >
            <Plus size={20} />
            Nova Financeira
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total de Financeiras</p>
                <p className="text-2xl font-bold text-gray-900">{financeiras.length}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card title="Lista de Financeiras">
          <DataTable columns={columns} data={financeiras} />
        </Card>
      </div>
    </main>
  );
}
