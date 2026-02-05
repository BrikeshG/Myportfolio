import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import useScrollSpy from '../hooks/useScrollSpy';
import { NAVIGATION } from '../constants';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navItems = NAVIGATION.map(item => item.href);
    const activeSection = useScrollSpy(navItems, 150);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* Desktop Navbar */}
            <motion.nav
                className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${scrolled ? 'glass-dark' : 'glass'
                    } rounded-full px-8 py-4 shadow-2xl hidden md:block`}
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

            {/* Mobile Navbar Header */}
            <motion.div
                className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${scrolled || mobileMenuOpen ? 'glass-dark' : 'bg-transparent'
                    }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="flex items-center justify-between px-6 py-4">
                    <span className="text-lg font-bold gradient-text">BVG</span>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-lg glass border border-white/10 hover:border-purple-500/50 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-purple-400" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            className="absolute top-16 left-4 right-4 glass-dark rounded-2xl p-6 border border-white/10"
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            <ul className="space-y-2">
                                {navItems.map((item, index) => (
                                    <motion.li
                                        key={item}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <button
                                            onClick={() => scrollToSection(item)}
                                            className={`w-full text-left px-4 py-3 rounded-xl capitalize text-lg font-medium tracking-wide transition-all duration-300 ${activeSection === item
                                                ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-400 border border-purple-500/30'
                                                : 'text-white hover:bg-white/5 hover:text-purple-400'
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
