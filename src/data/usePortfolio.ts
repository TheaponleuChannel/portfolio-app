import type { ContactInfo } from "../models/contact-information";
import type { ExperienceTimeLine } from "../models/experience-time-line";
import type { Project } from "../models/project";
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
  { name: 'Node.js', level: 25, icon: 'icons/nodejs.png', color: '#0ec968' },
  { name: 'Express', level: 25, icon: 'icons/express-js.png', color: '#71717a' },
  { name: 'MongoDB', level: 10, icon: 'icons/mongodb.png', color: '#0ec968' },
  { name: 'PostgreSQL', level: 5, icon: 'icons/postgre.png', color: '#3665eb' },
  { name: 'GraphQL', level: 5, icon: 'icons/graphql.png', color: '#984bd0' },
  { name: 'Docker', level: 5, icon: 'icons/docker.png', color: '#3665eb' },
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