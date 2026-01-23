"use client";

import { useState } from "react";
import {
  Timer,
  ChoiceCard,
  TensionBar,
  ChooseYourFate,
  TotalYieldPot,
} from "@/components/arena/core";

export default function ArenaPage() {
  const [selectedChoice, setSelectedChoice] = useState<"heads" | "tails" | null>(
    null
  );

  // Mock data - would come from API/contract
  const headsYield = 42;
  const tailsYield = 58;
  const headsPercentage = 42;
  const tailsPercentage = 58;

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neon-green" />
            <span className="font-pixel text-sm text-white tracking-wider">
              INVERSE ARENA
            </span>
          </div>
          <div className="flex gap-3">
            <button className="border border-white/20 px-4 py-2 font-pixel text-[8px] text-white tracking-wider hover:bg-white/5">
              SOROBAN LIVE
            </button>
            <button className="bg-neon-green px-4 py-2 font-pixel text-[8px] text-black tracking-wider hover:bg-neon-green/90">
              CONNECT WALLET
            </button>
          </div>
        </header>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left column - Game area */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Top row: Choose Your Fate + Timer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChooseYourFate />
              <Timer initialSeconds={5} />
            </div>

            {/* Tension Bar */}
            <TensionBar
              headsPercentage={headsPercentage}
              tailsPercentage={tailsPercentage}
            />

            {/* Choice Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
              <ChoiceCard
                type="heads"
                estimatedYield={headsYield}
                isSelected={selectedChoice === "heads"}
                onSelect={() => setSelectedChoice("heads")}
              />
              <ChoiceCard
                type="tails"
                estimatedYield={tailsYield}
                isSelected={selectedChoice === "tails"}
                onSelect={() => setSelectedChoice("tails")}
              />
            </div>
          </div>

          {/* Right column - Stats */}
          <div className="space-y-4">
            <TotalYieldPot amount={42850.12} apr={12.4} />

            {/* Survivors placeholder */}
            <div className="bg-card-bg border border-neon-green p-4">
              <p className="font-pixel text-[8px] text-white/60 tracking-wider mb-2">
                SURVIVORS
              </p>
              <p className="font-pixel text-3xl text-neon-green">128</p>
              <p className="font-pixel text-sm text-white/40">/1024</p>
              <div className="mt-3 h-2 bg-dark-bg">
                <div className="h-full bg-neon-green w-[12.5%]" />
              </div>
            </div>

            {/* Elimination Feed */}
            <div className="bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-orange-500 text-lg">&#9650;</span>
                <span className="font-pixel text-[10px] text-black tracking-wider">
                  ELIMINATION FEED
                </span>
              </div>
              <div className="h-0.5 bg-black mb-4" />

              <div className="space-y-3 text-sm font-mono">
                {/* Eliminated entries */}
                <div className="flex justify-between items-center bg-pink-100 p-3">
                  <span className="text-neon-pink line-through">S-6782-5</span>
                  <span className="bg-neon-pink px-3 py-1 text-white text-xs font-bold">OUT</span>
                </div>
                <div className="flex justify-between items-center bg-pink-100 p-3">
                  <span className="text-neon-pink line-through">S-3382-8</span>
                  <span className="bg-neon-pink px-3 py-1 text-white text-xs font-bold">OUT</span>
                </div>
                <div className="flex justify-between items-center bg-pink-100 p-3">
                  <span className="text-neon-pink line-through">K-0001-A</span>
                  <span className="bg-neon-pink px-3 py-1 text-white text-xs font-bold">OUT</span>
                </div>
                {/* Active entry */}
                <div className="flex justify-between items-center p-3">
                  <span className="text-black">S-9921-W</span>
                  <span className="bg-black px-3 py-1 text-neon-green text-xs font-pixel">ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Your Status placeholder */}
            <div className="bg-neon-green p-4">
              <p className="font-pixel text-[8px] text-black/60 tracking-wider mb-2">
                YOUR STATUS
              </p>
              <p className="font-pixel text-xl text-black italic mb-4">STILL IN</p>
              <div className="space-y-2 text-[10px] font-mono text-black">
                <div className="flex justify-between">
                  <span>CURRENT STAKE</span>
                  <span className="font-bold">$1,200.00</span>
                </div>
                <div className="flex justify-between">
                  <span>POTENTIAL PAYOUT</span>
                  <span className="font-bold">$24,420.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap justify-between items-center text-white/40 font-mono text-[9px] uppercase tracking-[0.2em] gap-4">
          <div className="flex gap-6 md:gap-10">
            <div>
              <span className="block mb-1 text-zinc-600">VALIDATED</span>
              <span>TX: 0x82F...A12C VERIFIED</span>
            </div>
            <div>
              <span className="block mb-1 text-zinc-600">YIELD HARVEST COMPLETE</span>
              <span className="text-neon-green">+8.002%</span>
            </div>
          </div>

          <div className="text-neon-pink font-pixel text-[8px]">
            WARNING: 15 SECONDS TO LOCK-IN
          </div>

          <div>
            <span className="block mb-1 text-zinc-600">BLOCK</span>
            <span>#882193-B MINING</span>
          </div>
        </div>
      </div>
    </div>
  );
}
