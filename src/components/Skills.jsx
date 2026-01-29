import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Database, Cloud, Terminal, Globe, Cpu, Languages } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../utils/animations';

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const skills = [
        {
            icon: Code2,
            title: 'Programming',
            items: ['JavaScript (ES6+)', 'Python', 'Java', 'SQL'],
            color: 'purple',
            size: 'normal'
        },
        {
            icon: Database,
            title: 'Core Concepts',
            items: ['OOP', 'Data Structures', 'Algorithms'],
            color: 'pink',
            size: 'normal'
        },
        {
            icon: Globe,
            title: 'Web Technologies',
            items: ['React.js', 'Tailwind CSS', 'Flask', 'HTML5', 'CSS3'],
            color: 'cyan',
            size: 'normal'
        },

        {
            icon: Terminal,
            title: 'Tools & IDEs',
            items: ['VS Code', 'Git', 'GitHub', 'Vite'],
            color: 'violet',
            size: 'normal'
        },
        {
            icon: Cloud,
            title: 'Infrastructure',
            items: ['AWS (EC2)', 'Netlify', 'CI/CD Basics'],
            color: 'purple',
            size: 'normal'
        },
        {
            icon: Cpu,
            title: 'AI & Libraries',
            items: ['NLP', 'NLTK', 'Framer Motion'],
            color: 'cyan',
            size: 'normal'
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            purple: 'hover:border-purple-500/50 hover:shadow-purple-500/20',
            cyan: 'hover:border-cyan-500/50 hover:shadow-cyan-500/20',
            pink: 'hover:border-pink-500/50 hover:shadow-pink-500/20',
            violet: 'hover:border-violet-500/50 hover:shadow-violet-500/20'
        };
        return colors[color] || colors.purple;
    };

    const getIconColor = (color) => {
        const colors = {
            purple: 'text-purple-400',
            cyan: 'text-cyan-400',
            pink: 'text-pink-400',
            violet: 'text-violet-400'
        };
        return colors[color] || colors.purple;
    };

    return (
        <section id="skills" className="py-32 px-6 relative overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[128px] gpu-blur"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[128px] gpu-blur"></div>

            <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    className="text-center mb-16 will-change-transform"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        Skills & <span className="gradient-text">Expertise</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Technologies and tools I work with to build modern solutions
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {skills.map((skill, idx) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                whileHover={{
                                    scale: 1.02,
                                    rotateY: 5,
                                    rotateX: 5
                                }}
                                className={`glass rounded-2xl p-8 border border-white/10 transition-all duration-300 ${getColorClasses(skill.color)} hover:shadow-2xl will-change-transform`}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    perspective: '1000px'
                                }}
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`p-3 glass rounded-xl ${getIconColor(skill.color)}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white flex-1">{skill.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {skill.items.map((item, itemIdx) => (
                                        <li key={itemIdx} className="text-gray-300 flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${getIconColor(skill.color).replace('text-', 'bg-')}`}></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
