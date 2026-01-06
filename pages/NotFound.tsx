import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 | Anurup R Krishnan</title>
      </Helmet>
      
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ rotate: -5, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-neo-pink border-4 border-neo-black p-12 shadow-neo-lg mb-8"
        >
          <h1 className="text-9xl font-black">404</h1>
        </motion.div>
        
        <h2 className="text-4xl font-bold uppercase mb-4">Page Not Found</h2>
        <p className="text-xl mb-8 font-medium">The page you are looking for has been moved or deleted.</p>
        
        <Button to="/" variant="primary">
          Back to Home
        </Button>
      </div>
    </>
  );
};

export default NotFound;