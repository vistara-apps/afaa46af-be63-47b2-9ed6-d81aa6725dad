'use client';

import { useState } from 'react';
import { AppShell } from './components/AppShell';
import { FundCard } from './components/FundCard';
import { CreateFundModal } from './components/CreateFundModal';
import { NotificationBanner } from './components/NotificationBanner';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar, Identity } from '@coinbase/onchainkit/identity';
import { useFunds } from '@/lib/hooks/useFunds';
import { ContributionButton } from './components/ContributionButton';
import { TrendingUp, Users, Plus } from 'lucide-react';

export default function HomePage() {
  const { funds, loading, error, isConnected, createNewFund, contributeToFundLocal } = useFunds();
  const [selectedFund, setSelectedFund] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [contributionAmount, setContributionAmount] = useState('');

  const handleCreateFund = async (fundData: {
    name: string;
    targetAsset: string;
    targetAmount: number;
  }) => {
    await createNewFund(fundData);
    setShowCreateModal(false);
    setShowNotification(true);
  };

  if (selectedFund) {
    return (
      <AppShell 
        title={selectedFund.fundName}
        showCreateButton={false}
      >
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedFund(null)}
            className="mb-6 text-accent hover:text-yellow-400 transition-colors"
          >
            ← Back to Funds
          </button>
          
          <FundCard fund={selectedFund} variant="detail" />

          {/* Contribution Section */}
          {selectedFund.status === 'active' && isConnected && (
            <div className="mt-8 glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Make a Contribution
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Contribution Amount ({selectedFund.targetAsset})
                  </label>
                  <input
                    type="number"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.001"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none"
                  />
                </div>
                <ContributionButton
                  variant="primary"
                  amount={parseFloat(contributionAmount) || 0}
                  symbol={selectedFund.targetAsset}
                  disabled={!contributionAmount || parseFloat(contributionAmount) <= 0}
                  onContribute={async (amount) => {
                    await contributeToFundLocal(selectedFund.fundId, amount);
                    setContributionAmount('');
                  }}
                />
              </div>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Members ({selectedFund.members.length})
            </h3>
            <div className="space-y-3">
              {selectedFund.members.map((member: any) => (
                <div key={member.memberId} className="glass-card p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">
                          {member.user.displayName}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {member.contributionAmount} {selectedFund.targetAsset}
                        </div>
                      </div>
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                      member.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                      member.status === 'contributing' ? 'bg-blue-900/30 text-blue-400' :
                      'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {member.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell onCreateFund={() => setShowCreateModal(true)}>
      <div className="max-w-4xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Welcome to SquadSats
          </h1>
          <p className="text-text-secondary max-w-md mx-auto">
            Pool funds with friends and auto-invest in crypto, together.
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="mb-8">
          <Wallet>
            <ConnectWallet>
              <div className="glass-card p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Connect Your Wallet
                </h3>
                <p className="text-text-secondary mb-4">
                  Connect your Base wallet to start creating and joining investment funds
                </p>
                <div className="btn-primary inline-flex items-center space-x-2">
                  <span>Connect Wallet</span>
                </div>
              </div>
            </ConnectWallet>
            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10" />
                  <div>
                    <Name className="font-medium text-text-primary" />
                    <div className="text-sm text-text-secondary">Connected</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-text-secondary">Ready to invest</div>
                </div>
              </div>
            </div>
          </Wallet>
        </div>

        {/* Error Banner */}
        {error && (
          <NotificationBanner
            variant="warning"
            title="Error"
            message={error}
            onDismiss={() => {}} // Keep error visible until resolved
          />
        )}

        {/* Notifications */}
        {showNotification && !error && (
          <NotificationBanner
            variant="info"
            title="Welcome to SquadSats!"
            message="Create your first fund or join an existing one to start investing with friends."
            onDismiss={() => setShowNotification(false)}
          />
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="metric-card text-center">
            <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-text-primary">{funds.length}</div>
            <div className="text-sm text-text-secondary">Active Funds</div>
          </div>
          <div className="metric-card text-center">
            <Users className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-text-primary">
              {funds.reduce((acc, fund) => acc + fund.members.length, 0)}
            </div>
            <div className="text-sm text-text-secondary">Total Members</div>
          </div>
          <div className="metric-card text-center">
            <div className="w-6 h-6 text-accent mx-auto mb-2 text-xl">💰</div>
            <div className="text-2xl font-bold text-text-primary">
              {funds.reduce((acc, fund) => acc + fund.currentAmount, 0).toFixed(2)}
            </div>
            <div className="text-sm text-text-secondary">Total Pooled</div>
          </div>
        </div>

        {/* Funds List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Your Funds</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Fund</span>
            </button>
          </div>

          {funds.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-text-secondary" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">No funds yet</h3>
              <p className="text-text-secondary mb-4">
                Create your first fund to start investing with friends
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                Create Your First Fund
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {funds.map((fund) => (
                <FundCard
                  key={fund.fundId}
                  fund={fund}
                  onClick={() => setSelectedFund(fund)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Create Fund Modal */}
        <CreateFundModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateFund={handleCreateFund}
        />
      </div>
    </AppShell>
  );
}
