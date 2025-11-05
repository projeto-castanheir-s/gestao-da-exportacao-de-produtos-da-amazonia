'use client';
import { X, Download } from 'lucide-react';
import { useEffect } from 'react';

export default function PDFViewer({ isOpen, onClose, pdfUrl, title = 'Documento' }) {
  // Fechar com ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* Overlay - clique para fechar */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden m-4">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-menuGreen text-white px-6 py-4 flex items-center justify-between z-10 shadow-lg">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              title="Baixar PDF"
            >
              <Download size={18} />
              Baixar
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Fechar (ESC)"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* PDF Viewer */}
        <div className="w-full h-full pt-16">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            className="w-full h-full border-0"
            title={title}
          />
        </div>
      </div>
    </div>
  );
}
