import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, MessageCircle, ArrowLeft, Lightbulb } from 'lucide-react';

const PracticeSection = ({ step }) => {
    // slide 12 & 13: תרגול ישיבה
    if (step === 0 || step === 1) {
        const isHotline = step === 0;
        return (
            <div className="h-full w-full bg-white flex flex-col p-12">
                <header className="flex justify-between items-start mb-12">
                    <div className="bg-brand-yellow px-8 py-3 rounded-full text-2xl font-black shadow-md">תרגול ישיבה</div>
                    <h2 className="text-5xl font-black text-brand-blue">
                        {isHotline ? "סיטואציה: לקוחה כועסת (מוקד)" : "סיטואציה: ביקור שטח מורכב"}
                    </h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-1 items-stretch">
                    <div className="space-y-8">
                        <div className="bg-red-50 p-8 rounded-[3rem] border-2 border-red-100 italic text-2xl text-gray-700 shadow-inner">
                            {isHotline ?
                                '"סיטואציה: לקוחה מתקשרת בכעס: אספקה התעכבה / תקלה חוזרת / תחושת זלזול"' :
                                '"סיטואציה: נציג שטח מגיע לבית, הלקוח מתוסכל / חסר סבלנות / חושש"'
                            }
                        </div>

                        <div className="bg-brand-blue/5 p-8 rounded-[3rem] border-2 border-brand-blue/10">
                            <h3 className="text-2xl font-black text-brand-blue mb-6 flex items-center gap-3">
                                <Lightbulb className="text-brand-yellow" />
                                {isHotline ? "מטרה בתרגול" : "עקרונות פעולה"}
                            </h3>
                            <ul className="grid grid-cols-1 gap-4 text-xl font-bold">
                                {isHotline ? [
                                    "להוריד מתח",
                                    "לשדר שליטה ואכפתיות",
                                    "לא לוותר על גבולות"
                                ].map((t, i) => <li key={i} className="flex items-center gap-3"><div className="w-2 h-2 bg-brand-blue rounded-full" />{t}</li>) :
                                    [
                                        "להסביר לפני שמתחילים",
                                        "לשתף גם כשלא הכול פתיר מיד",
                                        "להשאיר סדר ובהירות"
                                    ].map((t, i) => <li key={i} className="flex items-center gap-3"><div className="w-2 h-2 bg-brand-green rounded-full" />{t}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-brand-dark-blue p-10 rounded-[4rem] text-white shadow-2xl flex flex-col justify-center">
                        <h3 className="text-3xl font-black text-brand-yellow mb-8 underline decoration-brand-yellow underline-offset-8">מבנה שיחה מומלץ</h3>
                        <div className="space-y-6 text-2xl">
                            {isHotline ? [
                                "1. הכרה ברגש – \"אני שומעת כמה זה מתסכל\"",
                                "2. אחריות – \"אני כאן כדי לטפל בזה\"",
                                "3. צעד ברור – \"אלה האפשרויות כרגע\"",
                                "4. סגירה – \"אני חוזרת אלייך עם עדכון ביום _\""
                            ].map((t, i) => <p key={i} className="font-hand text-3xl">{t}</p>) :
                                [
                                    "\"אני רוצה להסביר לך מה אני בודק עכשיו\"",
                                    "\"זה מה שאני יכול לפתור כרגע, וזה הצעד הבא\"",
                                    "\"אני דואג שתדע בדיוק איפה זה עומד\""
                                ].map((t, i) => <p key={i} className="font-hand text-3xl">{t}</p>)}
                        </div>

                        <div className="mt-12 bg-white/10 p-6 rounded-2xl border border-white/20">
                            <p className="text-xl font-bold text-brand-yellow">שאלת דיון:</p>
                            <p className="text-2xl font-black italic">
                                {isHotline ? "מה גרם ללקוחה להירגע – המילים או הטון?" : "מה גורם ללקוח להרגיש בידיים טובות?"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // slides 19-23: תסריטי שיחה
    const scripts = [
        {
            id: 19, title: "תסריט 1: פנייה ראשונית", desc: "בעיה במוצר - קודם רגש, אחר כך פתרון", points: [
                "\"אני שומעת אותך, וזה באמת מאכזב כשמשהו בבית לא מרגיש נכון\"",
                "\"בואי נבין יחד מה לא עובד כמו שצריך\"",
                "\"המטרה שלנו היא שהמוצר ישתלב בבית שלך בנוחות\"",
                "\"אני בודקת עכשיו מה האפשרויות ומלווה אותך עד לפתרון\""
            ]
        },
        {
            id: 20, title: "תסריט 2: לקוחה כועסת", desc: "עיכוב/תקלה חוזרת - מובילים את השיחה", points: [
                "\"אני מבינה את הכעס שלך, זה באמת מתסכל\"",
                "\"אני לוקחת אחריות על הטיפול עכשיו\"",
                "\"אלה האפשרויות שעומדות בפנינו כרגע\"",
                "\"אני מתחייבת לעדכן אותך ביום _\""
            ]
        },
        {
            id: 21, title: "תסריט 3: הצבת גבול", desc: "גבול ברור + יחס אנושי", points: [
                "\"אני מבינה למה זה חשוב לך\"",
                "\"במסגרת האחריות, זה הפתרון שאנחנו יכולים להציע\"",
                "\"אני מסבירה בדיוק למה, כדי שיהיה ברור ושקוף\"",
                "\"אני נשארת איתך בתהליך ומלווה עד הסיום\""
            ]
        },
        {
            id: 22, title: "תסריט 4: ביקור שטח מורכב", desc: "שקיפות יוצרת ביטחון", points: [
                "\"אני מבין את התסכול, וזה טבעי אחרי כמה ביקורים\"",
                "\"אני רוצה להסביר מה אני בודק היום\"",
                "\"זה מה שאני יכול לפתור עכשיו, וזה הצעד הבא\"",
                "\"אני דואג שתצא מכאן עם תמונה ברורה\""
            ]
        },
        {
            id: 23, title: "תסריט 5: סיום נכון", desc: "סגירת חוויה וחיזוק אמון", points: [
                "\"נסכם רגע מה טופל ומה יקרה בהמשך\"",
                "\"אם יעלה משהו נוסף – אנחנו כאן בשבילך\"",
                "\"חשוב לנו שתצא/י עם תחושה טובה ובית מסודר\""
            ]
        },
    ];

    const currentScript = scripts.find(s => s.id === (step + 17)) || scripts[0];

    return (
        <div className="h-full w-full bg-brand-blue text-white flex flex-col p-12 overflow-hidden">
            <h2 className="text-5xl font-black mb-12 text-center text-brand-yellow drop-shadow-lg">
                {currentScript.title}
            </h2>

            <div className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
                <motion.div
                    key={currentScript.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white text-brand-black p-12 rounded-[4rem] shadow-2xl w-full relative"
                >
                    <div className="absolute -top-6 right-10 bg-brand-yellow text-brand-black px-6 py-2 rounded-full font-black text-xl">
                        {currentScript.desc}
                    </div>

                    <div className="space-y-8">
                        {currentScript.points.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.2 }}
                                className="flex items-start gap-6 group"
                            >
                                <div className="bg-brand-blue/10 p-3 rounded-full text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                    <MessageCircle size={32} />
                                </div>
                                <p className="text-3xl font-bold leading-relaxed">{p}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <div className="mt-12 flex gap-4 text-brand-yellow font-black text-2xl italic">
                    <Shield size={32} />
                    <span>שומרים על סיפור האהבה הישראלי</span>
                </div>
            </div>
        </div>
    );
};

export default PracticeSection;
