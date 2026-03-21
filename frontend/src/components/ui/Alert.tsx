import React from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { clsx } from 'clsx';

interface AlertProps {
  message: string;
  variant?: 'success' | 'error' | 'info';
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ message, variant = 'info', className }) => {
  const variants = {
    success: "bg-[#00E676]/10 border-[#00E676]/30 text-[#00E676]",
    error: "bg-[#FF5252]/10 border-[#FF5252]/30 text-[#FF5252]",
    info: "bg-[#a3e2ff]/10 border-[#a3e2ff]/30 text-[#a3e2ff]"
  };

  return (
    <div className={clsx("w-full px-4 py-3 rounded-lg border flex items-center gap-3", variants[variant], className)}>
      {variant === 'success' && <CheckCircle2 size={18} className="shrink-0" />}
      {variant === 'error' && <AlertCircle size={18} className="shrink-0" />}
      {variant === 'info' && <Info size={18} className="shrink-0" />}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};
