'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import { ArrowLeft, Save } from 'lucide-react';

export default function NovoDespachantePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ nome: '', registro: '', especialidade: '', contato: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Novo despachante:', formData);
    alert('Despachante cadastrado com sucesso!');
    router.push('/cadastros/despachantes');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        <button onClick={() => router.push('/cadastros/despachantes')} className="flex items-center gap-2 text-gray-600 hover:text-menuGreen mb-6 transition-colors">
          <ArrowLeft size={20} /><span className="text-sm font-medium">Voltar</span>
        </button>
        <h1 className="text-3xl font-bold text-menuGreen mb-8">Novo Despachante</h1>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
              <input type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registro *</label>
              <input type="text" value={formData.registro} onChange={(e) => setFormData({...formData, registro: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Especialidade *</label>
              <input type="text" value={formData.especialidade} onChange={(e) => setFormData({...formData, especialidade: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contato *</label>
              <input type="email" value={formData.contato} onChange={(e) => setFormData({...formData, contato: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen" />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-menuGreen text-white rounded-lg hover:bg-green-800 font-medium">
                <Save size={20} />Salvar
              </button>
              <button type="button" onClick={() => router.push('/cadastros/despachantes')} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">Cancelar</button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
