import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Users, Heart } from 'lucide-react';
import Logo from '../../components/Logo';
import PersonaAvatars from './PersonaAvatars';

const AchievementSuccessSlide = () => {
    return (
        <div className="h-full w-full bg-brand-yellow flex flex-col items-center justify-center p-12 relative overflow-hidden" dir="rtl">
            {/* Integrated Logo */}
            <div className="absolute top-8 left-8 p-3 bg-white/30 rounded-xl backdrop-blur-sm border border-white/40">
                <Logo size="small" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-12 max-w-7xl w-full z-10"
            >
                <motion.h2
                    whileHover={{ scale: 1.02 }}
                    className="text-7xl md:text-9xl font-black text-brand-black leading-none tracking-tighter mb-8"
                >
                    ההישגים שלנו <br /> <span className="text-white drop-shadow-2xl">והדרך קדימה</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { val: "94%", label: "שביעות רצון בשירות", icon: Heart, color: "text-red-500" },
                        { val: "100%", label: "לקיחת אחריות", icon: Star, color: "text-yellow-600" },
                        { val: "24/7", label: "בתודעת שירות", icon: Users, color: "text-brand-blue" },
                    ].map((stat, i) => (stat &&
                        <motion.div
                            key={i}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.2, type: "spring" }}
                            className="bg-white/95 backdrop-blur-md p-10 rounded-[4rem] shadow-2xl border-4 border-white flex flex-col items-center gap-6"
                        >
                            <stat.icon size={80} className={stat.color} />
                            <div className="text-7xl font-black text-brand-dark-blue tracking-tighter">{stat.val}</div>
                            <div className="text-3xl font-bold text-gray-500">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 bg-brand-blue text-white px-16 py-10 rounded-[4rem] shadow-2xl inline-block border-4 border-white/20">
                    <p className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                        ממשיכים לבנות את סיפור האהבה אצל הלקוח בבית
                    </p>
                </div>
            </motion.div>

            {/* Persona Presence */}
            <div className="absolute -bottom-12 right-12">
                <PersonaAvatars type="star" size={100} label="המטרה: מצוינות" delay={1} />
            </div>

            <Trophy className="absolute top-20 right-20 text-white/20 -rotate-12" size={160} />
        </div>
    );
};

export default AchievementSuccessSlide;
