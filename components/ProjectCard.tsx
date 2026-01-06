import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, ZoomIn } from 'lucide-react';
import { Project } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <Card hoverEffect className="h-full flex flex-col justify-between" color="white">
        <div>
          <div className="border-2 border-neo-black mb-4 overflow-hidden h-48 bg-gray-200">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h3 className="text-2xl font-bold mb-2 uppercase">{project.title}</h3>
          <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-neo-yellow border-2 border-neo-black px-2 py-0.5 text-xs font-bold uppercase">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
               <span className="bg-gray-100 border-2 border-neo-black px-2 py-0.5 text-xs font-bold">
               +{project.tags.length - 3}
             </span>
            )}
          </div>
        </div>
        <Button variant="outline" onClick={() => setIsModalOpen(true)} className="w-full">
          View Details
        </Button>
      </Card>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-neo-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-2xl bg-white border-4 border-neo-black shadow-[16px_16px_0px_0px_rgba(255,255,255,0.2)] max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 flex justify-end p-2 bg-white/90 backdrop-blur z-10 border-b-2 border-neo-black">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-red-500 hover:text-white transition-colors border-2 border-transparent hover:border-neo-black"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="border-4 border-neo-black mb-6 group relative cursor-zoom-in overflow-hidden" onClick={() => setIsZoomed(true)}>
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    loading="lazy"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="bg-white border-2 border-neo-black p-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                       <ZoomIn size={24} />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-4xl font-bold uppercase mb-4">{project.title}</h2>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-neo-blue border-2 border-neo-black px-3 py-1 text-sm font-bold uppercase">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-lg leading-relaxed mb-8">
                  {project.longDescription || project.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  {project.githubUrl && (
                    <Button to={project.githubUrl} external variant="secondary">
                      <Github className="mr-2" size={20} /> View Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button to={project.liveUrl} external variant="primary">
                      <ExternalLink className="mr-2" size={20} /> Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Zoom */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-full max-h-screen border-4 border-white shadow-neo-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};