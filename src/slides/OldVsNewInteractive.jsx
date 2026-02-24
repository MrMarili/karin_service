import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Timer, ArrowRight, BarChart2, ArrowLeft, RefreshCw } from 'lucide-react';
import { socket } from '../socket'; // IMPORT CENTRALIZED SOCKET
import { QRCodeSVG } from 'qrcode.react';

import product1 from '../assets/products/product1.jpg';
import product3 from '../assets/products/product3.jpg';
import summary1 from '../assets/summary-1.jpg';
import storeRender from '../assets/store-render.webp';

// Data & Colors Constants
const quizData = [
    {
        question: "לקוח מחפש ספה \"שתחזיק שנים\". מה נגיד לו?",
        correct: "ספה למשפחה ישראלית – מקום לילדים, לחברים ולחיים עצמם",
        distractors: [
            "דגם פרימיום עם שלדת עץ מלא וספוג בדרגת קושי 4",
            "הספה הכי חזקה בקטלוג, בהתחייבות יצרן",
            "בד דוחה כתמים בטכנולוגיית ננו-טק מתקדמת"
        ]
    },
    {
        question: "איך נציג פינת אוכל עם יכולת הרחבה?",
        correct: "שולחן שמתרחב ברגע שכל המשפחה והחברים מגיעים",
        distractors: [
            "שולחן בעל 4 פתיחות ומסילות אלומיניום",
            "פתרון אירוח מושלם לחללים גדולים ומרווחים",
            "שולחן ענק במבצע השקה מיוחד"
        ]
    },
    {
        question: "מה הכי חשוב לנו שירגישו כשהם נכנסים לסניף?",
        correct: "שהם הגיעו הביתה. חום, פשטות וחיבוק ישראלי",
        distractors: [
            "שהם נכנסו לרשת הרהיטים הותיקה והמובילה בישראל",
            "שיש כאן את המבחר הכי גדול ומחירים ללא תחרות",
            "יוקרה, אלגנטיות וניחוח בינלאומי"
        ]
    },
    {
        question: "לקוח מתעניין בכורסת טלוויזיה. על מה נדבר?",
        correct: "על הפינה השקטה שלך בסוף יום עמוס",
        distractors: [
            "על מנגנון ריקליינר חשמלי עם שני מנועים",
            "על ריפוד עור משובח בייבוא אישי מאיטליה",
            "על זווית פתיחה של 180 מעלות לשכיבה מלאה"
        ]
    },
    {
        question: "זוג מחפש מזרן חדש. מה המסר שלנו?",
        correct: "לקום כל בוקר עם אנרגיות חדשות ליום יפה",
        distractors: [
            "מזרן עם 800 קפיצים מבודדים ושכבת לטקס",
            "המזרן האורתופדי המומלץ ביותר על ידי כירופרקטים",
            "טכנולוגיית NO-FLIP שלא צריך להפוך לעולם"
        ]
    },
    {
        question: "לקוח שואל \"מה עם האחריות?\". מה עונים?",
        correct: "אנחנו כאן בשבילך, נותנים לך שקט נפשי בבית",
        distractors: [
            "יש לך אחריות יצרן מלאה לשנה פלוס 3 שנים על המנגנון",
            "תקרא את האותיות הקטנות בתעודת האחריות",
            "שירות הלקוחות שלנו זמין בטלפון בימים א-ה"
        ]
    },
    {
        question: "מחפשים ספה נפתחת למיטה? מה חשוב לדעת?",
        correct: "מקום מושלם לנכדים, לחברים, ולבית שתמיד פתוח לאורחים",
        distractors: [
            "מנגנון ספר עם קפיצים בעובי 12 מ\"מ",
            "ספוג כחול איכותי בדרגת קושי בינונית",
            "ארגז מצעים ענק לאחסון שמיכות חורף"
        ]
    },
    {
        question: "למה בעצם לבחור בשמרת הזורע?",
        correct: "כל התשובות נכונות (וגם כי זה פשוט מרגיש נכון בלב)",
        distractors: [
            "כי יש לנו את המחירים הכי תחרותיים בשוק",
            "כי אנחנו הרשת הגדולה והוותיקה בישראל",
            "כי זה הבית של הבית הישראלי – מבינים אתכם באמת"
        ]
    }
];

const colors = [
    { bg: "bg-red-500", shadow: "shadow-red-700", icon: "🔺" },
    { bg: "bg-blue-500", shadow: "shadow-blue-700", icon: "🔷" },
    { bg: "bg-yellow-500", shadow: "shadow-yellow-700", icon: "🟡" },
    { bg: "bg-green-500", shadow: "shadow-green-700", icon: "🟩" }
];

