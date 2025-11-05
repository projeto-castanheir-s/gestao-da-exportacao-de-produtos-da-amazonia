'use client';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/Card';
import useStore from '@/lib/store';
import { CheckCircle, Clock, Circle, Package, Truck, FileText, Ship, MapPin, ArrowLeft } from 'lucide-react';

export default function WorkflowDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getExportacaoById, getOfertaById, empresasImportadoras } = useStore();

  const exportacao = getExportacaoById(params.id);
  const oferta = exportacao ? getOfertaById(exportacao.ofertaId) : null;
  const importadora = exportacao ? empresasImportadoras.find(i => i.id === exportacao.importadoraId) : null;

  if (!exportacao || !oferta) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <div className="text-center py-8">
            <Ship size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Exportação não encontrada</h2>
            <p className="text-gray-600 mb-6">A exportação que você está procurando não existe.</p>
            <button
              onClick={() => router.push('/workflow')}
              className="px-6 py-2 bg-menuGreen text-white rounded-lg hover:bg-green-800 transition-colors"
            >
              Voltar para Workflow
            </button>
          </div>
        </Card>
      </main>
    );
  }

  // Usar timeline da exportação se existir, senão calcular dinamicamente (fallback)
  const baseDate = new Date(exportacao.dataCriacao);
  
  // Mapeamento de ícones por etapa
  const iconMap = {
    'Extração': MapPin,
    'Disponibilizado Transporte': Package,
    'Transporte': Truck,
    'Chegada Depósito': Package,
    'Empacotamento': Package,
    'Despachante': FileText,
    'Disponibilizado Para Aduana': FileText,
    'Aduana': FileText,
    'Liberado': CheckCircle,
    'Transporte Internacional': Ship,
    'Chegada Destino': MapPin,
    'Entrega': Truck,
    'Finalizado': CheckCircle
  };

  // Adicionar ícones e detalhes às etapas da timeline
  const stepsWithIcons = exportacao.timeline ? exportacao.timeline.map(step => ({
    ...step,
    icon: iconMap[step.titulo] || Package,
    detalhes: step.detalhes || (
      step.titulo === 'Extração' ? `Local: ${oferta.localExtracao}, ${oferta.estado}` :
      step.titulo === 'Disponibilizado Transporte' ? `Quantidade: ${oferta.quantidade?.toLocaleString('pt-BR') || 0} Kg` :
      step.titulo === 'Transporte' ? 'Transportadora contratada' :
      step.titulo === 'Chegada Depósito' ? 'Armazenamento temporário' :
      step.titulo === 'Empacotamento' ? 'Volume: 224 Sacas de 10Kg' :
      step.titulo === 'Despachante' ? 'Preparação de documentos' :
      step.titulo === 'Disponibilizado Para Aduana' ? 'Aguardando análise' :
      step.titulo === 'Aduana' ? 'Processo de liberação em andamento' :
      step.titulo === 'Liberado' ? 'Autorizado para exportação' :
      step.titulo === 'Transporte Internacional' ? `Destino: ${importadora?.pais || 'N/A'}` :
      step.titulo === 'Chegada Destino' ? `Local: ${importadora?.cidade || 'N/A'}, ${importadora?.pais || 'N/A'}` :
      step.titulo === 'Entrega' ? 'Transporte local para importadora' :
      step.titulo === 'Finalizado' ? 'Exportação finalizada' :
      ''
    )
  })) : null;
  
  const steps = stepsWithIcons || [
    {
      id: 1,
      titulo: 'Extração',
      data: new Date(baseDate.getTime() + 0 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: 'completed',
      icon: MapPin,
      descricao: 'Produto extraído da região de origem',
      detalhes: `Local: ${oferta.localExtracao}, ${oferta.estado}`
    },
    {
      id: 2,
      titulo: 'Disponibilizado Transporte',
      data: new Date(baseDate.getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: 'completed',
      icon: Package,
      descricao: 'Produto pronto para transporte',
      detalhes: `Quantidade: ${oferta.quantidade.toLocaleString('pt-BR')} Kg`
    },
    {
      id: 3,
      titulo: 'Transporte',
      data: new Date(baseDate.getTime() + 17 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: 'completed',
      icon: Truck,
      descricao: 'Em rota para depósito',
      detalhes: 'Transportadora contratada'
    },
    {
      id: 4,
      titulo: 'Chegada Depósito',
      data: new Date(baseDate.getTime() + 20 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: exportacao.status === 'PARTNERS_CONFIRMED' || exportacao.status === 'IN_PROGRESS' || exportacao.status === 'COMPLETED' ? 'completed' : 'pending',
      icon: Package,
      descricao: 'Recebido no depósito local',
      detalhes: 'Armazenamento temporário'
    },
    {
      id: 5,
      titulo: 'Empacotamento',
      data: new Date(baseDate.getTime() + 26 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: exportacao.status === 'IN_PROGRESS' || exportacao.status === 'COMPLETED' ? 'completed' : exportacao.status === 'PARTNERS_CONFIRMED' ? 'in-progress' : 'pending',
      icon: Package,
      descricao: 'Produto sendo empacotado para exportação',
      detalhes: 'Volume: 224 Sacas de 10Kg'
    },
    {
      id: 6,
      titulo: 'Despachante',
      data: new Date(baseDate.getTime() + 27 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: exportacao.status === 'IN_PROGRESS' || exportacao.status === 'COMPLETED' ? 'completed' : 'pending',
      icon: FileText,
      descricao: 'Documentação alfandegária em processo',
      detalhes: 'Preparação de documentos'
    },
    {
      id: 7,
      titulo: 'Disponibilizado Para Aduana',
      data: new Date(baseDate.getTime() + 33 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: exportacao.status === 'IN_PROGRESS' || exportacao.status === 'COMPLETED' ? 'completed' : 'pending',
      icon: FileText,
      descricao: 'Documentos enviados para aduana',
      detalhes: 'Aguardando análise'
    },
    {
      id: 8,
      titulo: 'Aduana',
      data: new Date(baseDate.getTime() + 36 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: exportacao.status === 'IN_PROGRESS' || exportacao.status === 'COMPLETED' ? 'in-progress' : 'pending',
      icon: FileText,
      descricao: 'Em análise pela aduana',
      detalhes: 'Processo de liberação em andamento'
    },
    {
      id: 9,
      titulo: 'Liberado',
      data: new Date(baseDate.getTime() + 38 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: exportacao.status === 'COMPLETED' ? 'completed' : 'pending',
      icon: CheckCircle,
      descricao: 'Liberado pela aduana',
      detalhes: 'Autorizado para exportação'
    },
    {
      id: 10,
      titulo: 'Transporte Internacional',
      data: new Date(baseDate.getTime() + 41 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: exportacao.status === 'COMPLETED' ? 'completed' : 'pending',
      icon: Ship,
      descricao: 'Em trânsito internacional',
      detalhes: `Destino: ${importadora?.pais || 'N/A'}`
    },
    {
      id: 11,
      titulo: 'Chegada Destino',
      data: new Date(baseDate.getTime() + 51 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: exportacao.status === 'COMPLETED' ? 'completed' : 'pending',
      icon: MapPin,
      descricao: 'Chegou ao porto de destino',
      detalhes: `Local: ${importadora?.cidade || 'N/A'}, ${importadora?.pais || 'N/A'}`
    },
    {
      id: 12,
      titulo: 'Entrega',
      data: new Date(baseDate.getTime() + 55 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: exportacao.status === 'COMPLETED' ? 'completed' : 'pending',
      icon: Truck,
      descricao: 'Produto em entrega final',
      detalhes: 'Transporte local para importadora'
    },
    {
      id: 13,
      titulo: 'Finalizado',
      data: new Date(baseDate.getTime() + 62 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: exportacao.status === 'COMPLETED' ? 'completed' : 'pending',
      icon: CheckCircle,
      descricao: 'Processo concluído com sucesso',
      detalhes: 'Exportação finalizada'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 border-green-600';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100 border-yellow-600';
      case 'pending': return 'text-gray-400 bg-gray-50 border-gray-300';
      default: return 'text-gray-400 bg-gray-50 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'pending': return Circle;
      default: return Circle;
    }
  };

  const getStatusBadge = (status) => {
    const labels = {
      'PENDING': { text: 'Pendente', color: 'bg-gray-100 text-gray-700' },
      'PARTNERS_CONFIRMED': { text: 'Parceiros Confirmados', color: 'bg-blue-100 text-blue-700' },
      'IN_PROGRESS': { text: 'Em Andamento', color: 'bg-yellow-100 text-yellow-700' },
      'COMPLETED': { text: 'Concluída', color: 'bg-green-100 text-green-700' }
    };
    return labels[status] || labels['PENDING'];
  };

  const statusBadge = getStatusBadge(exportacao.status);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
        {/* Breadcrumb */}
        <button
          onClick={() => router.push('/workflow')}
          className="flex items-center gap-2 text-gray-600 hover:text-menuGreen mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Voltar para Workflow</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-menuGreen mb-2">
                Contrato #{exportacao.numeroContrato}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Acompanhe cada etapa da exportação em tempo real
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusBadge.color} self-start lg:self-center`}>
              {statusBadge.text}
            </span>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-xs text-gray-500 mb-1">Produto</p>
              <p className="font-semibold text-gray-900">{oferta.produtoNome}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-gray-500 mb-1">Quantidade</p>
              <p className="font-semibold text-gray-900">{oferta.quantidade?.toLocaleString('pt-BR') || 0} Kg</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-gray-500 mb-1">Valor</p>
              <p className="font-semibold text-gray-900">
                {oferta.valorTotal 
                  ? `R$ ${oferta.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                  : oferta.valor
                    ? `R$ ${oferta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                    : 'N/A'
                }
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-gray-500 mb-1">Data Criação</p>
              <p className="font-semibold text-gray-900">{new Date(exportacao.dataCriacao).toLocaleDateString('pt-BR')}</p>
            </Card>
          </div>
        </div>

        {/* Timeline */}
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Timeline de Progresso</h2>
          
          <div className="relative">
            {/* Linha vertical - desktop */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block"></div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => {
                const StatusIcon = getStatusIcon(step.status);
                const StepIcon = step.icon;
                const isLast = index === steps.length - 1;

                return (
                  <div key={step.id} className="relative flex gap-4 sm:gap-6">
                    {/* Icon container - desktop */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full border-3 flex items-center justify-center ${getStatusColor(step.status)} hidden sm:flex z-10 bg-white`}>
                      <StepIcon size={28} />
                    </div>

                    {/* Icon container - mobile */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStatusColor(step.status)} sm:hidden z-10`}>
                      <StatusIcon size={20} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {step.titulo}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {step.descricao}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusIcon size={16} className={step.status === 'completed' ? 'text-green-600' : step.status === 'in-progress' ? 'text-yellow-600' : 'text-gray-400'} />
                            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                              {step.data ? new Date(step.data).toLocaleDateString('pt-BR') : 'Pendente'}
                            </span>
                          </div>
                        </div>
                        
                        {step.detalhes && (
                          <div className="pt-3 border-t border-gray-100">
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Detalhes:</span> {step.detalhes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push(`/exportacao/${exportacao.id}`)}
            className="flex-1 px-6 py-3 bg-menuGreen text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
          >
            Ver Detalhes da Exportação
          </button>
          <button
            onClick={() => router.push('/workflow')}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Voltar para Lista
          </button>
        </div>
      </div>
    </main>
  );
}
