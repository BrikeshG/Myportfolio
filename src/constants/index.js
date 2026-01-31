export const PERSONAL_INFO = {
    name: 'Brikesh Vikin Gowrish',
    title: 'Software Engineer',
    degree: 'B.E. Computer Science and Engineering',
    email: 'brikeshvikin13@gmail.com',
    location: 'Passau, Germany',
};

export const SOCIAL_LINKS = {
    linkedin: 'https://www.linkedin.com/in/brikesh-vikin-gowrish-9804a5398/',
    github: 'https://github.com/BrikeshG',
};

export const CONTACT_CONFIG = {
    formspreeId: 'meekeqoa',
    calendarLink: 'mailto:brikeshvikin13@gmail.com?subject=Schedule a Call&body=Hi Brikesh, I\'d like to schedule a call to discuss...',
};

export const ASSETS = {
    resume: '/Brikesh Vikin Gowrish CV.pdf',
    ogImage: '/og-image.png',
    favicon: '/favicon.png',
};

export const NAVIGATION = [
    { label: 'Home', href: 'home' },
    { label: 'About', href: 'about' },
    { label: 'Skills', href: 'skills' },
    { label: 'Projects', href: 'projects' },
    { label: 'Education', href: 'education' },
    { label: 'Contact', href: 'contact' },
];
export const PROJECTS = [
    {
        title: 'Healthcare Chatbot',
        subtitle: 'AI-Powered Symptom Assistant',
        tech: ['Python', 'Flask', 'NLP', 'NLTK'],
        description: "Bachelor's Thesis: Engineered an NLP-driven symptom diagnostic assistant using Python/Flask. Research published on ResearchGate.",
        challenge: 'Optimizing NLP similarity thresholds to maintain high classification accuracy across diverse natural language inputs.',
        metrics: ['80% Response Accuracy', '90% Model Training Success'],
        color: 'purple',
        size: 'large',
        liveUrl: 'https://www.researchgate.net/publication/369939655_BUILDING_A_CHATBOT_FOR_HEALTHCARE_USING_NLP',
        githubUrl: null
    },
    {
        title: 'TuS Pfarrkirchen Club',
        subtitle: 'Professional Community Hub',
        tech: ['React', 'Tailwind', 'Netlify', 'SEO'],
        description: 'Architected and deployed a production-ready community platform for a sports organization, featuring custom SEO strategies and high-performance UI components.',
        challenge: 'Implementing advanced SEO techniques and custom domain mapping to secure #1 search visibility for targeted keywords.',
        metrics: ['#1 Google Search Ranking', 'Perfect Core Web Vitals'],
        color: 'cyan',
        size: 'medium',
        liveUrl: 'https://tus-cricket-pfarrkirchen.de',
        githubUrl: null
    },
    {
        title: 'Next-Gen Portfolio',
        subtitle: 'Personal Branding Engine',
        tech: ['React', 'Vite', 'NLP', 'Framer Motion'],
        description: 'Developed a high-performance digital showcase with a custom NLP-driven knowledge retrieval system, demonstrating advanced frontend engineering and UX design.',
        challenge: 'Orchestrating complex Framer Motion animations with a client-side NLP search engine for seamless user interaction.',
        metrics: ['<100ms Search Latency', 'Fluid 60FPS Performance'],
        color: 'pink',
        size: 'medium',
        liveUrl: null,
        githubUrl: null
    },
    {
        title: 'AWS Infrastructure',
        subtitle: 'Cloud Deployment Optimization',
        tech: ['AWS EC2', 'Windows', 'Cloud'],
        description: 'Academic internship: Configured Windows EC2 instances and implemented robust security group protocols on AWS for hosting production workloads.',
        challenge: 'Balancing instance performance with cost-efficiency while ensuring secure, low-latency connectivity for production workloads.',
        metrics: ['25% Deployment Speedup'],
        color: 'violet',
        size: 'medium',
        liveUrl: null,
        githubUrl: null
    }
];

export const EDUCATION = [
    {
        degree: 'Graduate Coursework in Computer Science',
        institution: 'Universität Passau, Germany',
        period: '04/2025 – 10/2025',
        color: 'purple',
        modules: ['Software Engineering', 'Data Science', 'Distributed Systems']
    },
    {
        degree: 'B.E. Computer Science and Engineering',
        institution: 'Sathyabama University, India',
        period: '06/2019 – 05/2023',
        color: 'cyan',
        modules: ['Data Structures', 'Algorithms', 'OOP', 'Database Management']
    },
];

export const CERTIFICATIONS = [
    'AWS Solutions Architecture Job Simulation — Forage',
    'Technology Job Simulation (Coding & Development) — Deloitte',
    'AWS CLF-C02 Exam Prep — AWS',
    'Advanced Java Certification — FITA Academy',
];
