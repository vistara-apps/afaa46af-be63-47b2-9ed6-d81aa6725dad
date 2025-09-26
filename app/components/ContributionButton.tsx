'use client';

import { useState } from 'react';
import { Wallet, Plus, Check } from 'lucide-react';

interface ContributionButtonProps {
  variant?: 'primary' | 'secondary';
  amount?: number;
  symbol?: string;
  disabled?: boolean;
  loading?: boolean;
  onContribute?: (amount: number) => Promise<void>;
}

export function ContributionButton({ 
  variant = 'primary', 
  amount = 0,
  symbol = 'ETH',
  disabled = false,
  loading = false,
  onContribute 
}: ContributionButtonProps) {
  const [isContributing, setIsContributing] = useState(false);
  const [contributed, setContributed] = useState(false);

  const handleContribute = async () => {
    if (!onContribute || disabled || loading) return;
    
    setIsContributing(true);
    try {
      await onContribute(amount);
      setContributed(true);
      setTimeout(() => setContributed(false), 2000);
    } catch (error) {
      console.error('Contribution failed:', error);
    } finally {
      setIsContributing(false);
    }
  };

  if (contributed) {
    return (
      <button className="btn-primary flex items-center justify-center space-x-2 w-full">
        <Check className="w-4 h-4" />
        <span>Contributed!</span>
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        onClick={handleContribute}
        disabled={disabled || loading || isContributing}
        className="btn-secondary flex items-center justify-center space-x-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isContributing ? (
          <>
            <div className="w-4 h-4 border-2 border-text-secondary border-t-transparent rounded-full animate-spin" />
            <span>Contributing...</span>
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4" />
            <span>Contribute {amount} {symbol}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleContribute}
      disabled={disabled || loading || isContributing}
      className="btn-primary flex items-center justify-center space-x-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isContributing ? (
        <>
          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <span>Contributing...</span>
        </>
      ) : (
        <>
          <Plus className="w-4 h-4" />
          <span>Contribute {amount} {symbol}</span>
        </>
      )}
    </button>
  );
}
