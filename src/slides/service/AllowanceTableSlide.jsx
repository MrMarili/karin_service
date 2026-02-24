import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import Logo from '../../components/Logo';

const AllowanceTableSlide = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const comparisons = [
        {
            old: "אני יכולה לפצות אותך בכריות שינה",
            new: "אשמח להעניק שי לשיפור התחושה זוג כריות שינה",
            context: "שיפור התחושה במקום המילה 'פיצוי'"
        },
        {
            old: "אין לי מה לעשות עם זה",
            new: "בוא נראה איך אני יכולה לעזור",
            context: "חיפוש פתרון במקום הצבת חומה"
        },
        {
            old: "המדיניות שלנו אומרת ש...",
            new: "חשוב לי להסביר איך זה עובד עבורך",
            context: "הסבר בגובה העיניים במקום הסתתרות מאחורי נהלים"
        },
        {
            old: "נדבר איתך כשתהיה תשובה",
            new: "אחזור אליך ביום חמישי עם עדכון",
            context: "יצירת ודאות ומחויבות לזמנים"
        }
    ];

    const nextCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % comparisons.length);
        }, 150);
    };

    const prevCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + comparisons.length) % comparisons.length);
        }, 150);
    };

    return (
        <div className="h-full w-full bg-white flex flex-col p-8 md:p-16 relative overflow-hidden select-none" dir="rtl">
            <div className="absolute top-8 md:top-12 right-8 md:right-12 scale-110 md:scale-125 z-10">
                <Logo />
            </div>

            <main className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center items-center">
                <header className="mb-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-7xl font-black text-brand-blue tracking-tighter leading-tight"
                    >
                        מותר ואסור: <br />
                        <span className="text-brand-yellow drop-shadow-sm">משנים את השפה</span>
                    </motion.h1>
                    <p className="text-2xl font-bold text-gray-500 mt-4 italic">לחצו על הכרטיסייה כדי לראות את השינוי</p>
                </header>

                <div className="relative w-full max-w-4xl aspect-[16/9] perspective-1000">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="w-full h-full cursor-pointer relative preserve-3d transition-all duration-500"
                            onClick={() => setIsFlipped(!isFlipped)}
                        >
                            <motion.div
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="w-full h-full relative preserve-3d shadow-2xl rounded-[4rem] border-8 border-white"
                            >
                                {/* FRONT: WHAT NOT TO SAY */}
                                <div className={`absolute inset-0 backface-hidden bg-red-50 flex flex-col items-center justify-center p-12 text-center rounded-[3.5rem] border-4 border-red-200`}>
                                    <XCircle size={100} className="text-red-500 mb-8" />
                                    <h4 className="text-3xl font-black text-red-400 mb-4 uppercase tracking-widest">אסור להגיד:</h4>
                                    <p className="text-5xl md:text-6xl font-black text-red-600 leading-tight italic line-through decoration-red-900/30">
                                        "{comparisons[currentIndex].old}"
                                    </p>
                                    <div className="mt-12 bg-white/50 px-8 py-3 rounded-full text-red-500 font-bold border border-red-100">
                                        לחצי להיפוך השפה {'>'}
                                    </div>
                                </div>

                                {/* BACK: WHAT TO SAY */}
                                <div className={`absolute inset-0 backface-hidden bg-brand-green flex flex-col items-center justify-center p-12 text-center rounded-[3.5rem] border-4 border-white/20 text-white transform rotateY-180`}>
                                    <CheckCircle2 size={100} className="text-white mb-8" />
                                    <h4 className="text-3xl font-black text-white/70 mb-4 uppercase tracking-widest">צריך להגיד:</h4>
                                    <p className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-lg">
                                        "{comparisons[currentIndex].new}"
                                    </p>
                                    <div className="mt-12 bg-white text-brand-green px-10 py-4 rounded-full text-2xl font-black shadow-xl">
                                        {comparisons[currentIndex].context}
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                                        className="mt-6 text-white/60 hover:text-white flex items-center gap-2 font-bold"
                                    >
                                        <RotateCcw size={20} /> חזרה ל"לפני"
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons inside the slide */}
                    <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-12">
                        <button
                            onClick={prevCard}
                            className="p-4 rounded-full bg-gray-100 text-brand-blue hover:bg-brand-blue hover:text-white transition-all shadow-md"
                        >
                            <ArrowRight size={32} />
                        </button>

                        <div className="text-2xl font-black text-brand-blue">
                            {currentIndex + 1} / {comparisons.length}
                        </div>

                        <button
                            onClick={nextCard}
                            className="p-4 rounded-full bg-gray-100 text-brand-blue hover:bg-brand-blue hover:text-white transition-all shadow-md"
                        >
                            <ArrowLeft size={32} />
                        </button>
                    </div>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotateY-180 { transform: rotateY(180deg); }
            `}} />
        </div>
    );
};

export default AllowanceTableSlide;
