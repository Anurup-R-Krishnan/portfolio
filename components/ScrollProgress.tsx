import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-2 z-[100] bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-neo-pink border-b-2 border-r-2 border-neo-black origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};