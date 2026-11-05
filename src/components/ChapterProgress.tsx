import { motion } from 'framer-motion';
import { CHAPTERS } from '@/data/story';

interface ProgressProps {
  current: number; // 1..6
  onJump?: (index: number) => void;
}

export default function ChapterProgress({ current, onJump }: ProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {CHAPTERS.map((c, i) => {
        const active = i + 1 === current;
        return (
          <div key={c.id} className="flex items-center gap-2 sm:gap-3">
            <motion.button
              onClick={() => onJump?.(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`relative text-xs tracking-widest transition-colors duration-300 ${
                active ? 'text-rose-gold' : 'text-rose-gold/30 hover:text-rose-gold/60'
              }`}
              aria-label={`Go to chapter ${c.id}`}
            >
              {String(c.id).padStart(2, '0')}
              {active && (
                <motion.span
                  layoutId="progress-dot"
                  className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-rose-gold shadow-[0_0_10px_rgba(216,160,120,0.9)]"
                />
              )}
            </motion.button>
            {i < CHAPTERS.length - 1 && <span className="text-rose-gold/20">—</span>}
          </div>
        );
      })}
    </div>
  );
}
