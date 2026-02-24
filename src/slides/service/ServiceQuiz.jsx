import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Timer, ArrowRight, BarChart2, ArrowLeft, RefreshCw } from 'lucide-react';
import { socket } from '../../socket';
import { QRCodeSVG } from 'qrcode.react';

const quizData = [
    {
        question: "לקוחה מתקשרת ואומרת \"קיבלתי מוצר פגום!\". מה הדבר הראשון שנגיד?",
        correct: "אני שומעת אותך, וזה באמת מאכזב כשמשהו בבית לא מרגיש נכון",
        distractors: [
            "אני פותחת לך קריאה טכנית, אל תדאגי",
            "כנראה זה קרה בהובלה, נבדוק מי אשם",
            "תשלחי צילום של הפגם לווטסאפ שלנו"
        ]
    },
    {
        question: "איך נציג את עצמנו כשנכנסים לבית הלקוח?",
        correct: "שלום, אני _ משמרת הזורע, באתי לעזור ולבדוק יחד איתך",
        distractors: [
            "היי, אני מהשרות, איפה הרהיט שצריך לתקן?",
            "שלום, אני הטכנאי, תראה לי בבקשה את התקלה",
            "שלום, באתי לסדר את הבעיה מהר"
        ]
    },
    {
        question: "מה המסר המרכזי שלנו בשירות החדש?",
        correct: "אנחנו לא רק מתקנים – אנחנו שומרים על תחושת הבית",
        distractors: [
            "אנחנו הרשת הכי ותיקה ומקצועית בישראל",
            "אנחנו מספקים שירות מהיר תוך 3 ימי עסקים",
            "אנחנו תמיד נותנים זיכוי ללקוח לא מרוצה"
        ]
    },
    {
        question: "לקוחה כועסת על עיכוב באספקה. מה התגובה הנכונה?",
        correct: "אני לוקחת אחריות על הטיפול, אבדוק ואעדכן ביום _",
        distractors: [
            "זה לא תלוי בי, זה במחסן, אני רק נציגה",
            "אל תכעסי, יש עומס בגלל המיתוג מחדש",
            "אני לא יכולה להבטיח כלום, בואי נחכה"
        ]
    },
    {
        question: "מה המטרה שלנו בטיפול בהתנגדות?",
        correct: "להשאיר תחושת בית וביטחון",
        distractors: [
            "לנצח בשיחה ולהוכיח שהלקוח טועה",
            "לסגור את הקריאה כמה שיותר מהר",
            "להראות ללקוח שהוא חתם על תעודת האחריות"
        ]
    }
];

const colors = [
    { bg: "bg-red-500", shadow: "shadow-red-700", icon: "🔺" },
    { bg: "bg-blue-500", shadow: "shadow-blue-700", icon: "🔷" },
    { bg: "bg-yellow-500", shadow: "shadow-yellow-700", icon: "🟡" },
    { bg: "bg-green-500", shadow: "shadow-green-700", icon: "🟩" }
];

