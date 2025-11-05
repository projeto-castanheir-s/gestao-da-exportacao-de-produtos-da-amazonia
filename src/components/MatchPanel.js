'use client';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import { ArrowRight, Building2 } from 'lucide-react';

export default function MatchPanel({ oferta, importadoras, onMatch }) {
  const [selectedImportadora, setSelectedImportadora] = useState('');

  const handleMatch = () => {
    if (selectedImportadora) {
      onMatch(oferta.id, selectedImportadora);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        {/* Exportadora */}
        <div className="bg-blue-50 rounded-xl p-6 flex-1 w-full">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">EXPORTADORA</p>
              <p className="font-bold text-gray-900">{oferta.empresaExportadoraNome}</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">CNPJ:</span> {oferta.empresaExportadoraCnpj}</p>
            <p><span className="font-medium">Estado:</span> {oferta.estado}</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden sm:block">
          <ArrowRight size={32} className="text-menuGreen" />
        </div>
        <div className="sm:hidden">
          <ArrowRight size={32} className="text-menuGreen rotate-90" />
        </div>

        {/* Importadora Selector */}
        <div className="bg-green-50 rounded-xl p-6 flex-1 w-full">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">IMPORTADORA</p>
              <p className="font-bold text-gray-900">Selecione o comprador</p>
            </div>
          </div>
          <select
            value={selectedImportadora}
            onChange={(e) => setSelectedImportadora(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-menuGreen text-sm sm:text-base"
          >
            <option value="">Escolha uma empresa importadora</option>
            {importadoras.map((imp) => (
              <option key={imp.id} value={imp.id}>
                {imp.nome} - {imp.pais}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Match Button */}
      <div className="flex justify-center">
        <PrimaryButton
          onClick={handleMatch}
          disabled={!selectedImportadora}
          className="flex items-center gap-2 px-8"
        >
          <span>Gerar Match</span>
          <ArrowRight size={18} />
        </PrimaryButton>
      </div>
    </div>
  );
}
