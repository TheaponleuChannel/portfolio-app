export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  categoryColor: string;
  image: string;
  technologies: string[];
  features?: string[];
  demoUrl?: string;
  githubUrl?: string;
  screenshots?: string[];
  detailComponent?: string;
}