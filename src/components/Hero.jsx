import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { fadeInUp, fadeIn } from '../utils/animations';
import { PERSONAL_INFO, ASSETS, NAVIGATION } from '../constants';

export default function Hero() {
    const [showScrollDown, setShowScrollDown] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Hide scroll down button when near bottom of page (within 100px)
            const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
            setShowScrollDown(!isNearBottom);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToNext = () => {
        // Define all sections in order
        const sections = NAVIGATION.map(item => item.href);

        // Find current section based on scroll position
        let currentSectionIndex = 0;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach((sectionId, index) => {
            const element = document.getElementById(sectionId);
            if (element) {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + window.scrollY;
                if (scrollPosition >= elementTop) {
                    currentSectionIndex = index;
                }
            }
        });

        // Scroll to next section
        const nextIndex = currentSectionIndex + 1;
        if (nextIndex < sections.length) {
            const nextElement = document.getElementById(sections[nextIndex]);
            if (nextElement) {
                nextElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <section key="hero-v4" id="home" className="min-h-screen flex flex-col justify-start md:justify-center items-center relative overflow-hidden pt-32 md:pt-24 pb-32">
                {/* Animated gradient mesh background - Optimized with will-change */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-screen filter blur-[128px] animate-pulse will-change-[filter,transform] transform-gpu"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500 rounded-full mix-blend-screen filter blur-[128px] animate-pulse transform-gpu will-change-[filter,transform]" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-pink-500 rounded-full mix-blend-screen filter blur-[128px] animate-pulse transform-gpu will-change-[filter,transform]" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
                    <motion.div
                        className="text-center will-change-transform"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        {/* Small intro text */}
                        <motion.p
                            className="text-gray-400 text-sm md:text-base mb-4 tracking-widest uppercase"
                            variants={fadeIn}
                        >
                            {PERSONAL_INFO.title}
                        </motion.p>

                        {/* Massive name with gradient */}
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text leading-tight"
                            variants={fadeInUp}
                        >
                            {PERSONAL_INFO.name.split(' ').slice(0, 2).join(' ')}
                            <br />
                            {PERSONAL_INFO.name.split(' ').slice(2).join(' ')}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.div
                            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed flex flex-col md:block items-center"
                            variants={fadeInUp}
                        >
                            <div className="text-white font-bold block mb-1 md:inline-block md:mb-0 md:mr-2">
                                {PERSONAL_INFO.degree.trim()}
                            </div>
                            <span className="inline-block md:inline">
                                Expertise in <span className="text-purple-400 font-semibold">Java</span>,{' '}
                                <span className="text-cyan-400 font-semibold">Python</span>, and{' '}
                                <span className="text-pink-400 font-semibold">React</span> | Building high-performance software solutions
                            </span>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            variants={fadeInUp}
                        >
                            <motion.a
                                href={ASSETS.resume}
                                download={`Brikesh_Vikin_Gowrish_CV.pdf`}
                                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full text-white font-semibold text-lg overflow-hidden w-full sm:w-auto flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Download className="w-5 h-5" />
                                <span className="relative z-10">Resume</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.a>

                            <motion.button
                                onClick={scrollToContact}
                                className="group relative px-8 py-4 glass rounded-full text-white font-semibold text-lg border border-white/20 hover:border-purple-500/50 transition-all duration-300 w-full sm:w-auto"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10">Get in Touch</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div>
                            </motion.button>
                        </motion.div>
                        <p className="text-[10px] text-gray-500/20 mt-12 opacity-0 hover:opacity-100 transition-opacity">v2.02.01</p>
                    </motion.div>
                </div>
            </section>

            {/* Scroll indicator - only show when not at bottom */}
            <AnimatePresence>
                {showScrollDown && (
                    <motion.div
                        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer z-40 hidden md:flex"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        onClick={scrollToNext}
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="flex flex-col items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
                        >
                            <span className="text-sm tracking-wider uppercase">Scroll</span>
                            <ChevronDown className="w-6 h-6" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
