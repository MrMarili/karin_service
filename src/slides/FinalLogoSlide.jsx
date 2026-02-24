import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause } from 'lucide-react';
import shomratLogo from '../assets/shomrat-logo.jpg';

const FinalLogoSlide = ({ onNavigate }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [folderImages, setFolderImages] = useState([]);

    // State for the slideshow: 'logo' or 'image'
    const [viewState, setViewState] = useState('logo');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    // 1. Load images AND music from folder
    useEffect(() => {
        // Load images
        const imageModules = import.meta.glob('../assets/final_slide/*.{png,jpg,jpeg,svg,webp}', { eager: true });
        const loadedImages = Object.values(imageModules).map(mod => mod.default);
        setFolderImages(loadedImages);

        // Try to load any MP3 from the folder
        const musicModules = import.meta.glob('../assets/final_slide/*.mp3', { eager: true });
        const loadedMusic = Object.values(musicModules).map(mod => mod.default);

        if (loadedMusic.length > 0 && audioRef.current) {
            audioRef.current.src = loadedMusic[0];
        }
    }, []);

    // 2. Control the Slideshow Loop - STOP AT END
    useEffect(() => {
        if (folderImages.length === 0 || isFinished) return;

        let timer;
        if (viewState === 'logo') {
            // Logo -> Image (3s)
            timer = setTimeout(() => {
                setViewState('image');
            }, 3000);
        } else {
            // Image -> Logo (5s)
            timer = setTimeout(() => {
                setViewState('logo');

                // Check if this was the last image
                if (currentImageIndex >= folderImages.length - 1) {
                    setIsFinished(true); // STOP HERE
                } else {
                    setCurrentImageIndex(prev => prev + 1); // Next image
                }
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [viewState, folderImages.length, currentImageIndex, isFinished]);

    // 3. Audio Handling & Fade Out
    useEffect(() => {
        if (isFinished && audioRef.current) {
            console.log("Fading out music...");
            const fadeAudio = setInterval(() => {
                if (audioRef.current.volume > 0.05) {
                    audioRef.current.volume -= 0.05;
                } else {
                    audioRef.current.volume = 0;
                    audioRef.current.pause();
                    clearInterval(fadeAudio);
                    setIsPlaying(false);
                }
            }, 200); // Reduce volume every 200ms
            return () => clearInterval(fadeAudio);
        }
    }, [isFinished]);

    // 3. Audio Handling
    const toggleMusic = async () => {
        if (!audioRef.current) return;
        try {
            if (audioRef.current.paused) {
                audioRef.current.volume = 1.0;
                await audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        } catch (err) {
            console.error("User toggle failed", err);
        }
    };

    // Auto-play on mount + Cleanup on unmount
    useEffect(() => {
        const playAudio = async () => {
            if (!audioRef.current) return;
            audioRef.current.volume = 1.0;
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (err) {
                console.log("Autoplay blocked");
                setIsPlaying(false);
            }
        };
        setTimeout(playAudio, 1000);

        // CLEANUP: Stop music when leaving the slide!
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0; // Reset to start
            }
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 bg-white flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => !isPlaying && toggleMusic()} // Click anywhere to play if blocked
            title={isPlaying ? "לחצי להשהיית המוזיקה" : "לחצי להפעלת המוזיקה"}
        >

            {/* Hidden Audio Element */}
            <audio ref={audioRef} loop onError={(e) => console.log("Audio Error", e)}>
                <source src="/background-music.mp3" type="audio/mpeg" />
            </audio>

            {/* Play/Pause Button (Top Left) */}
            <button
                onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
                className="absolute top-8 left-8 z-[60] p-4 bg-white/80 hover:bg-white rounded-full transition-all shadow-lg text-brand-dark-blue backdrop-blur-sm border-2 border-brand-blue/10 hover:scale-105 active:scale-95"
                title={isPlaying ? "השהה מוזיקה" : "נגן מוזיקה"}
            >
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>

            {/* Navigation Back */}
            <button
                onClick={(e) => { e.stopPropagation(); onNavigate(8); }}
                className="absolute top-8 right-8 flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors font-bold z-[60] bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm"
            >
                <ArrowLeft size={24} />
                <span>חזרה</span>
            </button>

            {/* Main Content Area */}
            <AnimatePresence mode="wait">
                {viewState === 'logo' ? (
                    <motion.div
                        key="logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 1 }}
                        className="flex flex-col items-center justify-center p-8 bg-white/90 rounded-full shadow-2xl border-4 border-gray-100 w-[500px] h-[500px]"
                    >
                        <img
                            src={shomratLogo}
                            alt="Shomrat Logo"
                            className="w-[80%] h-auto object-contain"
                        />
                        <p className="mt-8 text-2xl font-bold text-brand-blue font-heebo">תודה רבה!</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key={`img-${currentImageIndex}`}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-full flex items-center justify-center p-8"
                    >
                        {folderImages[currentImageIndex] ? (
                            <img
                                src={folderImages[currentImageIndex]}
                                alt="Team"
                                className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border-4 border-white"
                            />
                        ) : (
                            <div className="text-2xl text-gray-400">אין תמונות בתיקייה...</div>
                        )}

                        {/* Small Logo Watermark */}
                        <div className="absolute bottom-4 right-4 opacity-50 bg-white/80 p-2 rounded-lg">
                            <img src={shomratLogo} className="w-24 h-auto" alt="watermark" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FinalLogoSlide;
