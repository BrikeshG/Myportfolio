import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { searchKB, getQuickQuestions } from '../utils/kbSearch';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: "Hi! I'm Brikesh's AI assistant. Ask me anything about his education, skills, projects, certifications, or experience!"
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [lastSendTime, setLastSendTime] = useState(0);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const quickQuestions = getQuickQuestions();

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) return;

        // Rate limiting: prevent rapid sends within 1 second
        const now = Date.now();
        if (now - lastSendTime < 1000) {
            return;
        }
        setLastSendTime(now);

        // Add user message
        const userMessage = { type: 'user', text: trimmedInput };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // Search KB for response
        setTimeout(() => {
            const response = searchKB(trimmedInput);
            const botMessage = {
                type: 'bot',
                text: response || "I can only answer questions about my portfolio, projects, and skills. Try asking about my tech stack or projects!"
            };
            setMessages(prev => [...prev, botMessage]);
        }, 300);
    };

    const handleQuickQuestion = (question) => {
        setInputValue(question);
        handleSend();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 glass-dark rounded-full p-4 shadow-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6 text-purple-400" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle className="w-6 h-6 text-purple-400" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-[320px] h-[420px] glass-dark rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-purple-400" />
                                Ask About My Work
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">Portfolio Assistant</p>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.type === 'user'
                                            ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                                            : 'glass border border-white/10 text-gray-200'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-line">{msg.text}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Quick Questions (show only if first message) */}
                            {messages.length === 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="space-y-2"
                                >
                                    <p className="text-xs text-gray-500 text-center mb-2">Quick questions:</p>
                                    {quickQuestions.map((q, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleQuickQuestion(q)}
                                            className="w-full text-left text-xs glass rounded-lg px-3 py-2 border border-white/10 hover:border-purple-500/50 transition-all duration-200 text-gray-300 hover:text-white"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-black/20">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask a question..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                                />
                                <motion.button
                                    onClick={handleSend}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg p-2 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200"
                                >
                                    <Send className="w-5 h-5 text-white" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
