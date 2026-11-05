import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

interface PhotoTileProps {
  src: string;
  alt: string;
  /** index within the chapter, for stagger delays */
  index?: number;
  /** aspect ratio class, default 3/4 */
  aspect?: string;
  className?: string;
  /** optional fixed rotation in degrees */
  rotate?: number;
  /** reveal delay in seconds */
  delay?: number;
}

/**
 * A single photo tile with graceful fallback, slow Ken-Burns zoom,
 * light reflection sweep, and hover glow. Used by all chapter layouts.
 */
export default function PhotoTile({
  src,
  alt,
  index = 0,
  aspect = 'aspect-[3/4]',
  className = '',
  rotate = 0,
  delay = 0,
}: PhotoTileProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.85, rotate: rotate - 4 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate }}
      transition={{ duration: 0.9, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.04, rotate: rotate * 0.4, zIndex: 20 }}
      className={`relative ${className}`}
      style={{ perspective: 800 }}
    >
      <div
        className="relative rounded-xl border p-2 transition-shadow duration-300"
        style={{
          borderColor: 'rgba(216,160,120,0.5)',
          boxShadow: '0 0 30px rgba(216,160,120,0.18), inset 0 0 14px rgba(56,8,23,0.35)',
          background: 'rgba(255,240,229,0.04)',
        }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
          className={`relative ${aspect} w-full overflow-hidden rounded-lg`}
        >
          {!error ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-burgundy-deep/60">
                  <div className="h-7 w-7 animate-spin rounded-full border-2 border-rose-gold/40 border-t-rose-gold" />
                </div>
              )}
              <motion.img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="h-full w-full object-cover"
                style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s' }}
              />
              <motion.span
                className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-champagne/20 to-transparent"
                animate={{ x: ['-150%', '250%'] }}
                transition={{ duration: 5, repeat: Infinity, repeatDelay: 3 + index, ease: 'easeInOut' }}
              />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-burgundy to-burgundy-deepest p-4 text-center">
              <Upload className="h-6 w-6 text-rose-gold/70" />
              <p className="font-hand text-base text-blush">Your photo</p>
              <p className="text-[10px] text-rose-gold/50">{src.split('/').pop()}</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
