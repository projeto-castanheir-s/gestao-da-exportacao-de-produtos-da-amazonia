'use client';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import { Check, Building, DollarSign, Truck, FileText, Shield } from 'lucide-react';

const partnerTypes = [
  {
    key: 'financeira',
    label: 'Financeira',
    description: 'Instituição financeira para crédito',
    icon: DollarSign,
    color: 'green'
  },
  {
    key: 'despachante',
    label: 'Despachante Aduaneiro',
    description: 'Processamento de documentos alfandegários',
    icon: FileText,
    color: 'blue'
  },
  {
    key: 'seguradora',
    label: 'Seguradora',
    description: 'Seguro de carga e exportação',
    icon: Shield,
    color: 'purple'
  },
  {
    key: 'transportadora',
    label: 'Transportadora',
    description: 'Logística e transporte internacional',
    icon: Truck,
    color: 'orange'
  },
  {
    key: 'corretora',
    label: 'Corretora',
    description: 'Intermediação comercial',
    icon: Building,
    color: 'indigo'
  }
];

const colorClasses = {
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: 'bg-green-100 text-green-600',
    button: 'bg-green-600 hover:bg-green-700'
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'bg-blue-100 text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    icon: 'bg-purple-100 text-purple-600',
    button: 'bg-purple-600 hover:bg-purple-700'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: 'bg-orange-100 text-orange-600',
    button: 'bg-orange-600 hover:bg-orange-700'
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    icon: 'bg-indigo-100 text-indigo-600',
    button: 'bg-indigo-600 hover:bg-indigo-700'
  }
};

export default function PartnerSelector({ exportacao, partners, onContract }) {
  const [selectedPartners, setSelectedPartners] = useState({
    financeira: '',
    despachante: '',
    seguradora: '',
    transportadora: '',
    corretora: ''
  });

  const handlePartnerChange = (type, value) => {
    setSelectedPartners(prev => ({ ...prev, [type]: value }));
  };

  const handleContract = (type) => {
    if (selectedPartners[type]) {
      onContract(exportacao.id, type, selectedPartners[type]);
    }
  };

  const getPartnerList = (type) => {
    return partners[type + 's'] || [];
  };

  const isContracted = (type) => {
    return exportacao.parceiros[type] !== null;
  };

  const getContractedPartner = (type) => {
    return exportacao.parceiros[type];
  };

  return (
    <div className="space-y-4">
      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-menuGreen mb-2 text-sm sm:text-base">
          Escolha seus Parceiros
        </h4>
        <p className="text-xs sm:text-sm text-gray-600">
          Selecione e contrate os parceiros necessários para completar a exportação
        </p>
      </div>

      {partnerTypes.map((partnerType) => {
        const Icon = partnerType.icon;
        const contracted = isContracted(partnerType.key);
        const contractedPartner = getContractedPartner(partnerType.key);
        const colors = colorClasses[partnerType.color];
        const partnerList = getPartnerList(partnerType.key);

        return (
          <div
            key={partnerType.key}
            className={`border-2 rounded-xl p-4 sm:p-6 transition-all ${
              contracted
                ? `${colors.bg} ${colors.border}`
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Icon and Info */}
              <div className="flex items-start gap-3 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {partnerType.label}
                  </h5>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {partnerType.description}
                  </p>

                  {contracted && contractedPartner && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                      <Check size={16} className="flex-shrink-0" />
                      <span className="font-medium truncate">{contractedPartner.nome}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Selection and Button */}
              {!contracted && (
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:min-w-[400px]">
                  <select
                    value={selectedPartners[partnerType.key]}
                    onChange={(e) => handlePartnerChange(partnerType.key, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-menuGreen text-sm"
                  >
                    <option value="">Selecione...</option>
                    {partnerList.map((partner) => (
                      <option key={partner.id} value={partner.id}>
                        {partner.nome}
                      </option>
                    ))}
                  </select>
                  <PrimaryButton
                    onClick={() => handleContract(partnerType.key)}
                    disabled={!selectedPartners[partnerType.key]}
                    className={`text-white text-sm whitespace-nowrap ${colors.button}`}
                    variant="success"
                  >
                    Contratar
                  </PrimaryButton>
                </div>
              )}

              {contracted && (
                <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                  <Check size={20} />
                  <span>Contratado</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
