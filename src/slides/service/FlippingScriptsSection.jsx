import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, RefreshCw, ChevronLeft, ChevronRight, CheckCircle, Shield } from 'lucide-react';

const scripts = [
    {
        id: 1,
        title: "תסריט 1: פנייה ראשונית",
        situation: "לקוחה מתקשרת בכעס: 'הספה הגיעה עם כתם, אני לא מאמינה שזה קורה לי!'",
        brandedResponse: [
            "אני שומעת אותך, וזה באמת מאכזב כשמשהו בבית לא מרגיש נכון",
            "בואי נבין יחד מה לא עובד כמו שצריך",
            "המטרה שלנו היא שהמוצר ישתלב בבית שלך בנוחות",
            "אני בודקת עכשיו מה האפשרויות ומלווה אותך עד לפתרון"
        ]
    },
    {
        id: 2,
        title: "תסריט 2: לקוחה כועסת על עיכוב",
        situation: "לקוח: 'אמרו לי שבועיים ועברו שלושה, אף אחד לא חוזר אליי!'",
        brandedResponse: [
            "אני מבינה את התסכול שלך, זה באמת מתסכל לחכות למשהו לבית",
            "אני לוקחת אחריות על הטיפול עכשיו",
            "אני בודקת מול המחסן ומעדכנת אותך – אתה לא צריך לרדוף",
            "אני חוזרת אליך עם תשובה סופית עד השעה _"
        ]
    },
    {
        id: 3,
        title: "תסריט 3: הצבת גבול ברור",
        situation: "לקוחה דורשת פיצוי לא סביר: 'אני רוצה חצי מחיר חזרה!'",
        brandedResponse: [
            "אני מבינה למה זה חשוב לך לקבל פיצוי על עגמת הנפש",
            "במסגרת האחריות והאפשרויות שלנו, זה הפתרון הכי טוב שאני יכולה להציע",
            "אני מסבירה בדיוק למה, כדי שיהיה לנו ברור ושקוף",
            "חשוב לי שתצאי מהשיחה בתחושת ביטחון ובידיים טובות"
        ]
    },
    {
        id: 4,
        title: "תסריט 4: ביקור שטח מורכב",
        situation: "טכנאי בבית: 'הלקוח עומד מעליי, עצבני וחושש שלא אצליח לתקן'",
        brandedResponse: [
            "אני מבין את החשש שלך, במיוחד אחרי מה שעברת",
            "אני רוצה להסביר לך בדיוק מה אני בודק עכשיו כדי שתהיה שקט",
            "זה מה שאני יכול לפתור כרגע, וזה הצעד הבא שלנו",
            "אני דואג שתדע בדיוק איפה זה עומד לפני שאני יוצא"
        ]
    },
    {
        id: 5,
        title: "תסריט 5: סיום שימוש/נסיעה",
        situation: "סיכום הטיפול והשארת טעם טוב של 'בית'",
        brandedResponse: [
            "בוא נסכם רגע מה טופל ומה השלב הבא",
            "אם יעלה משהו נוסף – אנחנו כאן תמיד בשבילך",
            "חשוב לנו שתהנה מהמוצר ושיהיה לך נוח בבית",
            "שמחתי לעזור, המשך יום נעים ושקט"
        ]
    }
];

const FlippingScriptsSection = () => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const next = () => {
        setIsFlipped(false);
        setCurrentIdx((prev) => (prev + 1) % scripts.length);
    };

    const prev = () => {
        setIsFlipped(false);
        setCurrentIdx((prev) => (prev - 1 + scripts.length) % scripts.length);
    };

    const script = scripts[currentIdx];

    return (
        <div className="h-full w-full bg-brand-blue flex flex-col items-center justify-center p-16 overflow-hidden text-right" dir="rtl">
            <h2 className="text-7xl md:text-9xl font-black text-brand-yellow mb-20 drop-shadow-2xl tracking-tighter leading-none text-center">תסריטי שירות של בית</h2>

            <div className="flex items-center gap-16 w-full max-w-7xl flex-1 justify-center">
                <button onClick={prev} className="bg-white/10 hover:bg-white/20 p-8 rounded-full text-white transition-all shadow-xl">
                    <ChevronRight size={100} />
                </button>

                <div className="relative w-full aspect-video perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                    <motion.div
                        className="w-full h-full relative preserve-3d transition-all duration-700"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                    >
                        {/* Front: Situation */}
                        <div className="absolute inset-0 backface-hidden bg-white rounded-[5rem] p-20 shadow-2xl flex flex-col justify-center border-[12px] border-brand-yellow/30">
                            <div className="absolute top-12 right-12 bg-red-100 text-red-600 px-10 py-4 rounded-full font-black text-4xl shadow-md">סיטואציה מאתגרת</div>
                            <h3 className="text-5xl font-black text-brand-blue mb-16 opacity-50">{script.title}</h3>
                            <p className="text-6xl md:text-7xl font-black text-gray-700 italic leading-tight text-center">
                                "{script.situation}"
                            </p>
                            <div className="mt-20 flex items-center justify-center gap-6 text-brand-blue animate-pulse">
                                <RefreshCw size={60} />
                                <span className="text-4xl font-black">לחצו לראות את התגובה...</span>
                            </div>
                        </div>

                        {/* Back: Branded Response */}
                        <div className="absolute inset-0 backface-hidden bg-white rounded-[5rem] p-20 shadow-2xl flex flex-col justify-center border-[12px] border-brand-green/30 rotate-y-180">
                            <div className="absolute top-12 right-12 bg-brand-green/10 text-brand-green px-10 py-4 rounded-full font-black text-4xl flex items-center gap-4 shadow-md">
                                <CheckCircle size={40} />
                                התגובה הממותגת שלנו
                            </div>
                            <div className="space-y-10">
                                {script.brandedResponse.map((line, i) => (
                                    <div key={i} className="flex items-start gap-8">
                                        <div className="bg-brand-blue/10 p-6 rounded-full text-brand-blue shrink-0">
                                            <MessageCircle size={60} />
                                        </div>
                                        <p className="text-5xl md:text-6xl font-black text-brand-dark-blue leading-tight">{line}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                <button onClick={next} className="bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-all">
                    <ChevronLeft size={64} />
                </button>
            </div>

            <div className="mt-12 flex gap-4">
                {scripts.map((_, i) => (
                    <div key={i} className={`w-4 h-4 rounded-full transition-all ${i === currentIdx ? 'bg-brand-yellow w-12' : 'bg-white/30'}`} />
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            ` }} />
        </div>
    );
};

export default FlippingScriptsSection;
