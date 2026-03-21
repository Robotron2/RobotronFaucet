import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverEffect = false, ...props }) => {
  return (
    <div 
      className={clsx(
        "bg-[#232328] border-t border-[#a3e2ff]/10 border-b border-x border-[#232328] rounded-2xl p-6 shadow-[0_-5px_20px_rgba(163,226,255,0.02)] transition-colors relative overflow-hidden",
        hoverEffect && "hover:border-[#a3e2ff]/30",
        className
      )}
      {...props}
    >
      {/* Subtle interior gradient glow at the top of every card */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a3e2ff]/20 to-transparent"></div>
      
      {/* Internal wrapper for z-index safety against potential background layers */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
