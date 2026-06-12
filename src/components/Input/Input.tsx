import React from 'react';
import './Input.scss';

// Input'un alabileceği esnek özellikleri tanımlıyoruz
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Giriş alanının üstünde görünecek başlık
  error?: string; // Hata mesajı var mı?
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`ff-input-container ${error ? 'ff-input-container--error' : ''}`}>
      {label && <label className="ff-input-label">{label}</label>}
      <input 
        className={`ff-input ${className}`} 
        aria-invalid={!!error}
        {...props} 
      />
      {error && <span className="ff-input-error-text">{error}</span>}
    </div>
  );
};