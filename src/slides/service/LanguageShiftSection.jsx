import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import Logo from '../../components/Logo';
import PersonaAvatars from './PersonaAvatars';

const LanguageShiftSection = ({ step }) => {
    // slide 3: פתיחת פנייה
    if (step === 0) {
        return (
            <div className="h-full w-full bg-white flex flex-col p-12 relative overflow-hidden" dir="rtl">
                {/* Integrated Logo */}
                <div className="absolute top-8 left-8 opacity-30">
                    <Logo size="small" />
                </div>

                <h2 className="text-6xl md:text-8xl font-black text-brand-blue mb-16 text-center tracking-tighter leading-none">פתיחת פנייה: <br /> <span className="text-brand-yellow">מילים של בית</span></h2>

                <div className="grid grid-cols-2 gap-8 flex-1 items-center max-w-7xl mx-auto w-full">
                    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-gray-100 p-8 rounded-[4rem] border-2 border-dashed border-gray-200 relative shadow-inner">
                        <PersonaAvatars type="customer" size={70} className="absolute -top-12 -right-12 grayscale opacity-40" label="" />
                        <h3 className="text-4xl font-black text-gray-400 mb-8 flex items-center gap-4 italic line-through decoration-red-500/80 decoration-4">
                            שפה ישנה
                        </h3>
                        <div className="space-y-6 text-2xl md:text-3xl font-bold text-gray-400">
                            <p className="bg-white p-6 rounded-3xl shadow-sm italic">"פתחתי לך קריאה"</p>
                            <p className="bg-white p-6 rounded-3xl shadow-sm italic">"אני אבדוק"</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-brand-blue/5 p-8 rounded-[4rem] border-8 border-brand-yellow/10 relative shadow-xl">
                        <div className="absolute -top-12 -left-12">
                            <PersonaAvatars type="phone" size={90} label="" delay={0.5} />
                        </div>
                        <h3 className="text-4xl font-black text-brand-blue mb-8 flex items-center gap-4">
                            <CheckCircle2 className="text-brand-green" size={50} />
                            שפה חדשה
                        </h3>
                        <div className="space-y-6 text-3xl md:text-4xl font-black text-brand-dark-blue leading-tight tracking-tight">
                            <p className="bg-white p-8 rounded-[3rem] shadow-lg border-r-[12px] border-brand-yellow">"אני כאן איתך, בואי נבין יחד מה קורה"</p>
                            <p className="bg-white p-8 rounded-[3rem] shadow-lg border-r-[12px] border-brand-yellow">"אני מלווה אותך עד למציאת פתרון"</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // slide 4: בזמן טיפול
    if (step === 1) {
        return (
            <div className="h-full w-full bg-brand-blue text-white flex flex-col p-12 relative overflow-hidden" dir="rtl">
                {/* Integrated Logo */}
                <div className="absolute top-8 left-8 opacity-20">
                    <Logo variant="white" size="small" />
                </div>

                <h2 className="text-6xl md:text-8xl font-black mb-16 text-center tracking-tighter leading-none">בזמן טיפול: <br /> <span className="text-brand-yellow">שקיפות היא ביטחון</span></h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-1 items-center max-w-7xl mx-auto w-full">
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/5 p-10 rounded-[3rem] backdrop-blur-md border border-white/10 relative">
                        <h3 className="text-4xl font-black text-white/30 mb-6 italic">איך נשמענו פעם?</h3>
                        <ul className="space-y-6 text-2xl md:text-3xl text-white/50 list-none font-bold">
                            <li className="flex items-center gap-4 italic line-through">
                                <XCircle size={40} className="shrink-0" />
                                "זה בטיפול"
                            </li>
                            <li className="flex items-center gap-4 italic line-through">
                                <XCircle size={40} className="shrink-0" />
                                "מחכים לתשובה"
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white p-10 rounded-[3rem] shadow-2xl relative border-8 border-brand-yellow/20">
                        <div className="absolute -top-12 -left-12">
                            <PersonaAvatars type="star" size={80} label="שקיפות" delay={0.8} />
                        </div>
                        <h3 className="text-4xl font-black text-brand-blue mb-8 tracking-tight">איך אנחנו נשמעים היום?</h3>
                        <div className="space-y-6 text-3xl font-black text-brand-black leading-tight">
                            <div className="flex gap-4 items-start bg-gray-50 p-6 rounded-[2rem] border-r-8 border-brand-yellow">
                                <div className="text-brand-blue shrink-0 font-black">1.</div>
                                <p>"הנושא בטיפול, ואני חוזרת אלייך עם עדכון ביום _"</p>
                            </div>
                            <div className="flex gap-4 items-start bg-gray-50 p-6 rounded-[2rem] border-r-8 border-brand-blue">
                                <div className="text-brand-blue shrink-0 font-black">2.</div>
                                <p>"אני בודקת מול הגורמים ומעדכנת אותך – את לא צריכה לרדוף"</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // slide 11: One Pager
    return (
        <div className="h-full w-full bg-gray-50 flex flex-col p-12 overflow-hidden relative" dir="rtl">
            <h2 className="text-6xl md:text-8xl font-black text-brand-blue mb-6 text-center tracking-tighter leading-none">מותר / אסור <span className="text-brand-yellow">בשירות</span></h2>
            <p className="text-3xl md:text-4xl text-brand-dark-blue mb-12 text-center font-black tracking-tight">המדריך המהיר לשפה של בית</p>

            <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto w-full flex-1 items-start">
                <div className="space-y-6">
                    <div className="bg-red-500 text-white p-6 rounded-[2.5rem] flex items-center justify-between shadow-lg">
                        <h3 className="text-4xl font-black tracking-tighter">❌ לא אומרים</h3>
                        <XCircle size={40} />
                    </div>
                    {[
                        "זה לא באחריות",
                        "ככה זה מגיע",
                        "אני לא יכולה לעזור",
                        "זה לא קשור אלינו"
                    ].map((txt, i) => (
                        <motion.div key={i} whileHover={{ x: -10 }} className="bg-white p-6 rounded-3xl shadow-md border-r-8 border-red-100 text-2xl font-bold text-gray-300 italic line-through">
                            {txt}
                        </motion.div>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="bg-brand-green text-white p-6 rounded-[2.5rem] flex items-center justify-between shadow-lg">
                        <h3 className="text-4xl font-black tracking-tighter">✅ אומרים וצריכים</h3>
                        <CheckCircle2 size={40} />
                    </div>
                    {[
                        "אני בודקת ולוקחת אחריות",
                        "נבין מה הפתרון הנכון אצלנו",
                        "אני כאן ללוות אותך עד לסיום",
                        "מה שהלקוח יקבל זה מה שיקרה"
                    ].map((txt, i) => (
                        <motion.div key={i} whileHover={{ x: 10 }} className="bg-white p-6 rounded-3xl shadow-xl border-r-8 border-brand-green text-2xl font-black text-brand-dark-blue leading-tight">
                            {txt}
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-8 bg-brand-yellow/10 p-8 rounded-[3rem] border-4 border-brand-yellow text-center shadow-md">
                <p className="text-3xl font-black text-brand-dark-blue leading-tight tracking-tight">
                    לא מחפשים אשמה • מחפשים פתרון שמתאים לבית של הלקוח
                </p>
            </div>
        </div>
    );
};

export default LanguageShiftSection;
