'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/lib/store';
import Card from '@/components/Card';
import { ArrowLeft, Save } from 'lucide-react';

export default function NovaFinanceiraPage() {
  const router = useRouter();
  const { financeiras } = useStore();
  const [formData, setFormData] = useState({
    nome: '',
    taxa: '',
    prazo: '',
    contato: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const lastId = financeiras.length > 0
      ? Math.max(...financeiras.map(f => parseInt(f.id.split('-')[1])))
      : 0;
    
    console.log('Nova financeira:', { id: `financeira-${lastId + 1}`, ...formData, taxa: parseFloat(formData.taxa), prazo: parseInt(formData.prazo) });
    alert('Financeira cadastrada com sucesso!');
    router.push('/cadastros/financeiras');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        <button onClick={() => router.push('/cadastros/financeiras')} className="flex items-center gap-2 text-gray-600 hover:text-menuGreen mb-6 transition-colors">
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Voltar para Financeiras</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-menuGreen mb-2">Nova Financeira</h1>
          <p className="text-gray-600">Cadastre uma nova instituição financeira</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
              <input type="text" name="nome" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent" placeholder="Ex: Banco Amazônia" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Taxa (%) *</label>
                <input type="number" step="0.1" name="taxa" value={formData.taxa} onChange={(e) => setFormData({...formData, taxa: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent" placeholder="2.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prazo (dias) *</label>
                <input type="number" name="prazo" value={formData.prazo} onChange={(e) => setFormData({...formData, prazo: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent" placeholder="60" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contato *</label>
              <input type="email" name="contato" value={formData.contato} onChange={(e) => setFormData({...formData, contato: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent" placeholder="contato@banco.com.br" />
            </div>
            <div className="flex gap-4 pt-4">
              <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-menuGreen text-white rounded-lg hover:bg-green-800 transition-colors font-medium">
                <Save size={20} />
                Salvar
              </button>
              <button type="button" onClick={() => router.push('/cadastros/financeiras')} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancelar</button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
