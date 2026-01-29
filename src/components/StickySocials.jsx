import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function StickySocials() {
    const socials = [
        { icon: Github, href: 'https://github.com/BrikeshG', label: 'GitHub', color: 'hover:text-cyan-400' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/brikesh-vikin-gowrish-9804a5398/', label: 'LinkedIn', color: 'hover:text-pink-400' },
        { icon: Mail, href: 'mailto:brikeshvikin13@gmail.com', label: 'Email', color: 'hover:text-purple-400' },
    ];

    return (
        <div className="fixed left-6 bottom-0 z-50 hidden xl:flex flex-col items-center gap-6">
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col items-center gap-6"
            >
                {socials.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                        <motion.a
                            key={idx}
                            href={social.href}
                            target={social.href.startsWith('http') ? '_blank' : undefined}
                            rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            whileHover={{ y: -4, scale: 1.1 }}
                            className={`p-2 glass rounded-lg border border-white/10 text-gray-400 ${social.color} transition-all duration-300`}
                            aria-label={social.label}
                        >
                            <Icon size={20} />
                        </motion.a>
                    );
                })}
                <div className="w-px h-32 bg-gradient-to-t from-transparent via-gray-600 to-gray-600"></div>
            </motion.div>
        </div>
    );
}
