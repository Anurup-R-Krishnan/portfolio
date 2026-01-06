import React from 'react';
import { motion } from 'framer-motion';

interface TransitionLayoutProps {
  children: React.ReactNode;
}

export const TransitionLayout: React.FC<TransitionLayoutProps> = ({ children }) => {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-neo-black z-[100] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        style={{ originY: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="fixed inset-0 bg-neo-black z-[100] pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        style={{ originY: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      {children}
    </>
  );
};