import { useState, useEffect } from 'react';
import { FAUCET_COOLDOWN_HOURS } from '../utils/constants';
import { useAppContext } from '../context/AppContext';

export const useCooldown = () => {
  const { state } = useAppContext();
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    if (!state.lastClaimTime) {
      setRemainingTime(0);
      return;
    }

    const cooldownMs = FAUCET_COOLDOWN_HOURS * 60 * 60 * 1000;
    
    const updateCooldown = () => {
      const targetTime = state.lastClaimTime! + cooldownMs;
      const now = Date.now();
      const diff = targetTime - now;
      if (diff <= 0) {
        setRemainingTime(0);
      } else {
        setRemainingTime(diff);
      }
    };

    updateCooldown(); // initial check
    const intervalId = setInterval(updateCooldown, 1000);

    return () => clearInterval(intervalId);
  }, [state.lastClaimTime]);

  const isOnCooldown = remainingTime > 0;
  
  const formattedTime = () => {
     if (!isOnCooldown) return "00:00:00";
     const h = Math.floor(remainingTime / (1000 * 60 * 60));
     const m = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
     const s = Math.floor((remainingTime % (1000 * 60)) / 1000);
     return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return {
    remainingTime,
    isOnCooldown,
    formattedTime: formattedTime(),
  };
};
