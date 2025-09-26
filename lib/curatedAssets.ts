import { CuratedAsset } from './types';

export const CURATED_ASSETS: CuratedAsset[] = [
  {
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    description: 'Wrapped Ethereum for seamless DeFi interactions on Base',
    icon: '💧',
    contractAddress: '0x4200000000000000000000000000000000000006',
    minInvestment: 0.01,
    riskLevel: 'low'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    description: 'Stablecoin backed by the US Dollar',
    icon: '💵',
    contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    minInvestment: 1,
    riskLevel: 'low'
  },
  {
    symbol: 'DEGEN',
    name: 'Degen',
    description: 'Meme coin celebrating the degen culture',
    icon: '🎭',
    contractAddress: '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed',
    minInvestment: 100,
    riskLevel: 'high'
  },
  {
    symbol: 'AERO',
    name: 'Aerodrome',
    description: 'DEX and yield aggregator on Base',
    icon: '✈️',
    contractAddress: '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
    minInvestment: 10,
    riskLevel: 'medium'
  },
  {
    symbol: 'CBETH',
    name: 'Coinbase Wrapped Staked ETH',
    description: 'Liquid staking token from Coinbase',
    icon: '🏦',
    contractAddress: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
    minInvestment: 0.01,
    riskLevel: 'low'
  }
];

export function getAssetBySymbol(symbol: string): CuratedAsset | undefined {
  return CURATED_ASSETS.find(asset => asset.symbol === symbol);
}

export function getAssetByAddress(address: string): CuratedAsset | undefined {
  return CURATED_ASSETS.find(asset => asset.contractAddress.toLowerCase() === address.toLowerCase());
}

