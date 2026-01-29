import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useScrollSpy from '../hooks/useScrollSpy';
import { NAVIGATION } from '../constants';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navItems = NAVIGATION.map(item => item.href);
    const activeSection = useScrollSpy(navItems, 150);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${scrolled ? 'glass-dark' : 'glass'
                } rounded-full px-8 py-4 shadow-2xl`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <ul className="flex gap-8 items-center">
                {navItems.map((item) => (
                    <li key={item}>
                        <button
                            onClick={() => scrollToSection(item)}
                            className={`relative capitalize text-sm font-medium tracking-wide transition-all duration-300 ${activeSection === item
                                ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]'
                                : 'text-white hover:text-purple-400'
                                }`}
                        >
                            {item}
                            {activeSection === item && (
                                <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                                    layoutId="activeSection"
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            )}
                        </button>
                    </li>
                ))}
            </ul>
        </motion.nav>
    );
}
