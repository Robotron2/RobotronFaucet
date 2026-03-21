import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col w-full gap-1.5">
      {label && <label className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">{label}</label>}
      <input 
        className={clsx(
          "w-full bg-[#18191d] border border-slate-700 text-[#e1e1e7] rounded-lg px-4 py-3 outline-none focus:border-[#a3e2ff] focus:ring-1 focus:ring-[#a3e2ff]/50 transition-all shadow-inner",
          error && "border-[#FF5252] focus:border-[#FF5252] focus:ring-[#FF5252]/50",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs font-medium text-[#FF5252] mt-1">{error}</span>}
    </div>
  );
};
