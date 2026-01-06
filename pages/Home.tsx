import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Marquee } from '../components/Marquee';
import { GlitchText } from '../components/ui/GlitchText';

const Home: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "Engineering Scalable Solutions";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Anurup R Krishnan</title>
        <meta name="description" content="Portfolio of Anurup R Krishnan - Full Stack Engineer" />
      </Helmet>

      {/* Decorative Floating Shapes */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <motion.div
          animate={{ rotate: 360, y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-10 w-16 h-16 border-4 border-neo-black dark:border-neo-amoled-border bg-neo-yellow dark:bg-neo-amoled-surface"
        />
        <motion.div
          animate={{ rotate: -360, x: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 right-10 w-24 h-24 rounded-full border-4 border-neo-black dark:border-neo-amoled-border bg-neo-pink dark:bg-neo-amoled-surface"
        />
        <motion.div
          animate={{ rotate: 180, y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-1/4 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-neo-blue dark:border-b-neo-amoled-surface"
        />
      </div>

      <section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between py-12 md:py-20 gap-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2"
        >
          <span className="inline-block px-4 py-2 bg-neo-green dark:bg-neo-amoled-surface border-2 border-neo-black dark:border-neo-amoled-border font-bold uppercase mb-6 shadow-neo-sm dark:shadow-neo-sm-amoled dark:text-neo-amoled-text">
            Full Stack Engineer
          </span>

          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black uppercase leading-tight mb-8 dark:text-neo-amoled-text w-full text-center md:text-left">
            I'm <GlitchText text="Anurup" as="span" className="text-neo-blue" />.<br />
            <span className="bg-neo-yellow dark:bg-neo-amoled-surface px-2 inline-block transform -rotate-2 border-x-4 border-neo-black dark:border-neo-amoled-border min-h-[1.2em] max-w-full">
              {text}<span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl font-medium max-w-2xl mb-10 leading-relaxed border-l-8 border-neo-pink pl-6 dark:text-neo-amoled-muted">
            Specializing in distributed systems, high-performance cloud infrastructure, and AI-powered applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start w-full">
            <Button to="/projects" variant="primary" className="text-xl px-8 py-4">
              View Work <ArrowRight className="ml-2 inline" />
            </Button>
            <Button to="/contact" variant="outline" className="text-xl px-8 py-4">
              Contact Me
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-neo-black dark:bg-neo-amoled-border translate-x-4 translate-y-4"></div>
            <div className="relative border-4 border-neo-black dark:border-neo-amoled-border bg-neo-orange dark:bg-neo-amoled-surface p-1 w-full h-full overflow-hidden">
              <img
                src="https://picsum.photos/600/600?grayscale"
                alt="Anurup R Krishnan"
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <div className="-mx-4 md:-mx-8 mb-20 transform rotate-1 hover:rotate-0 transition-transform duration-300">
        <Marquee items={["React", "Node.js", "System Design", "Cloud Native", "AI/ML"]} />
      </div>

      {/* Featured Preview Section */}
      <section className="py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black uppercase dark:text-neo-amoled-text">
            <span className="bg-neo-blue dark:bg-neo-amoled-surface px-2 border-2 border-neo-black dark:border-neo-amoled-border">Selected</span> Projects
          </h2>
          <Button to="/projects" variant="secondary" className="hidden md:inline-flex text-sm">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card color="white" hoverEffect tilt>
            <div className="aspect-video bg-gray-200 dark:bg-neo-amoled-bg border-2 border-neo-black dark:border-neo-amoled-border mb-4 overflow-hidden">
              <img src="https://picsum.photos/800/600?random=10" loading="lazy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100" alt="Notivos AI" />
            </div>
            <h3 className="text-2xl font-bold uppercase dark:text-neo-amoled-text">Notivos AI</h3>
            <p className="mt-2 text-gray-700 dark:text-neo-amoled-muted">Desktop suite with Gemini API for real-time summarization.</p>
            <div className="mt-4 flex gap-2">
              <span className="text-xs font-bold border-2 border-neo-black dark:border-neo-amoled-border px-2 py-0.5 bg-white dark:bg-neo-amoled-surfaceLight dark:text-neo-amoled-muted">Electron</span>
              <span className="text-xs font-bold border-2 border-neo-black dark:border-neo-amoled-border px-2 py-0.5 bg-white dark:bg-neo-amoled-surfaceLight dark:text-neo-amoled-muted">Node.js</span>
            </div>
          </Card>
          <Card color="white" hoverEffect tilt>
            <div className="aspect-video bg-gray-200 dark:bg-neo-amoled-bg border-2 border-neo-black dark:border-neo-amoled-border mb-4 overflow-hidden">
              <img src="https://picsum.photos/800/600?random=11" loading="lazy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100" alt="Sanctuary" />
            </div>
            <h3 className="text-2xl font-bold uppercase dark:text-neo-amoled-text">Sanctuary</h3>
            <p className="mt-2 text-black dark:text-neo-amoled-muted">Modern EPUB reader with cloud synchronization.</p>
            <div className="mt-4 flex gap-2">
              <span className="text-xs font-bold border-2 border-neo-black dark:border-neo-amoled-border px-2 py-0.5 bg-white dark:bg-neo-amoled-surfaceLight dark:text-neo-amoled-muted">React</span>
              <span className="text-xs font-bold border-2 border-neo-black dark:border-neo-amoled-border px-2 py-0.5 bg-white dark:bg-neo-amoled-surfaceLight dark:text-neo-amoled-muted">Supabase</span>
            </div>
          </Card>
        </div>

        <div className="mt-8 md:hidden">
          <Button to="/projects" variant="secondary" className="w-full">View All Projects</Button>
        </div>
      </section>
    </>
  );
};

export default Home;