const ServiceQuiz = ({ onNavigate }) => {
    const [gameState, setGameState] = useState("start");
    const [roundState, setRoundState] = useState("reading");
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [players, setPlayers] = useState([]);
    const [answers, setAnswers] = useState({});
    const [hostUrl, setHostUrl] = useState("https://loading...");
    const [shuffledOptions, setShuffledOptions] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHostUrl(`${window.location.origin}/play`);
        }
    }, []);

    const gameStateRef = useRef("start");
    const readingTimerRef = useRef(null);
    const answerTimerRef = useRef(null);
    const timeLeftRef = useRef(20);
    const shuffledOptionsRef = useRef([]);

    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    useEffect(() => {
        timeLeftRef.current = timeLeft;
    }, [timeLeft]);

    useEffect(() => {
        shuffledOptionsRef.current = shuffledOptions;
    }, [shuffledOptions]);

    const question = quizData[currentQuestionIdx];

    useEffect(() => {
        socket.emit('host_connect');

        socket.on('update_players', (serverPlayers) => {
            if (gameStateRef.current === "summary") return;
            setPlayers(serverPlayers);
        });

        socket.on('game_ended', (finalLeaderboard) => {
            setPlayers(finalLeaderboard);
        });

        socket.on('player_answered', ({ playerId, answerIdx }) => {
            setAnswers(prev => ({ ...prev, [playerId]: answerIdx }));
            const opts = shuffledOptionsRef.current;
            if (opts && opts[answerIdx] && opts[answerIdx].isCorrect) {
                const timeBonus = Math.max(0, timeLeftRef.current) * 10;
                const points = 100 + timeBonus;
                socket.emit('update_score', { playerId, points });
            }
        });

        socket.on('prepare_round', (qIdx) => {
            setCurrentQuestionIdx(qIdx);
            setGameState("playing");
            setRoundState("reading");
            setAnswers({});
            const q = quizData[qIdx];
            if (q) socket.emit('host_sync_question', q.question);
            if (readingTimerRef.current) clearTimeout(readingTimerRef.current);
            readingTimerRef.current = setTimeout(() => {
                socket.emit('open_voting');
            }, 4000);
        });

        socket.on('open_voting', () => {
            setRoundState("answering");
            setTimeLeft(20);
            if (answerTimerRef.current) clearInterval(answerTimerRef.current);
            answerTimerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(answerTimerRef.current);
                        setGameState("result");
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        });

        return () => {
            socket.off('update_players');
            socket.off('game_ended');
            socket.off('player_answered');
            socket.off('prepare_round');
            socket.off('open_voting');
            if (readingTimerRef.current) clearTimeout(readingTimerRef.current);
            if (answerTimerRef.current) clearInterval(answerTimerRef.current);
        };
    }, []);

    useEffect(() => {
        if (!question) return;
        const opts = [
            { text: question.correct, isCorrect: true },
            ...question.distractors.map(d => ({ text: d, isCorrect: false }))
        ].sort(() => Math.random() - 0.5);
        setShuffledOptions(opts);
        shuffledOptionsRef.current = opts;
    }, [currentQuestionIdx]);

    const handleNext = () => {
        if (readingTimerRef.current) clearTimeout(readingTimerRef.current);
        if (answerTimerRef.current) clearInterval(answerTimerRef.current);
        if (currentQuestionIdx < quizData.length - 1) {
            socket.emit('next_question');
        } else {
            setGameState("summary");
            socket.emit('end_game');
        }
    };

    const jumpToOutro = () => {
        if (onNavigate) onNavigate(20); // The index of FinalLogoSlide in ServiceApp
    };

    const startDemo = () => {
        const demoPlayer = { id: 'demo1', name: 'משתתף דמו 🤖', score: 0 };
        setPlayers([demoPlayer]);
        socket.emit('start_game');
    };

    if (gameState === "start") {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-brand-yellow p-8 relative overflow-hidden" dir="rtl">
                <div className="z-10 bg-white/95 backdrop-blur-xl p-12 rounded-[4rem] shadow-2xl border-8 border-white/50 flex flex-col items-center max-w-5xl">
                    <h1 className="text-6xl md:text-8xl font-black mb-8 text-brand-blue tracking-tighter leading-none text-center">מרתון שירות!</h1>
                    <p className="text-3xl md:text-4xl mb-12 font-black text-brand-dark-blue text-center">סורקים, נכנסים, בודקים מי אלופת השירות</p>
                    <div className="bg-white p-6 rounded-[3rem] shadow-xl border-2 border-gray-100">
                        {hostUrl && <QRCodeSVG value={hostUrl} size={250} />}
                    </div>
                </div>
                <div className="mt-12 flex gap-8">
                    <button onClick={() => socket.emit('start_game')} disabled={players.length === 0} className={`bg-brand-blue text-white text-4xl font-black px-16 py-8 rounded-full shadow-xl ${players.length > 0 ? 'animate-bounce' : 'opacity-50 cursor-not-allowed'}`}>
                        מתחילים! ({players.length}) 🚀
                    </button>
                    <button onClick={startDemo} className="bg-white border-8 border-brand-blue text-brand-blue text-4xl font-black px-12 py-8 rounded-full shadow-xl hover:bg-brand-blue hover:text-white transition-all">
                        הפעל דמו 📺
                    </button>
                </div>
            </div>
        );
    }

    if (gameState === "summary") {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-white text-brand-blue p-8 relative overflow-hidden" dir="rtl">
                <Trophy size={140} className="text-brand-yellow mb-10 drop-shadow-xl animate-bounce" />
                <h1 className="text-7xl font-black mb-16 tracking-tighter leading-none text-center">אלופי השירות!</h1>
                <div className="flex items-end gap-12 w-full max-w-6xl justify-center h-[25rem]">
                    {players.sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 3).map((p, i) => (
                        <div key={p.id} className="flex flex-col items-center justify-end w-48 h-full" style={{ order: i === 0 ? 2 : i === 1 ? 1 : 3 }}>
                            <div className="text-3xl font-black mb-6 text-brand-dark-blue truncate w-full text-center">{p.name}</div>
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: i === 0 ? '100%' : i === 1 ? '75%' : '60%' }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={`w-full rounded-t-[3rem] shadow-xl flex flex-col items-center pt-8 text-5xl font-black text-white ${i === 0 ? 'bg-brand-yellow' : i === 1 ? 'bg-gray-400' : 'bg-orange-500'}`}
                            >
                                {p.score || 0}
                                <div className="text-2xl mt-4 opacity-70">{i === 0 ? "מקום 1" : i === 1 ? "מקום 2" : "מקום 3"}</div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex gap-6">
                    <button onClick={() => setGameState("start")} className="bg-gray-100 text-gray-500 px-12 py-6 rounded-full text-2xl font-black hover:bg-gray-200 transition-all">משחק חדש</button>
                    <button onClick={jumpToOutro} className="bg-brand-blue text-white px-16 py-8 rounded-full text-3xl font-black shadow-xl hover:scale-105 transition-all flex items-center gap-4">
                        לסיכום המצגת
                        <ArrowLeft size={36} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full px-8 py-8 bg-gray-50 text-right overflow-hidden" dir="rtl">
            <div className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] shadow-lg mb-8 border-2 border-gray-50">
                <div className="text-2xl font-black text-gray-400 tracking-tight">שאלה {currentQuestionIdx + 1} / {quizData.length}</div>
                <div className="flex items-center gap-8">
                    <div className="bg-brand-blue/10 px-8 py-4 rounded-[2rem] flex items-center gap-4 border border-brand-blue/20">
                        <Users className="text-brand-blue" size={32} />
                        <span className="font-black text-3xl text-brand-blue">{Object.keys(answers).length} / {players.length} ענו</span>
                    </div>
                    <div className={`text-4xl font-black font-mono w-20 h-20 flex items-center justify-center rounded-full border-8 ${timeLeft < 5 ? 'border-red-500 text-red-500 animate-pulse' : 'border-brand-yellow text-brand-black'}`}>
                        {roundState === "reading" ? "⏳" : timeLeft}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[4rem] p-12 text-center shadow-xl mb-8 flex-1 flex flex-col justify-center transition-all border-8 border-brand-blue/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-yellow/20" />
                <h2 className="text-5xl md:text-7xl font-black text-brand-black leading-tight mb-8 tracking-tighter">{question?.question}</h2>
                {roundState === "reading" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-brand-blue text-4xl font-black italic tracking-tight"
                    >
                        לקרוא ולהבין...
                    </motion.div>
                )}
            </div>

            {roundState !== "reading" && (
                <div className="grid grid-cols-2 gap-6 h-64">
                    {shuffledOptions.map((opt, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`${colors[idx % 4].bg} text-white rounded-[2.5rem] flex items-center p-8 gap-8 shadow-xl transition-all ${gameState === "result" && !opt.isCorrect ? "opacity-20 grayscale scale-95" : "opacity-100"} ${gameState === "result" && opt.isCorrect ? "ring-[12px] ring-green-400 scale-105 z-10" : "border-4 border-white/20"}`}
                        >
                            <span className="text-6xl drop-shadow-lg">{colors[idx % 4].icon}</span>
                            <span className="text-3xl md:text-4xl font-black leading-tight tracking-tight">{opt.text}</span>
                        </motion.div>
                    ))}
                </div>
            )}

            {gameState === "result" && (
                <div className="absolute inset-x-0 bottom-24 flex items-center justify-center pointer-events-none">
                    <button onClick={handleNext} className="pointer-events-auto bg-brand-black text-white px-16 py-8 rounded-full text-4xl font-black shadow-2xl animate-bounce border-8 border-white/20">
                        {currentQuestionIdx < quizData.length - 1 ? "לשאלה הבאה" : "לסיכום משחק"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ServiceQuiz;
