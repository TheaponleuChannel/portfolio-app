import type { ContactInfo } from "../models/contact-information";
import type { ExperienceTimeLine } from "../models/experience-time-line";
import type { Project } from "../models/project";
import type { Resource, ResourceCategory } from "../models/resource";
import type { Skill } from "../models/skill";

export const projects: Project[] = [
  // {
  //   id: 1,
  //   title: 'Analytics Dashboard',
  //   description: 'A comprehensive analytics dashboard with real-time data visualization, user tracking, and customizable reports.',
  //   longDescription: 'This analytics dashboard provides businesses with powerful insights through interactive charts and customizable widgets. It features real-time data processing, user behavior tracking, and automated reporting capabilities. The responsive design ensures a seamless experience across all devices.',
  //   category: 'Web portal',
  //   categoryColor: 'primary',
  //   image: 'https://images.klipfolio.com/website/public/5a275fee-d42b-4f31-91f6-8148d4d729af/executive%20dashboard.png',
  //   technologies: ['React', 'TypeScript', 'Recharts', 'Node.js', 'MongoDB'],
  // },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'A modern, responsive developer portfolio built to showcase my projects, technical skills, experience, and achievements. Designed with performance, clean UI, and a seamless user experience in mind.',
    longDescription: 'A personal portfolio website that represents my journey as a software developer, featuring selected projects, technical expertise, professional experience, and ways to connect with me. The portfolio is designed with a modern and minimal user interface while focusing on speed, responsiveness, and accessibility. It serves as both a professional resume and a showcase of real-world applications I have built using modern web technologies.',
    category: 'Website',
    categoryColor: 'primary',
    liveUrl: 'https://theaponleu.dev/home',
    image: '/photo/portfolio.png',
    features: ['Project showcase with live demos', 'Dark mode with persistent theme', 'Scroll-reveal animations', 'Responsive across all devices', 'Tech stack visualization marquee', 'Contact form integration'],
    screenshots: ['/photo/portfolio.png', '/photo/home-page.png'],
    overview: {
      about: 'A personal portfolio website that represents my journey as a software developer, featuring selected projects, technical expertise, professional experience, and ways to connect with me. The portfolio is designed with a modern and minimal user interface while focusing on speed, responsiveness, and accessibility. It serves as both a professional resume and a showcase of real-world applications I have built using modern web technologies.',
      developmentProcess: 'The development process began with planning the information architecture and wireframing the key pages. I chose Vue.js for its simplicity and PrimeVue for a polished component library. I focused on responsive design, dark mode support, and smooth scroll-reveal animations to create a premium feel. The backend uses Express and MongoDB for blog content and contact form handling.',
      challenges: 'One of the main challenges was implementing a seamless dark mode toggle that persists across sessions while keeping all components visually consistent. I solved this by using CSS custom properties and a scoped class strategy. Another challenge was optimizing image loading and scroll performance on mobile devices, which I addressed with lazy loading, IntersectionObserver-based animations, and responsive image techniques.',
    },
    technologies: ['Vue', 'TypeScript', 'PrimeVue', 'Express', 'MongoDB'],
  },
]

export const frontendSkills: Skill[] = [
  { name: 'Angular', level: 85, icon: 'icons/angular.png', color: '#f12962' },
  { name: 'Vue.js', level: 50, icon: 'icons/vue.png', color: '#0ec968' },
  { name: 'React', level: 20, icon: 'icons/react.png', color: '#3665eb' },
  { name: 'JavaScript', level: 95, icon: 'icons/javaScript.png', color: '#f1aa36' },
  { name: 'TypeScript', level: 85, icon: 'icons/typescript.png', color: '#3665eb' },
  { name: 'HTML/CSS', level: 90, icon: 'icons/html.png', color: '#f12962' },
]

export const backendSkills: Skill[] = [
  { name: 'Node.js', level: 50, icon: 'icons/nodejs.png', color: '#0ec968' },
  { name: 'Express', level: 50, icon: 'icons/express-js.png', color: '#71717a' },
  { name: 'MongoDB', level: 50, icon: 'icons/mongodb.png', color: '#0ec968' },
  { name: 'PostgreSQL', level: 5, icon: 'icons/postgre.png', color: '#3665eb' },
  { name: 'GraphQL', level: 5, icon: 'icons/graphql.png', color: '#984bd0' },
  { name: 'Docker', level: 50, icon: 'icons/docker.png', color: '#3665eb' },
]

