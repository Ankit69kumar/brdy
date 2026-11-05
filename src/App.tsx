import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CursorTrail from '@/components/CursorTrail';
import MusicControl from '@/components/MusicControl';
import HiddenHeartMessage from '@/components/HiddenHeartMessage';
import ChapterTransition from '@/components/ChapterTransition';
import IntroScreen from '@/screens/IntroScreen';
import WelcomeScreen from '@/screens/WelcomeScreen';
import ChapterScreen from '@/screens/ChapterScreen';
import BirthdayScreen from '@/screens/BirthdayScreen';
import { CHAPTERS } from '@/data/story';

type Stage = 'intro' | 'welcome' | 'chapters' | 'birthday';

export default function App() {
  const [stage, setStage] = useState<Stage>('intro');
  const [chapterIndex, setChapterIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goChapter = (i: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setChapterIndex(i);
      setStage('chapters');
      setTimeout(() => setTransitioning(false), 400);
    }, 900);
  };

  const nextChapter = () => {
    if (chapterIndex < CHAPTERS.length - 1) {
      goChapter(chapterIndex + 1);
    } else {
      setTransitioning(true);
      setTimeout(() => {
        setStage('birthday');
        setTimeout(() => setTransitioning(false), 400);
      }, 900);
    }
  };

  const replay = () => {
    setStage('intro');
    setChapterIndex(0);
  };

  return (
    <div className="relative min-h-screen bg-burgundy-deepest text-champagne">
      <CursorTrail />
      <MusicControl />
      <HiddenHeartMessage message="Psst... I love you more than every chapter here could ever say." />

      <AnimatePresence mode="wait">
        {transitioning && (
          <motion.div
            key="trans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ChapterTransition variant={chapterIndex} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <motion.div key="intro" exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.8 }}>
            <IntroScreen onUnlock={() => setStage('welcome')} />
          </motion.div>
        )}

        {stage === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <WelcomeScreen onEnter={() => goChapter(0)} />
          </motion.div>
        )}

        {stage === 'chapters' && (
          <motion.div
            key={`ch-${chapterIndex}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.7 }}
          >
            <ChapterScreen
              chapter={CHAPTERS[chapterIndex]}
              index={chapterIndex}
              total={CHAPTERS.length}
              onPrev={() => chapterIndex > 0 && goChapter(chapterIndex - 1)}
              onNext={nextChapter}
              onJump={goChapter}
            />
          </motion.div>
        )}

        {stage === 'birthday' && (
          <motion.div
            key="birthday"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <BirthdayScreen onReplay={replay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
