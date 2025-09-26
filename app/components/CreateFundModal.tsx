'use client';

import { useState } from 'react';
import { X, Target, Users } from 'lucide-react';
import { CURATED_ASSETS } from '@/lib/constants';
import { CuratedAsset } from '@/lib/types';

interface CreateFundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFund: (fundData: {
    name: string;
    targetAsset: string;
    targetAmount: number;
  }) => void;
}

export function CreateFundModal({ isOpen, onClose, onCreateFund }: CreateFundModalProps) {
  const [fundName, setFundName] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<CuratedAsset | null>(null);
  const [targetAmount, setTargetAmount] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    if (!fundName || !selectedAsset || !targetAmount) return;
    
    onCreateFund({
      name: fundName,
      targetAsset: selectedAsset.symbol,
      targetAmount: parseFloat(targetAmount)
    });
    
    // Reset form
    setFundName('');
    setSelectedAsset(null);
    setTargetAmount('');
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-text-primary">Create New Fund</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Step 1: Fund Name */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Fund Name
                </label>
                <input
                  type="text"
                  value={fundName}
                  onChange={(e) => setFundName(e.target.value)}
                  placeholder="e.g., Weekend Warriors ETH Fund"
                  className="w-full px-4 py-3 bg-surface border border-gray-600 rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none"
                />
              </div>
              
              <button
                onClick={() => setStep(2)}
                disabled={!fundName.trim()}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Choose Asset
              </button>
            </div>
          )}

          {/* Step 2: Asset Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Choose Asset to Invest In
                </label>
                <div className="space-y-2">
                  {CURATED_ASSETS.map((asset) => (
                    <button
                      key={asset.symbol}
                      onClick={() => setSelectedAsset(asset)}
                      className={`w-full p-4 rounded-lg border transition-all ${
                        selectedAsset?.symbol === asset.symbol
                          ? 'border-accent bg-accent/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{asset.icon}</span>
                        <div className="text-left flex-1">
                          <div className="font-medium text-text-primary">{asset.name}</div>
                          <div className="text-sm text-text-secondary">{asset.description}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-text-secondary">Min: {asset.minInvestment} {asset.symbol}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              asset.riskLevel === 'low' ? 'bg-green-900/30 text-green-400' :
                              asset.riskLevel === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                              'bg-red-900/30 text-red-400'
                            }`}>
                              {asset.riskLevel} risk
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedAsset}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Set Target
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Target Amount */}
          {step === 3 && selectedAsset && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Target Amount ({selectedAsset.symbol})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder={`Minimum ${selectedAsset.minInvestment}`}
                    min={selectedAsset.minInvestment}
                    step="0.001"
                    className="w-full px-4 py-3 bg-surface border border-gray-600 rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none pr-16"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
                    {selectedAsset.symbol}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  Minimum investment: {selectedAsset.minInvestment} {selectedAsset.symbol}
                </p>
              </div>

              {/* Summary */}
              <div className="glass-card p-4 rounded-lg">
                <h3 className="font-medium text-text-primary mb-3">Fund Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Name:</span>
                    <span className="text-text-primary">{fundName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Asset:</span>
                    <span className="text-text-primary">{selectedAsset.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Target:</span>
                    <span className="text-text-primary">{targetAmount} {selectedAsset.symbol}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(2)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!targetAmount || parseFloat(targetAmount) < selectedAsset.minInvestment}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Fund
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