export const experienceTimeLine: ExperienceTimeLine[] = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'Ecoinsoft Solution co.,ltd.',
    period: '01 August 2024 - Present',
    description: 'Trained and mentored new developers, guiding them on best practices, coding standards, and project workflows. Led multiple projects from planning to deployment, ensuring timely delivery and high-quality outcomes. Research new technologies on trending such as vue, react and research Backend development such as nodejs, express and mongoDB.',
    skills: ['Project Management', 'Project Leader', 'Problem Solving', 'Time Management', 'Teamwork Communication', 'Mentoring', 'Vuejs', 'Reactjs','Nodejs', 'Express'],
    icon: 'pi pi-code',
    backgroundColor: '#5b80f1'
  },
  {
    id: 2,
    role: 'Junior Frontend Developer',
    company: 'Ecoinsoft Solution co.,ltd.',
    period: '01 September 2024 - 01 August 2024',
    description: ' Developed an interactive dashboard to visualize key metrics and improve data-driven decision-making. Implemented complex data calculations for financial/statistical/operational reporting. Collaborated closely with cross-functional teams, ensuring clear communication and smooth project execution. Maintained strong communication with the backend team to ensure seamless API integration and efficient data flow. Enhanced application functionalities, including pagination, filtering, sorting, and user-friendly UI components. Optimized code for performance, scalability, and maintainability.',
    skills: ['Angular Feature', 'Version Control', 'Communication','Project Structure, ClickUp'],
    icon: 'pi pi-globe',
    backgroundColor: '#edaf43'
  },
    {
    id: 3,
    role: 'Internship Frontend Developer',
    company: 'Ecoinsoft Solution co.,ltd.',
    period: '23 February 2023 - 01 September 2023',
    description: 'Explored about HTMl CSS and JavaScript . I learnt how to make responsive website and how to embed JavaScript to HTML and how website work.Explored about Angular framework with it’s feature such as component, module, routing, services, data binding, directive and more. Explored about integration api with HTTP request to fetch data from server or another it’s method request such as put, post and delete. ',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular Framework','RxJS', 'HTTP'],
    icon: 'pi pi-sparkles',
    backgroundColor: '#ef3764'
  },
]

export const contactInfo: ContactInfo[] = [
    {
      icon: 'pi-inbox',
      title: 'Email',
      value: 'ponleu.thea@gmail.com',
      link: 'https://ponleu.thea@gmail.com',
      color: '#338ef7',
      bgColor: '#002e62'
    },
    {
      icon: 'pi-phone',
      title: 'Phone',
      value: '+855 96 279 122',
      link: 'tel:+85962796122',
      color: '#45d483',
      bgColor: '#095028'
    },
    {
      icon: 'pi-map-marker',
      title: 'Location',
      value: 'Phnom Penh, Cambodia',
      link: 'https://maps.google.com/?q=Phnom+Penh+Cambodia',
      color: '#9353d3',
      bgColor: '#301050'
    },
    {
      icon: 'pi-linkedin',
      title: 'LinkedIn',
      value: 'linkedin.com/in/ponleu',
      link: 'https://www.linkedin.com/in/thea-ponleu-331a5a287/',
      color: '#338ef7',
      bgColor: '#002e62'

    }
  ];

export const resourceCategories: ResourceCategory[] = [
  { name: 'Article', color: '#3665ea', icon: 'pi-file-edit' },
  { name: 'Tool', color: '#0ec968', icon: 'pi-wrench' },
  { name: 'Book', color: '#984bd0', icon: 'pi-book' },
  { name: 'Course', color: '#d4930a', icon: 'pi-graduation-cap' },
  { name: 'Video', color: '#f34981', icon: 'pi-play-circle' },
];

