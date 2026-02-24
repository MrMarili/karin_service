import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Store, Globe, MessageCircleHeart } from 'lucide-react';
import Logo from '../components/Logo';

const SuccessStorySlide = ({ onNavigate }) => {
    // onNavigate(index) - function to jump to specific slide

    // Slide indices based on expected App.jsx order:
    // 0: Opening
    // 1: SuccessStory (Current)
    // 2: Products
    // 3: Store
    // 4: Website
    // 5: WhyNow (Language Start)

    const menuItems = [
        { title: "במוצרים", icon: ShoppingBag, color: "bg-blue-100 text-blue-600", targetSlide: 3 },
        { title: "בנראות הסניף", icon: Store, color: "bg-purple-100 text-purple-600", targetSlide: 4 },
        { title: "באתר", icon: Globe, color: "bg-green-100 text-green-600", targetSlide: 5 },
        { title: "בשפת המכירה", icon: MessageCircleHeart, color: "bg-brand-blue text-white", highlight: true, targetSlide: 6 }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="h-full w-full bg-brand-yellow flex flex-col items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
            >
                <Logo className="transform scale-75" variant="box" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-black text-brand-black mb-4">
                    השינוי קורה בכל מקום:
                </h2>
                <p className="text-xl md:text-2xl font-medium text-brand-dark-blue">
                    לחצו על כל קטגוריה כדי לצלול לעומק
                </p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {menuItems.map((item, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNavigate(item.targetSlide)}
                        className={`
                            relative overflow-hidden p-8 rounded-3xl shadow-xl border-4 border-transparent
                            flex flex-col items-center justify-center gap-6 transition-all h-64
                            ${item.highlight ? 'bg-brand-blue border-4 border-brand-yellow shadow-[0_0_25px_rgba(255,200,0,0.4)] scale-105 z-10' : 'bg-white hover:border-brand-blue/30'}
                        `}
                    >
                        <div className={`p-6 rounded-2xl ${item.highlight ? 'bg-white/10 text-white' : item.color}`}>
                            <item.icon size={48} strokeWidth={2.5} />
                        </div>
                        <span className={`text-3xl font-black ${item.highlight ? 'text-white' : 'text-brand-black'}`}>
                            {item.title}
                        </span>
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
};

export default SuccessStorySlide;
