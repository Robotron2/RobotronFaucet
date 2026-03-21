import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className }) => {
  const variants = {
    success: "bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20 shadow-[0_0_10px_rgba(0,230,118,0.1)]",
    warning: "bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
    error: "bg-[#FF5252]/10 text-[#FF5252] border border-[#FF5252]/20 shadow-[0_0_10px_rgba(255,82,82,0.1)]",
    neutral: "bg-slate-800 text-slate-300 border border-slate-700"
  };

  return (
    <span className={clsx("px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-2", variants[variant], className)}>
      {variant === 'success' && <div className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse"></div>}
      {children}
    </span>
  );
};
