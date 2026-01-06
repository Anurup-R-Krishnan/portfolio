import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div 
      className={`
        bg-gray-200 border-4 border-gray-300 relative overflow-hidden
        after:content-[''] after:absolute after:inset-0
        after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent
        after:animate-[shimmer_1.5s_infinite]
        ${className}
      `}
    />
  );
};