import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Volume2, VolumeX, Heart } from 'lucide-react';
import Logo from '../../components/Logo';
import PersonaAvatars from './PersonaAvatars';

const SummarySection = () => {
    const [isMuted, setIsMuted] = React.useState(false);
    const [showThanks, setShowThanks] = React.useState(false);
    const [visibleTeamIndices, setVisibleTeamIndices] = React.useState([]);
    const [isFinished, setIsFinished] = React.useState(false);
    const audioRef = React.useRef(null);

    const teamMembers = [
        { type: "orly", label: "אורלי" },
        { type: "mali", label: "מלי" },
        { type: "maayan", label: "מעיין" },
        { type: "rona", label: "רונה" },
        { type: "paz", label: "פז" },
        { type: "hagi", label: "חגי" },
        { type: "eli", label: "אלי" }
    ];

    React.useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.1;
            audioRef.current.play().catch(err => console.log("Audio play failed:", err));
        }

        return () => {
            // Cleanup timers if any
        };
    }, []);

    const startFinalAnimation = () => {
        addNextMember(0);
    };

    const addNextMember = (index) => {
        if (index < teamMembers.length) {
            setVisibleTeamIndices(prev => [...prev, index]);
            setTimeout(() => {
                addNextMember(index + 1);
            }, 2000); // 2 seconds delay between each name
        } else {
            // All names shown, trigger final heart
            setTimeout(() => {
                setIsFinished(true);
            }, 1000);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleFinish = () => {
        setShowThanks(true);
        if (audioRef.current) {
            audioRef.current.volume = 0.6;
        }
        startFinalAnimation();
    };

    const summaryPoints = [
        "שמים את הלקוח במרכז – בונים אמון",
        "שפה חמה, אישית ומכבדת",
        "שקיפות מלאה מול הלקוח והשטח",
        "לוקחים אחריות עד לפתרון המלא",
        "סגירת חוויה – לא רק קריאה"
    ];

    const heartPulse = {
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1],
        transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <div className="h-full w-full bg-brand-yellow flex flex-col p-8 md:p-12 relative overflow-hidden" dir="rtl">
            {/* Background Music - NO LOOP */}
            <audio ref={audioRef} src="/background-music.mp3" loop={false} />

            {/* Audio Toggle */}
            <button
                onClick={toggleMute}
                className="absolute bottom-12 right-12 z-[110] p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg border-2 border-brand-blue/20 hover:scale-110 transition-all text-brand-blue"
            >
                {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
            </button>

            {/* Top Right Logo */}
            <div className="absolute top-12 right-12 scale-110 z-20 bg-white/80 p-4 rounded-3xl shadow-xl border-2 border-white">
                <Logo />
            </div>

            {/* FULL SCREEN SPECIAL OVERLAY FOR FINAL THANK YOU & CUMULATIVE NAMES */}
            <AnimatePresence>
                {showThanks && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-12 bg-brand-yellow/95 backdrop-blur-xl overflow-hidden"
                    >
                        {/* BIG THANK YOU */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mb-6"
                        >
                            <h2 className="text-[6rem] md:text-[8.5rem] font-black text-brand-blue leading-none drop-shadow-2xl">
                                תודה!
                            </h2>
                        </motion.div>

                        {/* FINAL CONTOUR HEART - Appears once everything is finished */}
                        <AnimatePresence>
                            {isFinished && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none"
                                >
                                    <svg width="90%" height="90%" viewBox="0 0 100 100" className="opacity-10">
                                        <path
                                            d="M50 85 C50 85 10 60 10 35 C10 15 30 10 50 30 C70 10 90 15 90 35 C90 60 50 85 50 85 Z"
                                            fill="none"
                                            stroke="#2A5CAA"
                                            strokeWidth="2"
                                            strokeDasharray="5,5"
                                        />
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* CUMULATIVE TEAM MEMBERS GRID */}
                        <div className="w-full max-w-6xl flex flex-wrap justify-center gap-4 p-2">
                            {visibleTeamIndices.map((index) => (
                                <motion.div
                                    key={teamMembers[index].type}
                                    initial={{ opacity: 0, scale: 0.5, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className="bg-white border-2 border-brand-blue shadow-xl rounded-[2.5rem] pl-6 pr-4 py-2 flex items-center gap-4"
                                >
                                    <div className="scale-60 md:scale-75">
                                        <PersonaAvatars
                                            type={teamMembers[index].type}
                                            size={35}
                                            hideLabel={true}
                                        />
                                    </div>
                                    <span className="text-2xl md:text-3xl font-black text-brand-dark-blue">
                                        {teamMembers[index].label}
                                    </span>
                                    {/* Red Blinking Heart */}
                                    <motion.div animate={heartPulse} className="text-red-500">
                                        <Heart size={24} fill="currentColor" />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        {/* FINAL LARGE HEART WRAPPING EVERYTHING (at the end) */}
                        <AnimatePresence>
                            {isFinished && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-12 text-5xl font-black text-brand-blue"
                                >
                                    נבחרת החלומות של שמרת הזורע
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10 pt-16">
                {/* Right Side: Content */}
                <div className="flex flex-col justify-center order-2 lg:order-1 max-w-[80rem]">
                    <header className="mb-6 pt-4">
                        <motion.h1
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl md:text-[4.5rem] font-black text-brand-blue tracking-tighter leading-none"
                        >
                            לסיכום: <br />
                            <span className="text-brand-dark-blue">מרגישים בבית</span>
                        </motion.h1>
                        <div className="w-32 h-1.5 bg-brand-blue mt-3 rounded-full" />
                    </header>

                    <div className="space-y-2">
                        {summaryPoints.map((point, i) => (
                            <motion.div
                                key={point}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.02, x: -10 }}
                                className="flex items-center gap-4 bg-white/95 shadow-md p-4 rounded-[1.5rem] border-2 border-white border-r-[0.6rem] border-r-brand-blue"
                            >
                                <div className="bg-brand-yellow p-2 rounded-full shrink-0">
                                    <CheckCircle size={24} className="text-brand-blue" />
                                </div>
                                <p className="text-xl md:text-[1.8rem] font-black text-brand-dark-blue leading-tight tracking-tight">
                                    {point}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-4 text-2xl md:text-[2.8rem] font-black text-brand-blue tracking-tight leading-tight"
                    >
                        שמרת הזורע - סיפור אהבה ישראלי
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        onClick={handleFinish}
                        className="mt-8 bg-brand-blue text-white px-8 py-4 rounded-full text-2xl font-black shadow-xl hover:bg-brand-yellow hover:text-brand-blue transition-all flex items-center gap-4 group w-fit"
                    >
                        סיום המצגת
                        <Heart className="group-hover:scale-125 transition-transform text-red-500" fill="currentColor" />
                    </motion.button>
                </div>

                {/* Left Side: Large Impressive Rotating House */}
                <div className="flex flex-col justify-center items-center order-1 lg:order-2 h-full py-4 md:py-8 gap-4 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1.5, type: "spring" }}
                        whileHover={{ rotate: 360, transition: { duration: 20, repeat: Infinity, ease: "linear" } }}
                        className="relative w-full max-w-lg aspect-square flex items-center justify-center pt-8 cursor-pointer"
                    >
                        {/* Rotating Glow Background */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 via-brand-yellow/10 to-transparent rounded-full blur-3xl"
                        />

                        {/* More Professional House Shape - Now Rotating */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} d="M10 45 L50 5 L90 45" stroke="#003580" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.2 }} d="M15 45 V90 H85 V45" stroke="#003580" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 45 L50 10 L85 45 V90 H15 V45Z" fill="white" fillOpacity="0.4" />
                                <path d="M70 25 V15 H80 V35" stroke="#003580" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="42" y="65" width="16" height="25" rx="2" stroke="#003580" strokeWidth="3" />
                            </svg>
                        </div>

                        <div className="z-10 bg-white p-6 rounded-[2rem] shadow-xl border-4 border-brand-blue/10 transform scale-100">
                            <Logo size="large" />
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default SummarySection;
