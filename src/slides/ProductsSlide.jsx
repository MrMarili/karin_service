import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import product1 from '../assets/products/product1.jpg';
import product2 from '../assets/products/product2.jpg';
import product3 from '../assets/products/product3.jpg';
import product4 from '../assets/products/product4.jpg';
import product5 from '../assets/products/product5.jpg';

const products = [
    { id: 1, img: product1, title: "חדרי שינה" },
    { id: 2, img: product2, title: "סלונים ואירוח" },
    { id: 3, img: product3, title: "כורסאות מעוצבות" },
    { id: 4, img: product5, title: "פינות אוכל" },
    { id: 5, img: product4, title: "קונסולות וכניסה" }
];

const ProductsSlide = ({ onNavigate }) => {
    return (
        <div className="h-full w-full bg-brand-yellow flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            <button
                onClick={() => onNavigate(2)}
                className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 text-brand-black hover:opacity-70 transition-opacity font-bold z-50"
            >
                <ArrowRight size={24} className="md:w-8 md:h-8" />
                <span className="text-lg md:text-base">חזרה לתפריט</span>
            </button>
            <h2 className="text-6xl md:text-[8rem] font-black text-brand-black mb-12 md:mb-20 relative z-10 max-w-full px-4">המהפכה במוצרים</h2>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 w-full max-w-[95%] md:max-w-[90%] relative z-10 px-2 md:px-4 pb-20 md:pb-0 overflow-y-auto md:overflow-visible max-h-[60vh] md:max-h-none">
                {products.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative w-[45%] sm:w-80 md:w-[22rem] aspect-square rounded-[2rem] md:rounded-[3rem] shadow-2xl md:shadow-3xl overflow-hidden border-4 md:border-8 border-white transform hover:-translate-y-4 transition-all duration-300"
                    >
                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-6 md:p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-white text-2xl md:text-4xl font-black">{item.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <p className="mt-12 md:mt-20 text-3xl md:text-5xl font-black text-brand-dark-blue max-w-5xl relative z-10 px-4 leading-tight">
                קולקציות חדשות שמתאימות בדיוק לצרכים של המשפחה הישראלית המודרנית.
            </p>
        </div>
    );
};

export default ProductsSlide;
