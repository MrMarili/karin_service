import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Star, Award, Heart, ArrowRight } from 'lucide-react';
import Logo from '../../components/Logo';

const TeamAppreciationSlide = ({ onNavigate }) => {
    const successPoints = [
        { icon: Heart, text: "חיבור אנושי עמוק עם הלקוחות", color: "text-red-500", bg: "bg-red-50" },
        { icon: ThumbsUp, text: "טיפול מקצועי ומהיר בפניות", color: "text-brand-blue", bg: "bg-blue-50" },
        { icon: Star, text: "שימור המוניטין של שמרת הזורע", color: "text-brand-yellow", bg: "bg-yellow-50" },
        { icon: Award, text: "מענה מהיר וסגירת קריאות בביקור ראשון", color: "text-brand-green", bg: "bg-green-50" },
        { icon: Heart, text: "מסירות ומחויבות יום-יומית", color: "text-red-500", bg: "bg-red-50" }
    ];

    return (
        <div className="h-full w-full bg-white flex flex-col p-16 relative overflow-hidden" dir="rtl">
            <div className="absolute top-12 right-12 scale-125 z-10">
                <Logo />
            </div>

            <button
                onClick={() => onNavigate(2)}
                className="absolute top-12 left-12 flex items-center gap-2 text-brand-blue hover:opacity-70 transition-opacity font-bold z-50"
            >
                <ArrowRight size={24} className="md:w-8 md:h-8" />
                <span className="text-lg md:text-base">חזרה לתפריט הקטגוריות</span>
            </button>

            <main className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center pt-12">
                <header className="mb-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-[4rem] font-black text-brand-blue tracking-tighter leading-none"
                    >
                        גאווה בצוות: <br />
                        <span className="text-brand-yellow drop-shadow-sm text-3xl md:text-[3rem]">דברים טובים שקורים היום</span>
                    </motion.h1>
                    <div className="w-32 h-1.5 bg-brand-yellow mt-3 rounded-full" />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {successPoints.map((point, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className={`${point.bg} p-6 rounded-[2rem] flex items-center gap-6 border-2 border-gray-50 shadow-md hover:shadow-lg transition-all`}
                        >
                            <div className="bg-white p-4 rounded-full shadow-inner scale-100">
                                <point.icon size={30} className={point.color} />
                            </div>
                            <p className="text-xl md:text-2xl font-black text-brand-dark-blue leading-tight">
                                {point.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 bg-brand-blue text-white p-8 rounded-[3rem] text-center shadow-lg relative border-4 border-brand-yellow/20"
                >
                    <p className="text-2xl md:text-3xl font-black leading-tight italic">
                        "הבסיס לשפה החדשה הוא הכוח המדהים <br /> שכבר קיים בכם היום!"
                    </p>
                </motion.div>
            </main>
        </div>
    );
};

export default TeamAppreciationSlide;
