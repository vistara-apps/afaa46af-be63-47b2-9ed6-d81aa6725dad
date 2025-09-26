'use client';

import { GroupMember } from '@/lib/types';
import { formatCrypto, formatAddress, timeAgo } from '@/lib/utils';
import { User, Crown, Clock } from 'lucide-react';

interface MemberListItemProps {
  member: GroupMember;
  variant?: 'withProgress';
  isCreator?: boolean;
  targetAsset?: string;
}

export function MemberListItem({ 
  member, 
  variant, 
  isCreator = false,
  targetAsset = 'ETH'
}: MemberListItemProps) {
  const statusColors = {
    pending: 'text-yellow-400',
    contributing: 'text-blue-400',
    completed: 'text-green-400'
  };

  return (
    <div className="flex items-center justify-between p-4 glass-card rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="relative">
          {member.user.avatar ? (
            <img 
              src={member.user.avatar} 
              alt={member.user.displayName || 'User'}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-black" />
            </div>
          )}
          {isCreator && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
              <Crown className="w-2 h-2 text-black" />
            </div>
          )}
        </div>
        
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-text-primary">
              {member.user.displayName || formatAddress(member.user.walletAddress)}
            </span>
            {isCreator && (
              <span className="text-xs text-accent font-medium">CREATOR</span>
            )}
          </div>
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Clock className="w-3 h-3" />
            <span>Joined {timeAgo(member.joinedAt)}</span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className="font-medium text-text-primary">
          {formatCrypto(member.contributionAmount, targetAsset)}
        </div>
        <div className={`text-xs font-medium ${statusColors[member.status]}`}>
          {member.status.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
