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

            <main className="max-w-[100rem] mx-auto w-full flex-1 flex flex-col justify-center relative pt-20">
                <header className="mb-24 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-[9.5rem] font-black text-brand-blue tracking-tighter leading-none whitespace-nowrap"
                    >
                        דיווח אחד, <span className="text-brand-yellow">שפה אחת</span>
                    </motion.h1>
                    <p className="text-4xl md:text-6xl font-black text-brand-dark-blue mt-8 opacity-90">
                        מה שאומרים ללקוח = מה שמדווחים למשרד
                    </p>
                    <div className="w-64 h-4 bg-brand-yellow mx-auto mt-10 rounded-full" />
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-center relative">
                    {/* Field Rep Node */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-white p-16 rounded-[6rem] shadow-[0_45px_100px_rgba(0,0,0,0.2)] border-8 border-brand-green relative z-10 flex flex-col items-center text-center gap-10"
                    >
                        <div className="bg-brand-green/10 p-10 rounded-full scale-125">
                            <HardHat size={120} className="text-brand-green" />
                        </div>
                        <h3 className="text-6xl font-black text-brand-green">נציג שטח</h3>
                        <div className="bg-brand-green text-white px-10 py-4 rounded-full text-3xl font-black">
                            מקור המידע בשטח
                        </div>
                    </motion.div>

                    {/* Central Sync Section */}
                    <div className="flex flex-col items-center gap-12 relative py-16 lg:py-0">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="bg-brand-yellow p-12 rounded-full shadow-[0_0_80px_rgba(255,200,69,0.5)] z-20 relative border-4 border-white"
                        >
                            <ShieldCheck size={120} className="text-brand-blue" />
                        </motion.div>

                        <div className="absolute inset-0 flex items-center justify-center -z-10">
                            <div className="w-[120%] h-4 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-blue hidden lg:block opacity-50" />
                        </div>

                        <div className="bg-brand-blue text-white p-12 rounded-[5rem] shadow-3xl text-center border-8 border-brand-yellow scale-110">
                            <p className="text-4xl md:text-5xl font-black leading-tight">
                                המידע חייב להיות זהה! <br />
                                <span className="text-brand-yellow text-3xl md:text-4xl">ללא "טלפון שבור"</span>
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
                        <div className="bg-white p-12 rounded-[5rem] shadow-2xl border-8 border-red-500 flex items-center gap-10">
                            <div className="bg-red-50 p-6 rounded-full">
                                <UserCheck size={80} className="text-red-500" />
                            </div>
                            <div>
                                <h4 className="text-4xl font-black text-red-500">הדיווח ללקוח</h4>
                                <p className="text-3xl font-bold text-gray-600 italic">"ייאמר בדיוק מה שקורה"</p>
                            </div>
                        </div>

                        <div className="flex justify-center scale-150">
                            <ArrowRightLeft size={60} className="text-brand-yellow" />
                        </div>

                        {/* Office sub-node */}
                        <div className="bg-white p-12 rounded-[5rem] shadow-2xl border-8 border-brand-blue flex items-center gap-10">
                            <div className="bg-blue-50 p-6 rounded-full">
                                <Headphones size={80} className="text-brand-blue" />
                            </div>
                            <div>
                                <h4 className="text-4xl font-black text-brand-blue">הדיווח לנציגה</h4>
                                <p className="text-3xl font-bold text-gray-600 italic">"ייכתב בדיוק מה שנאמר"</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Final Warning/Rule Box */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 bg-red-50 border-8 border-red-500 p-16 rounded-[6rem] relative overflow-hidden"
                >
                    <div className="absolute top-8 right-8 text-red-100 opacity-20">
                        <Radio size={200} />
                    </div>
                    <p className="text-5xl md:text-7xl font-black text-red-600 text-center relative z-10 leading-tight">
                        "לא ניתן להגיד ללקוח משהו אחד <br />
                        ולנציגה לתת להבין משהו אחר."
                    </p>
                    <p className="text-3xl md:text-5xl font-black text-red-500/80 text-center mt-8">
                        שיקוף מלא = אמון מלא
                    </p>
                </motion.div>
            </main>
        </div>
    );
};

export default CommunicationTriangleSlide;
