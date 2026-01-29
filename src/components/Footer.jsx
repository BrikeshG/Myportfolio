import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function Footer() {
    const socialLinks = [
        { icon: Mail, href: 'mailto:brikeshvikin13@gmail.com', label: 'Email', color: 'hover:text-purple-400' },
        { icon: Github, href: 'https://github.com/BrikeshG', label: 'GitHub', color: 'hover:text-cyan-400' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/brikesh-vikin-gowrish-9804a5398/', label: 'LinkedIn', color: 'hover:text-pink-400' }
    ];

    return (
        <footer className="py-12 px-6 border-t border-white/5 relative overflow-hidden">
            {/* Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center gap-8">
                    {/* Social Links */}
                    <div className="flex gap-6">
                        {socialLinks.map((social, idx) => {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    target={social.href.startsWith('http') ? '_blank' : undefined}
                                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className={`p-3 glass rounded-full border border-white/10 text-gray-400 ${social.color} transition-all duration-300`}
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon size={20} />
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-gray-400">
                            © 2026 Brikesh Vikin Gowrish
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
