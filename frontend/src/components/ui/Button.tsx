import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className, 
  ...props 
}) => {
  const baseStyles = "px-6 py-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const variants = {
    primary: "bg-[#a3e2ff] hover:bg-[#8eccee] text-[#0B0E11] shadow-[0_0_15px_rgba(163,226,255,0.3)]",
    secondary: "bg-transparent border border-slate-700 hover:border-slate-500 text-[#e1e1e7] hover:bg-slate-800/50",
    danger: "bg-[#FF5252] hover:bg-[#e04848] text-white shadow-[0_0_15px_rgba(255,82,82,0.3)]"
  };

  return (
    <button 
      className={clsx(baseStyles, variants[variant], className)} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
};
