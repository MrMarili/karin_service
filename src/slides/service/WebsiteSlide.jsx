import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Smartphone, Megaphone } from 'lucide-react';
import web1 from '../../assets/website/web1.png';
import web2 from '../../assets/website/web2.png';
import campaign1 from '../../assets/website/campaign1.jpg';
import campaign2 from '../../assets/website/campaign2.png';
import campaign3 from '../../assets/website/campaign3.png';

const WebsiteSlide = ({ onNavigate }) => {
    return (
        <div className="h-full w-full bg-brand-light-blue flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            <button
                onClick={() => onNavigate(2)}
                className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 text-brand-dark-blue hover:opacity-70 transition-opacity font-bold z-50"
            >
                <ArrowRight size={32} />
                <span>חזרה לתפריט</span>
            </button>
            <h2 className="text-6xl md:text-[9rem] font-black text-white mb-8 md:mb-16 relative z-10">אתר ומדיה</h2>

            <div className="flex flex-col gap-8 md:gap-16 w-full max-w-[120rem] relative z-10 items-center justify-center overflow-y-auto md:overflow-visible h-[70vh] md:h-auto px-4 pb-20 md:pb-0 pt-16">

                {/* Row 1: Digital Presence */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full justify-center h-auto md:h-[30rem] shrink-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex-1 bg-white rounded-[4rem] shadow-3xl overflow-hidden border-8 border-white relative group h-[20rem] md:h-auto"
                    >
                        <img src={web1} alt="Website" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-5xl md:text-7xl font-black">האתר החדש</span>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 bg-white rounded-[4rem] shadow-3xl overflow-hidden border-8 border-white relative group h-[20rem] md:h-auto"
                    >
                        <img src={web2} alt="Social" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-5xl md:text-7xl font-black">סושיאל מדיה</span>
                        </div>
                    </motion.div>
                </div>

                {/* Row 2: Campaigns */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full justify-center h-auto md:h-[30rem] shrink-0">
                    {[campaign1, campaign2, campaign3].map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            className="flex-1 bg-white rounded-[4rem] shadow-3xl overflow-hidden border-8 border-white relative group h-[20rem] md:h-auto"
                        >
                            <img src={img} alt={`Campaign ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-4xl md:text-6xl font-black">קמפיין {i + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-12 md:mt-16 flex gap-12 text-white relative z-10">
                <div className="flex items-center gap-4 text-3xl font-black bg-white/20 px-10 py-4 rounded-full border border-white/30">
                    <Globe size={32} />
                    <span>חווית אונליין</span>
                </div>
                <div className="flex items-center gap-4 text-3xl font-black bg-white/20 px-10 py-4 rounded-full border border-white/30">
                    <Megaphone size={32} />
                    <span>קמפיינים בולטים</span>
                </div>
            </div>
        </div>
    );
};

export default WebsiteSlide;
