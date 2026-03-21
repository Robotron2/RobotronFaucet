import React, { useState } from 'react';
import { Wallet, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { useWallet } from '../../hooks/useWallet';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface NavbarProps {
  isLandingPhase?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLandingPhase = false }) => {
  const { isConnected, connect } = useWallet();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isDashboardActive = ['/dashboard', '/faucet', '/history', '/leaderboard', '/settings'].includes(currentPath);
  const isAdminActive = currentPath === '/admin';

  return (
    <header 
      className={clsx(
        "w-full h-20 flex items-center justify-between z-[100] relative bg-[#111415] border-b border-slate-800/50",
        isLandingPhase ? "px-8 md:px-12 max-w-7xl mx-auto border-none bg-transparent pt-4" : "px-8"
      )}
    >
      <div className={clsx("flex items-center h-full", isLandingPhase ? "w-full justify-between" : "gap-12")}>
        {/* Only show logo in navbar on landing page */}
        {isLandingPhase && (
          <div className="text-[#e1e1e7] font-bold text-xl tracking-wide flex items-center">
            ROBOTRON
          </div>
        )}

        <nav className={clsx("items-center gap-8 h-full pt-1", isLandingPhase ? "hidden md:flex" : "flex")}>
          <Link 
            to="/dashboard" 
            className={clsx(
              "text-xs font-bold tracking-widest uppercase transition-colors h-full flex items-center border-b-2",
              isDashboardActive 
                ? "text-[#a3e2ff] border-[#a3e2ff]" 
                : "text-slate-400 hover:text-[#e1e1e7] border-transparent"
            )}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin" 
            className={clsx(
              "text-xs font-bold tracking-widest uppercase transition-colors h-full flex items-center border-b-2",
              isAdminActive 
                ? "text-[#a3e2ff] border-[#a3e2ff]" 
                : "text-slate-400 hover:text-[#e1e1e7] border-transparent"
            )}
          >
            Admin
          </Link>
        </nav>
        
        {isLandingPhase && (
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        )}
      </div>

      <div className={clsx("items-center", isLandingPhase ? "hidden md:flex" : "flex")}>
        {isLandingPhase ? (
          <button 
            onClick={isConnected ? undefined : connect}
            className="bg-[#a3e2ff] hover:bg-[#8eccee] text-[#0B0E11] font-semibold px-6 py-2.5 rounded-sm text-sm transition-colors transition-transform active:scale-95 shadow-[0_0_15px_rgba(163,226,255,0.3)] whitespace-nowrap"
          >
            {isConnected ? 'APP READY' : 'CONNECT WALLET'}
          </button>
        ) : (
          <button 
            onClick={isConnected ? undefined : connect}
            className="flex items-center gap-2 bg-[#18191d] hover:bg-[#232328] text-slate-200 border border-slate-700/50 font-medium px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap shrink-0"
          >
            <Wallet size={16} className="text-[#a3e2ff]" />
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </button>
        )}
      </div>

      {/* Mobile Menu Drawer for Landing Page */}
      <AnimatePresence>
        {isLandingPhase && isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 z-[90] md:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 w-64 h-screen bg-[#0B0E11] border-l border-slate-800/80 p-6 pt-24 flex flex-col gap-6 md:hidden z-[100] shadow-2xl"
            >
              <button 
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
              
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-[#e1e1e7] font-bold text-lg tracking-wide border-b border-slate-800/50 pb-4">Dashboard</Link>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-[#e1e1e7] font-bold text-lg tracking-wide border-b border-slate-800/50 pb-4">Admin</Link>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); if (!isConnected) connect(); }}
                className="w-full bg-[#a3e2ff] text-[#0B0E11] font-extrabold tracking-widest uppercase py-3.5 rounded-sm mt-2 shadow-[0_0_15px_rgba(163,226,255,0.2)] text-[11px] whitespace-nowrap"
              >
                {isConnected ? 'APP READY' : 'CONNECT WALLET'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
