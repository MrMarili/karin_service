import React from 'react';
import { motion } from 'framer-motion';

import { Store, ArrowRight } from 'lucide-react';

import storeRender from '../../assets/store-render.png';

const StoreSlide = ({ onNavigate }) => {
    return (
        <div className="h-full w-full bg-brand-blue flex flex-col items-center justify-center p-8 text-center text-white relative">
            <button
                onClick={() => onNavigate(2)}
                className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 text-white hover:opacity-70 transition-opacity font-bold z-50"
            >
                <ArrowRight size={24} className="md:w-8 md:h-8" />
                <span className="text-lg md:text-base">חזרה לתפריט</span>
            </button>
            <h2 className="text-6xl md:text-[9rem] font-black mb-12 md:mb-16 text-center px-2">נראות הסניף החדשה</h2>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="w-full max-w-7xl aspect-video bg-white/10 rounded-[3rem] md:rounded-[4rem] border-8 border-white/20 flex items-center justify-center backdrop-blur-sm shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden"
            >
                <img
                    src={storeRender}
                    alt="הדמיית הסניף החדש"
                    className="w-full h-full object-cover object-[center_15%] transition-transform duration-1000 hover:scale-105"
                />
            </motion.div>

            <p className="mt-12 md:mt-20 text-3xl md:text-5xl font-black max-w-5xl px-4 text-center leading-tight">
                חללים פתוחים, מזמינים וביתיים - חווית קנייה שמרגישה כמו בבית.
            </p>
        </div>
    );
};

export default StoreSlide;
