import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavigationItem } from '../types';
import { Magnetic } from './ui/Magnetic';

const NAV_ITEMS: NavigationItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neo-amoled-bg border-b-4 border-neo-black dark:border-neo-amoled-border h-20 transition-all">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold tracking-tighter hover:text-neo-pink transition-colors uppercase relative z-10 dark:text-neo-amoled-text"
        >
          ARK.<span className="text-neo-blue">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex bg-white dark:bg-neo-amoled-surface border-2 border-neo-black dark:border-neo-amoled-border p-1 relative">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Magnetic key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      relative z-10 px-4 py-2 font-bold uppercase text-sm transition-colors block
                      ${isActive ? 'text-white' : 'text-neo-black dark:text-neo-amoled-text hover:text-neo-blue'}
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-neo-black dark:bg-neo-accent -z-10"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </Link>
                </Magnetic>
              );
            })}
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 border-2 border-neo-black dark:border-neo-amoled-border shadow-neo-sm dark:shadow-neo-sm-amoled hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-neo-pink dark:bg-neo-amoled-surface text-black dark:text-neo-amoled-text"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex gap-4 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 border-2 border-neo-black dark:border-neo-amoled-border shadow-neo-sm dark:shadow-neo-sm-amoled hover:shadow-none transition-all bg-neo-pink dark:bg-neo-amoled-surface text-black dark:text-neo-amoled-text"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border-2 border-neo-black dark:border-neo-amoled-border shadow-neo-sm dark:shadow-neo-sm-amoled hover:shadow-none transition-all bg-neo-yellow dark:bg-neo-amoled-surface text-black dark:text-neo-amoled-text"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className={`fixed inset-0 z-40 bg-white dark:bg-neo-amoled-bg md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0 }
        }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {NAV_ITEMS.map((item) => (
            <motion.div
              key={item.path}
              variants={{
                open: { y: 0, opacity: 1 },
                closed: { y: 20, opacity: 0 }
              }}
            >
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  text-4xl font-black uppercase tracking-tight
                  ${location.pathname === item.path ? 'text-neo-pink dark:text-neo-accent' : 'text-neo-black dark:text-neo-amoled-text'}
                `}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <div className="mt-8 flex gap-4">
            <a
              href="https://github.com/anuruprk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border-4 border-neo-black dark:border-neo-amoled-border bg-neo-green dark:bg-neo-amoled-surface shadow-neo"
            >
              Github
            </a>
            <a
              href="/resume.pdf"
              className="p-3 border-4 border-neo-black dark:border-neo-amoled-border bg-neo-blue dark:bg-neo-amoled-surface shadow-neo"
            >
              Resume
            </a>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};