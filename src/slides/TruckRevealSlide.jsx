import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ArrowLeft } from 'lucide-react';

const TruckRevealSlide = ({ onNavigate }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    useEffect(() => {
        // Auto-hide overlay after 3 seconds
        const timer = setTimeout(() => {
            setShowOverlay(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-full bg-black overflow-hidden flex flex-col items-center justify-center">

            {/* Header Overlay */}
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="absolute top-0 left-0 right-0 z-20 p-8 bg-gradient-to-b from-black/80 to-transparent text-white text-center"
                    >
                        <h1 className="text-5xl font-black mb-2 shadow-sm">המיתוג החדש בתנועה</h1>
                        <p className="text-2xl font-bold opacity-90">המשאיות החדשות של שמרת הזורע</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Video Container */}
            <div className="w-full h-full flex items-center justify-center">
                <video
                    ref={videoRef}
                    className="max-w-full max-h-full shadow-2xl"
                    src="/truck-reveal.mp4"
                    autoPlay
                    loop
                    onClick={togglePlay}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />
            </div>

            {/* Controls Overlay */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center gap-6">
                <button
                    onClick={togglePlay}
                    className="bg-white/20 hover:bg-white/40 p-4 rounded-full backdrop-blur-md transition-all text-white border border-white/30"
                >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                </button>
                <button
                    onClick={toggleMute}
                    className="bg-white/20 hover:bg-white/40 p-4 rounded-full backdrop-blur-md transition-all text-white border border-white/30"
                >
                    {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
                </button>

                {/* Navigation Back */}
                <button
                    onClick={() => onNavigate(8)} // Jump back to OldVsNewInteractive
                    className="bg-white/10 hover:bg-white/20 flex items-center gap-2 text-white/50 hover:text-white transition-colors font-bold px-6 py-3 rounded-full backdrop-blur-sm border border-white/10"
                >
                    <ArrowLeft size={24} />
                    <span>חזרה לשקפים</span>
                </button>
            </div>

            {/* Watermark */}
            <div className="absolute top-4 right-4 opacity-30 z-10 w-32">
                {/* Fallback to simple text if logo is missing or hard to access relative to public */}
                <span className="text-white font-black text-xl italic tracking-tighter">SHOMRAT</span>
            </div>
        </div>
    );
};

export default TruckRevealSlide;
