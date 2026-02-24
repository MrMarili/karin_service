import React from 'react';
import { motion } from 'framer-motion';
import { User, Headphones, HardHat, Star, Home, ShieldCheck, Heart, Zap } from 'lucide-react';

// Attempt to import images, but provide null if they fail during build/dev
// Relative imports
import karinImg from '../../assets/avatars/karin.jpeg';
import orlyImg from '../../assets/avatars/orly.jpeg';
import pazImg from '../../assets/avatars/paz.jpeg';
import ronaImg from '../../assets/avatars/rona.jpeg';
import maliImg from '../../assets/avatars/mali.jpeg';
import maayanImg from '../../assets/avatars/maayan.jpeg';
import hagiImg from '../../assets/avatars/hagi.jpeg';
import eliImg from '../../assets/avatars/eli.jpeg';
import logoImg from '../../assets/shomrat-logo.jpg';

const ASSETS = {
    karin: karinImg,
    orly: orlyImg,
    paz: pazImg,
    rona: ronaImg,
    mali: maliImg,
    maayan: maayanImg,
    hagi: hagiImg,
    eli: eliImg,
    home: logoImg,
};

const PersonaAvatars = ({ type, size = 120, label, className = "", delay = 0, dramaticEntry = false }) => {
    const personas = {
        karin: { img: ASSETS.karin, color: "text-brand-blue", bg: "bg-blue-50", label: label || "קארין", icon: ShieldCheck },
        orly: { img: ASSETS.orly, color: "text-brand-dark-blue", bg: "bg-gray-50", label: label || "אורלי", icon: User },
        paz: { img: ASSETS.paz, color: "text-brand-yellow", bg: "bg-yellow-50", label: label || "פז", icon: Star },
        rona: { img: ASSETS.rona, color: "text-brand-blue", bg: "bg-blue-50", label: label || "רונה", icon: Headphones },
        mali: { img: ASSETS.mali, color: "text-brand-green", bg: "bg-green-50", label: label || "מלי", icon: Heart },
        maayan: { img: ASSETS.maayan, color: "text-brand-blue", bg: "bg-blue-50", label: label || "מעיין", icon: Zap },
        hagi: { img: ASSETS.hagi, color: "text-brand-green", bg: "bg-green-50", label: label || "חגי", icon: HardHat },
        eli: { img: ASSETS.eli, color: "text-brand-green", bg: "bg-green-50", label: label || "אלי", icon: HardHat },
        customer: { img: null, color: "text-red-500", bg: "bg-red-50", label: label || "הלקוח", icon: User },
        phone: { img: null, color: "text-brand-blue", bg: "bg-blue-50", label: label || "מוקד שירות", icon: Headphones },
        tech: { img: null, color: "text-brand-green", bg: "bg-green-50", label: label || "צוות שטח", icon: HardHat }
    };

    const p = personas[type] || personas.karin;
    const Icon = p.icon || User;
    const [imgError, setImgError] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
            className={`flex flex-col items-center gap-3 ${className}`}
        >
            <div className={`relative rounded-[2.5rem] ${p.bg} border-2 border-gray-100 transition-all bg-white overflow-hidden w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shadow-lg`}>
                {p.img && !imgError ? (
                    <img
                        src={p.img}
                        alt={p.label}
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <Icon size={48} className={p.color} />
                )}
            </div>

            {p.label && (
                <div className="text-xl md:text-2xl font-black text-brand-dark-blue whitespace-nowrap bg-white/50 px-4 py-1 rounded-full border border-gray-100 shadow-sm">
                    {p.label}
                </div>
            )}
        </motion.div>
    );
};

export default PersonaAvatars;
