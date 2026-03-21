import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAppContext } from '../../context/AppContext';
import { useToken } from '../../hooks/useToken';
import { Zap } from 'lucide-react';

export const MintCard: React.FC = () => {
  const { state } = useAppContext();
  const { mint } = useToken();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.isConnected) return;
    
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0 || !recipient.startsWith('0x') || recipient.length !== 42) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    try {
      await mint(recipient, amt);
      setStatus('success');
      setRecipient('');
      setAmount('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <Card className="flex flex-col h-full bg-[#18191d] border-slate-800/60 p-8" hoverEffect={false}>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-[#a3ddff]/10 flex items-center justify-center">
          <Zap className="text-[#a3ddff]" size={18} fill="#a3ddff" />
        </div>
        <h3 className="text-xl font-bold text-[#e1e1e7] tracking-wide">Mint Tokens</h3>
      </div>

      <form onSubmit={handleMint} className="flex-1 flex flex-col gap-6">
        <Input 
          label="RECIPIENT WALLET ADDRESS" 
          placeholder="0x..." 
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          disabled={status === 'loading'}
          className="bg-[#111415] border-slate-800/80 py-3.5 text-sm font-mono placeholder:font-sans"
        />
        
        <div className="relative">
          <Input 
            label="MINT AMOUNT (RBNT)" 
            type="number"
            placeholder="0.00" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={status === 'loading'}
            className="bg-[#111415] border-slate-800/80 py-3.5 pr-16 text-sm"
          />
          <span className="absolute right-4 top-[36px] text-[11px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
            RBNT
          </span>
        </div>
        
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button 
            variant="primary" 
            className="w-full bg-[#a3ddff] hover:bg-[#8eccee] text-[#0B0E11] font-extrabold tracking-widest uppercase shadow-[0_0_20px_rgba(163,221,255,0.2)] py-4" 
            type="submit"
            disabled={status === 'loading' || !state.isConnected || !recipient || !amount}
            isLoading={status === 'loading'}
          >
            <Zap size={16} className={status === 'loading' ? 'hidden' : 'block'} fill="currentColor" />
            MINT TOKENS
          </Button>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">
            REQUIRES MULTI-SIGNATURE CONFIRMATION FROM QUORUM
          </span>
        </div>
      </form>
    </Card>
  );
};
