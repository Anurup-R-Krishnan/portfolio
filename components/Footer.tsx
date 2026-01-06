import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/anuruprk", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/anuruprk", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/anuruprk", label: "Twitter" },
    { icon: Mail, href: "mailto:anuruprkrishnan@gmail.com", label: "Email" },
  ];

  return (
    <footer className="mt-20 border-t-4 border-neo-black dark:border-neo-amoled-border bg-neo-yellow dark:bg-neo-amoled-surface transition-colors">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Brand & Connect */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter dark:text-neo-amoled-text">
              Let's <span className="bg-white dark:bg-neo-amoled-surfaceLight px-2 border-2 border-neo-black dark:border-neo-amoled-border">Collaborate</span>
            </h3>
            <p className="font-bold text-lg mb-8 max-w-md dark:text-neo-amoled-muted">
              Currently open for internships and full-stack development opportunities. Reach out if you want to build something cool!
            </p>
            
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative p-4 bg-white dark:bg-neo-amoled-surfaceLight border-4 border-neo-black dark:border-neo-amoled-border shadow-neo-sm dark:shadow-neo-sm-amoled hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                >
                  <Icon size={28} className="group-hover:text-neo-pink transition-colors dark:text-neo-amoled-text" />
                  {/* Tooltip on hover */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neo-black dark:bg-neo-amoled-border text-white text-[10px] font-black px-2 py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Identity & Copyright */}
          <div className="text-center md:text-right flex flex-col justify-center">
            <div className="mb-4">
              <p className="font-black text-4xl uppercase tracking-tighter leading-none mb-1 dark:text-neo-amoled-text">
                Anurup R <span className="text-neo-pink">Krishnan</span>.
              </p>
              <p className="font-bold text-sm uppercase tracking-widest text-gray-700 dark:text-neo-amoled-muted">
                CS Engineer & Systems Enthusiast
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-12 h-1 bg-neo-black dark:bg-neo-amoled-border"></div>
                <p className="text-xs font-black uppercase dark:text-neo-amoled-muted">Built with Code & Caffeine</p>
              </div>
              <p className="text-sm font-black uppercase dark:text-neo-amoled-muted">
                © {currentYear} • All Rights Reserved
              </p>
              <div className="mt-4 flex gap-4 text-[10px] font-black uppercase text-gray-500 underline decoration-2 underline-offset-4 hover:text-neo-black dark:hover:text-white">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Resume</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};