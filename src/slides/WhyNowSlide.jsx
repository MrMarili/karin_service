import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';

const WhyNowSlide = ({ onNavigate }) => {
    const [step, setStep] = useState(0);

    const handleNext = () => {
        if (step < 3) {
            setStep(s => s + 1);
        }
    };

    return (
        <div
            onClick={handleNext}
            className="h-full w-full bg-brand-blue flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden cursor-pointer"
        >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute -top-[20%] -right-[20%] w-[80vw] h-[80vw] rounded-full bg-white blur-3xl" />
                <div className="absolute -bottom-[20%] -left-[20%] w-[60vw] h-[60vw] rounded-full bg-brand-dark-blue blur-3xl" />
            </div>

            <button
                onClick={(e) => { e.stopPropagation(); onNavigate(2); }}
                className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 text-white hover:opacity-70 transition-opacity font-bold z-50"
            >
                <ArrowRight size={24} className="md:w-8 md:h-8" />
                <span className="text-lg md:text-base">חזרה לתפריט</span>
            </button>

            <div className="z-10 flex flex-col items-center max-w-5xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Logo variant="white" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-7xl md:text-[11rem] font-black leading-none tracking-tighter"
                >
                    שפת המכירה
                </motion.h2>

                <div className="space-y-12 text-4xl md:text-6xl font-medium leading-tight max-w-7xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="font-black">נקודת המפגש הפרונטלית</span> עם המותג מתרחשת בסניף.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        סביר להניח שהלקוח בטרם הגעתו לסניף התרשם מהאתר, חשוב שהחוויה בסניף <span className="font-black border-b-8 border-brand-yellow/30">תמשיך את החוויה</span> שקיבל באתר.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
                        transition={{ duration: 0.5 }}
                        className="font-black text-brand-yellow drop-shadow-lg"
                    >
                        השפה והחוויה שנעביר את הלקוח תהיה הגורם שמבדיל אותנו מהחנויות מסביבנו.
                    </motion.p>
                </div>
            </div>
        </div>
    );
};

export default WhyNowSlide;
