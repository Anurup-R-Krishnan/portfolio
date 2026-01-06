import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ShortcutsModalProps {
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ onClose }) => {
  const shortcuts = [
    { key: 'H', label: 'Go to Home' },
    { key: 'A', label: 'About Me' },
    { key: 'P', label: 'Projects' },
    { key: 'C', label: 'Contact' },
    { key: '?', label: 'Toggle Hints' },
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-neo-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white border-4 border-neo-black shadow-neo-lg p-8 max-w-md w-full"
      >
        <button onClick={onClose} className="absolute top-4 right-4 hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-neo-black transition-colors p-1">
          <X size={24} />
        </button>
        
        <h2 className="text-3xl font-black uppercase mb-6 border-b-4 border-neo-black pb-2 inline-block">
            Keyboard Shortcuts
        </h2>
        
        <div className="space-y-4">
            {shortcuts.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between group">
                    <span className="font-bold text-xl">{label}</span>
                    <span className="bg-neo-yellow border-2 border-neo-black shadow-neo-sm px-3 py-1 font-mono font-bold text-lg group-hover:translate-x-1 group-hover:shadow-none transition-all">
                        {key}
                    </span>
                </div>
            ))}
        </div>
        
        <div className="mt-8 text-center text-sm font-bold text-gray-500">
            Press keys to navigate
        </div>
      </motion.div>
    </div>
  );
};