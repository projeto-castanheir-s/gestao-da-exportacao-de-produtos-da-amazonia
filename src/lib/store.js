'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  estados,
  empresasCastanheiras,
  empresasImportadoras,
  financeiras,
  despachantes,
  seguradoras,
  transportadoras,
  corretoras,
  produtos,
  ofertasIniciais,
  exportacoesIniciais
} from './seed';

const useStore = create(
  persist(
    (set, get) => ({
      estados,
      empresasCastanheiras,
      empresasImportadoras,
      financeiras,
      despachantes,
      seguradoras,
      transportadoras,
      corretoras,
      produtos,
      ofertas: ofertasIniciais,
      exportacoes: exportacoesIniciais,

  addOferta: (oferta) => {
    // Gerar ID sequencial baseado na última oferta
    const ofertas = get().ofertas;
    const lastId = ofertas.length > 0 
      ? Math.max(...ofertas.map(o => {
          const match = o.id.match(/oferta-(\d+)/);
          return match ? parseInt(match[1]) : 0;
        }))
      : 0;
    
    const novaOferta = {
      ...oferta,
      id: `oferta-${lastId + 1}`,
      status: 'ABERTA',
      dataCriacao: new Date().toISOString()
    };
    set((state) => ({
      ofertas: [...state.ofertas, novaOferta]
    }));
    return novaOferta;
  },

  getOfertaById: (id) => {
    return get().ofertas.find(o => o.id === id);
  },

  updateOferta: (id, updates) => {
    set((state) => ({
      ofertas: state.ofertas.map(o =>
        o.id === id ? { ...o, ...updates } : o
      )
    }));
  },

  createExportacao: (ofertaId, importadoraId, parceirosIniciais = null) => {
    const oferta = get().getOfertaById(ofertaId);
    const importadora = get().empresasImportadoras.find(e => e.id === importadoraId);
    
    console.log('=== createExportacao ===');
    console.log('parceirosIniciais recebido:', parceirosIniciais);
    
    if (!oferta || !importadora) return null;

    // Gerar ID sequencial baseado na última exportação
    const exportacoes = get().exportacoes;
    const lastId = exportacoes.length > 0 
      ? Math.max(...exportacoes.map(e => {
          const match = e.id.match(/exportacao-(\d+)/);
          return match ? parseInt(match[1]) : 0;
        }))
      : 0;

    // Gerar número de contrato grande (12 dígitos)
    const timestamp = Date.now().toString().slice(-8); // Últimos 8 dígitos do timestamp
    const sequencial = (lastId + 1).toString().padStart(4, '0'); // 4 dígitos sequenciais
    const numeroContrato = `${timestamp}${sequencial}`; // Total: 12 dígitos

    // Se não vier parceiros, usar valores mockados
    const parceiros = parceirosIniciais || {
      financeira: get().financeiras[0]?.id || 'financeira-1',
      despachante: get().despachantes[0]?.id || 'despachante-1',
      seguradora: get().seguradoras[0]?.id || 'seguradora-1',
      transportadora: get().transportadoras[0]?.id || 'transportadora-1',
      corretora: get().corretoras[0]?.id || 'corretora-1'
    };

    console.log('parceiros finais que serão salvos:', parceiros);

    // Determinar status - sempre PARTNERS_CONFIRMED já que tem parceiros mockados
    const status = 'PARTNERS_CONFIRMED';

    console.log('Status calculado:', status);

    // Timeline mockada com 13 etapas
    const baseDate = new Date();
    const timeline = [
      {
        id: 1,
        titulo: 'Extração',
        descricao: 'Produto extraído da região de origem',
        status: 'completed',
        data: new Date(baseDate.getTime() + 0 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        titulo: 'Disponibilizado Transporte',
        descricao: 'Produto pronto para transporte',
        status: 'completed',
        data: new Date(baseDate.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        titulo: 'Transporte',
        descricao: 'Em rota para depósito',
        status: 'completed',
        data: new Date(baseDate.getTime() + 17 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 4,
        titulo: 'Chegada Depósito',
        descricao: 'Recebido no depósito local',
        status: 'completed',
        data: new Date(baseDate.getTime() + 20 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 5,
        titulo: 'Empacotamento',
        descricao: 'Produto sendo empacotado para exportação',
        status: 'in-progress',
        data: new Date(baseDate.getTime() + 26 * 24 * 60 * 60 * 1000).toISOString(),
        detalhes: 'Volume: 224 Sacas de 10Kg'
      },
      {
        id: 6,
        titulo: 'Despachante',
        descricao: 'Documentação alfandegária em processo',
        status: 'pending',
        data: null
      },
      {
        id: 7,
        titulo: 'Disponibilizado Para Aduana',
        descricao: 'Documentos enviados para aduana',
        status: 'pending',
        data: null
      },
      {
        id: 8,
        titulo: 'Aduana',
        descricao: 'Em análise pela aduana',
        status: 'pending',
        data: null
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
    ];

    const novaExportacao = {
      id: `exportacao-${lastId + 1}`,
      numeroContrato,
      ofertaId,
      importadoraId,
      status,
      dataCriacao: new Date().toISOString(),
      parceiros,
      timeline
    };

    console.log('novaExportacao antes de salvar:', novaExportacao);

    set((state) => ({
      exportacoes: [...state.exportacoes, novaExportacao],
      ofertas: state.ofertas.map(o =>
        o.id === ofertaId ? { ...o, status: 'MATCHED' } : o
      )
    }));

    return novaExportacao;
  },

  getExportacaoById: (id) => {
    return get().exportacoes.find(e => e.id === id);
  },

  contratarParceiro: (exportacaoId, tipoParceiro, parceiroId) => {
    set((state) => {
      const exportacoes = state.exportacoes.map(exp => {
        if (exp.id === exportacaoId) {
          const novaParceiros = {
            ...exp.parceiros,
            [tipoParceiro]: parceiroId
          };
          
          const todosContratados = Object.values(novaParceiros).every(p => p !== null);
          
          return {
            ...exp,
            parceiros: novaParceiros,
            status: todosContratados ? 'PARTNERS_CONFIRMED' : exp.status
          };
        }
        return exp;
      });
      
      return { exportacoes };
    });
  },

  avancarStatusExportacao: (exportacaoId, novoStatus) => {
    set((state) => ({
      exportacoes: state.exportacoes.map(exp =>
        exp.id === exportacaoId ? { ...exp, status: novoStatus } : exp
      )
    }));
  },

  // Atualizar etapa da timeline
  updateTimelineStep: (exportacaoId, stepId, updates) => {
    set((state) => ({
      exportacoes: state.exportacoes.map(exp => {
        if (exp.id === exportacaoId && exp.timeline) {
          return {
            ...exp,
            timeline: exp.timeline.map(step =>
              step.id === stepId ? { ...step, ...updates } : step
            )
          };
        }
        return exp;
      })
    }));
  },

  // Completar próxima etapa da timeline
  completeNextTimelineStep: (exportacaoId) => {
    set((state) => ({
      exportacoes: state.exportacoes.map(exp => {
        if (exp.id === exportacaoId && exp.timeline) {
          const nextPendingIndex = exp.timeline.findIndex(step => step.status === 'pending');
          if (nextPendingIndex !== -1) {
            const updatedTimeline = [...exp.timeline];
            updatedTimeline[nextPendingIndex] = {
              ...updatedTimeline[nextPendingIndex],
              status: 'completed',
              data: new Date().toISOString()
            };
            
            // Se ainda tem mais etapas pendentes, marca a próxima como in-progress
            if (nextPendingIndex + 1 < updatedTimeline.length) {
              updatedTimeline[nextPendingIndex + 1] = {
                ...updatedTimeline[nextPendingIndex + 1],
                status: 'in-progress'
              };
            }
            
            return { ...exp, timeline: updatedTimeline };
          }
        }
        return exp;
      })
    }));
  },

  getStats: () => {
    const state = get();
    const ofertasAbertas = state.ofertas.filter(o => o.status === 'ABERTA').length;
    const totalOfertas = state.ofertas.length;
    const exportacoesEmAndamento = state.exportacoes.filter(
      e => e.status !== 'COMPLETED'
    ).length;
    const exportacoesConcluidas = state.exportacoes.filter(
      e => e.status === 'COMPLETED'
    ).length;
    const totalExportacoes = state.exportacoes.length;
    const valorTotalOfertas = state.ofertas.reduce((acc, o) => acc + (o.valor || 0), 0);

    return {
      ofertasAbertas,
      totalOfertas,
      exportacoesEmAndamento,
      exportacoesConcluidas,
      totalExportacoes,
      valorTotalOfertas
    };
  }
}),
    {
      name: 'plataforma-exportacao-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        ofertas: state.ofertas,
        exportacoes: state.exportacoes
      }),
      onRehydrateStorage: () => (state) => {
        console.log('🔄 Rehydrating store...');
        
        // Se não houver exportações salvas, inicializar com as exportações iniciais
        if (state && (!state.exportacoes || state.exportacoes.length === 0)) {
          console.log('✅ Inicializando com exportação mockada');
          state.exportacoes = exportacoesIniciais;
        }
        
        // Se não houver ofertas salvas, inicializar com as ofertas iniciais
        if (state && (!state.ofertas || state.ofertas.length === 0)) {
          console.log('✅ Inicializando com ofertas mockadas');
          state.ofertas = ofertasIniciais;
        }
        
        console.log('📦 Exportações no store:', state?.exportacoes?.length || 0);
        console.log('📋 Ofertas no store:', state?.ofertas?.length || 0);
        
        // Migrar exportações antigas que não têm numeroContrato ou timeline
        if (state?.exportacoes) {
          state.exportacoes = state.exportacoes.map((exp, index) => {
            let updated = { ...exp };
            
            // Adicionar numeroContrato se não existir
            if (!updated.numeroContrato) {
              const timestamp = Date.now().toString().slice(-8);
              const sequencial = (index + 1).toString().padStart(4, '0');
              updated.numeroContrato = `${timestamp}${sequencial}`;
            }
            
            // Adicionar timeline se não existir
            if (!updated.timeline) {
              const baseDate = new Date(updated.dataCriacao || new Date());
              updated.timeline = [
                {
                  id: 1,
                  titulo: 'Extração',
                  descricao: 'Produto extraído da região de origem',
                  status: 'completed',
                  data: new Date(baseDate.getTime() + 0 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                  id: 2,
                  titulo: 'Disponibilizado Transporte',
                  descricao: 'Produto pronto para transporte',
                  status: 'completed',
                  data: new Date(baseDate.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                  id: 3,
                  titulo: 'Transporte',
                  descricao: 'Em rota para depósito',
                  status: 'completed',
                  data: new Date(baseDate.getTime() + 17 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                  id: 4,
                  titulo: 'Chegada Depósito',
                  descricao: 'Recebido no depósito local',
                  status: 'completed',
                  data: new Date(baseDate.getTime() + 20 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                  id: 5,
                  titulo: 'Empacotamento',
                  descricao: 'Produto sendo empacotado para exportação',
                  status: 'in-progress',
                  data: new Date(baseDate.getTime() + 26 * 24 * 60 * 60 * 1000).toISOString(),
                  detalhes: 'Volume: 224 Sacas de 10Kg'
                },
                {
                  id: 6,
                  titulo: 'Despachante',
                  descricao: 'Documentação alfandegária em processo',
                  status: 'pending',
                  data: null
                },
                {
                  id: 7,
                  titulo: 'Disponibilizado Para Aduana',
                  descricao: 'Documentos enviados para aduana',
                  status: 'pending',
                  data: null
                },
                {
                  id: 8,
                  titulo: 'Aduana',
                  descricao: 'Em análise pela aduana',
                  status: 'pending',
                  data: null
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
              ];
            }
            
            return updated;
          });
        }
      }
    }
  )
);

export default useStore;
