import React, { useEffect } from 'react';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Modal açıkken arkadaki sayfanın kaymasını engellemek ve Esc tuşuyla kapatmak için
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="ff-modal-overlay" onClick={onClose} role="presentation">
      <div 
        className="ff-modal-container" 
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="ff-modal-header">
          <h3 id="modal-title" className="ff-modal-title">{title}</h3>
          <button 
            className="ff-modal-close-btn" 
            onClick={onClose}
            aria-label="Kapat"
            type="button"
          >
            &times;
          </button>
        </div>
        <div className="ff-modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};