export const resources: Resource[] = [
  {
    id: 1,
    title: 'Vue 3 Composition API — Best Practices',
    description:
      'A deep dive into structuring composables, sharing reactive state and keeping components lean with the Composition API.',
    category: 'Article',
    link: 'https://vuejs.org/guide/reusability/composables',
    author: 'Vue Team',
    readTime: '8 min read',
    date: 'Jan 2026',
    tags: ['Vue', 'Composition API', 'Patterns'],
    featured: true,
  },
  {
    id: 2,
    title: 'Vite — Next Generation Frontend Tooling',
    description:
      'Why Vite became my default build tool: instant server start, lightning HMR and a first-class Vue experience.',
    category: 'Tool',
    link: 'https://vitejs.dev',
    author: 'Evan You',
    readTime: '5 min read',
    date: 'Dec 2025',
    tags: ['Build', 'DX', 'Performance'],
  },
  {
    id: 3,
    title: "You Don't Know JS Yet",
    description:
      'The book series that reshaped how I understand scope, closures and the type system beneath JavaScript.',
    category: 'Book',
    link: 'https://github.com/getify/You-Dont-Know-JS',
    author: 'Kyle Simpson',
    readTime: 'Series',
    date: '2020',
    tags: ['JavaScript', 'Fundamentals'],
    featured: true,
  },
  {
    id: 4,
    title: 'TypeScript Deep Dive',
    description:
      'A free, community-driven course covering generics, utility types and real-world patterns for typing large apps.',
    category: 'Course',
    link: 'https://basarat.gitbook.io/typescript',
    author: 'Basarat Ali Syed',
    readTime: 'Self-paced',
    date: '2025',
    tags: ['TypeScript', 'Types'],
  },
  {
    id: 5,
    title: 'Understanding Reactivity in Vue',
    description:
      'A visual walkthrough of how Vue tracks dependencies and triggers updates behind the reactivity system.',
    category: 'Video',
    link: 'https://www.youtube.com/watch?v=v0Bq5qQIw5k&list=PL-dwj4UAzfFun7wHyyV_YtWg4Xjn_MnLd',
    author: 'Vue Mastery',
    readTime: '22 min',
    date: 'Nov 2025',
    tags: ['Vue', 'Reactivity'],
  },
  {
    id: 6,
    title: 'CSS Grid vs Flexbox — When to Use Which',
    description:
      'A practical comparison with layout recipes so you stop guessing which one fits the job.',
    category: 'Article',
    link: 'https://css-tricks.com/css-grid-replace-flexbox',
    author: 'CSS-Tricks',
    readTime: '10 min read',
    date: 'Oct 2025',
    tags: ['CSS', 'Layout', 'Responsive'],
  },
  {
    id: 7,
    title: 'PrimeVue — Rich UI Component Library',
    description:
      'The component library powering this portfolio: accessible, themeable and packed with production-ready widgets.',
    category: 'Tool',
    link: 'https://primevue.org',
    author: 'PrimeTek',
    readTime: '6 min read',
    date: '2026',
    tags: ['UI', 'Vue', 'Components'],
  },
  {
    id: 8,
    title: 'Refactoring UI',
    description:
      'Design tactics for developers — spacing, hierarchy and color decisions that make interfaces feel polished.',
    category: 'Book',
    link: 'https://www.refactoringui.com',
    author: 'Adam Wathan & Steve Schoger',
    readTime: 'Book',
    date: '2024',
    tags: ['Design', 'UI', 'UX'],
  },
  {
    id: 9,
    title: 'Angular Official Documentation',
    description:
      'The definitive Angular reference — signals, standalone components, dependency injection and control flow, straight from the Angular team.',
    category: 'Article',
    link: 'https://angular.dev',
    author: 'Angular Team',
    readTime: 'Reference',
    date: '2026',
    tags: ['Angular', 'Signals', 'Standalone Components'],
    featured: true,
  },
  {
    id: 10,
    title: 'NgRx Store — Reactive State for Angular',
    description:
      'Redux-style state management with NgRx: actions, reducers, selectors and entity data for large-scale Angular apps.',
    category: 'Article',
    link: 'https://ngrx.io',
    author: 'NgRx Team',
    readTime: '9 min read',
    date: 'Mar 2026',
    tags: ['Angular', 'NgRx', 'State Management'],
  },
  {
    id: 11,
    title: 'Angular University Courses',
    description:
      'In-depth Angular courses covering RxJS, signals, testing and architecture — my go-to source for levelling up Angular skills.',
    category: 'Course',
    link: 'https://angular-university.io',
    author: 'Vasco Cavalheiro',
    readTime: 'Self-paced',
    date: '2025',
    tags: ['Angular', 'RxJS', 'Testing'],
  },
  {
    id: 12,
    title: 'Angular Material — UI Components',
    description:
      'Material Design components built by the Angular team: accessible, themeable and versioned in lockstep with Angular itself.',
    category: 'Tool',
    link: 'https://material.angular.io',
    author: 'Angular Team',
    readTime: '4 min read',
    date: 'Feb 2026',
    tags: ['Angular', 'UI', 'Components'],
  },
  {
    id: 13,
    title: 'Signals in Angular — A Complete Guide',
    description:
      'A video walkthrough of Angular signals, computed values and effects, and how they replace much of RxJS boilerplate.',
    category: 'Video',
    link: 'https://www.youtube.com/@Angular',
    author: 'Angular YouTube Channel',
    readTime: '18 min',
    date: 'Jan 2026',
    tags: ['Angular', 'Signals', 'Reactivity'],
  },
  {
    id: 14,
    title: 'Angular Architecture Patterns',
    description:
      'A practical book on structuring enterprise Angular apps: module boundaries, monorepo strategy and scalable DI patterns.',
    category: 'Book',
    link: 'https://www.angulararchitects.io/en/book/',
    author: 'Manfred Steyer',
    readTime: 'Book',
    date: '2025',
    tags: ['Angular', 'Architecture', 'Enterprise'],
  },
  {
    id: 15,
    title: 'The Angular DevKit & CLI',
    description:
      'Schematics, builders and ng generate — how the Angular CLI automates scaffolding, testing and optimized production builds.',
    category: 'Tool',
    link: 'https://angular.dev/tools/cli',
    author: 'Angular Team',
    readTime: '7 min read',
    date: 'Dec 2025',
    tags: ['Angular', 'CLI', 'Tooling'],
  },
  {
    id: 16,
    title: 'Deep Learning with TypeScript — TensorFlow.js',
    description:
      'Train and run neural networks directly in the browser: models, layers and transfer learning with TensorFlow.js.',
    category: 'Course',
    link: 'https://www.tensorflow.org/js/tutorials',
    author: 'Google AI',
    readTime: 'Self-paced',
    date: '2025',
    tags: ['AI', 'TensorFlow', 'JavaScript'],
    featured: true,
  },
  {
    id: 17,
    title: 'Prompt Engineering Guide',
    description:
      'A community-driven collection of prompting techniques — zero-shot, chain-of-thought, RAG patterns and evaluation tips.',
    category: 'Article',
    link: 'https://www.promptingguide.ai',
    author: 'DAIR.AI',
    readTime: '12 min read',
    date: 'Apr 2026',
    tags: ['AI', 'LLM', 'Prompting'],
  },
  {
    id: 18,
    title: 'OpenAI API Documentation',
    description:
      'Add LLM superpowers to any app — chat completions, function calling, embeddings and streaming responses via API.',
    category: 'Tool',
    link: 'https://platform.openai.com/docs',
    author: 'OpenAI',
    readTime: '8 min read',
    date: '2026',
    tags: ['AI', 'LLM', 'API'],
  },
  {
    id: 19,
    title: 'Building AI-Powered Apps with LangChain',
    description:
      'A hands-on course on chaining LLM calls, agents, memory and retrieval to build real AI products beyond a single prompt.',
    category: 'Course',
    link: 'https://python.langchain.com/docs/tutorials/',
    author: 'LangChain',
    readTime: 'Self-paced',
    date: 'Mar 2026',
    tags: ['AI', 'LangChain', 'Agents'],
  },
  {
    id: 20,
    title: 'Andrej Karpathy — Intro to Large Language Models',
    description:
      'A legendary 1-hour talk on how LLMs actually work: training, fine-tuning, scaling laws and where AI is heading.',
    category: 'Video',
    link: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
    author: 'Andrej Karpathy',
    readTime: '59 min',
    date: 'Nov 2025',
    tags: ['AI', 'LLM', 'Deep Learning'],
    featured: true,
  },
  {
    id: 21,
    title: 'AI Engineering (Book by Chip Huyen)',
    description:
      'The essential book on building applications with foundation models — evaluation, RAG, fine-tuning and MLOps for AI apps.',
    category: 'Book',
    link: 'https://www.oreilly.com/library/view/ai-engineering/9781098166298/',
    author: 'Chip Huyen',
    readTime: 'Book',
    date: '2025',
    tags: ['AI', 'Machine Learning', 'Engineering'],
  },
];