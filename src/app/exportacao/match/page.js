'use client';
import { Suspense } from 'react';
import MatchExportacaoContent from './MatchExportacaoContent';

export default function MatchExportacaoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-menuGreen mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <MatchExportacaoContent />
    </Suspense>
  );
}
