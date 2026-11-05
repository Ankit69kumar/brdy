import { motion } from 'framer-motion';

/** Animated text reveal — word by word, romantic pacing. */
export default function AnimatedTitle({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <h2 className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: 'easeOut' }}
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </h2>
  );
}
