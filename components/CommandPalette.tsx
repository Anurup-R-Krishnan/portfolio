import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Home,
  User,
  Briefcase,
  Mail,
  FileText,
  Copy,
  ExternalLink,
  Moon,
  Command,
  ArrowRight
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Toggle open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, "info");
    setIsOpen(false);
  };

  const actions = useMemo(() => [
    {
      id: 'home',
      label: 'Home',
      category: 'Navigation',
      icon: Home,
      action: () => { navigate('/'); setIsOpen(false); }
    },
    {
      id: 'about',
      label: 'About Me',
      category: 'Navigation',
      icon: User,
      action: () => { navigate('/about'); setIsOpen(false); }
    },
    {
      id: 'projects',
      label: 'Projects',
      category: 'Navigation',
      icon: Briefcase,
      action: () => { navigate('/projects'); setIsOpen(false); }
    },
    {
      id: 'contact',
      label: 'Contact',
      category: 'Navigation',
      icon: Mail,
      action: () => { navigate('/contact'); setIsOpen(false); }
    },
    {
      id: 'resume',
      label: 'Download Resume',
      category: 'Quick Actions',
      icon: FileText,
      action: () => {
        showToast("Resume download started...", "info");
        setIsOpen(false);
      }
    },
    {
      id: 'copy-email',
      label: 'Copy Email Address',
      category: 'Quick Actions',
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText('anuruprkrishnan@gmail.com');
        showToast("Email copied to clipboard!", "success");
        setIsOpen(false);
      }
    },
    {
      id: 'theme',
      label: 'Toggle Dark Mode',
      category: 'System',
      icon: Moon,
      action: toggleTheme
    },
    {
      id: 'github-profile',
      label: 'View GitHub Profile',
      category: 'Social',
      icon: ExternalLink,
      action: () => {
        window.open('https://github.com/anuruprk', '_blank');
        setIsOpen(false);
      }
    }
  ], [navigate, showToast]);

  const filteredActions = actions.filter(action =>
    action.label.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard Navigation within Palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredActions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-neo-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-white dark:bg-neo-amoled-surface border-4 border-neo-black dark:border-neo-amoled-border shadow-[12px_12px_0px_0px_#000000] dark:shadow-[12px_12px_0px_0px_rgba(26,26,26,0.5)] overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center p-4 border-b-4 border-neo-black dark:border-neo-amoled-border bg-neo-yellow dark:bg-neo-accent transition-colors">
              <Search className="mr-3 text-neo-black" size={24} />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-none outline-none text-xl font-bold placeholder-neo-black/50 dark:text-neo-black"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
              />
              <div className="hidden sm:flex items-center gap-1 bg-white border-2 border-neo-black px-2 py-1 rounded shadow-neo-sm">
                <Command size={14} />
                <span className="text-xs font-bold">K</span>
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 bg-white dark:bg-neo-amoled-surface">
              {filteredActions.length === 0 ? (
                <div className="p-8 text-center text-gray-500 font-bold italic">
                  No actions found for "{query}"
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.from(new Set(filteredActions.map(a => a.category))).map(category => (
                    <div key={category} className="mb-4">
                      <h3 className="px-3 text-xs font-black uppercase text-gray-400 dark:text-neo-amoled-muted tracking-widest mb-2">
                        {category}
                      </h3>
                      <div className="space-y-1">
                        {filteredActions
                          .filter(a => a.category === category)
                          .map((action) => {
                            const globalIndex = filteredActions.indexOf(action);
                            const isSelected = selectedIndex === globalIndex;
                            return (
                              <button
                                key={action.id}
                                onClick={() => action.action()}
                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                                className={`
                                  w-full flex items-center p-3 text-left font-bold transition-all
                                  ${isSelected
                                    ? 'bg-neo-blue dark:bg-neo-accent text-white dark:text-white translate-x-1 translate-y-[-2px] shadow-neo-sm border-2 border-neo-black dark:border-neo-amoled-border'
                                    : 'border-2 border-transparent text-neo-black dark:text-neo-amoled-text hover:bg-gray-100 dark:hover:bg-neo-amoled-bg'}
                                `}
                              >
                                <action.icon size={20} className="mr-4" />
                                <span className="flex-1">{action.label}</span>
                                {isSelected && <ArrowRight size={18} className="ml-2 animate-pulse" />}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Shortcuts Info */}
            <div className="p-3 bg-gray-50 dark:bg-neo-amoled-bg/40 border-t-2 border-neo-black dark:border-neo-amoled-border flex justify-between items-center text-[10px] font-black uppercase tracking-tighter text-gray-400">
              <div className="flex gap-4">
                <span><span className="text-neo-black dark:text-zinc-500">↑↓</span> navigate</span>
                <span><span className="text-neo-black dark:text-zinc-500">Enter</span> select</span>
                <span><span className="text-neo-black dark:text-zinc-500">Esc</span> close</span>
              </div>
              <div className="flex items-center gap-1">
                <span>AMOLED by Anurup</span>
                <div className="w-2 h-2 rounded-full bg-neo-pink"></div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};