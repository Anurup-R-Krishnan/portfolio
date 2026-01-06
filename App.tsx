
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastProvider, useToast } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Cursor } from './components/ui/Cursor';
import { TransitionLayout } from './components/TransitionLayout';
import { ShortcutsModal } from './components/ShortcutsModal';
import { ScrollProgress } from './components/ScrollProgress';
import { CommandPalette } from './components/CommandPalette';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import { useKonamiCode } from './hooks/useKonamiCode';

// Lazy loading pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center h-[50vh]">
    <div className="animate-spin h-16 w-16 border-8 border-neo-black border-t-neo-pink rounded-full"></div>
  </div>
);

// Define interfaces for ErrorBoundary
interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * ErrorBoundary component to catch errors in child components during rendering.
 * Explicitly using React.Component to ensure props and state inheritance is correctly typed.
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Initialize state using a class field
  public state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_error: any): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    // Accessing state which is inherited from React.Component
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8">
           <h2 className="text-2xl font-bold mb-4 dark:text-white">Something went wrong.</h2>
           <button 
             onClick={() => window.location.reload()}
             className="px-6 py-2 bg-neo-yellow border-4 border-neo-black font-bold uppercase shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
           >
             Reload Page
           </button>
        </div>
      );
    }

    // Accessing props which is inherited from React.Component
    return this.props.children;
  }
}

const GlobalLogic = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const konamiTriggered = useKonamiCode();
  const { showToast } = useToast();

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Dynamic Tab Title
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come back! 💔";
      } else {
        document.title = "Anurup R Krishnan | Portfolio";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      switch(e.key.toLowerCase()) {
        case 'h': navigate('/'); break;
        case 'a': navigate('/about'); break;
        case 'p': navigate('/projects'); break;
        case 'c': navigate('/contact'); break;
        case '?': setShowShortcuts(prev => !prev); break;
        case 'escape': setShowShortcuts(false); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Konami Code Effect
  useEffect(() => {
    if (konamiTriggered) {
      document.body.style.transform = "rotate(180deg)";
      document.body.style.transition = "transform 1s ease";
      showToast("🦄 GOD MODE ENABLED", "success");
      
      setTimeout(() => {
         document.body.style.transform = "";
         showToast("Normalcy restored...", "info");
      }, 5000);
    }
  }, [konamiTriggered, showToast]);

  return (
    <AnimatePresence>
      {showShortcuts && <ShortcutsModal onClose={() => setShowShortcuts(false)} />}
    </AnimatePresence>
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <TransitionLayout>
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            </ErrorBoundary>
          </TransitionLayout>
        } />
        <Route path="/about" element={
          <TransitionLayout>
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            </ErrorBoundary>
          </TransitionLayout>
        } />
        <Route path="/projects" element={
          <TransitionLayout>
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <Projects />
              </Suspense>
            </ErrorBoundary>
          </TransitionLayout>
        } />
        <Route path="/contact" element={
          <TransitionLayout>
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            </ErrorBoundary>
          </TransitionLayout>
        } />
        <Route path="*" element={
          <TransitionLayout>
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            </ErrorBoundary>
          </TransitionLayout>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Router>
        <NoiseOverlay />
        <ScrollProgress />
        <CommandPalette />
        <Cursor />
        <GlobalLogic />
        <div className="min-h-screen flex flex-col bg-transparent text-neo-black dark:text-white font-sans transition-colors">
          <Navbar />
          <main className="flex-grow pt-20 px-4 md:px-8 container mx-auto max-w-6xl">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ToastProvider>
  );
};

export default App;
