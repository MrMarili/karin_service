import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Target, Star, BookmarkCheck, HeartHandshake, ShieldCheck } from 'lucide-react';
import Logo from '../../components/Logo';

const LanguagePrinciplesSlide = () => {
    const magicWords = [
        "מבינה את הצורך", "אני אדאג לזה", "בשמחה", "מחוברת אליך", "חשוב לי שתדע/י", "בידיים טובות"
    ];

    const principles = [
        { text: "שמרת הזורע היא בית", icon: ShieldCheck, color: "text-brand-blue" },
        { text: "פשטות וישירות", icon: Target, color: "text-brand-yellow" },
        { text: "אחריות מלאה: 'הכדור אצלי'", icon: BookmarkCheck, color: "text-brand-green" },
        { text: "חיבור חם ואישי", icon: HeartHandshake, color: "text-red-500" }
    ];

    return (
        <div className="h-full w-full bg-white flex flex-col p-16 relative overflow-hidden" dir="rtl">
            {/* Logo in top right as requested */}
            <div className="absolute top-12 right-12 scale-125 z-20">
                <Logo />
            </div>

            <main className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center gap-12">
                <header className="pt-20">
                    <motion.h1
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-6xl md:text-[8.5rem] font-black text-brand-dark-blue tracking-tighter leading-none whitespace-nowrap"
                    >
                        עקרונות <span className="text-brand-blue">שפת השרות</span>
                    </motion.h1>
                    <div className="w-64 h-4 bg-brand-yellow mt-6 rounded-full" />
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    {/* Visual Timeline/Step structure for principles */}
                    <div className="lg:col-span-7 space-y-10">
                        {principles.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.15 }}
                                className="group flex items-center gap-12 bg-gray-50 p-12 rounded-full border-4 border-transparent hover:border-brand-blue/20 hover:bg-white hover:shadow-2xl transition-all"
                            >
                                <div className={`bg-white p-8 rounded-full shadow-lg group-hover:scale-125 transition-transform ${p.color}`}>
                                    <p.icon size={60} />
                                </div>
                                <span className="text-4xl md:text-6xl font-black text-brand-dark-blue tracking-tighter">
                                    {p.text}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Speech Bubbles for Magic Words */}
                    <div className="lg:col-span-5 grid grid-cols-1 gap-12 relative">
                        <div className="absolute inset-0 bg-brand-blue/5 rounded-[6rem] -rotate-2" />
                        <div className="bg-white p-16 rounded-[6rem] border-8 border-brand-blue/10 shadow-3xl relative z-10 flex flex-col gap-10">
                            <h3 className="text-5xl md:text-6xl font-black text-brand-blue mb-6 flex items-center gap-6">
                                <MessageSquare className="text-brand-yellow" size={60} /> מילות הקסם:
                            </h3>
                            <div className="flex flex-wrap gap-6">
                                {magicWords.map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.6 + (i * 0.1) }}
                                        className="bg-brand-blue text-white px-10 py-5 rounded-3xl text-3xl md:text-4xl font-black shadow-xl hover:bg-brand-yellow hover:text-brand-blue transition-colors cursor-default"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Tagline - Larger, Higher, and Blinking */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                    opacity: [1, 0.3, 1],
                    y: 0
                }}
                transition={{
                    delay: 1.2,
                    opacity: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                className="w-full text-center mt-8 mb-32 z-30"
            >
                <div className="text-6xl md:text-[7.5rem] font-black text-brand-blue tracking-tighter drop-shadow-2xl flex flex-col items-center gap-4">
                    <span>סיפור אהבה ישראלי לא נבנה בפרסומות</span>
                    <span className="text-brand-yellow drop-shadow-[0_0_30px_rgba(255,200,69,0.4)]">אלא בשיחות הקטנות!</span>
                </div>
            </motion.div>
        </div>
    );
};

export default LanguagePrinciplesSlide;
