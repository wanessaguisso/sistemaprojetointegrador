'use client';
import { useState } from 'react';

export function Input({ 
  label, 
  error, 
  helperText,
  required,
  ...props 
}) {
  const [touched, setTouched] = useState(false);
  const showError = touched && error;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className={`text-sm font-medium ${showError ? 'text-red-600' : 'text-gray-700'}`}>
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <input
        className={`px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-offset-1 outline-none transition-all
          ${showError 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:ring-[#2b4e4b] focus:border-[#2b4e4b]'
          }`}
        onBlur={() => setTouched(true)}
        {...props}
      />
      {(showError || helperText) && (
        <p className={`text-sm mt-1 ${showError ? 'text-red-600' : 'text-gray-500'}`}>
          {showError ? error : helperText}
        </p>
      )}
    </div>
  );
}

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  loading = false,
  disabled = false,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#2b4e4b] text-white hover:bg-[#1a2f2e] focus:ring-[#2b4e4b]',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border-2 border-[#2b4e4b] text-[#2b4e4b] hover:bg-[#2b4e4b]/10 focus:ring-[#2b4e4b]'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

export function Card({ children, title, className = '' }) {
  return (
    <div className={`p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-white/20 ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>}
      {children}
    </div>
  );
}

export function FormError({ message }) {
  if (!message) return null;
  
  return (
    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
      {message}
    </div>
  );
}

export function FormSuccess({ message }) {
  if (!message) return null;
  
  return (
    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm">
      {message}
    </div>
  );
}
