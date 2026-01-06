import React from 'react';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ items, direction = 'left', className = '' }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap border-y-4 border-neo-black dark:border-neo-amoled-border bg-neo-yellow dark:bg-neo-amoled-surface py-3 transition-colors ${className}`}>
      <div className={`inline-flex animate-marquee ${direction === 'right' ? 'animate-reverse' : ''}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center mx-4">
             {items.map((item, idx) => (
                <span key={idx} className="text-2xl font-black uppercase mx-8 dark:text-neo-amoled-text">
                   {item} <span className="text-neo-pink text-3xl align-middle mx-2">•</span>
                </span>
             ))}
          </div>
        ))}
      </div>
    </div>
  );
};