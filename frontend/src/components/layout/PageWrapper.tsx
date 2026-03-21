import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Menu } from 'lucide-react';

interface PageWrapperProps {
  children: ReactNode;
  isDashboard?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, isDashboard = true }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen relative flex w-full">
      {/* Mobile overlay */}
      {isMobileOpen && isDashboard && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      
      {isDashboard ? (
        <>
          <Sidebar 
            isCollapsed={isCollapsed} 
            isMobileOpen={isMobileOpen} 
            setIsCollapsed={setIsCollapsed} 
            setIsMobileOpen={setIsMobileOpen}
          />
          <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
            <div className="md:hidden flex items-center justify-between bg-[#111415] border-b border-slate-800/60 p-4">
              <div className="text-white font-bold tracking-wide">ROBOTRON</div>
              <button onClick={() => setIsMobileOpen(true)} className="text-slate-300 hover:text-white">
                <Menu size={24} />
              </button>
            </div>
            <div className="hidden md:block">
              <Navbar isLandingPhase={false} />
            </div>
            <main className="flex-1 p-4 md:p-8 md:pt-4 overflow-x-hidden">
              {children}
            </main>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar isLandingPhase={true} />
          <main className="flex-1">
            {children}
          </main>
        </div>
      )}
    </div>
  );
};

export default PageWrapper;
