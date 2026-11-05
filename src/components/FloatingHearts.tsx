import { useMemo } from 'react';
import { motion } from 'framer-motion';

/** Slow floating transparent heart silhouettes + glowing bubbles across a screen. */
export default function FloatingHearts({ count = 8 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 14 + Math.random() * 10,
        size: 16 + Math.random() * 40,
        opacity: 0.06 + Math.random() * 0.14,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-rose-gold"
          style={{ left: `${h.left}%`, bottom: '-12%', width: h.size, height: h.size, opacity: h.opacity }}
          animate={{ y: ['0%', '-1000%'], x: [0, (Math.random() - 0.5) * 80, 0], rotate: [0, 20, -10, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full drop-shadow-[0_0_8px_rgba(216,160,120,0.5)]">
            <path d="M12 21s-7.5-4.6-10-9.2C.3 8.2 2 4.5 5.5 4.5c2 0 3.4 1.1 4.5 2.5 1.1-1.4 2.5-2.5 4.5-2.5C18 4.5 19.7 8.2 18 11.8 15.5 16.4 12 21 12 21z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
