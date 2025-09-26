import { CuratedAsset } from './types';

export const CURATED_ASSETS: CuratedAsset[] = [
  {
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    description: 'The most liquid and established cryptocurrency',
    icon: '🔷',
    contractAddress: '0x4200000000000000000000000000000000000006',
    minInvestment: 0.001,
    riskLevel: 'low'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    description: 'Stable digital dollar for safe pooling',
    icon: '💵',
    contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    minInvestment: 1,
    riskLevel: 'low'
  },
  {
    symbol: 'CBETH',
    name: 'Coinbase Wrapped Staked ETH',
    description: 'Earn staking rewards while holding ETH',
    icon: '⚡',
    contractAddress: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
    minInvestment: 0.001,
    riskLevel: 'medium'
  },
  {
    symbol: 'DEGEN',
    name: 'Degen',
    description: 'The meme coin of Farcaster culture',
    icon: '🎩',
    contractAddress: '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed',
    minInvestment: 100,
    riskLevel: 'high'
  }
];

export const FUND_STATUS_COLORS = {
  active: 'text-blue-400',
  funded: 'text-yellow-400',
  invested: 'text-green-400',
  completed: 'text-purple-400'
};

export const RISK_LEVEL_COLORS = {
  low: 'text-green-400',
  medium: 'text-yellow-400',
  high: 'text-red-400'
};
