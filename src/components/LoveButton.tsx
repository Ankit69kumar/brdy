import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LoveButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'solid' | 'outline';
  icon?: boolean;
}

/** Rose-gold glowing button with moving light reflection + press + heart burst on click. */
export default function LoveButton({
  children,
  onClick,
  className = '',
  variant = 'solid',
  icon = true,
}: LoveButtonProps) {
  const [bursts, setBursts] = useState<number[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBursts((b) => [...b, Date.now()]);
    setTimeout(() => setBursts((b) => b.filter((id) => id !== Date.now() + 1)), 900);
    onClick?.();
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative overflow-hidden rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
        variant === 'solid'
          ? 'bg-gradient-to-r from-burgundy-wine to-rose-gold text-champagne shadow-[0_0_30px_rgba(216,160,120,0.35)]'
          : 'border border-rose-gold/60 bg-burgundy-deep/40 text-champagne backdrop-blur-md'
      } hover:shadow-[0_0_45px_rgba(216,160,120,0.6)] hover:border-rose-gold ${className}`}
    >
      {/* moving light reflection */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-champagne/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <Heart className="h-4 w-4 animate-heartbeat text-rose-gold" />}
      </span>
      {/* heart burst */}
      {bursts.map((id) => (
        <span key={id} className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {[...Array(6)].map((_, i) => {
            const ang = (i / 6) * Math.PI * 2;
            return (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                animate={{ x: Math.cos(ang) * 40, y: Math.sin(ang) * 40, opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute"
              >
                <Heart className="h-3 w-3 fill-rose-gold text-rose-gold" />
              </motion.span>
            );
          })}
        </span>
      ))}
    </motion.button>
  );
}
