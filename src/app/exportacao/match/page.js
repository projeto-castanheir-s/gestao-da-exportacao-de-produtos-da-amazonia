'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useStore from '@/lib/store';
import Card from '@/components/Card';
import PrimaryButton from '@/components/PrimaryButton';
import PDFViewer from '@/components/PDFViewer';
import { ArrowLeft, FileText, FileSignature, Building, DollarSign, Shield, Ship, Briefcase } from 'lucide-react';

export default function MatchExportacaoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ofertaId = searchParams.get('ofertaId');
  
  const { 
    getOfertaById,
    ofertas,
    empresasImportadoras,
    financeiras, 
    seguradoras, 
    corretoras, 
    despachantes, 
    transportadoras,
    createExportacao 
  } = useStore();
  
  const oferta = ofertaId ? getOfertaById(ofertaId) : null;
  const ofertasAbertas = ofertas.filter(o => o.status === 'ABERTA');
  
  const [pdfOpen, setPdfOpen] = useState(false);
  const [assinaturaOpen, setAssinaturaOpen] = useState(false);
  const [importadoraId, setImportadoraId] = useState('');
  const [parceiros, setParceiros] = useState({
    financeira: '',
    seguradora: '',
    corretora: '',
    despachante: '',
    transportadora: ''
  });

  // Se não tem ofertaId, mostrar lista de ofertas
  if (!ofertaId || !oferta) {
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
            <h1 className="text-3xl sm:text-4xl font-bold text-menuGreen mb-2">
              Match de Exportação
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Selecione uma oferta para iniciar o match
            </p>
          </div>

          <Card title="Ofertas Disponíveis">
            {ofertasAbertas.length > 0 ? (
              <div className="space-y-3">
                {ofertasAbertas.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => router.push(`/exportacao/match?ofertaId=${o.id}`)}
                    className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 border-2 border-transparent hover:border-menuGreen transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{o.produtoNome}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {o.empresaExportadoraNome} • {o.estado}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-menuGreen">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(o.valor)}
                        </p>
                        <p className="text-xs text-gray-500">{o.quantidade.toLocaleString()} Kg</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="mb-2">Nenhuma oferta aberta disponível</p>
                <PrimaryButton onClick={() => router.push('/ofertas/nova')}>
                  Criar Nova Oferta
                </PrimaryButton>
              </div>
            )}
          </Card>
        </div>
      </main>
    );
  }

  const handleFinalizarMatch = () => {
    // Validar se importadora foi selecionada
    if (!importadoraId) {
      alert('Por favor, selecione a empresa importadora.');
      return;
    }
    
    // Validar se todos os parceiros foram selecionados
    const todosPreenchidos = Object.values(parceiros).every(p => p !== '');
    
    if (!todosPreenchidos) {
      alert('Por favor, selecione todos os parceiros antes de finalizar.');
      return;
    }

    // Debug - ver o que está sendo enviado
    console.log('Parceiros antes de criar exportação:', parceiros);
    console.log('Oferta ID:', oferta.id);
    console.log('Importadora ID:', importadoraId);

    // Criar exportação com os parceiros
    const exportacao = createExportacao(oferta.id, importadoraId, parceiros);
    
    console.log('Exportação criada:', exportacao);
    
    if (exportacao) {
      alert('Match de Exportação finalizado com sucesso!');
      router.push(`/exportacao`);
    }
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
          <h1 className="text-3xl sm:text-4xl font-bold text-menuGreen mb-2">
            Match de Exportação
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Configure os parceiros e finalize o match
          </p>
        </div>

        {/* Dados da Oferta */}
        <Card title="Dados da Oferta" className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Produto</p>
              <p className="text-sm font-semibold text-gray-900">{oferta.produtoNome}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Estado</p>
              <p className="text-sm font-semibold text-gray-900">{oferta.estado}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Quantidade</p>
              <p className="text-sm font-semibold text-gray-900">{oferta.quantidade} Kg</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Valor Total</p>
              <p className="text-sm font-semibold text-menuGreen">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(oferta.valor)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 font-medium mb-1">Empresa Exportadora</p>
            <p className="text-sm font-semibold text-gray-900">{oferta.empresaExportadoraNome}</p>
            <p className="text-xs text-gray-500 mt-1">CNPJ: {oferta.empresaExportadoraCnpj}</p>
          </div>
        </Card>

        {/* Empresa Importadora */}
        <Card title="Empresa Importadora" className="mb-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Building size={18} className="text-menuGreen" />
                Selecione a Empresa Importadora
              </label>
              <select
                value={importadoraId}
                onChange={(e) => setImportadoraId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
              >
                <option value="">Selecione uma empresa importadora</option>
                {empresasImportadoras.map((imp) => (
                  <option key={imp.id} value={imp.id}>
                    {imp.nome} - {imp.pais} - {imp.cidade}
                  </option>
                ))}
              </select>
            </div>
            
            {importadoraId && (() => {
              const importadoraSelecionada = empresasImportadoras.find(i => i.id === importadoraId);
              return importadoraSelecionada ? (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Responsável</p>
                      <p className="text-sm font-semibold text-gray-900">{importadoraSelecionada.responsavel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
                      <p className="text-sm font-semibold text-gray-900">{importadoraSelecionada.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Telefone</p>
                      <p className="text-sm font-semibold text-gray-900">{importadoraSelecionada.telefone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Localização</p>
                      <p className="text-sm font-semibold text-gray-900">{importadoraSelecionada.cidade}, {importadoraSelecionada.pais}</p>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </Card>

        {/* Botões de Contratos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <PrimaryButton
            onClick={() => setPdfOpen(true)}
            variant="secondary"
            className="flex items-center justify-center gap-2"
          >
            <FileText size={20} />
            Visualizar Contrato
          </PrimaryButton>
          
          <PrimaryButton
            onClick={() => setAssinaturaOpen(true)}
            variant="secondary"
            className="flex items-center justify-center gap-2"
          >
            <FileSignature size={20} />
            Visualizar Assinatura do Contrato
          </PrimaryButton>
        </div>

        {/* Escolha de Parceiros */}
        <Card title="Escolha seus Parceiros" className="mb-6">
          <div className="space-y-6">
            {/* Financeira */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <DollarSign size={18} className="text-menuGreen" />
                Financeira
              </label>
              <select
                value={parceiros.financeira}
                onChange={(e) => setParceiros({...parceiros, financeira: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
              >
                <option value="">Selecione uma financeira</option>
                {financeiras.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nome} - Taxa: {f.taxaJuros}% - Prazo: {f.prazoMaximo} dias
                  </option>
                ))}
              </select>
            </div>

            {/* Seguradora */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Shield size={18} className="text-menuGreen" />
                Seguradora
              </label>
              <select
                value={parceiros.seguradora}
                onChange={(e) => setParceiros({...parceiros, seguradora: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
              >
                <option value="">Selecione uma seguradora</option>
                {seguradoras.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nome} - {s.tipo} - Prêmio: {s.premio}%
                  </option>
                ))}
              </select>
            </div>

            {/* Corretora */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Briefcase size={18} className="text-menuGreen" />
                Corretora
              </label>
              <select
                value={parceiros.corretora}
                onChange={(e) => setParceiros({...parceiros, corretora: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
              >
                <option value="">Selecione uma corretora</option>
                {corretoras.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome} - {c.especialidade} - Comissão: {c.comissao}%
                  </option>
                ))}
              </select>
            </div>

            {/* Despachante */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <FileText size={18} className="text-menuGreen" />
                Despachante Aduaneiro
              </label>
              <select
                value={parceiros.despachante}
                onChange={(e) => setParceiros({...parceiros, despachante: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
              >
                <option value="">Selecione um despachante</option>
                {despachantes.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nome} - {d.especialidade} - Registro: {d.registro}
                  </option>
                ))}
              </select>
            </div>

            {/* Transportadora */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Ship size={18} className="text-menuGreen" />
                Transportadora
              </label>
              <select
                value={parceiros.transportadora}
                onChange={(e) => setParceiros({...parceiros, transportadora: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
              >
                <option value="">Selecione uma transportadora</option>
                {transportadoras.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome} - {t.tipo} - Alcance: {t.alcance}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Botão Finalizar */}
        <div className="flex justify-end">
          <PrimaryButton
            onClick={handleFinalizarMatch}
            className="px-8 py-3 text-lg flex items-center gap-2"
          >
            <Building size={20} />
            Finalizar Match
          </PrimaryButton>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PDFViewer
        isOpen={pdfOpen}
        onClose={() => setPdfOpen(false)}
        pdfUrl="/contratos/exemplo-oferta.pdf"
        title={`Contrato - ${oferta.produtoNome}`}
      />
      
      {/* Assinatura Viewer Modal */}
      <PDFViewer
        isOpen={assinaturaOpen}
        onClose={() => setAssinaturaOpen(false)}
        pdfUrl="/contratos/exemplo-oferta.pdf"
        title={`Assinatura do Contrato - ${oferta.produtoNome}`}
      />
    </main>
  );
}
