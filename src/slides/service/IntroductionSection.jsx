import React from 'react';
import { motion } from 'framer-motion';
import PersonaAvatars from './PersonaAvatars';
import Logo from '../../components/Logo';

const IntroductionSection = () => {
    const [visibleCount, setVisibleCount] = React.useState(0);
    const teamMembers = [
        { type: "karin", label: "קארין - מנהלת המחלקה" },
        { type: "orly", label: "אורלי" },
        { type: "mali", label: "מלי" },
        { type: "maayan", label: "מעיין" },
        { type: "rona", label: "רונה" },
        { type: "paz", label: "פז" },
        { type: "hagi", label: "חגי" },
        { type: "eli", label: "אלי" }
    ];

    const [activeAnimatingIndex, setActiveAnimatingIndex] = React.useState(-1);
    const [finalGridVisible, setFinalGridVisible] = React.useState([]);

    React.useEffect(() => {
        const startSequence = async () => {
            // Initial delay for slide titles - Starts with Karin after 3 seconds
            await new Promise(r => setTimeout(r, 3000));

            for (let i = 0; i < teamMembers.length; i++) {
                setActiveAnimatingIndex(i);
                // Wait for the dramatic animation to complete (4s stay + entry/exit)
                await new Promise(r => setTimeout(r, 6500));
                setFinalGridVisible(prev => [...prev, teamMembers[i].type]);
                if (i === teamMembers.length - 1) setActiveAnimatingIndex(-1);
            }
        };

        startSequence();
    }, []);

    // Dreamy elements inspired by the reference image
    const glowingClouds = [...Array(4)];
    const sparkles = [...Array(15)];

    return (
        <div className="h-full w-full bg-[#0a192f] flex flex-col items-center justify-center p-8 relative overflow-hidden" dir="rtl">
            {/* Celestial / Magical Background Layer */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Deep blue radial glow in the center */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e3a8a_0%,transparent_70%)] opacity-60" />

                {/* Glowing Clouds (inspired by the 'cloud balloon' image) */}
                {glowingClouds.map((_, i) => (
                    <motion.div
                        key={`glowing-cloud-${i}`}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, i % 2 === 0 ? 30 : -30, 0],
                            opacity: [0.4, 0.7, 0.4],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 10 + i * 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute"
                        style={{
                            top: `${20 + i * 20}%`,
                            left: `${15 + i * 20}%`,
                        }}
                    >
                        <div className="relative">
                            {/* Cloud Shape SVG */}
                            <svg width="250" height="150" viewBox="0 0 24 24" fill="white" className="drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] opacity-20">
                                <path d="M17.5,19c-3.037,0-5.5-2.463-5.5-5.5c0-0.106,0.003-0.21,0.01-0.313C11.391,12.791,10.718,12.5,10,12.5c-1.933,0-3.5,1.567-3.5,3.5s1.567,3.5,3.5,3.5h7.5c1.381,0,2.5-1.119,2.5-2.5S18.881,14.5,17.5,14.5c-0.101,0-0.201,0.007-0.3,0.02C17.411,14.184,17.5,13.852,17.5,13.5c0-2.485-2.015-4.5-4.5-4.5c-0.301,0-0.591,0.031-0.871,0.088C11.455,7.168,9.458,5.5,7,5.5c-3.037,0-5.5,2.463-5.5,5.5c0,0.138,0.005,0.274,0.015,0.409C0.607,11.871,0,12.863,0,14c0,2.209,1.791,4,4,4h13.5c0.828,0,1.5,0.672,1.5,1.5S18.328,19,17.5,19z" />
                            </svg>
                            {/* Inner glow point */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-xl scale-[10]" />
                        </div>
                    </motion.div>
                ))}

                {/* Magical Stars / Dust */}
                {sparkles.map((_, i) => (
                    <motion.div
                        key={`magical-dust-${i}`}
                        animate={{
                            scale: [0, 1.2, 0],
                            opacity: [0, 1, 0],
                            y: [0, -150],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 5,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeOut"
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}

                {/* Bright Sun/Light Source (top left) */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-[-50px] left-[-50px] w-96 h-96 bg-brand-yellow/30 rounded-full blur-[100px]"
                />
            </div>

            {/* Logo - White version for dark background */}
            <div className="absolute top-12 right-12 scale-125 z-40 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <Logo />
            </div>

            {/* Backdrop for current animating member - Lower than main */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeAnimatingIndex !== -1 ? 1 : 0 }}
                className="absolute inset-0 bg-[#0a192f]/95 backdrop-blur-2xl z-40 pointer-events-none"
            />

            <main className="z-50 w-full max-w-7xl text-center flex flex-col h-full justify-between py-16 relative">
                <div className="flex-1 flex flex-col justify-center items-center">
                    {/* Titles - dimmed when someone is animating */}
                    <motion.div
                        animate={{ opacity: activeAnimatingIndex !== -1 ? 0.1 : 1 }}
                        className="transition-opacity duration-700"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="mb-12 relative"
                        >
                            <h1 className="text-7xl md:text-[8rem] font-black text-white leading-none tracking-tight drop-shadow-[0_0_50px_rgba(255,255,255,0.6)]">
                                צוות <span className="text-brand-yellow drop-shadow-[0_0_30px_rgba(255,200,69,0.5)]">החלומות</span>
                            </h1>
                            <motion.div
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -inset-4 bg-white/5 blur-3xl -z-10 rounded-full"
                            />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-3xl md:text-4xl font-bold text-cyan-100 mb-8 max-w-4xl drop-shadow-md"
                        >
                            כמו בחלום הכי טוב שלנו... <br />
                            <span className="text-brand-yellow italic opacity-90">הכל מתחיל בצוות מנצח.</span>
                        </motion.p>
                    </motion.div>

                    {/* Team Avatars Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.8,
                            type: "spring",
                            stiffness: 30,
                            damping: 15
                        }}
                        className={`bg-white/5 backdrop-blur-3xl p-12 md:p-20 rounded-[6rem] shadow-[0_0_80px_rgba(30,58,138,0.5)] border-2 border-white/20 space-y-12 w-full relative group ${activeAnimatingIndex !== -1 ? 'z-[110]' : 'z-10'}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative">
                            {teamMembers.map((persona, i) => (
                                <div key={persona.type} className="relative">
                                    {/* Final member in grid */}
                                    {finalGridVisible.includes(persona.type) && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            whileHover={{
                                                scale: 1.15,
                                                rotate: i % 2 === 0 ? 5 : -5,
                                                filter: "brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.4))"
                                            }}
                                            className="transition-all"
                                        >
                                            <div className="text-white">
                                                <PersonaAvatars
                                                    type={persona.type}
                                                    size={70}
                                                    label={persona.label}
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* The currently animating dramatic entry - Center of screen */}
                                    {activeAnimatingIndex === i && (
                                        <div className="fixed inset-0 flex items-center justify-center z-[200] pointer-events-none">
                                            <div className="scale-[1.8] md:scale-[2.2]"> {/* Base scale up for the showcase */}
                                                <PersonaAvatars
                                                    type={persona.type}
                                                    size={120}
                                                    label={persona.label}
                                                    dramaticEntry={true}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeAnimatingIndex !== -1 ? 0.1 : 1 }}
                    transition={{ delay: 2, duration: 1.5 }}
                    className="mt-8 group transition-opacity duration-700"
                >
                    <span className="text-6xl md:text-[9rem] font-black text-white tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity duration-700 drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                        שמרת הזורע - סיפור אהבה ישראלי
                    </span>
                </motion.div>
            </main >
        </div >
    );
};

export default IntroductionSection;
