'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { FundCard } from './components/FundCard';
import { CreateFundModal } from './components/CreateFundModal';
import { NotificationBanner } from './components/NotificationBanner';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar, Identity } from '@coinbase/onchainkit/identity';
import { GroupFund, User } from '@/lib/types';
import { generateFundId, generateMemberId } from '@/lib/utils';
import { TrendingUp, Users, Plus } from 'lucide-react';

export default function HomePage() {
  const [funds, setFunds] = useState<GroupFund[]>([]);
  const [selectedFund, setSelectedFund] = useState<GroupFund | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  // Mock user data
  const mockUser: User = {
    userId: 'user_1',
    walletAddress: '0x1234...5678',
    displayName: 'You',
    avatar: undefined
  };

  // Initialize with sample data
  useEffect(() => {
    const sampleFunds: GroupFund[] = [
      {
        fundId: 'fund_1',
        fundName: 'Weekend Warriors ETH Fund',
        targetAsset: 'WETH',
        createdByUserId: 'user_1',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        currentAmount: 0.75,
        targetAmount: 1.0,
        status: 'active',
        members: [
          {
            memberId: 'member_1',
            fundId: 'fund_1',
            userId: 'user_1',
            joinedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            contributionAmount: 0.3,
            status: 'completed',
            user: mockUser
          },
          {
            memberId: 'member_2',
            fundId: 'fund_1',
            userId: 'user_2',
            joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            contributionAmount: 0.25,
            status: 'completed',
            user: {
              userId: 'user_2',
              walletAddress: '0xabcd...efgh',
              displayName: 'Alice',
              avatar: undefined
            }
          },
          {
            memberId: 'member_3',
            fundId: 'fund_1',
            userId: 'user_3',
            joinedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
            contributionAmount: 0.2,
            status: 'completed',
            user: {
              userId: 'user_3',
              walletAddress: '0x9876...5432',
              displayName: 'Bob',
              avatar: undefined
            }
          }
        ],
        contributions: []
      },
      {
        fundId: 'fund_2',
        fundName: 'Degen Squad Moonshot',
        targetAsset: 'DEGEN',
        createdByUserId: 'user_2',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        currentAmount: 2500,
        targetAmount: 10000,
        status: 'active',
        members: [
          {
            memberId: 'member_4',
            fundId: 'fund_2',
            userId: 'user_2',
            joinedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
            contributionAmount: 2500,
            status: 'completed',
            user: {
              userId: 'user_2',
              walletAddress: '0xabcd...efgh',
              displayName: 'Alice',
              avatar: undefined
            }
          }
        ],
        contributions: []
      }
    ];
    setFunds(sampleFunds);
  }, []);

  const handleCreateFund = (fundData: {
    name: string;
    targetAsset: string;
    targetAmount: number;
  }) => {
    const newFund: GroupFund = {
      fundId: generateFundId(),
      fundName: fundData.name,
      targetAsset: fundData.targetAsset,
      createdByUserId: mockUser.userId,
      createdAt: new Date(),
      currentAmount: 0,
      targetAmount: fundData.targetAmount,
      status: 'active',
      members: [
        {
          memberId: generateMemberId(),
          fundId: generateFundId(),
          userId: mockUser.userId,
          joinedAt: new Date(),
          contributionAmount: 0,
          status: 'pending',
          user: mockUser
        }
      ],
      contributions: []
    };

    setFunds(prev => [newFund, ...prev]);
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
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Members ({selectedFund.members.length})
            </h3>
            <div className="space-y-3">
              {selectedFund.members.map((member) => (
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

        {/* Notifications */}
        {showNotification && (
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
