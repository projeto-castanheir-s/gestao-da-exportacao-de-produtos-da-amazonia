'use client';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import useStore from '@/lib/store';
import { CheckCircle, Clock, Ship, TrendingUp, Package } from 'lucide-react';

export default function WorkflowPage() {
  const router = useRouter();
  const { exportacoes, getOfertaById, empresasImportadoras } = useStore();

  // Calcula progresso da exportação
  const getProgress = (status) => {
    const progressMap = {
      'PENDING': { percent: 0, label: 'Não iniciado', color: 'bg-gray-400' },
      'MATCHED': { percent: 10, label: 'Match realizado', color: 'bg-blue-500' },
      'PARTNERS_CONFIRMED': { percent: 30, label: 'Parceiros confirmados', color: 'bg-yellow-500' },
      'IN_PROGRESS': { percent: 60, label: 'Em andamento', color: 'bg-orange-500' },
      'COMPLETED': { percent: 100, label: 'Concluído', color: 'bg-green-600' }
    };
    return progressMap[status] || progressMap['PENDING'];
  };

  const getStatusBadge = (status) => {
    const badges = {
      'PENDING': { text: 'Pendente', color: 'bg-gray-100 text-gray-700' },
      'MATCHED': { text: 'Match Realizado', color: 'bg-blue-100 text-blue-700' },
      'PARTNERS_CONFIRMED': { text: 'Parceiros Confirmados', color: 'bg-yellow-100 text-yellow-700' },
      'IN_PROGRESS': { text: 'Em Andamento', color: 'bg-orange-100 text-orange-700' },
      'COMPLETED': { text: 'Concluída', color: 'bg-green-100 text-green-700' }
    };
    return badges[status] || badges['PENDING'];
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-menuGreen mb-2">Workflow</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Acompanhe o progresso de todas as exportações
          </p>
        </div>

        {/* Stats Cards */}
        {exportacoes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total de Exportações</p>
                  <p className="text-2xl font-bold text-gray-900">{exportacoes.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp size={24} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Em Andamento</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {exportacoes.filter(e => e.status === 'IN_PROGRESS' || e.status === 'PARTNERS_CONFIRMED').length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Concluídas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {exportacoes.filter(e => e.status === 'COMPLETED').length}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {exportacoes.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <Ship size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">Nenhuma exportação em andamento no momento</p>
              <button
                onClick={() => router.push('/exportacao/match')}
                className="text-menuGreen hover:underline font-medium"
              >
                Realizar Primeiro Match
              </button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {exportacoes.map((exportacao) => {
              const oferta = getOfertaById(exportacao.ofertaId);
              const importadora = empresasImportadoras.find(i => i.id === exportacao.importadoraId);
              const progress = getProgress(exportacao.status);
              const statusBadge = getStatusBadge(exportacao.status);

              if (!oferta) return null;

              return (
                <Card key={exportacao.id} className="hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            Contrato #{exportacao.numeroContrato}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                            {statusBadge.text}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">{oferta.produtoNome}</span> • {oferta.quantidade?.toLocaleString('pt-BR') || 0} Kg
                          {oferta.valorTotal && ` • R$ ${oferta.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        </p>
                        <p className="text-xs text-gray-500">
                          {oferta.empresaExportadoraNome} → {importadora?.nome || 'N/A'}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => router.push(`/workflow/${exportacao.id}`)}
                          className="px-4 py-2 bg-menuGreen text-white rounded-lg hover:bg-green-800 transition-colors text-sm font-medium"
                        >
                          Ver Timeline
                        </button>
                        <button
                          onClick={() => router.push(`/exportacao/${exportacao.id}`)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          Ver Detalhes
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">{progress.label}</span>
                        <span className="text-gray-900 font-bold">{progress.percent}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${progress.color} transition-all duration-500`}
                          style={{ width: `${progress.percent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                      <span>Criado em {new Date(exportacao.dataCriacao).toLocaleDateString('pt-BR')}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        Última atualização: {new Date(exportacao.dataCriacao).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
