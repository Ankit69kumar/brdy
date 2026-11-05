import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

/** A tiny floating heart icon that reveals a hidden love message when clicked. */
export default function HiddenHeartMessage({ message }: { message: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="A hidden secret"
        className="fixed bottom-4 right-5 z-[70] text-rose-gold/50 hover:text-rose-gold"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        whileHover={{ scale: 1.4 }}
      >
        <Heart className="h-4 w-4 fill-rose-gold/30" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-burgundy-deepest/70 backdrop-blur-sm"
          >
            <motion.div
              className="glass max-w-sm rounded-2xl px-8 py-7 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Heart className="mx-auto mb-3 h-7 w-7 fill-rose-gold text-rose-gold animate-heartbeat" />
              <p className="font-hand text-2xl text-blush">{message}</p>
              <p className="mt-3 text-xs uppercase tracking-widest text-rose-gold/60">tap to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
