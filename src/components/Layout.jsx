import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Menu } from 'lucide-react';
import { cn } from '../lib/utils';

const Layout = ({ children, currentSlide, totalSlides, onNext, onPrev }) => {
    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 overflow-hidden flex flex-col font-sans relative">
            {/* Decorative Background Elements */}
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            {/* Header / Navigation Bar */}
            <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center pointer-events-auto">
                    {/* Logo Placeholder or Small Icon */}
                    <div className="w-8 h-8 bg-brand-primary rounded-full opacity-80" />
                </div>

                {/* Empty container where dots used to be */}
                <div />

                <button className="p-2 hover:bg-white/50 rounded-full transition-colors pointer-events-auto">
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 relative z-10 flex flex-col justify-center items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full h-full flex flex-col justify-center"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Navigation Controls */}
            <div className="fixed bottom-8 left-0 right-0 flex justify-between px-8 z-50 pointer-events-none">
                <button
                    onClick={onPrev}
                    disabled={currentSlide === 0}
                    className={cn(
                        "pointer-events-auto p-4 rounded-full bg-white shadow-lg shadow-gray-200/50 text-brand-primary transition-all hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none",
                        "backdrop-blur-sm bg-white/80 border border-white/20"
                    )}
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                <button
                    onClick={onNext}
                    disabled={currentSlide === totalSlides - 1}
                    className={cn(
                        "pointer-events-auto p-4 rounded-full bg-brand-primary shadow-lg shadow-brand-primary/30 text-white transition-all hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none",
                        "hover:bg-brand-primary/90"
                    )}
                >
                    <ChevronLeft className="w-6 h-6" />
                    {/* ChevronLeft points 'Next' in RTL */}
                </button>
            </div>
        </div>
    );
};

export default Layout;
