'use client';
import { useParams, useRouter } from 'next/navigation';
import useStore from '@/lib/store';
import Card from '@/components/Card';
import PrimaryButton from '@/components/PrimaryButton';
import { ArrowLeft, Building, Ship, DollarSign, Calendar, Weight, MapPin, FileText, Package, Globe, User, Mail, Phone } from 'lucide-react';

export default function ExportacaoDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const { 
    getExportacaoById, 
    getOfertaById, 
    empresasImportadoras,
    financeiras,
    seguradoras,
    corretoras,
    despachantes,
    transportadoras
  } = useStore();
  
  const exportacao = getExportacaoById(params.id);
  const oferta = exportacao ? getOfertaById(exportacao.ofertaId) : null;
  const importadora = exportacao ? empresasImportadoras.find(e => e.id === exportacao.importadoraId) : null;

  // Debug - remover depois
  console.log('Exportação completa:', exportacao);
  console.log('Parceiros:', exportacao?.parceiros);

  if (!exportacao || !oferta) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center">
          <p className="text-gray-600 mb-4">Exportação não encontrada</p>
          <PrimaryButton onClick={() => router.push('/exportacao')}>
            Voltar para Exportações
          </PrimaryButton>
        </Card>
      </main>
    );
  }

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

  // Helper para pegar dados de parceiros
  const getParceiroNome = (tipo, id) => {
    console.log(`getParceiroNome - tipo: ${tipo}, id: ${id}, parceiros:`, exportacao.parceiros);
    
    if (!id) return 'Não selecionado';
    
    let lista = [];
    switch(tipo) {
      case 'financeira': lista = financeiras; break;
      case 'seguradora': lista = seguradoras; break;
      case 'corretora': lista = corretoras; break;
      case 'despachante': lista = despachantes; break;
      case 'transportadora': lista = transportadoras; break;
    }
    
    const parceiro = lista.find(p => p.id === id);
    console.log(`Parceiro encontrado:`, parceiro);
    return parceiro?.nome || 'N/A';
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-menuGreen hover:text-menuGreen/80 mb-6 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-menuGreen mb-2">
                Contrato #{exportacao.numeroContrato || exportacao.id.toUpperCase()}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Detalhes completos da exportação
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[exportacao.status]}`}>
              {statusLabels[exportacao.status]}
            </span>
          </div>
        </div>

        {/* Informações Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-menuGreen/10 rounded-lg flex items-center justify-center">
                <Package size={20} className="text-menuGreen" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Produto</p>
                <p className="text-sm font-semibold text-gray-900">{oferta.produtoNome}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Weight size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Quantidade</p>
                <p className="text-sm font-semibold text-gray-900">{oferta.quantidade.toLocaleString('pt-BR')} Kg</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Valor Total</p>
                <p className="text-sm font-semibold text-menuGreen">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(oferta.valor)}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Data Criação</p>
                <p className="text-sm font-semibold text-gray-900">
                  {new Date(exportacao.dataCriacao).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Empresa Exportadora */}
          <Card title="Empresa Exportadora">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Building className="text-menuGreen mt-1" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Nome da Empresa</p>
                  <p className="text-sm font-semibold text-gray-900">{oferta.empresaExportadoraNome}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="text-menuGreen mt-1" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-medium">CNPJ</p>
                  <p className="text-sm font-semibold text-gray-900">{oferta.empresaExportadoraCnpj}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-menuGreen mt-1" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Local de Extração</p>
                  <p className="text-sm font-semibold text-gray-900">{oferta.localExtracao}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-menuGreen mt-1" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Estado</p>
                  <p className="text-sm font-semibold text-gray-900">{oferta.estado}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Empresa Importadora */}
          <Card title="Empresa Importadora">
            {importadora ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Building className="text-menuGreen mt-1" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Nome da Empresa</p>
                    <p className="text-sm font-semibold text-gray-900">{importadora.nome}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="text-menuGreen mt-1" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">País</p>
                    <p className="text-sm font-semibold text-gray-900">{importadora.pais}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="text-menuGreen mt-1" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Cidade</p>
                    <p className="text-sm font-semibold text-gray-900">{importadora.cidade}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="text-menuGreen mt-1" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Responsável</p>
                    <p className="text-sm font-semibold text-gray-900">{importadora.responsavel}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="text-menuGreen mt-1" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm font-semibold text-gray-900">{importadora.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-menuGreen mt-1" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Telefone</p>
                    <p className="text-sm font-semibold text-gray-900">{importadora.telefone}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Importadora não encontrada</p>
            )}
          </Card>
        </div>

        {/* Parceiros */}
        <Card title="Parceiros da Exportação" className="mb-6">
         
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={18} className="text-menuGreen" />
                <p className="text-xs font-semibold text-gray-700">Financeira</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {getParceiroNome('financeira', exportacao.parceiros?.financeira)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Building size={18} className="text-menuGreen" />
                <p className="text-xs font-semibold text-gray-700">Seguradora</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {getParceiroNome('seguradora', exportacao.parceiros?.seguradora)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Building size={18} className="text-menuGreen" />
                <p className="text-xs font-semibold text-gray-700">Corretora</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {getParceiroNome('corretora', exportacao.parceiros?.corretora)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={18} className="text-menuGreen" />
                <p className="text-xs font-semibold text-gray-700">Despachante</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {getParceiroNome('despachante', exportacao.parceiros?.despachante)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Ship size={18} className="text-menuGreen" />
                <p className="text-xs font-semibold text-gray-700">Transportadora</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {getParceiroNome('transportadora', exportacao.parceiros?.transportadora)}
              </p>
            </div>
          </div>
        </Card>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => router.push(`/workflow/${exportacao.id}`)}
            className="flex-1 px-6 py-3 bg-menuGreen text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
          >
            Ver Timeline do Workflow
          </button>
          <button
            onClick={() => router.push('/exportacao')}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Voltar para Lista
          </button>
        </div>
      </div>
    </main>
  );
}
