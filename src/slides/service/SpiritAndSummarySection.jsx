import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Heart, Quote, Star, Users, Home } from 'lucide-react';

const SpiritAndSummarySection = ({ step }) => {
    // slide 9: האחריות שלנו
    if (step === 0) {
        return (
            <div className="h-full w-full bg-white flex flex-col items-center justify-center p-12">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-4xl text-center space-y-12">
                    <Shield size={160} className="text-brand-blue mx-auto mb-12" />
                    <h2 className="text-8xl md:text-[10rem] font-black text-brand-dark-blue tracking-tighter leading-none">האחריות שלנו</h2>
                    <div className="space-y-12 text-5xl font-black text-gray-700 leading-tight">
                        <p className="bg-brand-blue/5 p-10 rounded-[3rem] shadow-lg">אנחנו הקול של המותג</p>
                        <p className="bg-brand-blue/5 p-10 rounded-[3rem] shadow-xl border-r-[16px] border-brand-yellow">השפה שלנו היא ההבדל בין לקוח מאוכזב ללקוח שמרגיש בבית</p>
                    </div>
                </motion.div>
            </div>
        );
    }

    // slide 10: סיכום ביניים - בית
    if (step === 1) {
        return (
            <div className="h-full w-full bg-brand-yellow flex flex-col items-center justify-center p-12 text-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <Quote size={160} className="text-white/50 mx-auto mb-12" />
                    <p className="text-7xl md:text-[10rem] font-black text-brand-dark-blue leading-[0.85] max-w-7xl tracking-tighter">
                        סיפור אהבה נבנה <br />
                        <span className="text-white">בשיחות הקטנות.</span>
                    </p>
                    <div className="mt-20 text-7xl md:text-[8rem] font-hand text-brand-blue bg-white/60 px-20 py-12 rounded-full inline-block shadow-2xl">
                        "כשמדברים מהלב – זה מרגיש בית."
                    </div>
                </motion.div>
            </div>
        );
    }

    // slide 14: קוד שפת שירות רשמי
    if (step === 2) {
        return (
            <div className="h-full w-full bg-white flex flex-col p-12 overflow-hidden">
                <h2 className="text-5xl font-black text-brand-blue mb-12 text-center">קוד שפת שירות רשמי</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
                    {[
                        { t: "מדברים בגובה העיניים", d: "בלי שפה משפטית או מתגוננת", i: Users },
                        { t: "לוקחים אחריות", d: "גם כשזה מורכב", i: Shield },
                        { t: "שומרים על גבולות", d: "בכבוד ובהסבר", i: Star },
                        { t: "משדרים בית", d: "חום, סבלנות ונוכחות", i: Home },
                        { t: "סוגרים חוויה", d: "לא רק קריאה", i: Sparkles },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-brand-blue/5 border-t-8 border-brand-blue p-6 rounded-b-3xl flex flex-col items-center text-center gap-4 group hover:bg-brand-blue hover:text-white transition-all duration-500"
                        >
                            <item.i size={40} className="text-brand-blue group-hover:text-brand-yellow transition-colors" />
                            <h3 className="text-2xl font-black">{item.t}</h3>
                            <p className="text-lg opacity-70">{item.d}</p>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-8 text-center text-2xl font-bold text-brand-dark-blue italic underline decoration-brand-yellow decoration-4">
                    שפת השירות שלנו היא ההמשך הישיר של סיפור האהבה הישראלי
                </div>
            </div>
        );
    }

    // slide 18: מסר משותף
    return (
        <div className="h-full w-full bg-brand-dark-blue flex flex-col items-center justify-center p-12 text-center overflow-hidden relative">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="z-10"
            >
                <Heart size={150} className="text-brand-yellow mx-auto mb-12 animate-pulse" />
                <h2 className="text-7xl md:text-9xl font-black text-white leading-tight">
                    אנחנו לא רק <br />
                    מתקנים או עונים
                </h2>
                <p className="text-4xl md:text-6xl font-black text-brand-yellow mt-8 drop-shadow-xl bg-white/5 py-4 px-12 rounded-full">
                    אנחנו שומרים על תחושת הבית.
                </p>
            </motion.div>

            {/* Background floating hearts/icons */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                <Heart className="absolute top-10 left-10" size={100} />
                <Home className="absolute bottom-10 right-10" size={120} />
                <Star className="absolute top-1/2 left-20" size={80} />
            </div>
        </div>
    );
};

export default SpiritAndSummarySection;
