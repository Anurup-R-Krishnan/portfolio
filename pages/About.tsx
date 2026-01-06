
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Download,
  Terminal,
  Code,
  GitBranch,
  Cpu,
  Database,
  Server,
  Cloud,
  Monitor,
  Palette,
  Layout,
  Layers,
  Globe,
  Smartphone,
  Zap,
  Box
} from 'lucide-react';
import { getSkills } from '../services/firebase';
import { Skill } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { useToast } from '../context/ToastContext';

// Helper to map skill names/categories to icons for better visual representation
const getSkillIcon = (skillName: string) => {
  const name = skillName.toLowerCase();
  if (name.includes('react') || name.includes('next') || name.includes('tailwind')) return <Layout size={18} />;
  if (name.includes('jetpack') || name.includes('compose') || name.includes('mobile')) return <Smartphone size={18} />;
  if (name.includes('node') || name.includes('express') || name.includes('fastapi') || name.includes('spring')) return <Server size={18} />;
  if (name.includes('python') || name.includes('c++') || name.includes('java') || name.includes('go')) return <Terminal size={18} />;
  if (name.includes('aws') || name.includes('cloud') || name.includes('docker')) return <Cloud size={18} />;
  if (name.includes('postgres') || name.includes('sql') || name.includes('redis') || name.includes('mongo')) return <Database size={18} />;
  if (name.includes('figma') || name.includes('design') || name.includes('blender')) return <Palette size={18} />;
  if (name.includes('git') || name.includes('github')) return <GitBranch size={18} />;
  if (name.includes('typescript') || name.includes('javascript')) return <Code size={18} />;
  if (name.includes('redis') || name.includes('kafka')) return <Zap size={18} />;
  return <Box size={18} />; // Default generic icon
};

const About: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [codeText, setCodeText] = useState('');
  const { showToast } = useToast();

  const finalCode = `const developer = {
  name: "Anurup",
  role: "Student",
  focus: ["Web", "AI"],
  coffee: true,
  status: "Building things"
};`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCodeText(finalCode.substring(0, i));
      i++;
      if (i > finalCode.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [finalCode]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch (error) {
        console.error("Failed to fetch skills", error);
        showToast("Failed to load skills", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [showToast]);

  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    (acc[category] = acc[category] || []).push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Helmet>
        <title>About | Anurup R Krishnan</title>
        <meta name="description" content="About Anurup R Krishnan - Education, Skills and Experience." />
      </Helmet>

      <div className="py-12">
        {/* HERO PROFILE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-neo-black translate-x-4 translate-y-4"></div>
              <div className="relative border-4 border-neo-black bg-neo-yellow p-1">
                <img
                  src="https://picsum.photos/600/800?grayscale"
                  alt="Anurup R Krishnan"
                  loading="lazy"
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>

            {/* Code Decoration Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-neo-black p-4 border-4 border-gray-500 shadow-neo min-h-[160px]"
            >
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="font-mono text-sm text-neo-green whitespace-pre font-bold leading-relaxed overflow-hidden">
                {codeText}
                <span className="animate-pulse inline-block w-2 h-4 bg-neo-green align-middle ml-1"></span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black uppercase mb-8"
            >
              Who Am <span className="text-white bg-neo-black px-2">I?</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg text-black max-w-none space-y-6"
            >
              <p className="text-xl font-bold">
                I'm Anurup R Krishnan, a Computer Science student with a focus on Distributed Systems and High-Performance Applications.
              </p>
              <p>
                Currently pursuing my B.Tech at Amrita Vishwa Vidyapeetham, I specialize in architecting scalable solutions and exploring the intersections of cloud infrastructure and modern web technologies. I believe in software that is not only powerful but also aesthetically striking and user-centric.
              </p>
              <p>
                My work often involves bridging the gap between low-level system performance and high-level abstract interfaces. I'm a lifelong learner, always eager to tackle complex technical challenges that push the boundaries of what's possible on the web.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                variant="accent"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/resume.pdf';
                  link.download = 'Anurup_Krishnan_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  showToast("Resume download started...", "info");
                }}
              >
                <Download className="mr-2" size={20} /> Download Resume
              </Button>
              <Button variant="outline" to="/contact">
                Get in touch
              </Button>
            </motion.div>
          </div>
        </div>

        {/* TIMELINE SECTION */}
        <div className="mb-20">
          <h2 className="text-4xl font-black uppercase mb-8 bg-neo-pink inline-block px-2 border-2 border-neo-black">
            The Journey
          </h2>
          <div className="space-y-8 border-l-4 border-neo-black ml-4 pl-8 py-2 relative">
            <div className="relative">
              <div className="absolute -left-[42px] top-2 w-6 h-6 bg-neo-blue border-4 border-neo-black rounded-full"></div>
              <Card className="p-6" tilt>
                <span className="inline-block bg-neo-black text-white px-2 py-1 text-sm font-bold mb-2">May 2025 - June 2025</span>
                <h3 className="text-2xl font-bold">Research Intern (CGSE)</h3>
                <p className="font-bold text-gray-600 mb-2">Indian Space Research Organisation (ISRO)</p>
                <p>Engineered optimal thresholding algorithms for telemetry signal processing, achieving significant noise reduction and performance gains.</p>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -left-[42px] top-2 w-6 h-6 bg-neo-yellow border-4 border-neo-black rounded-full"></div>
              <Card className="p-6" tilt>
                <span className="inline-block bg-neo-black text-white px-2 py-1 text-sm font-bold mb-2">2023 - 2027</span>
                <h3 className="text-2xl font-bold">B.Tech in Computer Science</h3>
                <p className="font-bold text-gray-600 mb-2">Amrita Vishwa Vidyapeetham, Coimbatore</p>
                <p>Focusing on System Design, AI/ML, and Full-Stack Development with a current CGPA of 7.78/10.0.</p>
              </Card>
            </div>
          </div>
        </div>

        {/* SKILLS SECTION */}
        <div className="mb-20">
          <h2 className="text-4xl font-black uppercase mb-8 bg-neo-green inline-block px-2 border-2 border-neo-black">
            Technical Skills
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              {Object.entries(groupedSkills).map(([category, items]) => (
                <motion.div key={category} variants={itemVariants}>
                  <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                    <div className="w-3 h-8 bg-neo-black"></div>
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {/* Fixed property 'map' does not exist on type 'unknown' by casting items to Skill[] array */}
                    {(items as Skill[]).map((skill) => (
                      <div
                        key={skill.id}
                        className="group flex items-center gap-2 bg-white border-4 border-neo-black px-4 py-2 font-bold shadow-neo-sm hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-default"
                      >
                        <span className="text-neo-pink group-hover:scale-110 transition-transform">
                          {getSkillIcon(skill.name)}
                        </span>
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default About;
