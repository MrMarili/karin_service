import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import PersonaAvatars from './PersonaAvatars';
import Logo from '../../components/Logo';

const FieldOfficeSyncSlide = () => {
    return (
        <div className="h-full w-full bg-brand-dark-blue flex flex-col items-center justify-center p-12 text-center overflow-hidden relative" dir="rtl">
            {/* Integrated Logo */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-8 right-8 z-20 bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
                <Logo variant="white" size="small" />
            </motion.div>

            <h2 className="text-6xl md:text-8xl font-black text-brand-yellow mb-16 drop-shadow-md tracking-tighter leading-none">חיבור מנצח: שטח ומשרד</h2>

            <div className="grid grid-cols-3 gap-8 w-full max-w-6xl items-start relative mt-8">
                {/* Visual Connector Line */}
                <div className="absolute top-1/4 left-0 right-0 h-2 bg-gradient-to-r from-brand-green/20 via-brand-yellow/20 to-brand-blue/20 -z-10 rounded-full blur-sm" />

                {/* Step 1: Field */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center gap-6"
                >
                    <PersonaAvatars type="tech" size={100} label="תומר בשטח" delay={0.3} />
                    <div className="bg-white/10 p-8 rounded-[2.5rem] border-r-[12px] border-brand-green shadow-xl backdrop-blur-sm">
                        <p className="text-3xl font-black text-white leading-tight">
                            "המידע שאתה אוסף <br /> <span className="text-brand-green font-bold">הוא הקול של הלקוח</span>"
                        </p>
                    </div>
                </motion.div>

                {/* Step 2: Sync */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="bg-brand-yellow p-10 rounded-full shadow-2xl border-8 border-white">
                        <Smartphone size={80} className="text-brand-blue" />
                    </div>
                    <div className="text-4xl font-black text-brand-yellow animate-pulse tracking-tight mt-2">
                        דיווח מיידי ומדויק
                    </div>
                </motion.div>

                {/* Step 3: Office */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center gap-6"
                >
                    <PersonaAvatars type="phone" size={100} label="נועה מהמוקד" delay={0.5} />
                    <div className="bg-white/10 p-8 rounded-[2.5rem] border-l-[12px] border-brand-blue shadow-xl backdrop-blur-sm">
                        <p className="text-3xl font-black text-white leading-tight">
                            "מה שיופיע בדו"ח <br /> <span className="text-brand-blue font-bold">זה מה שהלקוח יקבל</span>"
                        </p>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.02 }}
                className="mt-16 bg-white p-10 rounded-[4rem] shadow-2xl border-b-[16px] border-brand-yellow flex items-center gap-10 max-w-4xl mx-auto transition-transform cursor-pointer"
            >
                <PersonaAvatars type="customer" size={100} className="shrink-0" delay={1.2} />
                <p className="text-4xl font-black text-brand-dark-blue leading-tight tracking-tight text-right">
                    "סנכרון מלא בבוקר – <br /> <span className="text-brand-blue underline decoration-brand-yellow underline-offset-4">שקט נפשי ללקוח בערב</span>"
                </p>
            </motion.div>
        </div>
    );
};

export default FieldOfficeSyncSlide;
