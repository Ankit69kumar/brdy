import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw, X } from 'lucide-react';
import AmbientBackground from '@/components/AmbientBackground';
import FloatingHearts from '@/components/FloatingHearts';
import LoveButton from '@/components/LoveButton';
import { STORY, FINAL_LETTER } from '@/data/story';

/** Petal / confetti burst when the letter opens. */
function CelebrationBurst({ show }: { show: boolean }) {
  if (!show) return null;
  const items = Array.from({ length: 40 });
  return (
    <div className="pointer-events-none fixed inset-0 z-[75] overflow-hidden">
      {items.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.4;
        const dur = 3 + Math.random() * 2;
        const isPetal = i % 2 === 0;
        return (
          <motion.span
            key={i}
            className="absolute"
            style={{ left: `${left}%`, top: '-5%' }}
            initial={{ y: 0, opacity: 1, rotate: 0 }}
            animate={{ y: '110vh', opacity: [1, 1, 0], rotate: 360 }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeIn' }}
          >
            {isPetal ? (
              <span
                className="block h-3 w-4 rounded-[50%_0_50%_50%]"
                style={{ background: 'linear-gradient(135deg,#f4c7d0,#d8a078)' }}
              />
            ) : (
              <span className="block h-2 w-1.5 rounded-sm bg-rose-gold shadow-[0_0_6px_rgba(216,160,120,0.9)]" />
            )}
          </motion.span>
        );
      })}
    </div>
  );
}

export default function BirthdayScreen({ onReplay }: { onReplay: () => void }) {
  const [letterOpen, setLetterOpen] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);

  return (
    <div className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <AmbientBackground count={22} />
      <FloatingHearts count={12} />
      <CelebrationBurst show={sealBroken} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl space-y-6"
      >
        {/* Cake */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mb-2"
        >
          <div className="relative mx-auto w-32">
            {/* candles */}
            <div className="flex justify-center gap-3">
              {[0, 1, 2].map((c) => (
                <div key={c} className="relative flex flex-col items-center">
                  <motion.div
                    className="h-3 w-1.5 rounded-full bg-rose-gold"
                    animate={{ scaleY: [1, 0.85, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: c * 0.2 }}
                    style={{ boxShadow: '0 0 12px rgba(216,160,120,0.9)' }}
                  />
                  <div className="h-5 w-0.5 bg-rose-gold/60" />
                </div>
              ))}
            </div>
            {/* cake body */}
            <div className="mt-1 h-10 rounded-t-lg bg-gradient-to-b from-rose-gold to-burgundy-wine" />
            <div className="h-8 rounded-b-lg bg-gradient-to-b from-burgundy-wine to-burgundy-deep" />
            <div className="absolute inset-x-0 top-10 h-2 rounded-full bg-blush/80" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, scale: 1, letterSpacing: '0.05em' }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="font-serif text-4xl text-gradient-rose sm:text-6xl"
        >
          HAPPY BIRTHDAY, {STORY.babyName.toUpperCase()}!
        </motion.h1>

        <p className="mx-auto max-w-xl font-serif text-lg italic text-blush sm:text-xl">
          Today is your special day, but you are one of my favourite reasons to
          smile every day.
        </p>

        {/* Envelope */}
        <div className="mx-auto mt-8 flex w-full max-w-sm flex-col items-center">
          <motion.button
            onClick={() => {
              setSealBroken(true);
              setTimeout(() => setLetterOpen(true), 700);
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative h-40 w-72 overflow-hidden rounded-lg border border-rose-gold/40 bg-gradient-to-b from-burgundy to-burgundy-deepest shadow-[0_0_40px_rgba(216,160,120,0.3)]"
            aria-label="Open your final letter"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={sealBroken ? { scale: 0, rotate: 180 } : { scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-burgundy-wine shadow-[0_0_20px_rgba(216,160,120,0.7)]"
              >
                <Heart className="h-6 w-6 fill-rose-gold text-rose-gold" />
              </motion.div>
            </div>
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-rose-gold/15 to-transparent" />
          </motion.button>

          <div className="mt-6">
            <LoveButton onClick={() => { setSealBroken(true); setTimeout(() => setLetterOpen(true), 700); }}>
              Open Your Final Letter
            </LoveButton>
          </div>
        </div>

        <p className="pt-4 text-sm uppercase tracking-widest text-rose-gold/60">
          Made with endless love by {STORY.myName}
        </p>
      </motion.div>

      {/* Letter modal */}
      <AnimatePresence>
        {letterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-burgundy-deepest/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.7, rotateX: -40, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-rose-gold/40 bg-champagne p-8 text-burgundy-deepest shadow-[0_0_60px_rgba(216,160,120,0.5)]"
              style={{ boxShadow: '0 0 80px rgba(216,160,120,0.4) inset, 0 0 60px rgba(216,160,120,0.4)' }}
            >
              <button
                onClick={() => setLetterOpen(false)}
                className="absolute right-4 top-4 text-burgundy-wine/60 hover:text-burgundy-wine"
                aria-label="Close letter"
              >
                <X className="h-5 w-5" />
              </button>
              <pre className="whitespace-pre-wrap font-hand text-xl leading-relaxed text-burgundy-deepest">
                {FINAL_LETTER}
              </pre>
              <div className="mt-6 border-t border-burgundy-wine/20 pt-4 text-center">
                <p className="font-serif text-sm uppercase tracking-[0.25em] text-burgundy-wine">
                  Our story doesn't end here. It's just getting started.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replay */}
      <motion.button
        onClick={onReplay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-5 left-5 z-[70] flex items-center gap-2 text-xs uppercase tracking-widest text-rose-gold/60 hover:text-rose-gold"
      >
        <RotateCcw className="h-4 w-4" /> Replay from the beginning
      </motion.button>

      <p className="absolute bottom-3 left-1/2 z-[70] -translate-x-1/2 text-[10px] uppercase tracking-widest text-rose-gold/40">
        Designed with love by Ankita
      </p>
    </div>
  );
}
