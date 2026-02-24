import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Star, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import wissmannLogo from '../assets/wissmann-logo.jpg';

const RamadanGreeting = () => {
    const [ip, setIp] = React.useState('localhost');
    const [showQr, setShowQr] = React.useState(false);

    React.useEffect(() => {
        fetch('/api/ip')
            .then(res => res.json())
            .then(data => {
                if (data.ips && data.ips.length > 0) {
                    setIp(data.ips[0].address);
                }
            })
            .catch(err => console.error("Failed to fetch IP", err));
    }, []);

    const shareUrl = `http://${ip}:5173/ramadan`;

    // Gold Color CSS for inline styles where tailwind might miss custom exact hex
    const goldColor = "#D4AF37";

    return (
        <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center text-gray-900 relative overflow-hidden font-sans" dir="rtl">

            {/* Decorative Elements - Stars/Moons background (Gold subtler) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-yellow-600/10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.5, 1],
                            y: [0, -15, 0]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    >
                        <Star size={Math.random() * 15 + 5} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            {/* Main Content Card (White luxury) */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="z-10 bg-white/80 backdrop-blur-xl p-8 md:p-16 rounded-[2rem] border border-yellow-600/20 shadow-[0_20px_60px_rgba(212,175,55,0.15)] text-center max-w-4xl w-full mx-4 flex flex-col items-center"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                    className="mb-10 inline-block"
                >
                    <div className="relative">
                        <Moon size={100} className="text-yellow-600 drop-shadow-lg" fill="currentColor" />
                        <Star size={40} className="absolute -top-2 -right-4 text-yellow-400 drop-shadow-md animate-pulse" fill="currentColor" />
                    </div>
                </motion.div>

                {/* Arabic Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-7xl md:text-9xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 drop-shadow-sm font-sans"
                    style={{ fontFamily: "'Tahoma', 'Arial', sans-serif" }}
                >
                    رمضان كريم
                </motion.h1>

                {/* Greeting Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="space-y-4 mb-12"
                >
                    <p className="text-3xl md:text-4xl font-light text-gray-700" style={{ fontFamily: "'Tahoma', 'Arial', sans-serif" }}>
                        كل عام وأنتم بخير
                    </p>
                </motion.div>

                {/* Divider */}
                <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mb-10 opacity-30" />

                {/* Signature Block */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="space-y-6 text-gray-800"
                >
                    <div className="hidden md:block">
                        <p className="text-xl text-gray-500" style={{ fontFamily: "'Tahoma', 'Arial', sans-serif" }}>مع أطيب التحيات</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-2xl md:text-4xl font-bold text-yellow-700" style={{ fontFamily: "'Tahoma', 'Arial', sans-serif" }}>
                            أرييه ونحوم ويسمان
                        </p>
                    </div>

                    <div className="text-lg md:text-2xl text-gray-500 mt-2 font-light">
                        <p className="mb-1" style={{ fontFamily: "'Tahoma', 'Arial', sans-serif" }}>وإدارة الشركه</p>
                    </div>
                </motion.div>

                {/* Logo Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 }}
                    className="mt-12 flex justify-center w-full"
                >
                    <img
                        src={wissmannLogo}
                        alt="Wissmann Holdings"
                        className="w-48 md:w-64 h-auto object-contain drop-shadow-sm"
                    />
                </motion.div>

            </motion.div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-xs font-light tracking-[0.2em] uppercase">
                Wissmann Holdings - Since 1932
            </div>

            {/* Share / QR Code FAB */}
            <div className="absolute top-8 left-8 z-50 flex flex-col items-start pointer-events-auto">
                <button
                    onClick={() => setShowQr(!showQr)}
                    className="flex items-center gap-2 bg-white hover:bg-gray-50 px-4 py-2 rounded-full transition-all border border-gray-200 text-yellow-600 font-bold shadow-md"
                >
                    <Share2 size={20} />
                    <span className="hidden md:inline">Share / مشاركة</span>
                </button>

                {showQr && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 bg-white p-4 rounded-xl shadow-2xl flex flex-col items-center gap-2 border border-gray-100"
                    >
                        <QRCodeSVG value={shareUrl} size={150} />
                        <p className="text-gray-900 text-xs font-bold mt-2 text-center text-nowrap">Scan to open / امسح للفتح</p>
                    </motion.div>
                )}
            </div>

        </div>
    );
};

export default RamadanGreeting;
