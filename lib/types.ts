export interface GroupFund {
  fundId: string;
  fundName: string;
  targetAsset: string;
  createdByUserId: string;
  createdAt: Date;
  currentAmount: number;
  targetAmount: number;
  status: 'active' | 'funded' | 'invested' | 'completed';
  members: GroupMember[];
  contributions: Contribution[];
}

export interface GroupMember {
  memberId: string;
  fundId: string;
  userId: string;
  joinedAt: Date;
  contributionAmount: number;
  status: 'pending' | 'contributing' | 'completed';
  user: User;
}

export interface Contribution {
  contributionId: string;
  memberId: string;
  fundId: string;
  amount: number;
  transactionHash?: string;
  timestamp: Date;
}

export interface User {
  userId: string;
  walletAddress: string;
  farcasterId?: string;
  displayName?: string;
  avatar?: string;
}

export interface CuratedAsset {
  symbol: string;
  name: string;
  description: string;
  icon: string;
  contractAddress: string;
  minInvestment: number;
  riskLevel: 'low' | 'medium' | 'high';
}
