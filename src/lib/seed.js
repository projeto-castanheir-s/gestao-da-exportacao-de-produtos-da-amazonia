// Mock seed data for Plataforma Exportação

// Estados da Amazônia Legal
export const estados = [
  'Acre',
  'Amapá',
  'Amazonas',
  'Pará',
  'Rondônia',
  'Roraima'
];

// Empresas Castanheiras (Exportadoras)
export const empresasCastanheiras = [
  {
    id: 'empresa-cast-1',
    nome: 'Castanhas do Norte Ltda',
    cnpj: '12.345.678/0001-90',
    responsavel: 'João Silva',
    email: 'contato@castanhasdonorte.com.br',
    telefone: '(91) 3234-5678',
    estado: 'Pará',
    cidade: 'Belém',
    localExtracao: 'Floresta Nacional do Tapajós'
  },
  {
    id: 'empresa-cast-2',
    nome: 'Amazônia Sustentável LTDA',
    cnpj: '23.456.789/0001-01',
    responsavel: 'Maria Santos',
    email: 'comercial@amazoniasustentavel.com.br',
    telefone: '(92) 3345-6789',
    estado: 'Amazonas',
    cidade: 'Manaus',
    localExtracao: 'Reserva Extrativista do Rio Jutaí'
  },
  {
    id: 'empresa-cast-3',
    nome: 'Cooperativa Acre Verde',
    cnpj: '34.567.890/0001-12',
    responsavel: 'Pedro Costa',
    email: 'cooperativa@acreverde.coop.br',
    telefone: '(68) 3456-7890',
    estado: 'Acre',
    cidade: 'Rio Branco',
    localExtracao: 'Seringal Cachoeira'
  }
];

// Empresas Importadoras
export const empresasImportadoras = [
  {
    id: 'empresa-imp-1',
    nome: 'Global Nuts Trading LLC',
    pais: 'Estados Unidos',
    responsavel: 'John Smith',
    email: 'john@globalnuts.com',
    telefone: '+1 555-1234',
    cidade: 'New York'
  },
  {
    id: 'empresa-imp-2',
    nome: 'Euro Organics GmbH',
    pais: 'Alemanha',
    responsavel: 'Hans Mueller',
    email: 'hans@euroorganics.de',
    telefone: '+49 30 12345',
    cidade: 'Berlin'
  },
  {
    id: 'empresa-imp-3',
    nome: 'Asia Pacific Foods Ltd',
    pais: 'China',
    responsavel: 'Li Wei',
    email: 'liwei@asiapacific.cn',
    telefone: '+86 10 5678',
    cidade: 'Shanghai'
  }
];

// Financeiras
export const financeiras = [
  {
    id: 'financeira-1',
    nome: 'Banco do Brasil',
    tipo: 'Banco Público',
    taxaJuros: 8.5,
    prazoMaximo: 180,
    contato: 'agro@bb.com.br'
  },
  {
    id: 'financeira-2',
    nome: 'Bradesco Financiamentos',
    tipo: 'Banco Privado',
    taxaJuros: 9.2,
    prazoMaximo: 120,
    contato: 'comercial@bradesco.com.br'
  },
  {
    id: 'financeira-3',
    nome: 'Banco da Amazônia',
    tipo: 'Banco Regional',
    taxaJuros: 7.8,
    prazoMaximo: 240,
    contato: 'credito@bancoamazonia.com.br'
  }
];

// Despachantes Aduaneiros
export const despachantes = [
  {
    id: 'despachante-1',
    nome: 'Despacho Rápido Ltda',
    registro: 'DA-12345',
    especialidade: 'Exportação Agrícola',
    contato: 'contato@desprachorapido.com.br',
    telefone: '(11) 3456-7890'
  },
  {
    id: 'despachante-2',
    nome: 'Global Customs Services',
    registro: 'DA-23456',
    especialidade: 'Comércio Internacional',
    contato: 'info@globalcustoms.com.br',
    telefone: '(21) 2345-6789'
  },
  {
    id: 'despachante-3',
    nome: 'Amazônia Despachos',
    registro: 'DA-34567',
    especialidade: 'Produtos Florestais',
    contato: 'amazonia@despachos.com.br',
    telefone: '(91) 3234-5678'
  }
];

// Seguradoras
export const seguradoras = [
  {
    id: 'seguradora-1',
    nome: 'Porto Seguro',
    tipo: 'Seguro de Carga',
    cobertura: 'Total',
    premio: 2.5,
    contato: 'carga@portoseguro.com.br'
  },
  {
    id: 'seguradora-2',
    nome: 'Allianz Seguros',
    tipo: 'Seguro de Exportação',
    cobertura: 'Abrangente',
    premio: 2.8,
    contato: 'export@allianz.com.br'
  },
  {
    id: 'seguradora-3',
    nome: 'Marítima Seguros',
    tipo: 'Seguro Marítimo',
    cobertura: 'Internacional',
    premio: 3.0,
    contato: 'maritimo@maritima.com.br'
  }
];

// Transportadoras
export const transportadoras = [
  {
    id: 'transportadora-1',
    nome: 'TransAmazônia Logística',
    tipo: 'Rodoviário',
    alcance: 'Nacional',
    contato: 'logistica@transamazonia.com.br',
    telefone: '(91) 3345-6789'
  },
  {
    id: 'transportadora-2',
    nome: 'Maersk Line Brasil',
    tipo: 'Marítimo',
    alcance: 'Internacional',
    contato: 'brasil@maersk.com',
    telefone: '(11) 4567-8901'
  },
  {
    id: 'transportadora-3',
    nome: 'Rodoex Transportes',
    tipo: 'Rodoviário',
    alcance: 'Regional',
    contato: 'operacoes@rodoex.com.br',
    telefone: '(68) 3234-5678'
  }
];

