import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, ShieldCheck } from 'lucide-react';
import Logo from '../../components/Logo';

const VisionSlide = () => {
    return (
        <div className="h-full w-full bg-white flex flex-col p-8 md:p-16 relative overflow-hidden select-none" dir="rtl">
            {/* Background Branding Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute top-8 md:top-12 right-8 md:right-12 scale-110 md:scale-125 z-10">
                <Logo />
            </div>

            <main className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center">
                <header className="mb-12 border-b-4 border-brand-yellow pb-8 inline-block">
                    <h1 className="text-6xl md:text-7xl font-black text-brand-blue tracking-tighter leading-none mb-4">
                        שמרת הזורע – <br />
                        <span className="text-brand-dark-blue">סיפור אהבה ישראלי</span>
                    </h1>
                </header>

                <div className="space-y-10">
                    <motion.p
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 30 }}
                        className="text-3xl md:text-4xl font-black text-brand-blue border-r-8 border-brand-yellow pr-8"
                    >
                        שמרת הזורע היא חלק בלתי נפרד מנוף הבית הישראלי.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 30 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-bold text-gray-700 leading-tight"
                    >
                        אנו שואפים לעצב את תרבות האירוח והמגורים בישראל, ולהעניק לכל משפחה הרהיטים המשלימים:
                    </motion.p>

                    <div className="grid grid-cols-3 gap-12 py-8">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gray-50 p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4"
                        >
                            <Star className="text-brand-yellow" size={60} />
                            <span className="text-3xl font-black text-brand-dark-blue">איכות מוקפדת</span>
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-gray-50 p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4"
                        >
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffc845' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9h6V5l7 7-7 7v-4H6V9z'/%3E%3C/svg%3E" alt="comfort" className="w-16 h-16" />
                            <span className="text-3xl font-black text-brand-dark-blue">נוחות מקסימלית</span>
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gray-50 p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4"
                        >
                            <Zap className="text-brand-yellow" size={60} />
                            <span className="text-3xl font-black text-brand-dark-blue">עיצוב על-זמני</span>
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-2xl md:text-3xl text-gray-700 leading-snug font-medium"
                    >
                        אנו פועלים מתוך מחויבות עמוקה להבנת הצרכים המשתנים של הבית הישראלי. <br />
                        השילוב בין מסורת רבת שנים לבין טכנולוגיה וחדשנות, מאפשר לנו לייצר פתרונות ריהוט חכמים ופונקציונליים.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-16 bg-brand-blue/5 border-2 border-brand-blue/10 p-10 rounded-[4rem] text-center shadow-inner relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <p className="text-3xl md:text-4xl font-black text-brand-blue mb-4">
                        הבית הישראלי הוא מרכז החיים ♥ מקום של משפחה, אירוח וחום.
                    </p>
                    <p className="text-2xl md:text-3xl text-brand-dark-blue font-bold opacity-80">
                        המטרה שלנו היא להבטיח שכל פריט שאנו יוצרים יתרום לתחושת השייכות והנוחות הזו.
                    </p>
                </motion.div>
            </main>

            <footer className="mt-8 text-center text-brand-blue/40 font-black text-xl">
                שמרת הזורע • מרגישים בבית
            </footer>
        </div>
    );
};

export default VisionSlide;
