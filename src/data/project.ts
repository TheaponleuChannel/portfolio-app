import type { Project } from "../models/project";

export const projects: Project[] = [
  {
    id: 1,
    title: 'Analytics Dashboard',
    description: 'A comprehensive analytics dashboard with real-time data visualization, user tracking, and customizable reports.',
    longDescription: 'This analytics dashboard provides businesses with powerful insights through interactive charts and customizable widgets. It features real-time data processing, user behavior tracking, and automated reporting capabilities. The responsive design ensures a seamless experience across all devices.',
    category: 'Dashboard',
    categoryColor: 'primary',
    image: 'https://images.klipfolio.com/website/public/5a275fee-d42b-4f31-91f6-8148d4d729af/executive%20dashboard.png',
    technologies: ['React', 'TypeScript', 'Recharts', 'Node.js', 'MongoDB'],
  },
]