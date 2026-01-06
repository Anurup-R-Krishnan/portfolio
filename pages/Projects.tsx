import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Archive } from 'lucide-react';
import { getProjects } from '../services/firebase';
import { Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { Skeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter Logic
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))];
  const displayTags = allTags.slice(0, 7); 
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.tags.includes(filter));
  
  // Separate Featured vs Standard projects
  const featuredProject = projects.find(p => p.featured);
  const gridProjects = filteredProjects.filter(p => p.id !== featuredProject?.id);

  // Archive projects
  const archiveProjects = [
    { year: '2023', title: 'Portfolio v1', builtWith: 'HTML/CSS', link: '#' },
    { year: '2023', title: 'Weather App', builtWith: 'React API', link: '#' },
    { year: '2022', title: 'Snake Game', builtWith: 'Python', link: '#' },
    { year: '2022', title: 'Calculator', builtWith: 'JavaScript', link: '#' },
  ];

  return (
    <>
      <Helmet>
        <title>Projects | Anurup R Krishnan</title>
        <meta name="description" content="Showcase of my development projects." />
      </Helmet>

      <div className="py-12">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 dark:text-neo-amoled-text">
             My <span className="text-neo-pink">Work</span>
          </h1>
          <p className="text-xl font-medium max-w-2xl mx-auto dark:text-neo-amoled-muted">
             A collection of experiments, production apps, and sleepless nights.
          </p>
        </motion.div>

        {/* SPOTLIGHT SECTION */}
        {!loading && featuredProject && filter === 'All' && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="mb-20"
           >
              <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-2 dark:text-neo-amoled-text">
                 <span className="bg-neo-yellow text-black px-2 border-2 border-neo-black dark:border-neo-amoled-border">Spotlight</span> Project
              </h2>
              <div className="border-4 border-neo-black dark:border-neo-amoled-border bg-white dark:bg-neo-amoled-surface shadow-neo-lg dark:shadow-neo-lg-amoled flex flex-col lg:flex-row overflow-hidden">
                  <div className="lg:w-3/5 border-b-4 lg:border-b-0 lg:border-r-4 border-neo-black dark:border-neo-amoled-border min-h-[400px]">
                      <img 
                        src={featuredProject.imageUrl} 
                        alt={featuredProject.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 opacity-80 hover:opacity-100"
                      />
                  </div>
                  <div className="lg:w-2/5 p-8 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                          {featuredProject.tags.map(tag => (
                             <span key={tag} className="text-xs font-bold uppercase bg-neo-black text-white px-2 py-1 dark:bg-neo-amoled-bg dark:text-neo-amoled-muted border dark:border-neo-amoled-border">{tag}</span>
                          ))}
                      </div>
                      <h3 className="text-4xl lg:text-5xl font-black uppercase mb-4 leading-none dark:text-neo-amoled-text">{featuredProject.title}</h3>
                      <p className="text-lg text-gray-700 dark:text-neo-amoled-muted mb-8 font-medium leading-relaxed">
                          {featuredProject.longDescription || featuredProject.description}
                      </p>
                      <div className="flex gap-4 mt-auto">
                          {featuredProject.liveUrl && (
                             <Button to={featuredProject.liveUrl} external variant="primary" className="flex-1">
                                Visit Site <ArrowRight size={20} className="ml-2" />
                             </Button>
                          )}
                          {featuredProject.githubUrl && (
                             <Button to={featuredProject.githubUrl} external variant="outline">
                                <Github size={20} />
                             </Button>
                          )}
                      </div>
                  </div>
              </div>
           </motion.div>
        )}

        {/* Filter Bar */}
        <div className="sticky top-20 z-40 bg-gray-100/80 dark:bg-neo-amoled-bg/80 backdrop-blur py-4 border-y-4 border-neo-black dark:border-neo-amoled-border mb-12 -mx-4 px-4 md:-mx-8 md:px-8">
          <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
            {displayTags.map(tag => {
              const isSelected = filter === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`
                    px-4 py-1 font-bold uppercase border-2 border-neo-black dark:border-neo-amoled-border text-sm transition-all
                    ${isSelected 
                       ? 'bg-neo-black text-white dark:bg-neo-accent dark:text-white shadow-none translate-x-[2px] translate-y-[2px]' 
                       : 'bg-white text-black dark:text-neo-amoled-text dark:bg-neo-amoled-surface shadow-neo-sm dark:shadow-neo-sm-amoled hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-neo-blue'}
                  `}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* PROJECTS GRID */}
        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                 <div key={i} className="border-4 border-neo-black dark:border-neo-amoled-border p-6 bg-white dark:bg-neo-amoled-surface h-full flex flex-col gap-4">
                    <Skeleton className="h-48 w-full border-2 border-neo-black dark:border-neo-amoled-border" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                 </div>
              ))}
           </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr mb-20"
          >
            <AnimatePresence mode="popLayout">
              {gridProjects.map((project, index) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 20,
                    delay: index * 0.05 
                  }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ARCHIVE SECTION (TABLE) */}
        <div className="mt-32">
            <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-4 dark:text-neo-amoled-text">
               <Archive size={32} />
               From The Archive
            </h2>
            <div className="overflow-x-auto border-4 border-neo-black dark:border-neo-amoled-border shadow-neo dark:shadow-neo-amoled bg-white dark:bg-neo-amoled-surface">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-neo-black text-white dark:bg-neo-amoled-bg dark:text-neo-amoled-muted uppercase text-sm">
                        <th className="p-4 border-r-2 border-gray-700 dark:border-neo-amoled-border">Year</th>
                        <th className="p-4 border-r-2 border-gray-700 dark:border-neo-amoled-border">Project</th>
                        <th className="p-4 border-r-2 border-gray-700 dark:border-neo-amoled-border hidden md:table-cell">Built With</th>
                        <th className="p-4">Link</th>
                     </tr>
                  </thead>
                  <tbody>
                     {archiveProjects.map((proj, i) => (
                        <tr key={i} className="border-b-2 border-neo-black dark:border-neo-amoled-border hover:bg-neo-yellow dark:hover:bg-neo-amoled-surfaceLight transition-colors group">
                           <td className="p-4 border-r-2 border-neo-black dark:border-neo-amoled-border font-black text-neo-pink dark:text-neo-amoled-muted group-hover:text-black dark:group-hover:text-neo-pink">
                             {proj.year}
                           </td>
                           <td className="p-4 border-r-2 border-neo-black dark:border-neo-amoled-border text-lg font-black uppercase tracking-tight text-neo-black dark:text-neo-amoled-text group-hover:text-black dark:group-hover:text-white">
                             {proj.title}
                           </td>
                           <td className="p-4 border-r-2 border-neo-black dark:border-neo-amoled-border hidden md:table-cell">
                               <span className="bg-neo-green text-black border-2 border-neo-black dark:border-neo-amoled-border px-2 py-0.5 text-xs font-black uppercase shadow-neo-sm group-hover:shadow-none dark:bg-neo-amoled-bg dark:text-neo-amoled-muted">
                                 {proj.builtWith}
                               </span>
                           </td>
                           <td className="p-4">
                              <a href={proj.link} className="flex items-center text-neo-black dark:text-neo-amoled-muted hover:text-neo-pink dark:hover:text-neo-pink transition-colors">
                                 <ExternalLink size={20} className="stroke-[3px]" />
                              </a>
                           </td>
                        </tr>
                     ))}
                     {/* Placeholder Row */}
                     <tr className="border-b-2 border-neo-black dark:border-neo-amoled-border bg-gray-50 dark:bg-transparent text-gray-400 italic">
                        <td className="p-4 border-r-2 border-neo-black dark:border-neo-amoled-border">2021</td>
                        <td className="p-4 border-r-2 border-neo-black dark:border-neo-amoled-border">More coming soon...</td>
                        <td className="p-4 border-r-2 border-neo-black dark:border-neo-amoled-border hidden md:table-cell">-</td>
                        <td className="p-4">-</td>
                     </tr>
                  </tbody>
               </table>
            </div>
        </div>

      </div>
    </>
  );
};

export default Projects;