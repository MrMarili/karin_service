import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Settings, Zap } from 'lucide-react';

const VisionSlide = ({ onNavigate }) => {
    const [step, setStep] = useState(0);
    const fullTextSteps = 5; // Total steps to reveal

    const handleNext = () => {
        if (step < fullTextSteps) {
            setStep(s => s + 1);
        }
    };

    const fadeInUp = (triggerStep) => ({
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: step >= triggerStep ? 1 : 0,
            y: step >= triggerStep ? 0 : 20
        },
        transition: { duration: 0.5 }
    });

    return (
        <div
            onClick={handleNext}
            className="h-full w-full bg-white flex flex-col items-center justify-center p-8 text-center relative overflow-hidden cursor-pointer"
        >
            {/* Main Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-7xl md:text-[8.5rem] font-black mb-16 leading-none text-brand-blue tracking-tighter whitespace-nowrap"
            >
                שמרת הזורע – <br />
                <span className="text-brand-blue">סיפור אהבה ישראלי</span>
            </motion.h2>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-[30rem] h-6 bg-brand-yellow mb-20 rounded-full"
            />

            {/* Content Container */}
            <div className="max-w-[120rem] space-y-16 text-4xl md:text-5xl text-gray-800 leading-tight font-medium px-8 text-center">

                {/* Step 1 */}
                <motion.p {...fadeInUp(1)} className="text-5xl md:text-7xl">
                    <span className="font-black text-brand-blue">שמרת הזורע</span> היא חלק בלתי נפרד מנוף הבית הישראלי.
                </motion.p>

                {/* Step 2: Restored sentence */}
                <motion.p {...fadeInUp(2)} className="opacity-80">
                    אנו שואפים לעצב את תרבות האירוח והמגורים בישראל, ולהעניק לכל משפחה את הרהיטים המשלימים:
                </motion.p>

                {/* Step 3: Core Values (Squares) */}
                <motion.div {...fadeInUp(3)} className="flex flex-wrap justify-center gap-12 md:gap-20 py-12">
                    {[
                        { icon: Star, text: "איכות מוקפדת", color: "text-brand-yellow", iconColor: "fill-current" },
                        { icon: Settings, text: "נוחות מקסימלית", color: "text-brand-blue" },
                        { icon: Zap, text: "עיצוב על-זמני", color: "text-brand-yellow" }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-16 md:p-24 rounded-[4rem] shadow-2xl border-4 border-brand-blue/10 flex flex-col items-center gap-10 hover:scale-105 transition-transform">
                            <item.icon className={`${item.color} ${item.iconColor || ''}`} size={100} />
                            <span className="text-5xl md:text-6xl font-black text-brand-dark-blue">{item.text}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Step 4: Restored paragraph */}
                <motion.p {...fadeInUp(4)} className="text-3xl md:text-4xl opacity-70 leading-relaxed max-w-6xl mx-auto">
                    אנו פועלים מתוך מחויבות עמוקה להבנת הצרכים המשתנים של הבית הישראלי. השילוב בין מסורת רבת שנים לבין טכנולוגיה וחדשנות, מאפשר לנו לייצר פתרונות ריהוט חכמים ופונקציונליים.
                </motion.p>

                {/* Step 5 */}
                <motion.div {...fadeInUp(5)} className="bg-brand-blue/5 p-20 rounded-[6rem] border-8 border-brand-blue/10 shadow-2xl">
                    <p className="font-black text-brand-blue mb-8 text-6xl md:text-[8rem] leading-none">
                        הבית הישראלי הוא מרכז החיים ♥
                    </p>
                    <p className="opacity-80 font-bold text-4xl md:text-6xl">
                        המטרה שלנו היא להבטיח שכל פריט יתרום לתחושת השייכות והנוחות הזו.
                    </p>
                </motion.div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-brand-blue/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-yellow/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
        </div>
    );
};

export default VisionSlide;
