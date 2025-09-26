export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(amount);
}

export function formatCrypto(amount: number, symbol: string): string {
  return `${amount.toFixed(6)} ${symbol}`;
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function calculateProgress(current: number, target: number): number {
  return Math.min((current / target) * 100, 100);
}

export function generateFundId(): string {
  return `fund_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateMemberId(): string {
  return `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateContributionId(): string {
  return `contrib_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}
