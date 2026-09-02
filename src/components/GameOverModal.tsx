import React from 'react';
import { Trophy, RotateCcw, Sparkles, Award } from 'lucide-react';
import { sound } from '../audio';

interface GameOverModalProps {
  score: number;
  highScore: number;
  isNewHigh: boolean;
  linesClearedTotal: number;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  highScore,
  isNewHigh,
  linesClearedTotal,
  onRestart,
}) => {
  return (
    <div
      id="game-over-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-sm bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-purple-950/50 flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow background accent */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Trophy / Header Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-4 border border-white/30">
          <Trophy size={32} className="text-slate-950 fill-slate-950" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          เกมจบลงแล้ว!
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-5">
          ไม่มีพื้นที่ว่างเหลือสำหรับวางบล็อกที่เหลืออยู่
        </p>

        {/* New High Score Callout Banner */}
        {isNewHigh && (
          <div className="w-full mb-4 bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-500/20 border border-amber-500/40 rounded-xl py-2 px-3 flex items-center justify-center gap-2 text-amber-300 text-xs sm:text-sm font-black animate-bounce">
            <Sparkles size={16} />
            <span>🎉 ทำลายสถิติคะแนนสูงสุดใหม่! 🎉</span>
          </div>
        )}

        {/* Score Breakdown Card */}
        <div className="w-full bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 mb-5 flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-slate-700/50 pb-2">
            <span className="text-xs font-semibold text-slate-400">คะแนนรอบนี้ (Score)</span>
            <span className="text-2xl font-black text-white">{score.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-700/50 pb-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Award size={14} className="text-amber-400" /> สถิติสูงสุด (Best)
            </span>
            <span className="text-base font-bold text-amber-400">{highScore.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">ทำลายแถวทั้งหมด (Lines)</span>
            <span className="text-base font-bold text-cyan-400">{linesClearedTotal} แถว</span>
          </div>
        </div>

        {/* Play Again Button */}
        <button
          id="btn-restart-game"
          onClick={() => {
            sound.playClick();
            onRestart();
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 transition-all duration-150 active:scale-95 border border-white/20 cursor-pointer"
        >
          <RotateCcw size={18} />
          <span>เล่นใหม่อีกครั้ง (Play Again)</span>
        </button>
      </div>
    </div>
  );
};
