'use client';

import { useState } from 'react';
import { Plus, Users, TrendingUp, Settings2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  showCreateButton?: boolean;
  onCreateFund?: () => void;
}

export function AppShell({ 
  children, 
  title = 'SquadSats', 
  showCreateButton = true,
  onCreateFund 
}: AppShellProps) {
  const { theme, setTheme } = useTheme();
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const themes = [
    { value: 'default', label: 'Finance Pro', icon: '💰' },
    { value: 'celo', label: 'Celo', icon: '🌱' },
    { value: 'solana', label: 'Solana', icon: '🔮' },
    { value: 'base', label: 'Base', icon: '🔵' },
    { value: 'coinbase', label: 'Coinbase', icon: '🏦' },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="glass-card border-b border-gray-700 sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-accent to-yellow-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-black" />
              </div>
              <h1 className="text-xl font-bold text-text-primary">{title}</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {showCreateButton && (
                <button
                  onClick={onCreateFund}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Fund</span>
                </button>
              )}
              
              <div className="relative">
                <button
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  className="p-2 rounded-lg bg-surface border border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  <Settings2 className="w-4 h-4 text-text-secondary" />
                </button>
                
                {showThemeSelector && (
                  <div className="absolute right-0 top-12 glass-card border border-gray-600 rounded-lg p-2 min-w-[160px] z-50">
                    {themes.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => {
                          setTheme(t.value as any);
                          setShowThemeSelector(false);
                        }}
                        className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                          theme === t.value 
                            ? 'bg-accent text-black' 
                            : 'text-text-secondary hover:bg-gray-700'
                        }`}
                      >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-gray-700">
        <div className="flex items-center justify-around py-3">
          <button className="flex flex-col items-center space-y-1 text-accent">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-medium">Funds</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-text-secondary">
            <Users className="w-5 h-5" />
            <span className="text-xs font-medium">Friends</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
