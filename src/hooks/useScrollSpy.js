import { useState, useEffect } from 'react';

export default function useScrollSpy(sections, offset = 100) {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + offset;

            // Find the active section
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;

                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Trigger once on mount
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections, offset]);

    return activeSection;
}
