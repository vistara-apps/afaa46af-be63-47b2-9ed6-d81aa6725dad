'use client';

import { AlertCircle, Info, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

interface NotificationBannerProps {
  variant?: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function NotificationBanner({ 
  variant = 'info', 
  title, 
  message, 
  dismissible = true,
  onDismiss 
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const variants = {
    info: {
      bg: 'bg-blue-900/20 border-blue-500/30',
      icon: Info,
      iconColor: 'text-blue-400',
      textColor: 'text-blue-100'
    },
    warning: {
      bg: 'bg-yellow-900/20 border-yellow-500/30',
      icon: AlertCircle,
      iconColor: 'text-yellow-400',
      textColor: 'text-yellow-100'
    },
    success: {
      bg: 'bg-green-900/20 border-green-500/30',
      icon: CheckCircle,
      iconColor: 'text-green-400',
      textColor: 'text-green-100'
    },
    error: {
      bg: 'bg-red-900/20 border-red-500/30',
      icon: AlertCircle,
      iconColor: 'text-red-400',
      textColor: 'text-red-100'
    }
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} border rounded-lg p-4 mb-4`}>
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <h4 className={`font-medium ${config.textColor} mb-1`}>{title}</h4>
          <p className={`text-sm ${config.textColor} opacity-90`}>{message}</p>
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={`${config.iconColor} hover:opacity-70 transition-opacity`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
