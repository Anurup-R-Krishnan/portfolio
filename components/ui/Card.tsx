import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  color?: 'white' | 'yellow' | 'pink' | 'blue' | 'green';
  hoverEffect?: boolean;
  delay?: number;
  tilt?: boolean;
}

const colorClasses = {
  white: 'bg-white',
  yellow: 'bg-neo-yellow',
  pink: 'bg-neo-pink',
  blue: 'bg-neo-blue',
  green: 'bg-neo-green',
};

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  color = 'white', 
  hoverEffect = false,
  delay = 0,
  tilt = true
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !tilt) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      transition={{ duration: 0.5, delay }}
      className={`
        border-4 border-neo-black p-6 shadow-neo
        ${colorClasses[color]}
        ${hoverEffect ? 'transition-transform duration-200 hover:-translate-y-2 hover:shadow-neo-lg' : ''}
        ${className}
      `}
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};