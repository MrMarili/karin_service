import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Logo from '../components/Logo';

const SalesWordsSlide = ({ onNavigate }) => {
    const words = [
        { text: "בבית", color: "bg-brand-yellow text-brand-dark-blue" },
        { text: "שלנו", color: "bg-white text-brand-blue" },
        { text: "ישראלי", color: "bg-blue-100 text-brand-blue" },
        { text: "מארח", color: "bg-brand-yellow text-brand-dark-blue" },
        { text: "חכם", color: "bg-white text-brand-dark-blue" },
        { text: "פרקטי", color: "bg-gray-100 text-gray-800" },
        { text: "איכות", color: "bg-brand-yellow text-brand-dark-blue border-2 border-white/20" },
        { text: "משפחה", color: "bg-white text-brand-blue" },
        { text: "ביחד", color: "bg-blue-50 text-brand-blue" },
        { text: "נוח", color: "bg-brand-yellow text-brand-dark-blue" },
        { text: "מתאים", color: "bg-white text-gray-800" },
        { text: "חם", color: "bg-orange-50 text-orange-600" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300 } }
    };

    return (
        <div className="h-full w-full bg-brand-blue flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute -top-[20%] -left-[20%] w-[80vw] h-[80vw] rounded-full bg-white blur-3xl" />
            </div>

            <button
                onClick={() => onNavigate(2)}
                className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 text-white hover:opacity-70 transition-opacity font-bold z-50"
            >
                <ArrowRight size={24} className="md:w-8 md:h-8" />
                <span className="text-lg md:text-base">חזרה לתפריט</span>
            </button>

            <div className="max-w-6xl mx-auto w-full flex flex-col items-center z-10">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="mb-8"
                >
                    <Logo variant="white" />
                </motion.div>

                <h2 className="text-6xl md:text-9xl font-black mb-16">המילים שלנו</h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full mb-16"
                >
                    {words.map((word, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, rotate: Math.random() * 4 - 2 }}
                            className={`
                                ${word.color}
                                p-8 md:p-12 rounded-3xl shadow-2xl flex items-center justify-center
                                text-3xl md:text-5xl font-black cursor-default
                                transform transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] aspect-square md:aspect-auto md:h-48
                            `}
                        >
                            {word.text}
                        </motion.div>
                    ))}
                </motion.div>

                <p className="mt-16 text-3xl md:text-5xl opacity-80 font-medium">
                    מילים שיוצרות תחושה של בית
                </p>
            </div>
        </div>
    );
};

export default SalesWordsSlide;
