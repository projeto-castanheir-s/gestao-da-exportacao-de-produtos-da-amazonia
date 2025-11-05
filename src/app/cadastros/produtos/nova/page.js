'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import { ArrowLeft, Save } from 'lucide-react';

export default function NovoProdutoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ nome: '', categoria: '', unidade: 'Kg', descricao: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Novo produto:', formData);
    alert('Produto cadastrado com sucesso!');
    router.push('/cadastros/produtos');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        <button onClick={() => router.push('/cadastros/produtos')} className="flex items-center gap-2 text-gray-600 hover:text-menuGreen mb-6 transition-colors">
          <ArrowLeft size={20} /><span className="text-sm font-medium">Voltar</span>
        </button>
        <h1 className="text-3xl font-bold text-menuGreen mb-8">Novo Produto</h1>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
              <input type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen" placeholder="Ex: Castanha-do-Brasil Orgânica" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria *</label>
                <select value={formData.categoria} onChange={(e) => setFormData({...formData, categoria: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen">
                  <option value="">Selecione</option>
                  <option value="In Natura">In Natura</option>
                  <option value="Processada">Processada</option>
                  <option value="Orgânica">Orgânica</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unidade *</label>
                <select value={formData.unidade} onChange={(e) => setFormData({...formData, unidade: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen">
                  <option value="Kg">Kg</option>
                  <option value="Ton">Tonelada</option>
                  <option value="Unidade">Unidade</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição *</label>
              <textarea value={formData.descricao} onChange={(e) => setFormData({...formData, descricao: e.target.value})} required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen" placeholder="Descreva as características do produto..." />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-menuGreen text-white rounded-lg hover:bg-green-800 font-medium">
                <Save size={20} />Salvar
              </button>
              <button type="button" onClick={() => router.push('/cadastros/produtos')} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">Cancelar</button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
