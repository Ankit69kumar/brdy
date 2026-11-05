import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import type { Chapter } from '@/data/story';
import AmbientBackground from '@/components/AmbientBackground';
import FloatingHearts from '@/components/FloatingHearts';
import PhotoTile from '@/components/PhotoTile';
import { Chapter4Layout, Chapter5Layout, Chapter6Layout } from '@/components/PhotoLayouts';
import AnimatedTitle from '@/components/AnimatedTitle';
import ChapterProgress from '@/components/ChapterProgress';
import LoveButton from '@/components/LoveButton';

interface ChapterScreenProps {
  chapter: Chapter;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
}

export default function ChapterScreen({
  chapter,
  index,
  total,
  onPrev,
  onNext,
  onJump,
}: ChapterScreenProps) {
  const isFirst = index === 0;
  const photoCount = chapter.photos.length;
  // Chapters 4 (3 photos) and 6 (6 photos) use a stacked layout
  // so the gallery has room to breathe on every screen size.
  const stacked = photoCount > 1;

  const renderPhotos = () => {
    switch (chapter.id) {
      case 4:
        return <Chapter4Layout photos={chapter.photos} alt={chapter.title} />;
      case 5:
        return <Chapter5Layout photos={chapter.photos} alt={chapter.title} />;
      case 6:
        return <Chapter6Layout photos={chapter.photos} alt={chapter.title} />;
      default:
        // Chapters 1, 2, 3 — single large photo
        return (
          <PhotoTile
            src={chapter.photos[0]}
            alt={chapter.title}
            index={0}
            delay={0.2}
            className="mx-auto w-full max-w-sm"
          />
        );
    }
  };

  const TextBlock = (
    <motion.div
      initial={{ opacity: 0, x: stacked ? 0 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.3 }}
      className={`space-y-5 ${stacked ? 'text-center' : 'text-center md:text-left'}`}
    >
      <p className="text-sm uppercase tracking-[0.3em] text-rose-gold/70">
        Chapter {String(chapter.id).padStart(2, '0')}
      </p>
      <AnimatedTitle
        text={chapter.title}
        className="font-serif text-3xl leading-tight text-gradient-rose sm:text-4xl"
      />
      <p className="font-hand text-xl text-rose-gold">{chapter.date}</p>
      <p className="font-serif text-lg italic text-blush">{chapter.caption}</p>
      <div className="glass-soft rounded-2xl px-5 py-4">
        <p className="font-hand text-xl leading-relaxed text-champagne/90">{chapter.note}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="grain relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-16 sm:px-10">
      <AmbientBackground count={14} />
      <FloatingHearts count={5} />

      {/* Chapter number watermark */}
      <motion.span
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute left-2 top-6 font-serif text-[28vw] leading-none text-rose-gold sm:text-[18vw]"
      >
        {String(chapter.id).padStart(2, '0')}
      </motion.span>

      {stacked ? (
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-10">
          <div className="w-full">{TextBlock}</div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full"
          >
            {renderPhotos()}
          </motion.div>
        </div>
      ) : (
        <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-2">
          <div className="mx-auto w-full max-w-sm">{renderPhotos()}</div>
          {TextBlock}
        </div>
      )}

      {/* Navigation */}
      <div className="relative z-10 mt-12 flex flex-col items-center gap-5">
        <ChapterProgress current={chapter.id} onJump={onJump} />

        <div className="flex items-center gap-4">
          {!isFirst && (
            <motion.button
              onClick={onPrev}
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 text-xs uppercase tracking-widest text-rose-gold/70 hover:text-rose-gold"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </motion.button>
          )}
          <LoveButton onClick={onNext} className="text-xs sm:text-sm">
            {chapter.navLabel}
          </LoveButton>
        </div>
      </div>
    </div>
  );
}
