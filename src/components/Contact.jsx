import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { Mail, Send, Calendar, Copy, CheckCircle2, Linkedin } from 'lucide-react';
import { fadeInUp, slideInLeft, slideInRight } from '../utils/animations';
import { PERSONAL_INFO, SOCIAL_LINKS, CONTACT_CONFIG } from '../constants';

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [copied, setCopied] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch(`https://formspree.io/f/${CONTACT_CONFIG.formspreeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="py-32 px-6 relative overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[128px] gpu-blur"></div>
            <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[128px] gpu-blur"></div>

            <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    className="text-center mb-16 will-change-transform"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="text-gray-400 text-lg">Interested in discussing full-time opportunities? Let's connect</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Contact info */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={slideInLeft}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-3xl font-bold mb-4">Get in touch</h3>
                            <p className="text-gray-300 leading-relaxed">
                                I'm actively seeking full-time software engineering opportunities
                                and would love to discuss how I can contribute to your team.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 glass rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-colors group">
                            <div className="p-3 bg-purple-500/20 rounded-lg">
                                <Mail className="text-purple-400" size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-400">Email</p>
                                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white hover:text-purple-400 transition-colors">
                                    {PERSONAL_INFO.email}
                                </a>
                            </div>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(PERSONAL_INFO.email);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
                                title="Copy Email"
                            >
                                {copied ? <CheckCircle2 size={18} className="text-green-400" /> : <Copy size={18} className="text-gray-400 group-hover:text-white" />}
                                <AnimatePresence>
                                    {copied && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-green-500 text-white px-2 py-1 rounded"
                                        >
                                            Copied!
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>

                        {/* Professional Links */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <motion.a
                                href={SOCIAL_LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2 flex-1 glass border border-white/10 hover:border-pink-500/50 rounded-xl px-6 py-4 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
                            >
                                <Linkedin size={20} className="text-pink-400" />
                                LinkedIn Profile
                            </motion.a>

                            <motion.a
                                href={CONTACT_CONFIG.calendarLink}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2 flex-1 glass border border-white/10 hover:border-cyan-500/50 rounded-xl px-6 py-4 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                            >
                                <Calendar size={20} className="text-cyan-400" />
                                Schedule a Call
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={slideInRight}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full glass border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full glass border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full glass border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all resize-none"
                                ></textarea>
                            </div>
                            <motion.button
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${status === 'success' ? 'from-green-500 to-emerald-500 shadow-green-500/50' :
                                    status === 'error' ? 'from-red-500 to-rose-500 shadow-red-500/50' :
                                        status === 'sending' ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-purple-500/50'
                                    }`}
                            >
                                {status === 'sending' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : status === 'success' ? (
                                    <>
                                        <CheckCircle2 size={20} />
                                        Message Sent!
                                    </>
                                ) : status === 'error' ? (
                                    'Error! Try again'
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
