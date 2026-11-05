import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2, VolumeX } from 'lucide-react';
import { STORY } from '@/data/story';

/**
 * Floating music control.
 *
 * Tries the user-supplied music file first (STORY.musicSrc).
 * If that file is missing or fails, it falls back to a soft procedural
 * ambient pad generated with the Web Audio API — so there is always
 * gentle romantic background music playing. When the user drops their
 * own music.mp3 into public/assets/music/, it takes over automatically.
 */
export default function MusicControl() {
  const [playing, setPlaying] = useState(false);
  const [triedFile, setTriedFile] = useState(false);
  const [ready, setReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);

  // --- Procedural ambient pad (fallback) ---
  const startAmbient = () => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // gentle fade-in
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2);

    // Soft chord: A2, E3, A3, C#4, E4 — warm minor-ish romantic voicing
    const freqs = [110, 164.81, 220, 277.18, 329.63];
    const oscs: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.18 / freqs.length + (i === 0 ? 0.05 : 0);
      osc.connect(g);
      g.connect(master);
      osc.start();
      oscs.push(osc);
      gains.push(g);
    });

    // slow tremolo on the mid voices for a breathing, living feel
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.12;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.04;
    lfo.connect(lfoGain);
    gains.slice(2).forEach((g) => lfoGain.connect(g.gain));
    lfo.start();
    oscs.push(lfo);

    // lowpass for warmth
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1200;
    master.disconnect();
    master.connect(lp);
    lp.connect(ctx.destination);

    nodesRef.current = {
      stop: () => {
        const t = ctx.currentTime;
        master.gain.cancelScheduledValues(t);
        master.gain.setValueAtTime(master.gain.value, t);
        master.gain.linearRampToValueAtTime(0, t + 0.6);
        setTimeout(() => {
          oscs.forEach((o) => {
            try {
              o.stop();
            } catch {
              /* already stopped */
            }
          });
          try {
            ctx.close();
          } catch {
            /* already closed */
          }
        }, 700);
      },
    };
  };

  const stopAmbient = () => {
    nodesRef.current?.stop();
    nodesRef.current = null;
    ctxRef.current = null;
  };

  // --- Try the real music file; fall back to ambient on failure ---
  useEffect(() => {
    const a = new Audio(STORY.musicSrc);
    a.loop = true;
    a.volume = 0.35;
    a.preload = 'auto';

    const onReady = () => setReady(true);
    const onError = () => {
      setTriedFile(true);
      setReady(true); // ambient is available as fallback
    };
    a.addEventListener('canplaythrough', onReady);
    a.addEventListener('error', onError);

    // If the file loads, keep it; otherwise mark fallback.
    audioRef.current = a;

    // Probe: if after a short window we never got canplaythrough,
    // treat as missing so the button works via ambient.
    const probe = setTimeout(() => {
      if (!ready) {
        setTriedFile(true);
        setReady(true);
      }
    }, 2500);

    return () => {
      clearTimeout(probe);
      a.removeEventListener('canplaythrough', onReady);
      a.removeEventListener('error', onError);
      a.pause();
      stopAmbient();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startPlayback = () => {
    const audio = audioRef.current;
    if (audio && !triedFile) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          setTriedFile(true);
          startAmbient();
          setPlaying(true);
        });
      return;
    }
    if (!nodesRef.current) {
      startAmbient();
      setPlaying(true);
    }
  };

  const toggle = () => {
    if (playing) {
      const audio = audioRef.current;
      if (audio && !triedFile) {
        audio.pause();
      } else {
        stopAmbient();
      }
      setPlaying(false);
    } else {
      startPlayback();
    }
  };

  // Auto-start music on the first user interaction (browsers require it).
  useEffect(() => {
    const onFirst = () => {
      if (!playing) startPlayback();
      window.removeEventListener('pointerdown', onFirst);
      window.removeEventListener('keydown', onFirst);
      window.removeEventListener('touchstart', onFirst);
    };
    window.addEventListener('pointerdown', onFirst, { once: false });
    window.addEventListener('keydown', onFirst, { once: false });
    window.addEventListener('touchstart', onFirst, { once: false, passive: true });
    return () => {
      window.removeEventListener('pointerdown', onFirst);
      window.removeEventListener('keydown', onFirst);
      window.removeEventListener('touchstart', onFirst);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, triedFile]);

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="fixed right-5 top-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-rose-gold/40 bg-burgundy-deepest/60 text-rose-gold backdrop-blur-md transition-all hover:scale-110 hover:border-rose-gold hover:shadow-[0_0_25px_rgba(216,160,120,0.6)]"
      >
        {playing ? (
          <span className="relative flex items-center gap-[2px]">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-rose-gold"
                animate={{ height: [4, 14, 4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </span>
        ) : (
          <Music2 className="h-5 w-5" />
        )}
        {!ready && <VolumeX className="absolute -bottom-4 h-3 w-3 text-rose-gold/40" aria-hidden />}
      </motion.button>
    </AnimatePresence>
  );
}
