'use client';

import { useTheme } from '../components/ThemeProvider';
import { AppShell } from '../components/AppShell';
import { FundCard } from '../components/FundCard';
import { NotificationBanner } from '../components/NotificationBanner';
import { ContributionButton } from '../components/ContributionButton';
import { GroupFund } from '@/lib/types';

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();

  const sampleFund: GroupFund = {
    fundId: 'preview_fund',
    fundName: 'Theme Preview Fund',
    targetAsset: 'WETH',
    createdByUserId: 'user_1',
    createdAt: new Date(),
    currentAmount: 0.75,
    targetAmount: 1.0,
    status: 'active',
    members: [
      {
        memberId: 'member_1',
        fundId: 'preview_fund',
        userId: 'user_1',
        joinedAt: new Date(),
        contributionAmount: 0.75,
        status: 'completed',
        user: {
          userId: 'user_1',
          walletAddress: '0x1234...5678',
          displayName: 'Preview User'
        }
      }
    ],
    contributions: []
  };

  const themes = [
    { value: 'default', label: 'Finance Pro', description: 'Professional Wall Street meets crypto' },
    { value: 'celo', label: 'Celo', description: 'Black background with yellow accents' },
    { value: 'solana', label: 'Solana', description: 'Dark purple with magenta accents' },
    { value: 'base', label: 'Base', description: 'Base blue theme' },
    { value: 'coinbase', label: 'Coinbase', description: 'Coinbase navy theme' },
  ];

  return (
    <AppShell title="Theme Preview" showCreateButton={false}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Theme Selector */}
        <div className="glass-card p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Choose Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value as any)}
                className={`p-4 rounded-lg border transition-all text-left ${
                  theme === t.value
                    ? 'border-accent bg-accent/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="font-medium text-text-primary">{t.label}</div>
                <div className="text-sm text-text-secondary mt-1">{t.description}</div>
                {theme === t.value && (
                  <div className="text-xs text-accent mt-2 font-medium">ACTIVE</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-text-primary">Component Preview</h2>
          
          {/* Notifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">Notifications</h3>
            <NotificationBanner
              variant="info"
              title="Information"
              message="This is an info notification banner."
              dismissible={false}
            />
            <NotificationBanner
              variant="success"
              title="Success"
              message="Fund created successfully!"
              dismissible={false}
            />
            <NotificationBanner
              variant="warning"
              title="Warning"
              message="Please connect your wallet to continue."
              dismissible={false}
            />
          </div>

          {/* Fund Card */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">Fund Card</h3>
            <div className="max-w-md">
              <FundCard fund={sampleFund} />
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <ContributionButton variant="primary" amount={0.1} symbol="ETH" />
              <ContributionButton variant="secondary" amount={0.1} symbol="ETH" />
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="metric-card text-center">
                <div className="text-2xl font-bold text-text-primary">42</div>
                <div className="text-sm text-text-secondary">Active Funds</div>
              </div>
              <div className="glass-card p-4">
                <div className="font-medium text-text-primary">Glass Card</div>
                <div className="text-sm text-text-secondary mt-1">
                  This is a glass card component with backdrop blur.
                </div>
              </div>
              <div className="fund-card">
                <div className="font-medium text-text-primary">Fund Card</div>
                <div className="text-sm text-text-secondary mt-1">
                  Specialized card for fund display.
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">Progress Bar</h3>
            <div className="space-y-2">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }} />
              </div>
              <div className="text-sm text-text-secondary">75% complete</div>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">Typography</h3>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-text-primary">Display Text</div>
              <div className="text-xl font-semibold text-text-primary">Heading Text</div>
              <div className="text-base font-normal text-text-primary">Body Text</div>
              <div className="text-sm font-medium text-text-secondary">Caption Text</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
