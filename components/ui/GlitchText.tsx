import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: React.ElementType;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Tag = 'h1', className = '' }) => {
  return (
    <Tag className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-neo-pink opacity-0 group-hover:opacity-100 group-hover:translate-x-[2px] group-hover:translate-y-[-2px] transition-all duration-75 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-neo-blue opacity-0 group-hover:opacity-100 group-hover:translate-x-[-2px] group-hover:translate-y-[2px] transition-all duration-75 select-none delay-75">
        {text}
      </span>
    </Tag>
  );
};