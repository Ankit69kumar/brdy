import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface PetalProps {
  count?: number;
  className?: string;
}

/** Floating rose petals + golden dust + twinkling stars — always alive. */
export default function AmbientBackground({ count = 18, className = '' }: PetalProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 14,
        size: 10 + Math.random() * 16,
        drift: (Math.random() - 0.5) * 120,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    [count],
  );

  const dust = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        size: 1 + Math.random() * 2.5,
      })),
    [],
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    [],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* living gradient */}
      <div
        className="absolute inset-0 animate-gradientShift"
        style={{
          background:
            'radial-gradient(120% 90% at 20% 10%, rgba(100,21,45,0.55), transparent 60%),' +
            'radial-gradient(120% 100% at 85% 90%, rgba(216,160,120,0.18), transparent 55%),' +
            'linear-gradient(120deg, #17060d, #380817 50%, #2a0814 100%)',
          backgroundSize: '200% 200%',
        }}
      />
      {/* twinkling stars */}
      {stars.map((s) => (
        <motion.span
          key={`star-${s.id}`}
          className="absolute rounded-full bg-champagne"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: 2, height: 2 }}
          animate={{ opacity: [0.1, 0.9, 0.1] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* golden dust */}
      {dust.map((d) => (
        <motion.span
          key={`dust-${d.id}`}
          className="absolute rounded-full bg-rose-gold"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            boxShadow: '0 0 6px rgba(216,160,120,0.8)',
          }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: 9 + d.delay, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* petals */}
      {petals.map((p) => (
        <motion.div
          key={`petal-${p.id}`}
          className="absolute"
          style={{ left: `${p.left}%`, top: '-10%', width: p.size, height: p.size * 0.7, opacity: p.opacity }}
          initial={{ y: 0, x: 0, rotate: 0 }}
          animate={{ y: '120vh', x: p.drift, rotate: 360 }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="h-full w-full rounded-[50%_0_50%_50%]"
            style={{ background: 'linear-gradient(135deg, #f4c7d0, #d8a078 70%, #64152d)' }}
          />
        </motion.div>
      ))}
    </div>
  );
}
