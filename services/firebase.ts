import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { Project, Skill, ContactMessage } from '../types';

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Notivos AI',
    description: 'Smart desktop note-taking app with AI-powered summarization and search.',
    longDescription: 'A cross-platform desktop application built with Electron.js that integrates Google Gemini API for real-time text summarization, semantic search, and AI-powered note enhancement. Features local SQLite caching for offline capability and text-to-speech support.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    tags: ['Electron', 'JavaScript', 'Gemini API', 'SQLite'],
    githubUrl: 'https://github.com/Anurup-R-Krishnan/Notivos-AI',
    featured: true
  },
  {
    id: '2',
    title: 'SecureMed',
    description: 'Secure healthcare data management API built with Spring Boot.',
    longDescription: 'A robust backend system for managing sensitive medical records securely. Implements role-based access control (RBAC), data encryption, and HIPAA-compliant architecture using Java Spring Boot and Maven.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    tags: ['Java', 'Spring Boot', 'Maven', 'Security'],
    githubUrl: 'https://github.com/Anurup-R-Krishnan/SecureMed',
    featured: true
  },
  {
    id: '3',
    title: 'FocusBoard',
    description: 'Productivity and task management dashboard for focused work sessions.',
    longDescription: 'A comprehensive task agility board designed to enhance productivity. Features include drag-and-drop task management, pomodoro timer integration, and distraction-free modes.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    tags: ['React', 'TypeScript', 'Productivity', 'Tailwind'],
    githubUrl: 'https://github.com/Anurup-R-Krishnan/FocusBoard',
    featured: true
  },
  {
    id: '4',
    title: 'Link-Us',
    description: 'Python-based social networking platform for connection.',
    longDescription: 'A comprehensive social networking system allowing users to connect, share posts, and interact through messaging. Includes friend recommendation algorithms and user profile management.',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    tags: ['Python', 'Social Network', 'Backend'],
    githubUrl: 'https://github.com/Anurup-R-Krishnan/Link-Us',
    featured: false
  },
  {
    id: '5',
    title: 'ARIMA Sales Forecasting',
    description: 'Statistical sales prediction model using ARIMA algorithm.',
    longDescription: 'Implementation of the AutoRegressive Integrated Moving Average (ARIMA) model to predict future sales trends based on historical dataset analysis. Useful for demand planning and inventory management.',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    tags: ['Python', 'Data Science', 'ARIMA', 'Forecasting'],
    githubUrl: 'https://github.com/Anurup-R-Krishnan/ARIMA-Sales-Forecasting-',
    featured: false
  },
  {
    id: '6',
    title: 'AutoRE',
    description: 'Relationship Extraction system for unstructured text analysis.',
    longDescription: 'A Natural Language Processing project focused on identifying and classifying relationships between entities in unstructured text data. Essential for knowledge graph construction.',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    tags: ['Python', 'NLP', 'AI', 'Machine Learning'],
    githubUrl: 'https://github.com/Anurup-R-Krishnan/AutoRE',
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