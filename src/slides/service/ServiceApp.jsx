import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Core Service Slides
import IntroductionSection from './IntroductionSection';
import ServiceCategorySlide from './ServiceCategorySlide';
import VisionSlide from './VisionSlide';
import TeamAppreciationSlide from './TeamAppreciationSlide';
import LanguagePrinciplesSlide from './LanguagePrinciplesSlide';
import CommunicationTriangleSlide from './CommunicationTriangleSlide';
import AllowanceTableSlide from './AllowanceTableSlide';
import SummarySection from './SummarySection';

// Imported Sales Slides (One Brand Context)
import ProductsSlide from './ProductsSlide';
import StoreSlide from './StoreSlide';
import WebsiteSlide from './WebsiteSlide';

const ServiceApp = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(0);

    // Global Responsive Scaling: Adjusts root font-size based on viewport height
    useEffect(() => {
        const handleResize = () => {
            const targetHeight = 1080; // Full HD reference
            const currentHeight = window.innerHeight;

            // Calculate scale. If height is small, reduce font size significantly.
            let scale = currentHeight / targetHeight;

            // Clamp scale between 0.4 (allow significant shrinking) and 1.0 (no over-scaling)
            scale = Math.max(0.4, Math.min(1.0, scale));

            // Apply scale to root element
            document.documentElement.style.fontSize = `${16 * scale}px`;
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            // Reset on unmount
            document.documentElement.style.fontSize = '16px';
        };
    }, []);

    // Structure matches SuccessStorySlide expectations (Menu at index 2)
    const slides = [
        { id: 'intro', component: IntroductionSection, props: { step: 0 } }, // 0
        { id: 'vision', component: VisionSlide, props: {} },                // 1
        { id: 'categories', component: ServiceCategorySlide, props: {} },   // 2 (The Menu)
        { id: 'products', component: ProductsSlide, props: {} },            // 3
        { id: 'store', component: StoreSlide, props: {} },                  // 4
        { id: 'website', component: WebsiteSlide, props: {} },              // 5
        { id: 'appreciation', component: TeamAppreciationSlide, props: {} }, // 6 (The "Service" category)
        { id: 'principles', component: LanguagePrinciplesSlide, props: {} }, // 7
        { id: 'triangle', component: CommunicationTriangleSlide, props: {} }, // 8
        { id: 'allowance', component: AllowanceTableSlide, props: {} },     // 9
        { id: 'summary', component: SummarySection, props: {} }             // 10
    ];

    const nextStep = () => {
        if (currentStep < slides.length - 1) {
            setDirection(1);
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleJump = (index) => {
        if (index >= 0 && index < slides.length) {
            setDirection(index > currentStep ? 1 : -1);
            setCurrentStep(index);
        }
    };

    const CurrentSlide = slides[currentStep].component;

    return (
        <div className="h-screen w-screen bg-white overflow-hidden flex flex-col font-sans select-none" dir="rtl">
            <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentStep}
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute inset-0"
                    >
                        {CurrentSlide ? (
                            <CurrentSlide
                                {...slides[currentStep].props}
                                onNavigate={handleJump}
                            />
                        ) : (
                            <div className="p-20 text-center text-2xl font-black">טוען שקף...</div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Overlay - Now in top left */}
            <div className="fixed top-6 left-6 flex flex-col items-start gap-3 z-50">
                <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-2 rounded-full shadow-lg border border-white/20">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="p-3 rounded-full bg-brand-blue text-white disabled:opacity-20 hover:scale-110 active:scale-95 transition-all shadow-md"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <button
                        onClick={nextStep}
                        disabled={currentStep === slides.length - 1}
                        className="p-3 rounded-full bg-brand-blue text-white disabled:opacity-20 hover:scale-110 active:scale-95 transition-all shadow-md"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="bg-brand-dark-blue/80 text-white px-4 py-1.5 rounded-full font-black text-xs shadow-xl">
                        {currentStep + 1} / {slides.length}
                    </div>
                </div>

                {/* Dots indicator - smaller and subtle */}
                <div className="flex gap-1 px-4">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'w-6 bg-brand-yellow' : 'w-1.5 bg-gray-300/50'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceApp;
