import { motion } from 'framer-motion';

/** Wave of glowing hearts crossing the screen between chapters. */
export default function ChapterTransition({ variant = 0 }: { variant?: number }) {
  const hearts = Array.from({ length: 14 });
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[65] flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-burgundy-deepest/60 backdrop-blur-[2px]" />
      {hearts.map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-rose-gold"
          style={{ left: '-5%', top: `${(i * 7 + variant * 12) % 100}%` }}
          initial={{ x: 0, opacity: 0, scale: 0.4 }}
          animate={{ x: '110vw', opacity: [0, 1, 0], scale: [0.4, 1, 0.6] }}
          transition={{ duration: 1.1, delay: i * 0.05, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-rose-gold drop-shadow-[0_0_6px_rgba(216,160,120,0.9)]">
            <path d="M12 21s-7.5-4.6-10-9.2C.3 8.2 2 4.5 5.5 4.5c2 0 3.4 1.1 4.5 2.5 1.1-1.4 2.5-2.5 4.5-2.5C18 4.5 19.7 8.2 18 11.8 15.5 16.4 12 21 12 21z" />
          </svg>
        </motion.span>
      ))}
    </motion.div>
  );
}
