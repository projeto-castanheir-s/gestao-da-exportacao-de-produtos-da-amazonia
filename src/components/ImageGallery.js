'use client';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

export default function ImageGallery({ isOpen, onClose, images, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Sincronizar index quando props mudarem
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);
  
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);
  
  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, handleNext, handlePrevious]);
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.download = `imagem-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  if (!isOpen || !images || images.length === 0) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Overlay - clique para fechar */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      {/* Conteúdo */}
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent z-10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-white text-lg font-semibold">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              title="Baixar imagem"
            >
              <Download size={24} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              title="Fechar (ESC)"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Imagem Principal */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl max-h-[85vh]">
            <Image
              src={images[currentIndex]}
              alt={`Imagem ${currentIndex + 1}`}
              fill
              className="object-contain rounded-lg shadow-2xl"
              unoptimized
            />
          </div>
        </div>
        
        {/* Navegação */}
        {images.length > 1 && (
          <>
            {/* Botão Anterior */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm"
              title="Anterior (←)"
            >
              <ChevronLeft size={32} />
            </button>
            
            {/* Botão Próximo */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm"
              title="Próximo (→)"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}
        
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="flex gap-2 justify-center overflow-x-auto scrollbar-hide">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                    index === currentIndex
                      ? 'ring-4 ring-menuGreen scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
