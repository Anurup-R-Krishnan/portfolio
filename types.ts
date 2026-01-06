export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
  icon?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export interface NavigationItem {
  label: string;
  path: string;
}