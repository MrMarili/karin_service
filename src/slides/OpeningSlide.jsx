import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

const OpeningSlide = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 3.0,
                delayChildren: 0.5
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div className="h-full w-full relative bg-brand-yellow flex flex-col items-center justify-center text-center p-8 overflow-hidden">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-12 max-w-7xl relative z-10"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-7xl md:text-[9rem] font-black text-brand-black leading-tight tracking-tight"
                >
                    מיתוג מחדש הוא לא רק <br />
                    <span className="text-white drop-shadow-xl">עיצוב ושיפוץ הסניף.</span>
                </motion.h1>

                <motion.div variants={itemVariants} className="flex flex-col items-center gap-16">
                    <p className="text-6xl md:text-[8rem] font-black text-brand-dark-blue max-w-7xl leading-tight">
                        הוא להעניק לכל לקוח תחושה של בית...
                    </p>

                    <div className="bg-brand-blue/90 p-12 rounded-[4rem] shadow-2xl transform rotate-1 border-8 border-white/20 scale-125">
                        <Logo />
                    </div>
                </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white/20 rounded-full animate-pulse" />
            <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-brand-blue/10 rounded-full" />
        </div>
    );
};

export default OpeningSlide;
