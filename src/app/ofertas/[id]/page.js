'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import useStore from '@/lib/store';
import Card from '@/components/Card';
import PrimaryButton from '@/components/PrimaryButton';
import PDFViewer from '@/components/PDFViewer';
import ImageGallery from '@/components/ImageGallery';
import { ArrowLeft, FileText, Ship, MapPin, Building, Hash, Calendar, Weight, DollarSign, Image as ImageIcon } from 'lucide-react';

export default function OfertaDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const { getOfertaById } = useStore();
  const [pdfOpen, setPdfOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  
  const oferta = getOfertaById(params.id);
  
  if (!oferta) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center">
          <p className="text-gray-600 mb-4">Oferta não encontrada</p>
          <PrimaryButton onClick={() => router.push('/ofertas')}>
            Voltar para Ofertas
          </PrimaryButton>
        </Card>
      </main>
    );
  }
  
  // Mock de imagens (substituir por imagens reais do banco)
  const imagens = [
    'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=400',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=400'
  ];
  
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Botão Voltar */}
        <button
          onClick={() => router.push('/ofertas')}
          className="flex items-center gap-2 text-gray-600 hover:text-menuGreen mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar para Ofertas
        </button>
        
        {/* Cabeçalho com Dados da Tabela */}
        <Card className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Produto</p>
              <p className="text-sm font-semibold text-gray-900">{oferta.produtoNome}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Estado</p>
              <p className="text-sm font-semibold text-gray-900">{oferta.estado}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Quantidade</p>
              <p className="text-sm font-semibold text-gray-900">
                {oferta.quantidade.toLocaleString('pt-BR')} Kg
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Valor</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(oferta.valor)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Data</p>
              <p className="text-sm font-semibold text-gray-900">
                {oferta.data ? (() => {
                  const [ano, mes] = oferta.data.split('-');
                  return `${mes}/${ano}`;
                })() : 'N/A'}
              </p>
            </div>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Esquerda: Dados da Empresa */}
          <div className="lg:col-span-1 space-y-6">
            {/* Dados da Empresa */}
            <Card title="Dados da Empresa">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="text-menuGreen mt-1" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Nome da Empresa</p>
                    <p className="text-sm font-semibold text-gray-900">{oferta.empresaExportadoraNome}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Hash className="text-menuGreen mt-1" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">CNPJ</p>
                    <p className="text-sm font-semibold text-gray-900">{oferta.empresaExportadoraCnpj}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="text-menuGreen mt-1" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Local da Extração</p>
                    <p className="text-sm font-semibold text-gray-900">{oferta.localExtracao}</p>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Imagens Anexadas */}
            <Card title="Imagens Anexadas">
              <div className="grid grid-cols-2 gap-3">
                {imagens.slice(0, 3).map((img, index) => (
                  <div 
                    key={index} 
                    onClick={() => setGalleryOpen(true)}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-75 transition-opacity cursor-pointer"
                  >
                    <img 
                      src={img} 
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div 
                  onClick={() => setGalleryOpen(true)}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-menuGreen hover:text-menuGreen transition-colors cursor-pointer"
                >
                  <ImageIcon size={24} className="mb-2" />
                  <span className="text-xs">Ver todas</span>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Coluna Direita: Mapa */}
          <div className="lg:col-span-2">
            <Card title="Localização da Extração">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {/* Mapa do Google Maps - Placeholder */}
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.817!2d-48.489!3d-1.455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMjcnMTguMCJTIDQ4wrAyOScyMC40Ilc!5e0!3m2!1spt-BR!2sbr!4v1234567890!5m2!1spt-BR!2sbr`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de localização"
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 flex items-center gap-2">
                  <MapPin size={16} />
                  <span><strong>Coordenadas:</strong> {oferta.estado} - {oferta.localExtracao}</span>
                </p>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Botões de Ação */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <PrimaryButton
            onClick={() => setPdfOpen(true)}
            variant="secondary"
            className="flex items-center justify-center gap-2 flex-1"
          >
            <FileText size={20} />
            Visualizar Contrato
          </PrimaryButton>
          
          <PrimaryButton
            onClick={() => router.push(`/exportacao/match?ofertaId=${oferta.id}`)}
            className="flex items-center justify-center gap-2 flex-1"
          >
            <Ship size={20} />
            Realizar Match de Exportação
          </PrimaryButton>
        </div>
      </div>
      
      {/* PDF Viewer Modal */}
      <PDFViewer
        isOpen={pdfOpen}
        onClose={() => setPdfOpen(false)}
        pdfUrl="/contratos/exemplo-oferta.pdf"
        title={`Contrato - ${oferta.produtoNome} - ${oferta.empresaExportadoraNome}`}
      />
      
      {/* Image Gallery */}
      <ImageGallery
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={imagens}
        initialIndex={0}
      />
    </main>
  );
}
