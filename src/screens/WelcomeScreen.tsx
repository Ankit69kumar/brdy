import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import AmbientBackground from '@/components/AmbientBackground';
import FloatingHearts from '@/components/FloatingHearts';
import LoveButton from '@/components/LoveButton';
import { STORY } from '@/data/story';

export default function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <AmbientBackground />
      <FloatingHearts count={9} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl space-y-6"
      >
        <h1 className="font-serif text-4xl leading-tight text-gradient-rose sm:text-6xl">
          Welcome to My Little World, {STORY.babyName}
        </h1>

        <p className="mx-auto max-w-xl font-serif text-lg italic text-blush sm:text-xl">
          This little world holds six beautiful chapters of us, six collections of
          memories, and a thousand feelings I can't always explain.
        </p>

        {/* Large glowing heart */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            filter: [
              'drop-shadow(0 0 25px rgba(216,160,120,0.5))',
              'drop-shadow(0 0 60px rgba(216,160,120,0.95))',
              'drop-shadow(0 0 25px rgba(216,160,120,0.5))',
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="mx-auto my-8"
        >
          <Heart className="h-24 w-24 fill-rose-gold/30 text-rose-gold sm:h-32 sm:w-32" />
        </motion.div>

        <div className="flex justify-center">
          <LoveButton onClick={onEnter} className="text-base">
            Go Inside My Heart
          </LoveButton>
        </div>
      </motion.div>
    </div>
  );
}
