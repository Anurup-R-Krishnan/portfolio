import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  external?: boolean;
}

const variants = {
  primary: 'bg-neo-yellow text-black hover:bg-yellow-300',
  secondary: 'bg-neo-pink text-black hover:bg-pink-300',
  accent: 'bg-neo-blue text-black hover:bg-cyan-300',
  outline: 'bg-white text-black hover:bg-gray-100',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  to,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  external = false

}) => {

  const baseStyles = `
    inline-flex items-center justify-center px-6 py-3 font-bold text-lg 
    border-4 border-neo-black shadow-neo transition-all duration-200 
    hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none 
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-neo
  `;

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  const handleMouseEnter = () => {
    // hover effect can go here
  };
  const handleClick = () => {
    if (onClick) onClick();
  };

  if (to) {
    if (external) {
      return (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
          onMouseEnter={handleMouseEnter}
          onClick={handleClick} // Changed from playClick
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        to={to}
        className={combinedClassName}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </motion.button>
  );
};