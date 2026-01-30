"use client";

import { motion, AnimatePresence } from "framer-motion";

type RoundStatus = "prevailed" | "voided";

interface RoundResolvedOverlayProps {
  isOpen: boolean;
  status: RoundStatus;
  roundNumber: number;
  casualties: number;
  victors: number;
  majorityPercent: number;
  minorityPercent: number;
  winnerPath: "heads" | "tails";
  txHash?: string;
  nextRoundCountdown?: number;
  onProceed: () => void;
  onJoinAnother?: () => void;
}

export function RoundResolvedOverlay({
  isOpen,
  status,
  roundNumber,
  casualties,
  victors,
  majorityPercent,
  minorityPercent,
  winnerPath,
  txHash,
  onProceed,
  onJoinAnother,
}: RoundResolvedOverlayProps) {
  const isPrevailed = status === "prevailed";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full max-w-2xl mx-4 bg-[#0A0A0A] border border-zinc-800 p-6 md:p-8"
          >
            {/* Decision Status Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-pixel text-xs">
                  {majorityPercent}%
                </span>
                <span className="text-neon-pink font-pixel text-xs uppercase">
                  Voided
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neon-green font-pixel text-xs uppercase">
                  Prevailed
                </span>
                <span className="text-neon-green font-pixel text-xs">
                  {minorityPercent}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-zinc-800 mb-8 flex">
              <div
                className="bg-neon-pink h-full"
                style={{ width: `${majorityPercent}%` }}
              />
              <div
                className="bg-neon-green h-full"
                style={{ width: `${minorityPercent}%` }}
              />
            </div>

            {/* Main Banner */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h1 className="font-pixel text-2xl md:text-3xl text-white mb-2">
                ROUND {roundNumber} COMPLETE
              </h1>
              <p className="font-pixel text-[10px] text-zinc-500 tracking-wider">
                THE WEAK WERE MANY, THE STRONG WERE FEW
              </p>
              <p className="font-pixel text-[8px] text-zinc-600 mt-2">
                WINNER: {winnerPath.toUpperCase()}
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Casualties Card */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-zinc-900 border border-zinc-800 p-4 text-center"
              >
                <p className="font-pixel text-3xl md:text-4xl text-neon-pink mb-2">
                  {casualties}
                </p>
                <p className="font-pixel text-[10px] text-neon-pink tracking-wider">
                  ELIMINATED
                </p>
              </motion.div>

              {/* Victors Card */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-zinc-900 border border-zinc-800 p-4 text-center"
              >
                <p className="font-pixel text-3xl md:text-4xl text-neon-green mb-2">
                  {victors}
                </p>
                <p className="font-pixel text-[10px] text-neon-green tracking-wider">
                  REMAINING
                </p>
              </motion.div>
            </div>

            {/* Action Paths */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isPrevailed ? (
                /* Survivor Path */
                <div className="border-2 border-neon-green bg-neon-green/5 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-pixel text-xs text-neon-green mb-1">
                        PROCEED TO NEXT ROUND
                      </p>
                      <p className="font-pixel text-[8px] text-zinc-500">
                        Your streak continues
                      </p>
                    </div>
                    <span className="bg-neon-green text-black font-pixel text-[8px] px-3 py-1">
                      SURVIVED
                    </span>
                  </div>
                  <button
                    onClick={onProceed}
                    className="w-full bg-neon-green text-black font-pixel text-sm py-4 hover:bg-neon-green/90 transition-colors uppercase tracking-wider"
                  >
                    NEXT ROUND
                  </button>
                </div>
              ) : (
                /* Eliminated Path */
                <div className="border-2 border-neon-pink bg-neon-pink/5 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-pixel text-xs text-neon-pink mb-1">
                        GAME OVER
                      </p>
                      <p className="font-pixel text-[8px] text-zinc-500">
                        Better luck next time
                      </p>
                    </div>
                    <span className="bg-neon-pink text-white font-pixel text-[8px] px-3 py-1">
                      ELIMINATED
                    </span>
                  </div>
                  <button
                    onClick={onJoinAnother}
                    className="w-full bg-neon-pink text-white font-pixel text-sm py-4 hover:bg-neon-pink/90 transition-colors uppercase tracking-wider"
                  >
                    JOIN ANOTHER ARENA
                  </button>
                </div>
              )}
            </motion.div>

            {/* Transaction Hash */}
            {txHash && (
              <p className="text-center font-mono text-[8px] text-zinc-600 mt-4">
                TX: {txHash}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
