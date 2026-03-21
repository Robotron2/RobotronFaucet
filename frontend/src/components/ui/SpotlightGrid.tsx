import React from 'react';

interface SpotlightGridProps {
  spotlightColor?: string;
}

export const SpotlightGrid: React.FC<SpotlightGridProps> = ({ 
  spotlightColor = '#00D1FF' 
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* The Background Glow - positioned top right */}
      <div 
        className="absolute right-0 top-0 w-full md:w-[800px] h-[800px] opacity-20"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${spotlightColor} 0%, transparent 50%)`,
        }}
      />
      
      {/* The Grid, masked to only show within the spotlight area */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at 80% 20%, black 10%, transparent 50%)',
          WebkitMaskImage: 'radial-gradient(circle at 80% 20%, black 10%, transparent 50%)'
        }}
      />
    </div>
  );
};
