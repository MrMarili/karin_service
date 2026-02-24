import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import Logo from '../../components/Logo';

const ThankYouSlide = () => {
    const [isMuted, setIsMuted] = React.useState(false);
    const audioRef = React.useRef(null);

    React.useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(err => console.log("Audio play failed:", err));
        }
    }, []);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="h-full w-full bg-brand-yellow flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            {/* Background Music */}
            <audio ref={audioRef} src="/background-music.mp3" loop />

            {/* Audio Toggle */}
            <button
                onClick={toggleMute}
                className="absolute bottom-12 right-12 z-50 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg border-2 border-brand-blue/20 hover:scale-110 transition-all text-brand-blue"
            >
                {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
            </button>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="bg-white p-12 md:p-20 rounded-[5rem] shadow-2xl border-8 border-white/20 relative z-10"
            >
                <div className="mb-12">
                    <Logo className="transform scale-150" variant="box" />
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-7xl md:text-9xl font-black text-brand-blue tracking-tighter"
                >
                    תודה!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-2xl md:text-4xl font-bold text-brand-dark-blue mt-8 italic"
                >
                    שמרת הזורע - סיפור אהבה ישראלי
                </motion.p>
            </motion.div>

            {/* Decorative background elements */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] border-4 border-white/20 rounded-full"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] border-4 border-brand-blue/5 rounded-full"
            />
        </div>
    );
};

export default ThankYouSlide;
