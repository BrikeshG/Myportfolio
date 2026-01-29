import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, slideInLeft, slideInRight } from '../utils/animations';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="py-32 px-6 relative overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full filter blur-[128px] gpu-blur"></div>

            <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    className="text-center mb-16 will-change-transform"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        About <span className="gradient-text">Me</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Large quote/highlight */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={slideInLeft}
                    >
                        <p className="text-4xl md:text-5xl font-bold leading-tight">
                            Building <span className="gradient-text">elegant solutions</span> with clean code
                        </p>
                    </motion.div>

                    {/* Right: Description */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={slideInRight}
                        className="glass rounded-2xl p-8 border border-white/10"
                    >
                        <p className="text-gray-300 leading-relaxed text-lg mb-6">
                            Entry-level Software Engineer with a strong foundation in Computer Science Engineering.
                            I build applications using <span className="text-purple-400 font-semibold">Java</span> and <span className="text-cyan-400 font-semibold">Python</span>,
                            create modern web experiences with <span className="text-pink-400 font-semibold">React</span>, and deploy solutions on <span className="text-cyan-400 font-semibold">AWS</span>.
                            What drives me is turning complex problems into elegant, user-friendly solutions.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            I thrive in collaborative environments where I can learn from experienced developers
                            and contribute fresh perspectives. Having built a strong foundation through my B.E.,
                            I completed a period of <span className="text-white font-semibold">Focused Graduate-Level Study</span> at
                            <span className="text-cyan-400 font-semibold"> Universität Passau</span>, deepening my knowledge in advanced
                            Computer Science topics which I now apply to building robust, real-world applications.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
