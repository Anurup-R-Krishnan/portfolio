import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="mb-6">
      <label className="block text-xl font-bold mb-2 uppercase tracking-wide dark:text-neo-midnight-text">
        {label}
      </label>
      <input
        className={`
          w-full px-4 py-3 bg-white border-4 border-neo-black text-lg 
          shadow-neo-sm focus:outline-none focus:shadow-neo transition-all
          placeholder-gray-500
          dark:bg-neo-midnight-bg dark:text-neo-midnight-text dark:border-neo-midnight-border dark:shadow-neo-sm-midnight
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-2 text-red-600 font-bold bg-white dark:bg-red-900 dark:text-white inline-block border-2 border-neo-black dark:border-red-500 px-2">
          ! {error}
        </p>
      )}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="mb-6">
      <label className="block text-xl font-bold mb-2 uppercase tracking-wide dark:text-neo-midnight-text">
        {label}
      </label>
      <textarea
        className={`
          w-full px-4 py-3 bg-white border-4 border-neo-black text-lg 
          shadow-neo-sm focus:outline-none focus:shadow-neo transition-all
          placeholder-gray-500 min-h-[150px]
          dark:bg-neo-midnight-bg dark:text-neo-midnight-text dark:border-neo-midnight-border dark:shadow-neo-sm-midnight
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-2 text-red-600 font-bold bg-white dark:bg-red-900 dark:text-white inline-block border-2 border-neo-black dark:border-red-500 px-2">
          ! {error}
        </p>
      )}
    </div>
  );
};