import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Code2, Database, Cloud, TestTube, Bug, CheckCircle2, Server, Brain } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../utils/animations';
import { PROJECTS } from '../constants';

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Icon mapping for technologies
    const techIcons = {
        'Python': Code2,
        'Flask': Server,
        'NLP': Brain,
        'NLTK': Brain,
        'Testing': TestTube,
        'Debugging': Bug,
        'QA': CheckCircle2,
        'AWS EC2': Cloud,
        'Windows': Database,
        'Cloud': Cloud
    };

    const getGradientBorder = (color) => {
        const gradients = {
            purple: 'from-purple-500 to-violet-500',
            cyan: 'from-cyan-500 to-blue-500',
            pink: 'from-pink-500 to-rose-500'
        };
        return gradients[color] || gradients.purple;
    };

    const getTechIcon = (tech) => {
        return techIcons[tech] || Code2;
    };

    return (
        <section id="projects" className="py-32 px-6 relative overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-500/20 rounded-full filter blur-[128px] gpu-blur"></div>
            <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-violet-500/20 rounded-full filter blur-[128px] gpu-blur"></div>

            <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    className="text-center mb-16 will-change-transform"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A showcase of my work in software development and cloud computing
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {PROJECTS.map((project, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className={`group relative glass rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col will-change-transform ${project.size === 'large' ? 'md:col-span-2 lg:col-span-1' : ''
                                }`}
                        >
                            {/* Gradient border on hover */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getGradientBorder(project.color)} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                                    <p className="text-gray-400 text-sm">{project.subtitle}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map((tech, techIdx) => {
                                        const Icon = getTechIcon(tech);
                                        return (
                                            <span
                                                key={techIdx}
                                                className="flex items-center gap-1.5 text-xs glass px-3 py-1.5 rounded-full border border-white/10 hover:border-purple-500/30 transition-colors"
                                            >
                                                <Icon className="w-3.5 h-3.5" />
                                                {tech}
                                            </span>
                                        );
                                    })}
                                </div>

                                <p className="text-gray-300 mb-4 flex-grow leading-relaxed text-sm">
                                    {project.description}
                                </p>

                                <div className="mb-4">
                                    <p className="text-[10px] uppercase tracking-wider text-purple-400 font-bold mb-2">Technical Challenge</p>
                                    <p className="text-xs text-gray-400 italic">"{project.challenge}"</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.metrics.map((metric, mIdx) => (
                                        <span key={mIdx} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-cyan-400">
                                            {metric}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    {project.githubUrl && (
                                        <motion.a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                                        >
                                            <Github size={16} />
                                            GitHub
                                        </motion.a>
                                    )}
                                    {project.liveUrl && (
                                        <motion.a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                                        >
                                            <ExternalLink size={16} />
                                            Live Demo
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
