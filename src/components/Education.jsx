import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../utils/animations';
import { EDUCATION, CERTIFICATIONS } from '../constants';

export default function Education() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="education" className="py-32 px-6 relative overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-[128px] gpu-blur"></div>

            <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Education Timeline */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                        className="will-change-transform"
                    >
                        <motion.div variants={fadeInUp} className="mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-3 mb-2">
                                <GraduationCap className="text-purple-400" size={40} />
                                <span className="gradient-text">Education</span>
                            </h2>
                            <p className="text-gray-400 ml-14">Academic journey</p>
                        </motion.div>

                        <div className="space-y-8 relative ml-14">
                            {/* Timeline line */}
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-transparent"></div>

                            {EDUCATION.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={fadeInUp}
                                    className="relative pl-8"
                                >
                                    {/* Timeline dot */}
                                    <div className={`absolute left-0 top-2 w-3 h-3 rounded-full ${edu.color === 'purple' ? 'bg-purple-500' : 'bg-cyan-500'
                                        } ring-4 ring-black`}></div>

                                    <div className="glass rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                                        <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                                        <p className="text-gray-400 mb-2">{edu.institution}</p>
                                        <p className="text-sm text-purple-400 font-semibold mb-4">{edu.period}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {edu.modules.map((module, mIdx) => (
                                                <span key={mIdx} className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-1 rounded">
                                                    {module}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                        className="will-change-transform"
                    >
                        <motion.div variants={fadeInUp} className="mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-3 mb-2">
                                <Award className="text-cyan-400" size={40} />
                                <span className="gradient-text">Certifications</span>
                            </h2>
                            <p className="text-gray-400 ml-14">Professional credentials</p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="glass rounded-2xl p-8 border border-white/10"
                        >
                            <ul className="space-y-4">
                                {CERTIFICATIONS.map((cert, idx) => (
                                    <motion.li
                                        key={idx}
                                        variants={fadeInUp}
                                        className="text-gray-300 flex items-start gap-3 group"
                                    >
                                        <span className="text-cyan-400 mt-1 text-xl group-hover:scale-125 transition-transform">✓</span>
                                        <span className="leading-relaxed">{cert}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
