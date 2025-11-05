'use client';
import { useRouter } from 'next/navigation';
import useStore from '@/lib/store';
import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import PrimaryButton from '@/components/PrimaryButton';
import { Eye, Ship, CheckCircle, Clock, FileText, TrendingUp } from 'lucide-react';

export default function ExportacoesPage() {
  const router = useRouter();
  const { exportacoes, ofertas, empresasCastanheiras, empresasImportadoras } = useStore();

  // Função para pegar nome da empresa exportadora
  const getExportadoraNome = (ofertaId) => {
    const oferta = ofertas.find(o => o.id === ofertaId);
    return oferta?.empresaExportadoraNome || 'N/A';
  };

  // Função para pegar nome da empresa importadora
  const getImportadoraNome = (importadoraId) => {
    const importadora = empresasImportadoras.find(e => e.id === importadoraId);
    return importadora?.nome || 'N/A';
  };

  // Função para pegar dados da oferta
  const getOfertaData = (ofertaId) => {
    return ofertas.find(o => o.id === ofertaId);
  };

  const statusColors = {
    'MATCHED': 'bg-blue-100 text-blue-800',
    'PARTNERS_CONFIRMED': 'bg-yellow-100 text-yellow-800',
    'IN_PROGRESS': 'bg-purple-100 text-purple-800',
    'COMPLETED': 'bg-green-100 text-green-800'
  };

  const statusLabels = {
    'MATCHED': 'Match Realizado',
    'PARTNERS_CONFIRMED': 'Parceiros Confirmados',
    'IN_PROGRESS': 'Em Andamento',
    'COMPLETED': 'Concluída'
  };

  const columns = [
    {
      key: 'numeroContrato',
      label: 'Nº Contrato',
      render: (row) => (
        <div className="font-mono text-sm font-medium text-gray-900">
          #{row.numeroContrato || row.id.toUpperCase()}
        </div>
      )
    },
    {
      key: 'exportadora',
      label: 'Exportadora',
      render: (row) => (
        <div className="font-medium text-gray-900">
          {getExportadoraNome(row.ofertaId)}
        </div>
      )
    },
    {
      key: 'importadora',
      label: 'Importadora',
      render: (row) => (
        <div className="text-gray-700">
          {getImportadoraNome(row.importadoraId)}
        </div>
      )
    },
    {
      key: 'quantidade',
      label: 'Quantidade',
      render: (row) => {
        const oferta = getOfertaData(row.ofertaId);
        return (
          <div className="text-gray-700 font-medium">
            {oferta ? `${oferta.quantidade.toLocaleString('pt-BR')} Kg` : 'N/A'}
          </div>
        );
      }
    },
    {
      key: 'valor',
      label: 'Valor Total',
      render: (row) => {
        const oferta = getOfertaData(row.ofertaId);
        return (
          <div className="text-menuGreen font-semibold">
            {oferta ? new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(oferta.valor) : 'N/A'}
          </div>
        );
      }
    },
    {
      key: 'dataCriacao',
      label: 'Data',
      render: (row) => (
        <div className="text-gray-600 text-sm">
          {new Date(row.dataCriacao).toLocaleDateString('pt-BR')}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[row.status]}`}>
          {statusLabels[row.status]}
        </span>
      )
    },
    {
      key: 'acoes',
      label: 'Ações',
      render: (row) => (
        <div className="flex items-center gap-2 lg:flex-row flex-col w-full">
          <button
            onClick={() => router.push(`/workflow/${row.id}`)}
            className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-menuGreen text-menuGreen rounded-lg hover:bg-menuGreen hover:text-white transition-colors"
            title="Ver timeline"
          >
            <TrendingUp size={20} />
            <span className="lg:hidden font-medium">Ver Timeline</span>
          </button>
          <button
            onClick={() => router.push(`/exportacao/${row.id}`)}
            className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-menuGreen text-white rounded-lg hover:bg-green-800 transition-colors"
            title="Ver detalhes"
          >
            <Eye size={20} />
            <span className="lg:hidden font-medium">Ver Detalhes</span>
          </button>
        </div>
      )
    }
  ];

  const stats = {
    total: exportacoes.length,
    emAndamento: exportacoes.filter(e => e.status !== 'COMPLETED').length,
    concluidas: exportacoes.filter(e => e.status === 'COMPLETED').length
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-menuGreen mb-2">
            Exportações
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Gerencie todas as exportações em andamento e concluídas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ship className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Em Andamento</p>
                <p className="text-2xl font-bold text-gray-900">{stats.emAndamento}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Concluídas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.concluidas}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="mb-6">
          <PrimaryButton
            onClick={() => router.push('/exportacao/match')}
            className="gap-2"
          >
            <Ship size={20} />
            Realizar Novo Match
          </PrimaryButton>
        </div>

        {/* Table */}
        <Card title="Lista de Exportações">
          {exportacoes.length === 0 ? (
            <div className="text-center py-12">
              <Ship size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">
                Nenhuma exportação encontrada
              </p>
              <PrimaryButton onClick={() => router.push('/exportacao/match')}>
                Realizar Primeiro Match
              </PrimaryButton>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={exportacoes}
            />
          )}
        </Card>
      </div>
    </main>
  );
}
