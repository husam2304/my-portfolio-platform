import React from 'react';

export type LoadingVariant = 'spinner' | 'bar' | 'dots' | 'pulse';

interface LoadingIndicatorProps {
  variant?: LoadingVariant;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  fullscreen?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  variant = 'spinner',
  size = 'md',
  label,
  fullscreen = false,
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const containerClasses = fullscreen
    ? 'fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50'
    : 'flex items-center justify-center';

  const contentClasses = 'flex flex-col items-center justify-center gap-4';

  const renderSpinner = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <svg className="w-full h-full" viewBox="0 0 50 50">
        {/* Background circle */}
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-surface-container-high dark:text-surface-container" />
        {/* Animated circle */}
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary-fixed-dim dark:text-primary-fixed-dim animate-spin"
          strokeDasharray="31.4 125.6"
          style={{
            animation: 'spin 1.5s linear infinite',
          }}
        />
      </svg>
    </div>
  );

  const renderBar = () => (
    <div className={`w-48 h-1 bg-surface-container-high dark:bg-surface-container rounded-full overflow-hidden`}>
      <div
        className="h-full bg-primary-fixed-dim rounded-full"
        style={{
          animation: 'slideInfinity 2s ease-in-out infinite',
          width: '40%',
        }}
      />
    </div>
  );

  const renderDots = () => (
    <div className="flex gap-2">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`rounded-full bg-primary-fixed-dim ${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'}`}
          style={{
            animation: `bounce 1.4s ease-in-out infinite`,
            animationDelay: `${index * 0.16}s`,
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="w-full h-full bg-primary-fixed-dim rounded-full animate-pulse" />
      <div className="absolute inset-0 bg-primary-fixed-dim rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.1s' }} />
    </div>
  );

  const variantRenderers = {
    spinner: renderSpinner,
    bar: renderBar,
    dots: renderDots,
    pulse: renderPulse,
  };

  return (
    <div className={containerClasses}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideInfinity {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(400%); }
          100% { transform: translateX(400%); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(1); opacity: 1; }
          40% { transform: scale(1.2); opacity: 0.7; }
        }
      `}</style>
      <div className={contentClasses}>
        {variantRenderers[variant]()}
        {label && <p className="text-body-md text-on-surface-variant dark:text-on-surface-variant">{label}</p>}
      </div>
    </div>
  );
};

export default LoadingIndicator;
