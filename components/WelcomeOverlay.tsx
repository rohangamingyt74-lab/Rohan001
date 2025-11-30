import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000); // Initial blink
    const timer2 = setTimeout(() => setStep(2), 2500); // Typing done
    const timer3 = setTimeout(() => {
        onComplete();
    }, 4500); // Fade out

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden font-['Orbitron']"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      
      {/* Scanning Line */}
      <motion.div
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-1 bg-cyan-500 shadow-[0_0_20px_#00ffff] opacity-50"
      />

      <div className="relative z-10 text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
        >
          ROHAN
        </motion.div>

        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-3xl text-cyan-300 font-bold tracking-widest"
            >
              <span className="inline-block border-r-4 border-pink-500 pr-2 animate-pulse">
                {step === 1 ? "INITIALIZING..." : "WELCOME VANSHIKA — USER DETECTED"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {step >= 2 && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5 }}
            className="h-1 bg-purple-600 mx-auto mt-4 max-w-md shadow-[0_0_10px_#9333ea]"
          />
        )}
      </div>
    </motion.div>
  );
};

export default WelcomeOverlay;
