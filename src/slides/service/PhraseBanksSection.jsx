import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Sofa, Heart, MessageCircle, Sparkles, AlertCircle, CheckCircle2, Home, Settings, ArrowRight, HeartPulse } from 'lucide-react';
import Logo from '../../components/Logo';
import PersonaAvatars from './PersonaAvatars';

const PhraseBanksSection = ({ step }) => {
    // slide 15: חיבור מיתוג למוצרים
    if (step === 0) {
        return (
            <div className="h-full w-full bg-white flex flex-col p-12 relative overflow-hidden" dir="rtl">
                {/* Integrated Logo */}
                <div className="absolute top-8 left-8 opacity-30">
                    <Logo size="small" />
                </div>

                <header className="mb-12 text-center">
                    <h2 className="text-6xl md:text-8xl font-black text-brand-blue mb-6 tracking-tighter leading-none">לחבר <span className="text-brand-yellow">לבית</span></h2>
                    <p className="text-3xl md:text-4xl text-brand-dark-blue font-black opacity-90 leading-tight">אנחנו מוכרים רגעי אהבה</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto flex-1 items-center">
                    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-brand-blue/5 p-10 rounded-[4rem] border-r-[16px] border-brand-blue shadow-xl relative">
                        <div className="absolute -top-12 -right-12">
                            <PersonaAvatars type="home" size={80} label="" />
                        </div>
                        <h3 className="text-4xl font-black text-brand-blue mb-8 tracking-tight">איך מדברים על המוצר?</h3>
                        <div className="space-y-6">
                            {[
                                "הריהוט שלנו נבחר כדי ללוות את הבית שלך לשנים",
                                "חשוב לנו שהמוצר ישתלב בבית וירגיש טבעי ונוח",
                                "שמרת הזורע זה בית שחיים בו • והכול צריך לעבוד"
                            ].map((p, i) => (
                                <p key={i} className="text-2xl font-black text-gray-700 bg-white p-6 rounded-[2rem] shadow-sm leading-tight italic border-2 border-gray-50">
                                    "{p}"
                                </p>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-red-50 p-10 rounded-[4rem] border-r-[16px] border-red-500 shadow-xl relative">
                        <div className="absolute -top-12 -left-12">
                            <PersonaAvatars type="customer" size={80} label="" delay={0.5} />
                        </div>
                        <h3 className="text-4xl font-black text-red-600 mb-8 tracking-tight">כשמשהו לא עובד...</h3>
                        <div className="space-y-6">
                            {[
                                "כמו בבית • כשמשהו לא יושב טוב, מטפלים בזה",
                                "המוצר אמור לשרת אותך בנוחות, ואם לא • אנחנו כאן",
                                "סיפור אהבה נבנה גם ברגעי מורכבים • אנחנו איתך"
                            ].map((p, i) => (
                                <p key={i} className="text-2xl font-black text-gray-700 bg-white p-6 rounded-[2rem] shadow-sm leading-tight italic border-2 border-gray-50">
                                    "{p}"
                                </p>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="mt-12 text-center bg-brand-yellow text-brand-blue px-16 py-8 rounded-[3rem] inline-block mx-auto text-4xl font-black shadow-xl border-4 border-white/20">
                    השיחה על המוצר היא שיחה על הבית
                </div>
            </div>
        );
    }

    // slide 16: בנק משפטים למוקד
    if (step === 1) {
        return (
            <div className="h-full w-full bg-gray-50 flex flex-col p-12 relative overflow-hidden" dir="rtl">
                <div className="absolute top-8 left-8 opacity-20">
                    <Logo size="small" />
                </div>

                <h2 className="text-6xl md:text-8xl font-black text-brand-blue mb-16 tracking-tighter leading-none text-center">בנק משפטים: <span className="text-brand-yellow">מוקד</span></h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
                    {[
                        {
                            title: "פתיחה", icon: MessageCircle, phrases: [
                                "שימחה שפנית אלינו • בואי נבדוק יחד",
                                "כאן ללוות אותך בפתרון שמתאים לבית",
                                "חשוב לי להבין אותך לפני שנציע פתרון"
                            ]
                        },
                        {
                            title: "טיפול", icon: Sparkles, phrases: [
                                "מטפלת בזה עבורך ומעדכנת אותך",
                                "גם אם זה לוקח זמן • את לא לבד",
                                "בודקת מול הגורמים ומעדכנת"
                            ]
                        },
                        {
                            title: "קושי", icon: AlertCircle, phrases: [
                                "מבינה את האכזבה • זה לא נעים",
                                "המטרה שלי שתהיי שלמה עם הסיכום",
                                "לא מתעלמת מהקושי • אני כאן"
                            ]
                        },
                        {
                            title: "סיום", icon: CheckCircle2, phrases: [
                                "נסכם כדי שיהיה לך ברור מה קורה",
                                "כאן גם בהמשך • אם תצטרכי",
                                "חשוב לנו שתשתרגישי בטוחה"
                            ]
                        },
                    ].map((group, i) => (
                        <motion.div key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-[3rem] shadow-xl border-b-[12px] border-brand-blue/20 relative">
                            <h3 className="text-3xl font-black text-brand-blue mb-6 flex items-center gap-4">
                                <group.icon size={40} />
                                {group.title}
                            </h3>
                            <div className="space-y-4">
                                {group.phrases.map((p, j) => (
                                    <p key={j} className="text-xl font-black text-gray-700 border-r-4 border-brand-yellow pr-4 leading-tight">{p}</p>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    // slide 17: בנק משפטים לשטח
    return (
        <div className="h-full w-full bg-brand-green/5 flex flex-col p-12 relative overflow-hidden" dir="rtl">
            <div className="absolute top-8 right-8 opacity-20 bg-white p-3 rounded-2xl">
                <Logo size="small" />
            </div>

            <h2 className="text-6xl md:text-8xl font-black text-brand-dark-blue mb-16 tracking-tighter leading-none text-center">בנק משפטים: <span className="text-brand-green">שטח</span></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
                {[
                    {
                        title: "כניסה", icon: Home, phrases: [
                            "שלום • אני _ • באתי לעזור",
                            "רוצה להסביר מה אני בודק",
                            "הבית שלך חשוב לנו • נעבוד מסודר"
                        ]
                    },
                    {
                        title: "עבודה", icon: Settings, phrases: [
                            "זה מה שאני רואה • אסביר הכל",
                            "יש כאן תקלה שדורשת טיפול",
                            "המטרה שתדע בדיוק מה המצב"
                        ]
                    },
                    {
                        title: "אתגר", icon: HeartPulse, phrases: [
                            "מבין את התסכול • זה טבעי",
                            "נעשה סדר במה שאפשר לפתור",
                            "כאן כדי להשאיר אותך בביטחון"
                        ]
                    },
                    {
                        title: "יציאה", icon: ArrowRight, phrases: [
                            "נסכם מה בוצע ומה הצעד הבא",
                            "אם יעלה משהו נוסף – אנחנו כאן",
                            "חשוב לנו שתהנה מהפיתרון"
                        ]
                    },
                ].map((group, i) => (
                    <motion.div key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-[3rem] shadow-xl border-b-[12px] border-brand-green/20 relative">
                        <div className="absolute -top-10 -right-4">
                            <group.icon size={60} className="text-brand-green/10" />
                        </div>
                        <h3 className="text-3xl font-black text-brand-dark-blue mb-6 border-b-2 border-brand-green/5 pb-2">
                            {group.title}
                        </h3>
                        <div className="space-y-4">
                            {group.phrases.map((p, j) => (
                                <p key={j} className="text-xl font-black text-gray-700 border-r-4 border-brand-yellow pr-4 leading-tight">{p}</p>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PhraseBanksSection;
