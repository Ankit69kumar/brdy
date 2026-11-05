import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';
import AmbientBackground from '@/components/AmbientBackground';
import FloatingHearts from '@/components/FloatingHearts';
import LoveButton from '@/components/LoveButton';
import { STORY } from '@/data/story';

export default function IntroScreen({ onUnlock }: { onUnlock: () => void }) {
  const [stage, setStage] = useState(0); // 0: poetry, 1: date
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStage((s) => (s < 1 ? 1 : s)), 3200);
    return () => clearTimeout(t);
  }, []);

  const target = STORY.firstMeetingDate.split('/'); // DD/MM/YYYY
  const check = () => {
    const ok = day === target[0] && month === target[1] && year === target[2];
    if (ok) {
      setError(false);
      setOpening(true);
      setTimeout(onUnlock, 1800);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <AmbientBackground />
      <FloatingHearts count={6} />

      <motion.div
        animate={{ scale: [1, 1.08, 1], filter: ['drop-shadow(0 0 20px rgba(216,160,120,0.5))', 'drop-shadow(0 0 40px rgba(216,160,120,0.9))', 'drop-shadow(0 0 20px rgba(216,160,120,0.5))'] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="relative z-10"
      >
        <Heart className="h-16 w-16 fill-rose-gold/30 text-rose-gold sm:h-20 sm:w-20" />
      </motion.div>

      <AnimatePresence mode="wait">
        {stage === 0 ? (
          <motion.div key="poetry" exit={{ opacity: 0, y: -20 }} className="relative z-10 mt-8 space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.4 }}
              className="font-serif text-xl italic text-blush sm:text-3xl"
            >
              Some stories are too beautiful to be told in words...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1.4 }}
              className="font-hand text-2xl text-rose-gold sm:text-4xl"
            >
              Baby, I made a little world just for you.
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="unlock"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 mt-8 w-full max-w-md space-y-5"
          >
            <p className="font-serif text-lg text-champagne/80">
              Before you enter, let's go back to where everything started.
            </p>
            <div className="glass rounded-3xl px-7 py-8">
              <h2 className="font-serif text-2xl text-gradient-rose sm:text-3xl">
                Do You Remember Our Beginning?
              </h2>
              <p className="mt-2 text-sm uppercase tracking-widest text-rose-gold/70">
                When did we first meet?
              </p>

              <div className="mt-5 flex items-center justify-center gap-2">
                <DateField value={day} onChange={setDay} placeholder="DD" max={31} />
                <span className="text-2xl text-rose-gold/60">/</span>
                <DateField value={month} onChange={setMonth} placeholder="MM" max={12} />
                <span className="text-2xl text-rose-gold/60">/</span>
                <DateField value={year} onChange={setYear} placeholder="YYYY" max={2099} wide />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: [0, -8, 8, -6, 6, 0] }}
                    exit={{ opacity: 0 }}
                    className="mt-4 font-hand text-lg text-blush"
                  >
                    Aww Baby, think again! You know this special day.
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-6 flex justify-center">
                <LoveButton onClick={check}>Unlock Our Story</LoveButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opening && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-burgundy-deepest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 3, 12], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="text-rose-gold"
            >
              <Heart className="h-24 w-24 fill-rose-gold" style={{ filter: 'drop-shadow(0 0 60px rgba(216,160,120,1))' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DateField({
  value,
  onChange,
  placeholder,
  max,
  wide,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  max: number;
  wide?: boolean;
}) {
  return (
    <div className="relative">
      <Calendar className="pointer-events-none absolute -top-5 left-1/2 h-3 w-3 -translate-x-1/2 text-rose-gold/40" />
      <input
        inputMode="numeric"
        value={value}
        placeholder={placeholder}
        maxLength={wide ? 4 : 2}
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, '');
          if (v === '' || parseInt(v) <= max) onChange(v);
        }}
        className={`${wide ? 'w-20' : 'w-14'} rounded-lg border border-rose-gold/30 bg-burgundy-deepest/70 px-3 py-3 text-center text-lg text-champagne outline-none transition focus:border-rose-gold focus:shadow-[0_0_15px_rgba(216,160,120,0.4)]`}
      />
    </div>
  );
}
