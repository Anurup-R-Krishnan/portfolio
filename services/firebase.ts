import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { Project, Skill, ContactMessage } from '../types';
import { PORTFOLIO_PROJECTS, PORTFOLIO_SKILLS } from '../data/portfolio';

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
    return PORTFOLIO_PROJECTS;
  }
  try {
    const q = query(collection(db, 'projects'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return PORTFOLIO_PROJECTS;
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  } catch (error) {
    console.error("Failed to fetch projects from Firebase. Falling back to verified portfolio data.", error);
    return PORTFOLIO_PROJECTS;
  }
};

export const getSkills = async (): Promise<Skill[]> => {
  if (!isFirebaseConfigured) {
    return PORTFOLIO_SKILLS;
  }
  try {
    const q = query(collection(db, 'skills'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Skill));
  } catch (error) {
    return PORTFOLIO_SKILLS;
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
  console.warn("Contact form submitted (MOCK/FIREBASE ONLY). To enable real emails, configure EmailJS environment variables.");
  console.log("Data received:", data);
  return true;
};
