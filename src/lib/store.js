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
  ofertasIniciais
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
      exportacoes: [],

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

  createExportacao: (ofertaId, importadoraId) => {
    const oferta = get().getOfertaById(ofertaId);
    const importadora = get().empresasImportadoras.find(e => e.id === importadoraId);
    
    if (!oferta || !importadora) return null;

    // Gerar ID sequencial baseado na última exportação
    const exportacoes = get().exportacoes;
    const lastId = exportacoes.length > 0 
      ? Math.max(...exportacoes.map(e => {
          const match = e.id.match(/exportacao-(\d+)/);
          return match ? parseInt(match[1]) : 0;
        }))
      : 0;

    const novaExportacao = {
      id: `exportacao-${lastId + 1}`,
      ofertaId,
      importadoraId,
      status: 'MATCHED',
      dataCriacao: new Date().toISOString(),
      parceiros: {
        financeira: null,
        despachante: null,
        seguradora: null,
        transportadora: null,
        corretora: null
      }
    };

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
      })
    }
  )
);

export default useStore;
