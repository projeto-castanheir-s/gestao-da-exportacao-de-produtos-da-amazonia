export default function OfferSummary({ oferta }) {
  if (!oferta) return null;

  const fields = [
    { label: 'Produto', value: oferta.produtoNome },
    { label: 'Estado', value: oferta.estado },
    { label: 'Local de Extração', value: oferta.localExtracao },
    { label: 'Quantidade', value: `${oferta.quantidade.toLocaleString('pt-BR')} Kg` },
    {
      label: 'Valor',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(oferta.valor)
    },
    { label: 'CNPJ', value: oferta.empresaExportadoraCnpj },
    { label: 'Empresa Exportadora', value: oferta.empresaExportadoraNome },
    { label: 'Data', value: oferta.data }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {fields.map((field, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4">
          <div className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
            {field.label}
          </div>
          <div className="text-sm sm:text-base font-semibold text-gray-900">
            {field.value}
          </div>
        </div>
      ))}
    </div>
  );
}
