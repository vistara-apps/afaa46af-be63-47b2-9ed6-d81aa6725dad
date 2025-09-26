'use client';

import { GroupFund } from '@/lib/types';
import { formatCrypto, calculateProgress, timeAgo } from '@/lib/utils';
import { FUND_STATUS_COLORS, CURATED_ASSETS } from '@/lib/constants';
import { Users, Target, Clock, TrendingUp } from 'lucide-react';

interface FundCardProps {
  fund: GroupFund;
  variant?: 'summary' | 'detail';
  onClick?: () => void;
}

export function FundCard({ fund, variant = 'summary', onClick }: FundCardProps) {
  const progress = calculateProgress(fund.currentAmount, fund.targetAmount);
  const asset = CURATED_ASSETS.find(a => a.symbol === fund.targetAsset);
  const statusColor = FUND_STATUS_COLORS[fund.status];

  if (variant === 'detail') {
    return (
      <div className="fund-card space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">{fund.fundName}</h2>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{asset?.icon}</span>
              <span className="text-lg font-semibold text-text-primary">{asset?.name}</span>
              <span className={`text-sm font-medium px-2 py-1 rounded-full bg-gray-800 ${statusColor}`}>
                {fund.status.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-secondary">Created</div>
            <div className="text-sm font-medium text-text-primary">
              {timeAgo(fund.createdAt)}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-secondary">Progress</span>
            <span className="text-sm font-medium text-text-primary">
              {progress.toFixed(1)}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-accent">
              {formatCrypto(fund.currentAmount, fund.targetAsset)}
            </span>
            <span className="text-sm text-text-secondary">
              of {formatCrypto(fund.targetAmount, fund.targetAsset)}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="metric-card text-center">
            <Users className="w-5 h-5 text-accent mx-auto mb-2" />
            <div className="text-lg font-bold text-text-primary">{fund.members.length}</div>
            <div className="text-xs text-text-secondary">Members</div>
          </div>
          <div className="metric-card text-center">
            <Target className="w-5 h-5 text-accent mx-auto mb-2" />
            <div className="text-lg font-bold text-text-primary">
              {formatCrypto(fund.targetAmount - fund.currentAmount, fund.targetAsset)}
            </div>
            <div className="text-xs text-text-secondary">Remaining</div>
          </div>
          <div className="metric-card text-center">
            <TrendingUp className="w-5 h-5 text-accent mx-auto mb-2" />
            <div className="text-lg font-bold text-text-primary">
              {fund.contributions.length}
            </div>
            <div className="text-xs text-text-secondary">Contributions</div>
          </div>
        </div>

        {/* Asset Info */}
        {asset && (
          <div className="glass-card p-4 rounded-lg">
            <h3 className="font-semibold text-text-primary mb-2">About {asset.name}</h3>
            <p className="text-sm text-text-secondary mb-3">{asset.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">Risk Level</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gray-800 ${
                asset.riskLevel === 'low' ? 'text-green-400' :
                asset.riskLevel === 'medium' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {asset.riskLevel.toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="fund-card cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{asset?.icon}</span>
          <div>
            <h3 className="font-semibold text-text-primary">{fund.fundName}</h3>
            <p className="text-sm text-text-secondary">{asset?.name}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gray-800 ${statusColor}`}>
          {fund.status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-3">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-accent">
            {formatCrypto(fund.currentAmount, fund.targetAsset)}
          </span>
          <span className="text-xs text-text-secondary">
            {progress.toFixed(1)}% complete
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{fund.members.length} members</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{timeAgo(fund.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