const OldVsNewInteractive = ({ onNavigate }) => {
    const [gameState, setGameState] = useState("start"); // start, playing, result, summary
    const [roundState, setRoundState] = useState("reading"); // reading (4s), answering (20s)
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [players, setPlayers] = useState([]);
    const [answers, setAnswers] = useState({});

    // Determine Host URL for QR Code
    // Set a default value to prevent QR Code crash on initial render
    const [hostUrl, setHostUrl] = useState("https://loading...");

    useEffect(() => {
        // Set URL once on mount (only client-side)
        if (typeof window !== 'undefined') {
            setHostUrl(`${window.location.origin}/play`);
        }
    }, []);

    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [simulatedPlayers, setSimulatedPlayers] = useState([]);

    const [bgImageIndex, setBgImageIndex] = useState(0);
    const bgImages = [product1, summary1, product3, storeRender];

    useEffect(() => {
        const interval = setInterval(() => {
            setBgImageIndex(prev => (prev + 1) % bgImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Refs needed for socket callbacks (to know current state)
    const gameStateRef = useRef("start");

    useEffect(() => {
        gameStateRef.current = gameState;

        // AUTO RESET GAME after 10 seconds in Summary
        if (gameState === "summary") {
            const resetTimeout = setTimeout(() => {
                console.log("Auto resetting game (disconnecting players)...");
                socket.emit('reset_game');
            }, 10000); // 10 Seconds Delay

            return () => clearTimeout(resetTimeout);
        }
    }, [gameState]);

    useEffect(() => {
        const onConnect = () => setIsConnected(true);
        const onDisconnect = () => setIsConnected(false);

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        if (socket.connected) setIsConnected(true);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    // Refs for timer management and current options access
    const readingTimerRef = useRef(null);
    const answerTimerRef = useRef(null);
    const timeLeftRef = useRef(20);
    const shuffledOptionsRef = useRef([]);

    useEffect(() => {
        timeLeftRef.current = timeLeft;
    }, [timeLeft]);

    useEffect(() => {
        shuffledOptionsRef.current = shuffledOptions;
    }, [shuffledOptions]);

    const question = quizData[currentQuestionIdx];

    useEffect(() => {
        socket.emit('host_connect');

        // Events
        socket.on('update_players', (serverPlayers) => {
            // CRITICAL FIX: Don't clear the podium if we're in summary!
            // Because reset_game clears players on server, we want to keep them locally on host screen.
            if (gameStateRef.current === "summary") {
                console.log("Ignoring players update (summary mode)");
                return;
            }
            setPlayers(serverPlayers);
        });

        // Keep final leaderboard authoritative
        socket.on('game_ended', (finalLeaderboard) => {
            setPlayers(finalLeaderboard);
        });

        socket.on('player_answered', ({ playerId, answerIdx }) => {
            setAnswers(prev => ({ ...prev, [playerId]: answerIdx }));

            // Check correctness and update score
            const opts = shuffledOptionsRef.current;
            if (opts && opts[answerIdx] && opts[answerIdx].isCorrect) {
                // Score Calculation: 100 base + 10 per second left
                const timeBonus = Math.max(0, timeLeftRef.current) * 10;
                const points = 100 + timeBonus;
                socket.emit('update_score', { playerId, points });
            }
        });

        socket.on('prepare_round', (qIdx) => {
            // New Round logic
            setCurrentQuestionIdx(qIdx);
            setGameState("playing");
            setRoundState("reading");
            setAnswers({});

            // Broadcast question text to phones!
            const q = quizData[qIdx];
            if (q) {
                socket.emit('host_sync_question', q.question);
            }

            // Reading Timer
            if (readingTimerRef.current) clearTimeout(readingTimerRef.current);
            readingTimerRef.current = setTimeout(() => {
                socket.emit('open_voting');
            }, 4000);
        });

        socket.on('open_voting', () => {
            setRoundState("answering");
            setTimeLeft(20);

            // Answer Timer
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
            socket.off('game_ended'); // Cleanup
            socket.off('player_answered');
            socket.off('prepare_round');
            socket.off('open_voting');
            if (readingTimerRef.current) clearTimeout(readingTimerRef.current);
            if (answerTimerRef.current) clearInterval(answerTimerRef.current);
        };
    }, []);

    // Effect to Shuffle Options when Question/Index changes
    useEffect(() => {
        if (!question) return;
        const opts = [
            { text: question.correct, isCorrect: true },
            ...question.distractors.map(d => ({ text: d, isCorrect: false }))
        ].sort(() => Math.random() - 0.5);
        setShuffledOptions(opts);
        shuffledOptionsRef.current = opts; // Sync Ref immediately for current Question
    }, [currentQuestionIdx]);

    const handleNext = () => {
        // Clear timers
        if (readingTimerRef.current) clearTimeout(readingTimerRef.current);
        if (answerTimerRef.current) clearInterval(answerTimerRef.current);

        if (currentQuestionIdx < quizData.length - 1) {
            socket.emit('next_question');
        } else {
            setGameState("summary");
            socket.emit('end_game');
        }
    };

    // START SCREEN
    if (gameState === "start") {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-white text-brand-dark-blue p-8 relative overflow-hidden">
                <button onClick={() => onNavigate(2)} className="absolute top-8 right-8 z-50 text-brand-dark-blue/50 hover:text-brand-dark-blue"><ArrowLeft size={32} /></button>

                {/* Reset Game Button (Hidden/Subtle) */}
                <button
                    onClick={() => socket.emit('reset_game')}
                    className="absolute bottom-8 left-8 z-50 bg-white/50 text-brand-dark-blue px-4 py-2 rounded-full text-xs font-bold hover:bg-white flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
                    title="נקה את החדר ממשתתפים ישנים"
                >
                    <RefreshCw size={12} />
                    איפוס חדר
                </button>

                {/* Background Slideshow */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={bgImageIndex}
                            src={bgImages[bgImageIndex]}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-white/20" />
                </div>

                <div className="z-10 w-full h-full flex items-center justify-center p-4">
                    <div className="bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border-4 border-white/50 flex flex-col items-center max-w-[90rem]">
                        <h1 className="text-8xl font-black mb-2 text-brand-blue drop-shadow-sm">הצטרפו למשחק!</h1>
                        <p className="text-3xl mb-12 font-bold text-brand-yellow drop-shadow-sm text-shadow">סורקים, נכנסים, משחקים</p>

                        <div className="flex flex-col items-center mb-12">
                            <div className="bg-white p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform">
                                {/* Use hostUrl safely */}
                                {hostUrl && <QRCodeSVG value={hostUrl} size={320} />}
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <a href={hostUrl} target="_blank" rel="noopener noreferrer" className="text-4xl font-mono bg-white/50 px-8 py-3 rounded-2xl hover:bg-white/80 transition-colors cursor-pointer text-brand-dark-blue font-bold shadow-sm border border-brand-blue/10">{hostUrl}</a>
                        </div>
                    </div>
                </div>

                {/* Scattered Player Names - Floating on top */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                    <AnimatePresence>
                        {[...players, ...simulatedPlayers].map((player) => {
                            // Extract ID for consistent hashing
                            const id = player.id;
                            // Simple hash
                            let hash = 0;
                            for (let i = 0; i < id.length; i++) {
                                hash = ((hash << 5) - hash) + id.charCodeAt(i);
                                hash |= 0;
                            }
                            hash = Math.abs(hash);

                            const isLeft = hash % 2 === 0;
                            const topPos = (hash % 80) + 10; // 10-90%
                            const sidePos = (hash % 15) + 2; // 2-17% from edge

                            return (
                                <motion.div
                                    key={id}
                                    initial={{ scale: 0, opacity: 0, y: 100 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className={`
                                        absolute px-6 py-3 rounded-full text-xl font-bold text-white shadow-xl border-2 border-white/50 backdrop-blur-md
                                        ${["bg-brand-blue/90", "bg-brand-yellow/90 text-brand-black", "bg-orange-500/90", "bg-green-500/90", "bg-purple-500/90"][hash % 5]}
                                    `}
                                    style={{
                                        top: `${topPos}%`,
                                        left: isLeft ? `${sidePos}%` : undefined,
                                        right: !isLeft ? `${sidePos}%` : undefined,
                                        transform: `rotate(${(hash % 40) - 20}deg)`
                                    }}
                                >
                                    {player.name}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {(players.length > 0 || simulatedPlayers.length > 0) && (
                    <button onClick={() => socket.emit('start_game')} className="absolute bottom-12 bg-gradient-to-r from-brand-yellow to-orange-400 text-brand-black text-5xl font-black px-20 py-8 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-yellow-400/50 active:scale-95 transition-all z-50 animate-bounce">
                        מתחילים! ({players.length + simulatedPlayers.length}) 🚀
                    </button>
                )}
            </div>
        );
    }

    // SUMMARY SCREEN
    if (gameState === "summary") {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-white text-brand-blue p-8">
                <Trophy size={120} className="text-brand-yellow mb-8 drop-shadow-lg" />
                <h1 className="text-8xl font-black mb-12 text-brand-blue">המנצחים!</h1>
                <div className="flex items-end gap-16 w-full max-w-5xl justify-center h-[32rem]">
                    {[...players, ...simulatedPlayers]
                        .map(p => ({ ...p, score: p.score || 0 }))
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 3)
                        .map((p, i, arr) => {
                            // Fixed heights for podium visual impact (1st=100%, 2nd=75%, 3rd=60%)
                            const heightPercentage = i === 0 ? 100 : i === 1 ? 75 : 60;
                            // Visual Order: 2nd (left), 1st (center), 3rd (right)
                            const order = i === 0 ? 2 : i === 1 ? 1 : 3;
                            const colorClass = i === 0 ? 'bg-brand-yellow ring-4 ring-yellow-300' : i === 1 ? 'bg-gray-400' : 'bg-orange-500';

                            // Font size boost for winner
                            const nameSize = i === 0 ? "text-5xl" : "text-3xl";

                            return (
                                <div key={p.id} className="flex flex-col items-center justify-end w-48 h-full transition-all duration-1000" style={{ order }}>
                                    <div className={`${nameSize} font-bold mb-6 text-brand-blue text-center line-clamp-1 drop-shadow-sm`}>{p.name}</div>
                                    <div
                                        className={`w-full rounded-t-3xl shadow-2xl flex items-center justify-center text-6xl font-black text-white relative group ${colorClass}`}
                                        style={{ height: `${heightPercentage}%` }}
                                    >
                                        <span className="drop-shadow-md z-10">{p.score}</span>
                                        <div className="absolute -top-8 bg-white border-8 border-brand-blue text-brand-blue rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold shadow-lg">
                                            {i + 1}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <button
                    onClick={() => {
                        // Manual reset (just in case they click before 10s)
                        socket.emit('reset_game');
                        onNavigate(2);
                    }}
                    className="mt-16 bg-brand-blue text-white px-10 py-4 rounded-full text-2xl font-bold hover:bg-brand-dark-blue shadow-lg"
                >
                    חזרה לתפריט
                </button>
            </div>
        )
    }

    // PLAYING SCREEN
    return (
        <div className="flex flex-col h-full w-full px-8 py-8">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm mb-6">
                <div className="text-2xl font-bold text-gray-400">שאלה {currentQuestionIdx + 1} / {quizData.length}</div>
                <div className="flex items-center gap-4">
                    <div className="bg-brand-blue/10 px-4 py-2 rounded-lg flex items-center gap-2">
                        <Users className="text-brand-blue" />
                        <span className="font-bold text-brand-blue">
                            {/* Ensure denominator updates dynamically */}
                            {Object.keys(answers).length} / {players.length} ענו
                        </span>
                    </div>
                    <div className="text-3xl font-black font-mono w-16 text-center">
                        {roundState === "reading" ? "⏳" : timeLeft}
                    </div>
                </div>
            </div>

            {/* Question */}
            <div className={`bg-white rounded-3xl p-12 text-center shadow-lg mb-8 flex-1 flex flex-col justify-center transition-all duration-500 relative overflow-hidden ${gameState === "result" ? "scale-95 opacity-50" : "scale-100 opacity-100"}`}>
                {roundState === "answering" && (<div className="absolute top-0 left-0 h-3 bg-brand-yellow transition-all ease-linear duration-1000" style={{ width: `${(timeLeft / 20) * 100}%` }} />)}
                <h2 className="text-6xl font-black text-brand-black leading-tight">{question?.question}</h2>
                {roundState === "reading" && (<p className="text-brand-blue animate-pulse mt-4 text-2xl font-bold">לקרוא בבקשה...</p>)}
            </div>

            {/* Answers Grid */}
            {roundState !== "reading" && (
                <div className="grid grid-cols-2 gap-6 h-64">
                    {shuffledOptions.map((opt, idx) => (
                        <div key={idx} className={`${colors[idx % 4].bg} text-white rounded-2xl flex items-center p-8 gap-6 shadow-md transition-all duration-500 relative ${gameState === "result" && !opt.isCorrect ? "opacity-20 grayscale scale-95" : "opacity-100"} ${gameState === "result" && opt.isCorrect ? "ring-8 ring-green-400 scale-105 z-10" : ""}`}>
                            <span className="text-6xl">{colors[idx % 4].icon}</span>
                            <span className="text-3xl font-bold leading-tight">{opt.text}</span>
                            {gameState === "result" && (
                                <div className="absolute -bottom-4 right-4 flex -space-x-2 overflow-hidden bg-white/90 p-2 rounded-full shadow-sm max-w-[80%] flex-wrap gap-1 justify-end">
                                    {Object.entries(answers).filter(([pid, ansIdx]) => ansIdx === idx).map(([pid]) => {
                                        const player = players.find(p => p.id === pid);
                                        return <div key={pid} className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">{player?.name || "???"}</div>
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {roundState === "reading" && (
                <div className="h-64 flex items-center justify-center text-gray-400 text-2xl font-bold">התשובות ייחשפו בקרוב...</div>
            )}

            {gameState === "result" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <button onClick={handleNext} className="pointer-events-auto bg-brand-black text-white px-12 py-6 rounded-full text-3xl font-black shadow-2xl hover:scale-110 transition-transform animate-bounce">
                        {currentQuestionIdx < quizData.length - 1 ? "לשאלה הבאה – סיפור אהבה ישראלי" : "לסיכום"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default OldVsNewInteractive;
