import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';
import summary1 from '../assets/summary-1.jpg';
import summary2 from '../assets/summary-2.jpg';
import summary3 from '../assets/summary-3.jpg';

const SummarySlide = () => {
    const principles = [
        {
            title: "חיבור לחיים",
            icon: Heart,
            desc: "מחוברת לבית ישראלי אמיתי ולחברה הישראלית",
            image: summary1
        },
        {
            title: "פשטות",
            icon: Sparkles,
            desc: "משתמשת במילים פשוטות, מדברת על החיים לא על המפרט",
            image: summary2
        },
        {
            title: "אמינות",
            icon: ShieldCheck,
            desc: "משדרת יציבות וביטחון, לא מתאמצת להרשים",
            image: summary3
        }
    ];

    return (
        <div className="flex flex-col items-center h-full w-full max-w-7xl mx-auto px-4 overflow-hidden py-2 md:py-4">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-5xl font-black text-brand-black mb-2 mt-2 shrink-0 text-center"
            >
                שפת המכר החדשה <span className="text-brand-blue font-hand text-3xl md:text-6xl">מדויקת.</span>
            </motion.h2>

            <motion.div
                className="flex-1 flex flex-col gap-2 w-full min-h-0 mb-2 justify-center"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                    }
                }}
            >
                {principles.map((p, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4 } }
                        }}
                        className="flex-1 bg-white rounded-xl shadow-sm border border-brand-black overflow-hidden hover:border-brand-blue transition-colors group flex flex-row min-h-0"
                    >
                        {/* Image Section - Side by Side */}
                        <div className="w-1/2 relative bg-gray-50">
                            <img
                                src={p.image}
                                alt={p.title}
                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 transition-colors" />
                        </div>

                        {/* Text Section - Compact */}
                        <div className="w-1/2 p-2 md:p-4 flex flex-col justify-center items-start text-right bg-white relative">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="p-1.5 bg-brand-yellow/20 rounded-full text-brand-dark-blue shadow-sm shrink-0">
                                    <p.icon size={20} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-lg md:text-2xl font-black text-brand-black leading-none">{p.title}</h3>
                            </div>
                            <p className="text-xs md:text-base text-gray-700 font-medium leading-tight">{p.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="shrink-0 flex flex-col items-center gap-1"
            >
                <Logo variant="box" className="scale-75 origin-bottom" />
                <h3 className="text-lg font-black text-brand-blue">תודה על ההקשבה</h3>
            </motion.div>
        </div>
    );
};

export default SummarySlide;
