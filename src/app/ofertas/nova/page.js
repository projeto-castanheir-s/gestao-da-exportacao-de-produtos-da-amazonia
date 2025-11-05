'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/lib/store';
import Card from '@/components/Card';
import PrimaryButton from '@/components/PrimaryButton';
import { ArrowLeft, Upload, X } from 'lucide-react';

export default function NovaOfertaPage() {
  const router = useRouter();
  const { addOferta, produtos, estados, empresasCastanheiras } = useStore();
  
  const [formData, setFormData] = useState({
    produtoId: '',
    empresaExportadoraId: '',
    estado: '',
    localExtracao: '',
    quantidade: '',
    valor: '',
    data: '',
  });
  
  const [imagens, setImagens] = useState([]);
  const [enviando, setEnviando] = useState(false);
  
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const anos = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 2 + i);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    try {
      // Buscar dados completos do produto e empresa
      const produto = produtos.find(p => p.id === formData.produtoId);
      const empresa = empresasCastanheiras.find(e => e.id === formData.empresaExportadoraId);
      
      const novaOferta = {
        produtoId: formData.produtoId,
        produtoNome: produto.nome,
        empresaExportadoraId: formData.empresaExportadoraId,
        empresaExportadoraNome: empresa.nome,
        empresaExportadoraCnpj: empresa.cnpj,
        estado: formData.estado,
        localExtracao: formData.localExtracao,
        quantidade: Number(formData.quantidade),
        valor: Number(formData.valor),
        data: formData.data
      };
      
      const ofertaCriada = addOferta(novaOferta);
      
      // Simular delay para upload de imagens
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionar para a página de detalhes da oferta criada
      router.push(`/ofertas/${ofertaCriada.id}`);
    } catch (error) {
      console.error('Erro ao criar oferta:', error);
      alert('Erro ao criar oferta. Tente novamente.');
      setEnviando(false);
    }
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const novasImagens = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImagens([...imagens, ...novasImagens]);
  };
  
  const removerImagem = (index) => {
    const novasImagens = imagens.filter((_, i) => i !== index);
    setImagens(novasImagens);
  };
  
  const isFormValid = formData.produtoId && formData.empresaExportadoraId && 
                      formData.estado && formData.quantidade && formData.valor && formData.data;
  
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        {/* Botão Voltar */}
        <button
          onClick={() => router.push('/ofertas')}
          className="flex items-center gap-2 text-gray-600 hover:text-menuGreen mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar para Ofertas
        </button>
        
        <Card>
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-menuGreen mb-2">
              Nova Oferta de Exportação
            </h1>
            <p className="text-gray-600 text-sm">
              Preencha os dados abaixo para criar uma nova oferta
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Produto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Produto <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.produtoId}
                onChange={(e) => setFormData({...formData, produtoId: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                required
              >
                <option value="">Selecione o produto</option>
                {produtos.map(p => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
            </div>
            
            {/* Empresa Exportadora */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Empresa Exportadora <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.empresaExportadoraId}
                onChange={(e) => setFormData({...formData, empresaExportadoraId: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                required
              >
                <option value="">Selecione a empresa</option>
                {empresasCastanheiras.map(e => (
                  <option key={e.id} value={e.id}>{e.nome} - {e.cnpj}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Estado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({...formData, estado: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                  required
                >
                  <option value="">Selecione o estado</option>
                  {estados.map(e => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
              
              {/* Data */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={formData.data ? formData.data.split('-')[1] : ''}
                    onChange={(e) => {
                      const ano = formData.data ? formData.data.split('-')[0] : new Date().getFullYear();
                      const mes = e.target.value;
                      setFormData({...formData, data: mes ? `${ano}-${mes}` : ''});
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                    required
                  >
                    <option value="">Mês</option>
                    {meses.map((mes, i) => (
                      <option key={i} value={String(i + 1).padStart(2, '0')}>{mes}</option>
                    ))}
                  </select>
                  <select
                    value={formData.data ? formData.data.split('-')[0] : ''}
                    onChange={(e) => {
                      const mes = formData.data ? formData.data.split('-')[1] : '01';
                      const ano = e.target.value;
                      setFormData({...formData, data: ano ? `${ano}-${mes}` : ''});
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                    required
                  >
                    <option value="">Ano</option>
                    {anos.map(ano => (
                      <option key={ano} value={ano}>{ano}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Local da Extração */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local da Extração
              </label>
              <input
                type="text"
                value={formData.localExtracao}
                onChange={(e) => setFormData({...formData, localExtracao: e.target.value})}
                placeholder="Ex: Floresta Nacional do Tapajós"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Quantidade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade (Kg) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => setFormData({...formData, quantidade: e.target.value})}
                  placeholder="Ex: 5000"
                  min="1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                  required
                />
              </div>
              
              {/* Valor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor (R$) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.valor}
                  onChange={(e) => setFormData({...formData, valor: e.target.value})}
                  placeholder="Ex: 125000"
                  min="1"
                  step="0.01"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            {/* Upload de Imagens */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagens do Produto
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-menuGreen transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-gray-600 mb-1">Clique para fazer upload</p>
                  <p className="text-xs text-gray-500">PNG, JPG até 10MB</p>
                </label>
              </div>
              
              {/* Preview das imagens */}
              {imagens.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                  {imagens.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group">
                      <img 
                        src={img.preview} 
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removerImagem(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <PrimaryButton
                type="button"
                variant="secondary"
                onClick={() => router.push('/ofertas')}
                className="flex-1"
                disabled={enviando}
              >
                Cancelar
              </PrimaryButton>
              <PrimaryButton
                type="submit"
                className="flex-1"
                disabled={!isFormValid || enviando}
              >
                {enviando ? 'Criando...' : 'Criar Oferta'}
              </PrimaryButton>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
