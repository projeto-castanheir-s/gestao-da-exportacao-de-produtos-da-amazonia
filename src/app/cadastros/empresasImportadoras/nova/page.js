'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/lib/store';
import Card from '@/components/Card';
import { ArrowLeft, Save } from 'lucide-react';

export default function NovaEmpresaImportadoraPage() {
  const router = useRouter();
  const { empresasImportadoras } = useStore();
  const [formData, setFormData] = useState({
    nome: '',
    pais: '',
    cidade: '',
    responsavel: '',
    email: '',
    telefone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const lastId = empresasImportadoras.length > 0
      ? Math.max(...empresasImportadoras.map(e => {
          const match = e.id.match(/empresa-imp-(\d+)/);
          return match ? parseInt(match[1]) : 0;
        }))
      : 0;

    const novaEmpresa = {
      id: `empresa-imp-${lastId + 1}`,
      ...formData
    };

    console.log('Nova importadora:', novaEmpresa);
    
    setTimeout(() => {
      setLoading(false);
      alert('Empresa importadora cadastrada com sucesso!');
      router.push('/cadastros/empresasImportadoras');
    }, 500);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        <button
          onClick={() => router.push('/cadastros/empresasImportadoras')}
          className="flex items-center gap-2 text-gray-600 hover:text-menuGreen mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Voltar para Empresas Importadoras</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-menuGreen mb-2">
            Nova Empresa Importadora
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Cadastre uma nova empresa compradora internacional
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Empresa *</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                placeholder="Ex: Amazon Nuts International"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">País *</label>
                <input
                  type="text"
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                  placeholder="Ex: Estados Unidos"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                  placeholder="Ex: New York"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Responsável *</label>
              <input
                type="text"
                name="responsavel"
                value={formData.responsavel}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                placeholder="Nome do responsável"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                  placeholder="email@empresa.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-menuGreen text-white rounded-lg hover:bg-green-800 transition-colors font-medium disabled:opacity-50"
              >
                <Save size={20} />
                {loading ? 'Salvando...' : 'Salvar Empresa'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/cadastros/empresasImportadoras')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
