'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/lib/store';
import Card from '@/components/Card';
import { ArrowLeft, Save } from 'lucide-react';

export default function NovaEmpresaCastanheiraPage() {
  const router = useRouter();
  const { empresasCastanheiras } = useStore();
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    estado: '',
    localExtracao: '',
    contato: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Gerar ID
    const lastId = empresasCastanheiras.length > 0
      ? Math.max(...empresasCastanheiras.map(e => {
          const match = e.id.match(/empresa-cast-(\d+)/);
          return match ? parseInt(match[1]) : 0;
        }))
      : 0;

    const novaEmpresa = {
      id: `empresa-cast-${lastId + 1}`,
      ...formData
    };

    // TODO: Implementar addEmpresaCastanheira no store
    console.log('Nova empresa:', novaEmpresa);
    
    setTimeout(() => {
      setLoading(false);
      alert('Empresa cadastrada com sucesso!');
      router.push('/cadastros/empresasCastanheiras');
    }, 500);
  };

  const estados = ['Acre', 'Amapá', 'Amazonas', 'Pará', 'Rondônia', 'Roraima'];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        <button
          onClick={() => router.push('/cadastros/empresasCastanheiras')}
          className="flex items-center gap-2 text-gray-600 hover:text-menuGreen mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Voltar para Empresas Castanheiras</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-menuGreen mb-2">
            Nova Empresa Castanheira
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Cadastre uma nova empresa produtora de castanha
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Empresa *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                placeholder="Ex: Cooperativa Castanha Norte"
              />
            </div>

            {/* CNPJ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CNPJ *
              </label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                placeholder="00.000.000/0000-00"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado *
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
              >
                <option value="">Selecione um estado</option>
                {estados.map(estado => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>

            {/* Local Extração */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local de Extração *
              </label>
              <input
                type="text"
                name="localExtracao"
                value={formData.localExtracao}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                placeholder="Ex: Rio Branco"
              />
            </div>

            {/* Contato */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contato *
              </label>
              <input
                type="email"
                name="contato"
                value={formData.contato}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                placeholder="email@empresa.com.br"
              />
            </div>

            {/* Botões */}
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
                onClick={() => router.push('/cadastros/empresasCastanheiras')}
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
