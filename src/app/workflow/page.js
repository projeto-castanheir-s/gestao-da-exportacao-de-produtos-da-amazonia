'use client';
import Card from '@/components/Card';
import StepTracker from '@/components/StepTracker';
import useStore from '@/lib/store';

export default function WorkflowPage() {
  const { exportacoes } = useStore();

  const exportacoesComStatus = exportacoes.map((exp) => ({
    ...exp,
    statusLabel: {
      'MATCHED': 'Match Realizado',
      'PARTNERS_CONFIRMED': 'Parceiros Confirmados',
      'IN_PROGRESS': 'Em Andamento',
      'COMPLETED': 'Concluída'
    }[exp.status] || 'Em Processo'
  }));

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-menuGreen mb-2">Workflow</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Acompanhe o progresso das exportações
          </p>
        </div>

        {/* Exemplo de Workflow */}
        <Card title="Linha do Tempo do Processo de Exportação" className="mb-8">
          <StepTracker currentStatus="MATCHED" />
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Etapas do Processo:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><strong>1. Oferta:</strong> Exportador cadastra oferta no sistema</li>
              <li><strong>2. Match:</strong> Sistema conecta oferta com importadora</li>
              <li><strong>3. Seleção de Parceiros:</strong> Escolha de parceiros necessários</li>
              <li><strong>4. Contratações:</strong> Confirmação de todos os parceiros</li>
              <li><strong>5. Exportação Concluída:</strong> Processo finalizado</li>
            </ul>
          </div>
        </Card>

        {/* Lista de Exportações em Andamento */}
        {exportacoesComStatus.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Exportações em Andamento</h2>
            {exportacoesComStatus.map((exp) => (
              <Card key={exp.id}>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {exp.oferta.produtoNome}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {exp.oferta.empresaExportadoraNome} → {exp.importadora.nome}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {exp.statusLabel}
                    </span>
                  </div>
                  <StepTracker currentStatus={exp.status} />
                </div>
              </Card>
            ))}
          </div>
        )}

        {exportacoes.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhuma exportação em andamento no momento</p>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
