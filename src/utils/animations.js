// Framer Motion animation variants for reusable animations

export const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 60
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
        }
    }
};

export const fadeIn = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export const scaleIn = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
        }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const slideInLeft = {
    hidden: {
        opacity: 0,
        x: -60
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
        }
    }
};

export const slideInRight = {
    hidden: {
        opacity: 0,
        x: 60
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
        }
    }
};

// Hover animations
export const hoverScale = {
    scale: 1.05,
    transition: {
        duration: 0.3,
        ease: "easeOut"
    }
};

export const hoverGlow = {
    boxShadow: "0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.3)",
    transition: {
        duration: 0.3
    }
};

// Page transition
export const pageTransition = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3
        }
    }
};
