import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import PhotoTile from '@/components/PhotoTile';

interface PhotoLayoutProps {
  photos: string[];
  alt: string;
}

/** Chapter 4 — three-photo scrapbook collage with elegant varied angles. */
export function Chapter4Layout({ photos, alt }: PhotoLayoutProps) {
  const angles = [-6, 4, -3];
  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col items-center gap-4 sm:gap-6">
      {photos.map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.15 }}
          className="w-full"
          style={{ maxWidth: i === 1 ? '100%' : '85%' }}
        >
          <PhotoTile
            src={src}
            alt={`${alt} — photo ${i + 1}`}
            index={i}
            rotate={angles[i]}
            delay={0.2 + i * 0.15}
            className={i === 1 ? 'mx-auto' : i === 0 ? 'mr-auto' : 'ml-auto'}
          />
        </motion.div>
      ))}
    </div>
  );
}

/** Chapter 5 — single photo with a soft heart-inspired glowing frame. */
export function Chapter5Layout({ photos, alt }: PhotoLayoutProps) {
  const src = photos[0] ?? '';
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* glowing aura behind */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="pointer-events-none absolute -inset-6 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(216,160,120,0.35), transparent 70%)' }}
      />
      <div className="relative">
        <PhotoTile src={src} alt={alt} index={0} delay={0.2} />
        {/* tiny heart accents in the corners of the frame */}
        {[
          'left-1 top-1',
          'right-1 top-1',
          'left-1 bottom-1',
          'right-1 bottom-1',
        ].map((pos) => (
          <Heart
            key={pos}
            className={`absolute ${pos} h-3 w-3 fill-rose-gold/40 text-rose-gold/40`}
          />
        ))}
      </div>
    </div>
  );
}

/** Chapter 6 — six-photo premium memory gallery, responsive grid. */
export function Chapter6Layout({ photos, alt }: PhotoLayoutProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {photos.map((src, i) => (
        <PhotoTile
          key={src}
          src={src}
          alt={`${alt} — photo ${i + 1}`}
          index={i}
          aspect="aspect-square"
          delay={0.15 * i}
          className={i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}
        />
      ))}
    </div>
  );
}
