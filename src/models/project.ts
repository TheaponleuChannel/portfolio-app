export interface ProjectOverview {
  about?: string;
  developmentProcess?: string;
  challenges?: string;
}

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
  liveUrl?: string;
  screenshots?: string[];
  detailComponent?: string;
  overview?: ProjectOverview;
}