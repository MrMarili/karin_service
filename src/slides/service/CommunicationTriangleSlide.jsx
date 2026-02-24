import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, HardHat, Headphones, ArrowRightLeft, Radio } from 'lucide-react';
import Logo from '../../components/Logo';

const CommunicationTriangleSlide = () => {
    return (
        <div className="h-full w-full bg-white flex flex-col p-16 relative overflow-hidden" dir="rtl">
            {/* Prominent Logo */}
            <div className="absolute top-12 right-12 scale-125 z-20">
                <Logo />
            </div>

            {/* Background Branding Elements */}
            <div className="absolute top-0 left-0 w-1/3 h-full bg-brand-blue/5 -skew-x-12 -translate-x-20" />

            <main className="max-w-[90rem] mx-auto w-full flex-1 flex flex-col justify-center relative pt-4">
                <header className="mb-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-[5rem] font-black text-brand-blue tracking-tighter leading-none whitespace-nowrap"
                    >
                        דיווח אחד, <span className="text-brand-yellow">שפה אחת</span>
                    </motion.h1>
                    <p className="text-2xl md:text-3xl font-black text-brand-dark-blue mt-2 opacity-90">
                        מה שאומרים ללקוח = מה שמדווחים למשרד
                    </p>
                    <div className="w-32 h-2 bg-brand-yellow mx-auto mt-4 rounded-full" />
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-center relative">
                    {/* Field Rep Node */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-white p-8 rounded-[3rem] shadow-lg border-2 border-brand-green relative z-10 flex flex-col items-center text-center gap-6"
                    >
                        <div className="bg-brand-green/10 p-6 rounded-full scale-100">
                            <HardHat size={60} className="text-brand-green" />
                        </div>
                        <h3 className="text-4xl font-black text-brand-green">נציג שטח</h3>
                        <div className="bg-brand-green text-white px-6 py-2 rounded-full text-xl font-black">
                            מקור המידע בשטח
                        </div>
                    </motion.div>

                    {/* Central Sync Section */}
                    <div className="flex flex-col items-center gap-6 relative py-4 lg:py-0">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="bg-brand-yellow p-6 rounded-full shadow-md z-20 relative border-2 border-white"
                        >
                            <ShieldCheck size={60} className="text-brand-blue" />
                        </motion.div>

                        <div className="absolute inset-0 flex items-center justify-center -z-10">
                            <div className="w-[120%] h-2 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-blue hidden lg:block opacity-50" />
                        </div>

                        <div className="bg-brand-blue text-white p-6 rounded-[2.5rem] shadow-xl text-center border-2 border-brand-yellow scale-100">
                            <p className="text-xl md:text-2xl font-black leading-tight">
                                המידע חייב להיות זהה! <br />
                                <span className="text-brand-yellow text-lg md:text-xl">ללא "טלפון שבור"</span>
                            </p>
                        </div>
                    </div>

                    {/* Customer & Office Sync Node */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="space-y-12"
                    >
                        {/* Customer sub-node */}
                        <div className="bg-white p-6 rounded-[2.5rem] shadow-md border-2 border-red-500 flex items-center gap-6">
                            <div className="bg-red-50 p-4 rounded-full">
                                <UserCheck size={40} className="text-red-500" />
                            </div>
                            <div>
                                <h4 className="text-xl md:text-2xl font-black text-red-500">הדיווח ללקוח</h4>
                                <p className="text-lg md:text-xl font-bold text-gray-600 italic">"ייאמר בדיוק מה שקורה"</p>
                            </div>
                        </div>

                        <div className="flex justify-center scale-100">
                            <ArrowRightLeft size={32} className="text-brand-yellow" />
                        </div>

                        {/* Office sub-node */}
                        <div className="bg-white p-6 rounded-[2.5rem] shadow-md border-2 border-brand-blue flex items-center gap-6">
                            <div className="bg-blue-50 p-4 rounded-full">
                                <Headphones size={40} className="text-brand-blue" />
                            </div>
                            <div>
                                <h4 className="text-xl md:text-2xl font-black text-brand-blue">הדיווח לנציגה</h4>
                                <p className="text-lg md:text-xl font-bold text-gray-600 italic">"ייכתב בדיוק מה שנאמר"</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Final Warning/Rule Box - Shrunk to fit */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 bg-red-50 border-4 border-red-500 p-6 md:p-8 rounded-[3rem] relative overflow-hidden"
                >
                    <div className="absolute top-4 right-4 text-red-100 opacity-20">
                        <Radio size={80} />
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-red-600 text-center relative z-10 leading-tight">
                        "לא ניתן להגיד ללקוח משהו אחד <br />
                        ולנציגה לתת להבין משהו אחר."
                    </p>
                    <p className="text-xl md:text-2xl font-black text-red-500/80 text-center mt-4">
                        שיקוף מלא = אמון מלא
                    </p>
                </motion.div>
            </main>
        </div>
    );
};

export default CommunicationTriangleSlide;
