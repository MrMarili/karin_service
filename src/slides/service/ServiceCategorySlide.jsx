import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Store, Globe, Headphones } from 'lucide-react';
import Logo from '../../components/Logo';

const ServiceCategorySlide = ({ onNavigate }) => {
    // Categories based on the screenshot, with "שירות" instead of "שפת המכירה"
    // targetSlide indices based on the new ServiceApp order:
    // 0: Intro, 1: Vision, 2: Categories (Self), 3: Products, 4: Store, 5: Website, 6: Team App (Service)
    const menuItems = [
        { title: "במוצרים", icon: ShoppingBag, color: "bg-blue-100 text-blue-600", target: 3 },
        { title: "בנראות הסניף", icon: Store, color: "bg-purple-100 text-purple-600", target: 4 },
        { title: "באתר", icon: Globe, color: "bg-green-100 text-green-600", target: 5 },
        { title: "שירות", icon: Headphones, color: "bg-brand-blue text-white", highlight: true, target: 6 }
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
        <div className="h-full w-full bg-brand-yellow flex flex-col items-center justify-center p-8 relative overflow-hidden" dir="rtl">
            {/* Logo in top right as requested */}
            <div className="absolute top-12 right-12 scale-125 z-20">
                <Logo />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-6xl font-black text-brand-black mb-4 tracking-tighter">
                    השינוי קורה בכל מקום:
                </h2>
                <p className="text-xl md:text-3xl font-bold text-brand-dark-blue opacity-80">
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
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNavigate(item.target)}
                        className={`
                            relative overflow-hidden p-8 rounded-[3.5rem] shadow-2xl border-4 border-transparent
                            flex flex-col items-center justify-center gap-8 transition-all h-64 md:h-80
                            ${item.highlight ? 'bg-brand-blue border-brand-yellow shadow-[0_0_35px_rgba(255,200,0,0.4)] scale-105 z-10' : 'bg-white hover:border-brand-blue/30'}
                        `}
                    >
                        <div className={`p-8 rounded-3xl ${item.highlight ? 'bg-white/10 text-white' : item.color} shadow-inner`}>
                            <item.icon size={60} strokeWidth={2.5} />
                        </div>
                        <span className={`text-3xl md:text-4xl font-black ${item.highlight ? 'text-white' : 'text-brand-black'}`}>
                            {item.title}
                        </span>

                        {item.highlight && (
                            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                        )}
                    </motion.button>
                ))}
            </motion.div>

            <div className="absolute bottom-12 inset-x-0 text-center text-brand-black/20 font-black text-2xl uppercase tracking-widest pointer-events-none">
                Shomrat Hazorea • One Brand
            </div>
        </div>
    );
};

export default ServiceCategorySlide;
