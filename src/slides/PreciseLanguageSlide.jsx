import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';

const PreciseLanguageSlide = ({ onNavigate }) => {
    return (
        <div className="h-full w-full bg-brand-blue flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute -top-[20%] -right-[20%] w-[80vw] h-[80vw] rounded-full bg-white blur-3xl" />
                <div className="absolute -bottom-[20%] -left-[20%] w-[60vw] h-[60vw] rounded-full bg-brand-dark-blue blur-3xl" />
            </div>

            <button
                onClick={() => onNavigate(2)}
                className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 text-white hover:opacity-70 transition-opacity font-bold z-10"
            >
                <ArrowRight size={24} className="md:w-8 md:h-8" />
                <span className="text-lg md:text-base">חזרה לתפריט</span>
            </button>

            <div className="z-10 flex flex-col items-center max-w-7xl mx-auto w-full h-full justify-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Logo variant="box" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl md:text-6xl font-black mb-4"
                >
                    שפת מכירה מדוייקת
                </motion.h2>

                <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl">
                    לחבר את הלקוח לחלום. להמחיש את החוויה.
                </p>

                {/* Image Placeholders */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
                >
                    {/* Placeholder 1 */}
                    <div className="aspect-[4/3] bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 flex flex-col items-center justify-center p-4 shadow-xl hover:bg-white/20 transition-colors cursor-pointer group relative overflow-hidden">
                        <div className="absolute inset-0 bg-brand-dark-blue/20 group-hover:bg-transparent transition-colors" />
                        <span className="text-white font-bold text-2xl z-10">סלון</span>
                        <span className="text-white/60 text-sm mt-2 z-10">לחצו להוספת תמונה</span>
                    </div>

                    {/* Placeholder 2 */}
                    <div className="aspect-[4/3] bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 flex flex-col items-center justify-center p-4 shadow-xl hover:bg-white/20 transition-colors cursor-pointer group relative overflow-hidden">
                        <div className="absolute inset-0 bg-brand-dark-blue/20 group-hover:bg-transparent transition-colors" />
                        <span className="text-white font-bold text-2xl z-10">פינת אוכל</span>
                        <span className="text-white/60 text-sm mt-2 z-10">לחצו להוספת תמונה</span>
                    </div>

                    {/* Placeholder 3 */}
                    <div className="aspect-[4/3] bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 flex flex-col items-center justify-center p-4 shadow-xl hover:bg-white/20 transition-colors cursor-pointer group relative overflow-hidden">
                        <div className="absolute inset-0 bg-brand-dark-blue/20 group-hover:bg-transparent transition-colors" />
                        <span className="text-white font-bold text-2xl z-10">חדר שינה</span>
                        <span className="text-white/60 text-sm mt-2 z-10">לחצו להוספת תמונה</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PreciseLanguageSlide;
