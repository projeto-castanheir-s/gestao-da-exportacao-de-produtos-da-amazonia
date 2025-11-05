'use client';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import useStore from '@/lib/store';
import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import PrimaryButton from '@/components/PrimaryButton';
import { Plus, Eye, Filter, X } from 'lucide-react';

export default function OfertasPage() {
  const router = useRouter();
  const { ofertas, produtos, estados } = useStore();
  
  // Estados dos filtros
  const [filtros, setFiltros] = useState({
    produto: '',
    estado: '',
    dataInicio: '',
    dataFim: '',
    pesoMin: '',
    pesoMax: ''
  });
  
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  
  // Ofertas filtradas
  const ofertasFiltradas = useMemo(() => {
    return ofertas.filter(oferta => {
      // Filtro por produto
      if (filtros.produto && oferta.produtoNome !== filtros.produto) {
        return false;
      }
      
      // Filtro por estado
      if (filtros.estado && oferta.estado !== filtros.estado) {
        return false;
      }
      
      // Filtro por data
      if (filtros.dataInicio && oferta.data < filtros.dataInicio) {
        return false;
      }
      if (filtros.dataFim && oferta.data > filtros.dataFim) {
        return false;
      }
      
      // Filtro por peso
      if (filtros.pesoMin && oferta.quantidade < Number(filtros.pesoMin)) {
        return false;
      }
      if (filtros.pesoMax && oferta.quantidade > Number(filtros.pesoMax)) {
        return false;
      }
      
      return true;
    });
  }, [ofertas, filtros]);
  
  const limparFiltros = () => {
    setFiltros({
      produto: '',
      estado: '',
      dataInicio: '',
      dataFim: '',
      pesoMin: '',
      pesoMax: ''
    });
  };
  
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const anos = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);
  
  const filtrosAtivos = Object.values(filtros).some(v => v !== '');

  const columns = [
    {
      header: 'Produto',
      accessor: 'produtoNome'
    },
    {
      header: 'Estado',
      accessor: 'estado'
    },
    {
      header: 'Data',
      accessor: 'data',
      render: (row) => {
        if (!row.data) return 'N/A';
        const [ano, mes] = row.data.split('-');
        return `${mes}/${ano}`;
      }
    },
    {
      header: 'Quantidade (Kg)',
      accessor: 'quantidade',
      render: (row) => row.quantidade.toLocaleString('pt-BR')
    },
    {
      header: 'Valor',
      accessor: 'valor',
      render: (row) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(row.valor)
    },
    {
      header: 'Empresa',
      accessor: 'empresaExportadoraNome'
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          row.status === 'ABERTA' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {row.status === 'ABERTA' ? 'Aberta' : 'Em Match'}
        </span>
      )
    },
    {
      header: 'Ações',
      accessor: 'id',
      render: (row) => (
        <button
          onClick={() => router.push(`/ofertas/${row.id}`)}
          className="text-menuGreen hover:text-menuGreen-light font-medium text-sm flex items-center gap-1"
        >
          <Eye size={16} />
          Detalhe
        </button>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-menuGreen mb-2">Ofertas</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Gerencie as ofertas de exportação
              {filtrosAtivos && ` (${ofertasFiltradas.length} de ${ofertas.length})`}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                mostrarFiltros || filtrosAtivos
                  ? 'bg-menuGreen text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter size={18} />
              Filtros
              {filtrosAtivos && <span className="bg-white text-menuGreen rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">!</span>}
            </button>
            <PrimaryButton
              onClick={() => router.push('/ofertas/nova')}
              className="flex items-center gap-2"
            >
              <Plus size={18} />
              Nova Oferta
            </PrimaryButton>
          </div>
        </div>

        {/* Painel de Filtros */}
        {mostrarFiltros && (
          <Card className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Filtro Produto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Produto
                </label>
                <select
                  value={filtros.produto}
                  onChange={(e) => setFiltros({...filtros, produto: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                >
                  <option value="">Todos os produtos</option>
                  {produtos.map(p => (
                    <option key={p.id} value={p.nome}>{p.nome}</option>
                  ))}
                </select>
              </div>

              {/* Filtro Estado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={filtros.estado}
                  onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                >
                  <option value="">Todos os estados</option>
                  {estados.map(e => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>

              {/* Filtro Data Início */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Início
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={filtros.dataInicio ? filtros.dataInicio.split('-')[1] : ''}
                    onChange={(e) => {
                      const ano = filtros.dataInicio ? filtros.dataInicio.split('-')[0] : new Date().getFullYear();
                      const mes = e.target.value;
                      setFiltros({...filtros, dataInicio: mes ? `${ano}-${mes}` : ''});
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent text-sm"
                  >
                    <option value="">Mês</option>
                    {meses.map((mes, i) => (
                      <option key={i} value={String(i + 1).padStart(2, '0')}>{mes}</option>
                    ))}
                  </select>
                  <select
                    value={filtros.dataInicio ? filtros.dataInicio.split('-')[0] : ''}
                    onChange={(e) => {
                      const mes = filtros.dataInicio ? filtros.dataInicio.split('-')[1] : '01';
                      const ano = e.target.value;
                      setFiltros({...filtros, dataInicio: ano ? `${ano}-${mes}` : ''});
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent text-sm"
                  >
                    <option value="">Ano</option>
                    {anos.map(ano => (
                      <option key={ano} value={ano}>{ano}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filtro Data Fim */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Fim
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={filtros.dataFim ? filtros.dataFim.split('-')[1] : ''}
                    onChange={(e) => {
                      const ano = filtros.dataFim ? filtros.dataFim.split('-')[0] : new Date().getFullYear();
                      const mes = e.target.value;
                      setFiltros({...filtros, dataFim: mes ? `${ano}-${mes}` : ''});
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent text-sm"
                  >
                    <option value="">Mês</option>
                    {meses.map((mes, i) => (
                      <option key={i} value={String(i + 1).padStart(2, '0')}>{mes}</option>
                    ))}
                  </select>
                  <select
                    value={filtros.dataFim ? filtros.dataFim.split('-')[0] : ''}
                    onChange={(e) => {
                      const mes = filtros.dataFim ? filtros.dataFim.split('-')[1] : '01';
                      const ano = e.target.value;
                      setFiltros({...filtros, dataFim: ano ? `${ano}-${mes}` : ''});
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent text-sm"
                  >
                    <option value="">Ano</option>
                    {anos.map(ano => (
                      <option key={ano} value={ano}>{ano}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filtro Peso Mínimo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso Mínimo (Kg)
                </label>
                <input
                  type="number"
                  value={filtros.pesoMin}
                  onChange={(e) => setFiltros({...filtros, pesoMin: e.target.value})}
                  placeholder="Ex: 1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                />
              </div>

              {/* Filtro Peso Máximo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso Máximo (Kg)
                </label>
                <input
                  type="number"
                  value={filtros.pesoMax}
                  onChange={(e) => setFiltros({...filtros, pesoMax: e.target.value})}
                  placeholder="Ex: 10000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-menuGreen focus:border-transparent"
                />
              </div>
            </div>

            {/* Botões de ação dos filtros */}
            {filtrosAtivos && (
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={limparFiltros}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium flex items-center gap-2"
                >
                  <X size={16} />
                  Limpar Filtros
                </button>
              </div>
            )}
          </Card>
        )}

        <Card title="Lista de Ofertas">
          <DataTable columns={columns} data={ofertasFiltradas} />
        </Card>
      </div>
    </main>
  );
}
