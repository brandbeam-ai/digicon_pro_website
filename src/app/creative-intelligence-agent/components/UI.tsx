'use client';
import React from 'react';

export const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  fullWidth?: boolean;
}> = ({ children, variant = 'primary', className = '', fullWidth = false }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  const variants = {
    primary: "primary-button",
    secondary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)]",
    outline: "border border-white/20 text-white hover:bg-white/10 focus:ring-white/50"
  };

  // For primary variant, use only primary-button class (it has all styles built-in)
  if (variant === 'primary') {
    return (
      <button className={`primary-button ${fullWidth ? 'w-full' : ''} ${className}`}>
        {children}
      </button>
    );
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}>
      {children}
    </button>
  );
};

export const SectionTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20">
    {children}
  </span>
);

export const Heading: React.FC<{ children: React.ReactNode; level?: 1 | 2 | 3; className?: string }> = ({ children, level = 2, className = '' }) => {
  if (level === 1) return <h1 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 ${className}`}>{children}</h1>;
  if (level === 3) return <h3 className={`text-xl font-bold mb-3 ${className}`}>{children}</h3>;
  return <h2 className={`text-3xl md:text-4xl font-bold mb-6 tracking-tight ${className}`}>{children}</h2>;
};

export const Paragraph: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-slate-400 leading-relaxed text-lg ${className}`}>{children}</p>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`glass-card p-6 md:p-8 rounded-2xl ${className}`}>
    {children}
  </div>
);

