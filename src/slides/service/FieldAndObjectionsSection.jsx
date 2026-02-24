import React from 'react';
import { motion } from 'framer-motion';
import { Home, Ear, ShieldCheck, HeartPulse, HardHat, ArrowLeft, CheckCircle2 } from 'lucide-react';
import PersonaAvatars from './PersonaAvatars';
import Logo from '../../components/Logo';

const FieldAndObjectionsSection = ({ step }) => {
    // slide 5: שירות בשטח
    if (step === 0) {
        return (
            <div className="h-full w-full bg-brand-green/5 flex flex-col p-12 relative overflow-hidden" dir="rtl">
                {/* Integrated Logo */}
                <div className="absolute top-8 left-8 opacity-30">
                    <Logo size="small" />
                </div>

                <h2 className="text-6xl md:text-8xl font-black text-brand-dark-blue mb-16 tracking-tighter leading-none text-center">נכנסים לבית: <br /> <span className="text-brand-green">הלקוח הוא המארח</span></h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto flex-1 items-center">
                    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white p-10 rounded-[3.5rem] shadow-2xl border-l-[16px] border-brand-green relative">
                        <div className="absolute -top-12 -right-12">
                            <PersonaAvatars type="tech" size={90} label="תומר נכנס לבית" delay={0.5} />
                        </div>
                        <h3 className="text-4xl font-black text-brand-green mb-8 flex items-center gap-6 mt-4">
                            <CheckCircle2 size={50} />
                            איך נכנסים?
                        </h3>
                        <div className="space-y-6 text-3xl font-black text-brand-dark-blue leading-tight">
                            <p className="bg-gray-50 p-8 rounded-3xl shadow-inner border border-gray-100 italic">"שלום, אני _ משמרת הזורע, באתי לעזור ולבדוק יחד איתך"</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-brand-dark-blue text-white p-10 rounded-[3.5rem] shadow-2xl border-r-[16px] border-brand-yellow relative">
                        <div className="absolute -top-12 -left-12">
                            <PersonaAvatars type="customer" size={80} label="" delay={0.8} />
                        </div>
                        <h3 className="text-4xl font-black mb-8 text-brand-yellow tracking-tight">משפטים שפותחים דלת:</h3>
                        <div className="space-y-8">
                            <p className="text-3xl font-hand leading-tight text-white/90">"אני רוצה להסביר לך מה אני בודק עכשיו"</p>
                            <div className="h-1 bg-white/10 rounded-full" />
                            <p className="text-3xl font-hand leading-tight text-white/90">"בסיום אני אעשה איתך סדר – מה טופל ומה הצעד הבא"</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // slide 6: שינוי תפיסה בהתנגדויות
    if (step === 1) {
        return (
            <div className="h-full w-full bg-white flex flex-col items-center justify-center p-12 relative overflow-hidden" dir="rtl">
                {/* Integrated Logo */}
                <div className="absolute top-8 right-8 opacity-30">
                    <Logo size="small" />
                </div>

                <h2 className="text-7xl md:text-8xl font-black text-brand-dark-blue mb-16 text-center tracking-tighter leading-none">התנגדות היא <span className="text-red-500 underline decoration-brand-yellow underline-offset-8">חיבור</span></h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                    {[
                        { title: "התנגדות =", val: "אכפתיות הלקוח", icon: HeartPulse, color: "text-red-500", bg: "bg-red-50" },
                        { title: "כעס =", val: "חוסר ביטחון", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
                        { title: "חזרה על טענות =", val: "צורך בהקשבה", icon: Ear, color: "text-brand-blue", bg: "bg-gray-50" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.2, type: "spring" }}
                            whileHover={{ scale: 1.05, y: -10 }}
                            className={`${item.bg} p-10 rounded-[3rem] flex flex-col items-center text-center gap-6 shadow-xl border-b-[12px] border-brand-yellow/10`}
                        >
                            <item.icon size={60} className={item.color} />
                            <h3 className="text-3xl font-black text-gray-400 tracking-tight">{item.title}</h3>
                            <p className="text-4xl font-black text-brand-black leading-tight">{item.val}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-16 bg-brand-blue text-white px-16 py-8 rounded-[3rem] text-4xl font-black shadow-2xl skew-x-1 border-4 border-white/10"
                >
                    "לא לנצח בשיחה – להשאיר תחושת בית"
                </motion.div>
            </div>
        );
    }

    // slide 7: משפטים לטיפול בהתנגדויות
    return (
        <div className="h-full w-full bg-brand-yellow flex flex-col items-center justify-center p-12 relative overflow-hidden" dir="rtl">
            <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-6xl md:text-8xl font-black text-brand-blue mb-12 tracking-tighter leading-none"
            >
                איך עונים להתנגדות?
            </motion.h2>

            <div className="space-y-6 max-w-5xl mx-auto w-full">
                {[
                    { q: "\"זה לא מקובל עליי\"", a: "אני מבינה אותך, בואי נבדוק מה כן אפשר לעשות" },
                    { q: "\"חיכיתי הרבה זמן\"", a: "את צודקת, ההמתנה לא פשוטה – אני כאן כדי לקדם את זה" },
                    { q: "\"אני לא מרוצה מהפתרון\"", a: "חשוב לי שתהיי שלמה, נחשוב יחד על חלופה נכונה" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.2, type: "spring" }}
                        whileHover={{ x: 10 }}
                        className="bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl flex items-center gap-8 border-2 border-white"
                    >
                        <div className="text-3xl text-gray-400 font-black italic w-1/3 text-right tracking-tight leading-tight">
                            {item.q}
                        </div>
                        <ArrowLeft className="text-brand-blue shrink-0 animate-pulse" size={40} />
                        <div className="text-4xl text-brand-dark-blue font-black w-2/3 leading-tight tracking-tight">
                            {item.a}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12">
                <PersonaAvatars type="star" size={60} label="ביטחון ושקיפות" delay={1.2} />
            </div>
        </div>
    );
};

export default FieldAndObjectionsSection;
