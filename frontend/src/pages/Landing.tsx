import React from 'react';
import { Shield, Coins, FileText, ArrowRight, Zap, Clock, Globe, Twitter, Github } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useWallet } from '../hooks/useWallet';
import { SpotlightGrid } from '../components/ui/SpotlightGrid';
import { motion } from 'framer-motion';

const Landing: React.FC = () => {
  const { state } = useAppContext();
  const { connect } = useWallet();

  const handleConnect = async () => {
    if (!state.isConnected) {
      await connect();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen w-full pt-16 overflow-x-hidden bg-[#18191d]">
      <SpotlightGrid spotlightColor="#a3e2ff" />

      <div className="w-full flex flex-col items-center px-6 z-10">
      
      {/* 1. HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col items-center text-center max-w-3xl mt-12 mb-20 z-10"
      >
        <div className="mb-8 inline-flex items-center gap-2 bg-[#111415]/80 border border-slate-700/50 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest text-[#00E676] shadow-[0_0_10px_rgba(0,230,118,0.1)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse"></div>
          NETWORK STATUS: OPERATIONAL
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-[#e1e1e7] drop-shadow-lg">
          ROBOTRON <span className="text-[#a3ddff]">Faucet</span>
        </h1>
        
        <p className="text-lg text-slate-400 mb-10 max-w-2xl leading-relaxed">
          Empowering the decentralized frontier. Claim free RBNT tokens every 24 hours to fuel your node operations and smart contract testing.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={handleConnect}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#a3e2ff] hover:bg-[#8eccee] text-[#0B0E11] font-bold rounded-md shadow-[0_0_20px_rgba(163,226,255,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            Connect Wallet
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-slate-800/50 border border-slate-700 text-[#e1e1e7] font-semibold rounded-md transition-all flex items-center justify-center gap-2 group">
            Enter App
            <ArrowRight size={18} className="text-slate-400 group-hover:text-[#e1e1e7] transition-colors" />
          </button>
        </div>
      </motion.div>

      {/* 2. STATS SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full max-w-5xl mb-24 grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#232328] border-t border-[#a3e2ff]/20 border-b border-x border-[#232328] shadow-[0_-5px_20px_rgba(163,226,255,0.05)] rounded-2xl p-6 z-10"
      >
        <div className="flex flex-col p-4">
          <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1">AVAILABLE SUPPLY</span>
          <span className="text-2xl font-bold text-[#e1e1e7]">{(state.totalSupply / 1000000).toFixed(1)}M RBNT</span>
        </div>
        <div className="flex flex-col p-4">
          <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1">ACTIVE OPERATIONS</span>
          <span className="text-2xl font-bold text-[#e1e1e7]">14.2K</span>
        </div>
        <div className="flex flex-col p-4">
          <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1">CLAIMS TODAY</span>
          <span className="text-2xl font-bold text-[#e1e1e7]">45.8K</span>
        </div>
        <div className="flex flex-col p-4">
          <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1">NETWORK UPTIME</span>
          <span className="text-2xl font-bold text-[#00E676]">99.9%</span>
        </div>
      </motion.div>

      {/* 3. FEATURE CARDS */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-5xl mb-24 flex flex-col gap-6 z-10"
      >
        
        {/* Top 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#232328] border-t border-[#a3e2ff]/10 border-b border-x border-[#232328] shadow-[0_-5px_20px_rgba(163,226,255,0.02)] rounded-2xl p-8 flex flex-col justify-between hover:border-[#a3e2ff]/30 transition-colors group">
            <div>
              <Zap size={24} className="text-[#a3e2ff] mb-6" />
              <h3 className="text-2xl font-bold text-[#e1e1e7] mb-3 tracking-wide">Instant Claim Infrastructure</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                Our faucet leverages high-speed RPC nodes to ensure your tokens arrive within seconds, not minutes. Built for developers who value their time.
              </p>
            </div>
            <div className="flex gap-3 mt-8">
              <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-[#18191d] text-slate-300 rounded border border-[#a3e2ff]/10">Fast Sync</span>
              <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-[#18191d] text-slate-300 rounded border border-[#a3e2ff]/10">Low Latency</span>
            </div>
          </div>
          
          <div className="bg-[#232328] border-t border-[#a3e2ff]/10 border-b border-x border-[#232328] shadow-[0_-5px_20px_rgba(163,226,255,0.02)] rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-[#a3e2ff]/30 transition-colors">
            <div className="w-16 h-16 border border-[#00E676]/30 rounded-xl mb-6 shadow-[0_0_15px_rgba(0,230,118,0.1)] flex items-center justify-center">
               <Clock size={28} className="text-[#00E676]" />
            </div>
            <h3 className="text-lg font-bold text-[#e1e1e7] mb-1">Claim Timer</h3>
            <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-6">READY IN 23:59:59</p>
            <button className="w-full py-3 bg-slate-800/80 text-slate-500 font-semibold rounded-lg text-sm cursor-not-allowed border border-slate-700/50">
              Claim Locked
            </button>
          </div>
        </div>

        {/* Bottom 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#232328] border-t border-[#a3e2ff]/10 border-b border-x border-[#232328] shadow-[0_-5px_20px_rgba(163,226,255,0.02)] rounded-2xl p-6 hover:border-[#a3e2ff]/30 transition-colors">
            <Shield size={20} className="text-[#00E676] mb-4" />
            <h4 className="text-base font-bold text-[#e1e1e7] mb-2">Sybil Protection</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Advanced proof of humanity algorithms ensure fair distribution across the network.</p>
          </div>
          <div className="bg-[#232328] border-t border-[#a3e2ff]/10 border-b border-x border-[#232328] shadow-[0_-5px_20px_rgba(163,226,255,0.02)] rounded-2xl p-6 hover:border-[#a3e2ff]/30 transition-colors">
            <Coins size={20} className="text-[#a3e2ff] mb-4" />
            <h4 className="text-base font-bold text-[#e1e1e7] mb-2">No Fees</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Gas-less transactions for all faucet claims. The entry barrier is officially zero.</p>
          </div>
          <div className="bg-[#232328] border-t border-[#a3e2ff]/10 border-b border-x border-[#232328] shadow-[0_-5px_20px_rgba(163,226,255,0.02)] rounded-2xl p-6 hover:border-[#FF5252]/30 transition-colors">
            <FileText size={20} className="text-[#FF5252] mb-4" />
            <h4 className="text-base font-bold text-[#e1e1e7] mb-2">Audit Trails</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Every claim is recorded on chain, providing full transparency for governance.</p>
          </div>
        </div>
      </motion.div>

      {/* 4. CTA BANNER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-5xl rounded-3xl bg-gradient-to-br from-slate-900 to-[#102a28] border border-[#1a3834] p-12 text-center overflow-hidden mb-24 z-10"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#a3e2ff]/5 to-transparent pointer-events-none"></div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-[#e1e1e7] mb-8 relative z-10">
          Ready to power up your<br />development cycle?
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <button className="w-full sm:w-auto px-8 py-3.5 bg-[#a3e2ff] hover:bg-[#8eccee] text-[#0B0E11] font-bold rounded-md shadow-[0_0_20px_rgba(163,226,255,0.3)] transition-all hover:scale-105 active:scale-95">
            Join the Network
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-slate-800/50 border border-slate-600 text-[#e1e1e7] font-semibold rounded-md transition-all">
            Read Whitepaper
          </button>
        </div>
      </motion.div>

      </div>

      {/* 5. FOOTER */}
      <footer className="relative w-full bg-[#111415] border-t border-slate-800/80 py-12 px-8 flex justify-center z-10">
        <div className="w-full max-w-7xl flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 flex flex-col">
            <h2 className="text-[#e1e1e7] font-bold tracking-wider text-lg mb-4">ROBOTRON</h2>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-6">
              The standard for automated token distribution and network stress-testing in the new digital economy.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded bg-[#18191d] flex items-center justify-center text-slate-400 hover:text-[#e1e1e7] transition-colors">
                <Globe size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-[#18191d] flex items-center justify-center text-slate-400 hover:text-[#e1e1e7] transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-[#18191d] flex items-center justify-center text-slate-400 hover:text-[#e1e1e7] transition-colors">
                <Github size={16} />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h4 className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4">RESOURCES</h4>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 mb-3 transition-colors">Documentation</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 mb-3 transition-colors">API Reference</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 mb-3 transition-colors">Tokenomics</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Network Status</a>
          </div>
          
          <div className="flex flex-col">
            <h4 className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4">SUPPORT</h4>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 mb-3 transition-colors">Help Center</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 mb-3 transition-colors">Community</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 mb-3 transition-colors">Bug Bounty</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Terms of Service</a>
          </div>
        </div>
        
        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-6 border-t border-slate-800/80">
          <span className="text-[10px] text-slate-500 font-medium tracking-wide">
            © 2024 ROBOTRON FOUNDATION. ALL RIGHTS RESERVED.
          </span>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">VERSION: V2.4.0</span>
            <span className="text-[10px] text-[#00E676] font-bold uppercase tracking-widest">• MAINNET-ALPHA</span>
          </div>
        </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
