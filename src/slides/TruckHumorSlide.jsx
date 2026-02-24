import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronRight, Volume2, VolumeX } from 'lucide-react';

// Actual Screenshot Assets (All 11 trucks)
import truck1 from '../assets/trucks/truck1.png';
import truck2 from '../assets/trucks/truck2.png';
import truck3 from '../assets/trucks/truck3.png';
import truck4 from '../assets/trucks/truck4.png';
import truck5 from '../assets/trucks/truck5.png';
import truck6 from '../assets/trucks/truck6.png';
import truck7 from '../assets/trucks/truck7.png';
import truck8 from '../assets/trucks/truck8.png';
import truck9 from '../assets/trucks/truck9.png';
import truck10 from '../assets/trucks/truck10.png';
import truck11 from '../assets/trucks/truck11.png';

/**
 * Mapping all 11 trucks based on cabin orientation.
 */
const trucks = [
    { id: 1, src: truck1, dir: 1 },
    { id: 2, src: truck2, dir: -1 },
    { id: 3, src: truck3, dir: 1 },
    { id: 4, src: truck4, dir: -1 },
    { id: 5, src: truck5, dir: 1 },
    { id: 6, src: truck6, dir: 1 },
    { id: 7, src: truck7, dir: 1 },
    { id: 8, src: truck8, dir: -1 },
    { id: 9, src: truck9, dir: 1 },
    { id: 10, src: truck10, dir: -1 },
    { id: 11, src: truck11, dir: -1 },
];

const TruckHumorSlide = ({ onNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFleetView, setIsFleetView] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    const currentTruck = trucks[currentIndex];

    // Initialize and play background music
    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/truck-music.mp3');
            audioRef.current.loop = true;
            audioRef.current.volume = 0.4;
        }

        if (!isFleetView) {
            audioRef.current.play().catch(e => console.log('Music play blocked:', e));
        } else {
            // Lower volume or pause on fleet view if preferred
            audioRef.current.volume = 0.2;
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, [isFleetView]);

    // Handle mute change
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const nextStep = () => {
        if (currentIndex < trucks.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsFleetView(true);
        }
    };

    const reset = () => {
        setCurrentIndex(0);
        setIsFleetView(false);
    };

    const variants = {
        initial: (dir) => ({
            x: dir === 1 ? "120vw" : "-120vw",
            opacity: 0,
            scale: 0.95
        }),
        animate: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.5,
                ease: [0.25, 1, 0.5, 1]
            }
        },
        exit: (dir) => ({
            x: dir === 1 ? "-120vw" : "120vw",
            opacity: 0,
            scale: 1.05,
            transition: { duration: 1, ease: "easeInOut" }
        })
    };

    return (
        <div className="relative w-full h-full bg-[#f8f9fa] overflow-hidden flex flex-col items-center p-4">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 mb-16 text-center z-40 relative"
            >
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-brand-dark-blue mb-4 tracking-tighter drop-shadow-sm">
                    {isFleetView ? "הצי החדש שלנו" : "המיתוג שמדבר אליכם"}
                </h1>
                <div className="h-2 w-64 bg-brand-yellow mx-auto rounded-full shadow-md" />
            </motion.div>

            {/* Mute Toggle */}
            <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-8 right-8 z-50 p-4 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all text-brand-blue"
            >
                {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
            </button>

            {/* Road section */}
            <div className="absolute bottom-24 left-0 right-0 h-44 bg-zinc-800 border-t-[12px] border-zinc-700 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] z-10">
                <div className="w-full h-full border-b-[8px] border-dashed border-white/20 mt-[-6px] opacity-50" />
            </div>

            <div className="flex-1 flex items-center justify-center w-full z-20">
                <AnimatePresence mode="wait" custom={currentTruck.dir}>
                    {!isFleetView ? (
                        <motion.div
                            key={currentIndex}
                            custom={currentTruck.dir}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="flex flex-col items-center w-full"
                        >
                            <div className="relative w-full max-w-[85vw] lg:max-w-6xl mt-[-5vh]">
                                <img
                                    src={currentTruck.src}
                                    alt={`Truck ${currentIndex + 1}`}
                                    className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)] rounded-2xl border-4 border-white shadow-xl"
                                />
                                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-20 bg-black/30 blur-3xl rounded-full -z-10" />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="mt-16 flex flex-col items-center gap-6 z-50"
                            >
                                <button
                                    onClick={nextStep}
                                    className="bg-brand-blue text-white px-14 py-6 rounded-full text-3xl md:text-5xl font-black shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:bg-brand-dark-blue hover:scale-110 active:scale-95 transition-all flex items-center gap-8 group border-4 border-white/20"
                                >
                                    {currentIndex === trucks.length - 1 ? "לראות את הצי המלא" : "המשאית הבאה"}
                                </button>
                                <div className="bg-brand-blue/10 px-6 py-2 rounded-full backdrop-blur-sm">
                                    <p className="text-brand-blue/60 font-black uppercase tracking-widest text-sm">
                                        Truck {currentIndex + 1} of {trucks.length}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="fleet"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-[95vw] px-4"
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12 max-h-[50vh] overflow-y-auto p-4 scrollbar-none bg-white/40 rounded-[3rem] backdrop-blur-md border border-white/60 shadow-inner">
                                {trucks.map((t, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-white p-3 rounded-2xl shadow-lg border border-zinc-100 hover:scale-110 hover:rotate-1 hover:z-30 transition-all cursor-pointer group"
                                        onClick={() => {
                                            setCurrentIndex(idx);
                                            setIsFleetView(false);
                                        }}
                                    >
                                        <img src={t.src} alt={`Fleet ${idx}`} className="w-full h-auto rounded shadow-inner" />
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex justify-center gap-10">
                                <button
                                    onClick={reset}
                                    className="bg-white text-brand-blue border-4 border-brand-blue px-12 py-5 rounded-full font-black text-2xl flex items-center gap-4 hover:bg-brand-blue hover:text-white transition-all shadow-xl"
                                >
                                    <RotateCcw size={32} />
                                    צפייה חוזרת
                                </button>
                                <button
                                    onClick={() => onNavigate(10)}
                                    className="bg-brand-blue text-white px-16 py-5 rounded-full font-black text-3xl flex items-center gap-8 group shadow-[0_25px_50px_rgba(0,0,0,0.5)] hover:bg-brand-dark-blue hover:scale-105 transition-all border-4 border-white/20"
                                >
                                    המשך לסרטון המשאית
                                    <ChevronRight size={48} className="group-hover:translate-x-3 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TruckHumorSlide;
