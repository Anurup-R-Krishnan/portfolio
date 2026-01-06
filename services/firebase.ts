import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { Project, Skill, ContactMessage } from '../types';

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Notivos AI',
    description: 'A cross-platform desktop productivity suite integrating Google Gemini API for real-time text summarization and semantic search.',
    longDescription: 'Built a cross-platform desktop application integrating Google Gemini API for real-time text summarization, semantic search, and AI-powered note enhancement. Architected a secure IPC bridge in Electron to ensure safe data transfer. Implemented local SQLite caching layer to enable robust offline functionality.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    tags: ['Electron', 'Node.js', 'Gemini API', 'SQLite'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true
  },
  {
    id: '2',
    title: 'Sanctuary Reader',
    description: 'Modern feature-rich web-based EPUB book reader with cross-device synchronization.',
    longDescription: 'Developed a feature-rich web-based book reader with user authentication, library management, and reading progress synchronization across devices. Integrated epubjs for high-fidelity EPUB rendering with customizable reading experience. Implemented Zustand for efficient state management.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    tags: ['React', 'TypeScript', 'Supabase', 'Tailwind'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true
  },
  {
    id: '3',
    title: 'Load Balancing Sim',
    description: 'Digital Twin simulation framework for Smart Healthcare IoT networks analyzing fog computing latency.',
    longDescription: 'Designed and implemented a Digital Twin simulation framework for Smart Healthcare IoT networks using Python and YAFS. Developed custom load-balancing algorithms achieving 25% reduction in server response time. Containerized simulation environment using Docker.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    tags: ['Python', 'Docker', 'YAFS', 'Matplotlib'],
    githubUrl: 'https://github.com',
    featured: false
  },
  {
    id: '4',
    title: 'CryptoTracker Pro',
    description: 'Real-time cryptocurrency dashboard with sentiment analysis from Twitter data.',
    longDescription: 'A high-frequency trading dashboard visualizing crypto trends. Uses WebSockets for live price updates and NLP for sentiment analysis on social media feeds.',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    tags: ['React', 'WebSockets', 'D3.js', 'Finance'],
    githubUrl: 'https://github.com',
    featured: false
  },
  {
    id: '5',
    title: 'Neo-Brutalism UI Kit',
    description: 'An open-source React component library for brutalist web design.',
    longDescription: 'Published an NPM package containing 30+ accessible, reusable components styled with Tailwind CSS. Includes extensive documentation and Storybook integration.',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    tags: ['React', 'NPM', 'Storybook', 'Design System'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false
  }
];

const MOCK_SKILLS: Skill[] = [
  { id: '1', name: 'C++', category: 'Backend' },
  { id: '2', name: 'Python', category: 'Backend' },
  { id: '4', name: 'TypeScript', category: 'Frontend' },
  { id: '7', name: 'React.js', category: 'Frontend' },
  { id: '11', name: 'Node.js', category: 'Backend' },
  { id: '15', name: 'Docker', category: 'Tools' },
  { id: '19', name: 'Git/GitHub', category: 'Tools' },
  { id: '21', name: 'Figma', category: 'Design' },
];

const getEnv = (key: string) => {
  try { return process.env[key]; } catch (e) { return undefined; }
};

const firebaseConfig = {
  apiKey: getEnv('REACT_APP_FIREBASE_API_KEY'),
  authDomain: getEnv('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('REACT_APP_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('REACT_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('REACT_APP_FIREBASE_APP_ID')
};

const emailJsConfig = {
  serviceId: getEnv('REACT_APP_EMAILJS_SERVICE_ID'),
  templateId: getEnv('REACT_APP_EMAILJS_TEMPLATE_ID'),
  publicKey: getEnv('REACT_APP_EMAILJS_PUBLIC_KEY'),
};

const isFirebaseConfigured = !!firebaseConfig.apiKey;
const isEmailJsConfigured = !!emailJsConfig.publicKey;

let db: any;
if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export const getProjects = async (): Promise<Project[]> => {
  if (!isFirebaseConfigured) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_PROJECTS;
  }
  try {
    const q = query(collection(db, 'projects'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  } catch (error) {
    return MOCK_PROJECTS;
  }
};

export const getSkills = async (): Promise<Skill[]> => {
  if (!isFirebaseConfigured) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_SKILLS;
  }
  try {
    const q = query(collection(db, 'skills'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Skill));
  } catch (error) {
    return MOCK_SKILLS;
  }
};

export const submitContactForm = async (data: Omit<ContactMessage, 'createdAt'>): Promise<boolean> => {
  // 1. Log to Firestore if available
  if (isFirebaseConfigured) {
    try {
      await addDoc(collection(db, 'messages'), {
        ...data,
        createdAt: Timestamp.now()
      });
    } catch (error) {
      console.error("Firestore submission failed", error);
    }
  }

  // 2. Real Email Sending using EmailJS
  if (isEmailJsConfigured) {
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        to_email: 'anuruprkrishnan@gmail.com',
      };

      await emailjs.send(
        emailJsConfig.serviceId!,
        emailJsConfig.templateId!,
        templateParams,
        emailJsConfig.publicKey!
      );
      return true;
    } catch (error) {
      console.error("EmailJS submission failed", error);
      return false;
    }
  }

  // 3. Fallback for testing/unconfigured state
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.warn("Contact form submitted (MOCK/FIREBASE ONLY). To enable real emails, configure EmailJS environment variables.");
  console.log("Data received:", data);
  return true;
};