// Corretoras
export const corretoras = [
  {
    id: 'corretora-1',
    nome: 'Agro Trade Corretora',
    especialidade: 'Commodities Agrícolas',
    comissao: 3.5,
    contato: 'comercial@agrotrade.com.br'
  },
  {
    id: 'corretora-2',
    nome: 'Brasil Nuts Broker',
    especialidade: 'Castanhas',
    comissao: 3.0,
    contato: 'broker@brasilnuts.com.br'
  },
  {
    id: 'corretora-3',
    nome: 'Global Commodities',
    especialidade: 'Exportação',
    comissao: 4.0,
    contato: 'trade@globalcommodities.com'
  }
];

// Produtos
export const produtos = [
  {
    id: 'produto-1',
    nome: 'Castanha-do-Brasil com Casca',
    categoria: 'In Natura',
    unidade: 'Kg',
    descricao: 'Castanha-do-Brasil natural, com casca, qualidade premium'
  },
  {
    id: 'produto-2',
    nome: 'Castanha-do-Brasil Descascada',
    categoria: 'Processada',
    unidade: 'Kg',
    descricao: 'Castanha descascada, selecionada, pronta para consumo'
  },
  {
    id: 'produto-3',
    nome: 'Castanha-do-Brasil Orgânica',
    categoria: 'Orgânica',
    unidade: 'Kg',
    descricao: 'Castanha certificada orgânica, com selo de qualidade'
  }
];

// Ofertas iniciais
export const ofertasIniciais = [
  {
    id: 'oferta-1',
    produtoId: produtos[0].id,
    produtoNome: produtos[0].nome,
    empresaExportadoraId: empresasCastanheiras[0].id,
    empresaExportadoraNome: empresasCastanheiras[0].nome,
    empresaExportadoraCnpj: empresasCastanheiras[0].cnpj,
    estado: empresasCastanheiras[0].estado,
    localExtracao: empresasCastanheiras[0].localExtracao,
    quantidade: 5000,
    valor: 125000,
    data: '2025-01',
    status: 'MATCHED', // Já tem exportação
    criadoEm: new Date('2025-10-01').toISOString()
  },
  {
    id: 'oferta-2',
    produtoId: produtos[1].id,
    produtoNome: produtos[1].nome,
    empresaExportadoraId: empresasCastanheiras[1].id,
    empresaExportadoraNome: empresasCastanheiras[1].nome,
    empresaExportadoraCnpj: empresasCastanheiras[1].cnpj,
    estado: empresasCastanheiras[1].estado,
    localExtracao: empresasCastanheiras[1].localExtracao,
    quantidade: 3000,
    valor: 90000,
    data: '2025-02',
    status: 'ABERTA',
    criadoEm: new Date().toISOString()
  }
];

// Exportações iniciais
export const exportacoesIniciais = [
  {
    id: 'exportacao-1',
    numeroContrato: '731234560001',
    ofertaId: 'oferta-1',
    importadoraId: 'empresa-imp-1',
    status: 'IN_PROGRESS',
    dataCriacao: new Date('2025-10-10').toISOString(),
    parceiros: {
      financeira: 'financeira-1',
      despachante: 'despachante-1',
      seguradora: 'seguradora-1',
      transportadora: 'transportadora-1',
      corretora: 'corretora-1'
    },
    timeline: [
      {
        id: 1,
        titulo: 'Extração',
        descricao: 'Produto extraído da região de origem',
        status: 'completed',
        data: new Date('2025-10-10').toISOString()
      },
      {
        id: 2,
        titulo: 'Disponibilizado Transporte',
        descricao: 'Produto pronto para transporte',
        status: 'completed',
        data: new Date('2025-10-25').toISOString()
      },
      {
        id: 3,
        titulo: 'Transporte',
        descricao: 'Em rota para depósito',
        status: 'completed',
        data: new Date('2025-10-27').toISOString()
      },
      {
        id: 4,
        titulo: 'Chegada Depósito',
        descricao: 'Recebido no depósito local',
        status: 'completed',
        data: new Date('2025-10-30').toISOString()
      },
      {
        id: 5,
        titulo: 'Empacotamento',
        descricao: 'Produto sendo empacotado para exportação',
        status: 'completed',
        data: new Date('2025-11-05').toISOString(),
        detalhes: 'Volume: 500 Sacas de 10Kg'
      },
      {
        id: 6,
        titulo: 'Despachante',
        descricao: 'Documentação alfandegária em processo',
        status: 'completed',
        data: new Date('2025-11-06').toISOString()
      },
      {
        id: 7,
        titulo: 'Disponibilizado Para Aduana',
        descricao: 'Documentos enviados para aduana',
        status: 'completed',
        data: new Date('2025-11-12').toISOString()
      },
      {
        id: 8,
        titulo: 'Aduana',
        descricao: 'Em análise pela aduana',
        status: 'in-progress',
        data: new Date('2025-11-15').toISOString()
      },
      {
        id: 9,
        titulo: 'Liberado',
        descricao: 'Liberado pela aduana',
        status: 'pending',
        data: null
      },
      {
        id: 10,
        titulo: 'Transporte Internacional',
        descricao: 'Em trânsito internacional',
        status: 'pending',
        data: null
      },
      {
        id: 11,
        titulo: 'Chegada Destino',
        descricao: 'Chegou ao porto de destino',
        status: 'pending',
        data: null
      },
      {
        id: 12,
        titulo: 'Entrega',
        descricao: 'Produto em entrega final',
        status: 'pending',
        data: null
      },
      {
        id: 13,
        titulo: 'Finalizado',
        descricao: 'Processo concluído com sucesso',
        status: 'pending',
        data: null
      }
    ]
  }
];
