import React from 'react';
import { Trophy, Volume2, VolumeX, RotateCcw, HelpCircle, Flame } from 'lucide-react';
import { sound } from '../audio';

interface ScoreBoardProps {
  score: number;
  highScore: number;
  streak: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onNewGame: () => void;
  onOpenHelp: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  highScore,
  streak,
  isMuted,
  onToggleMute,
  onNewGame,
  onOpenHelp,
}) => {
  return (
    <header className="w-full max-w-md mx-auto mb-3 px-2 flex flex-col gap-2.5">
      {/* Top action row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25 border border-white/20">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2 h-2 rounded-[2px] bg-white shadow-sm" />
              <div className="w-2 h-2 rounded-[2px] bg-cyan-300 shadow-sm" />
              <div className="w-2 h-2 rounded-[2px] bg-amber-300 shadow-sm" />
              <div className="w-2 h-2 rounded-[2px] bg-pink-300 shadow-sm" />
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-purple-200">
              Block Puzzle
            </h1>
            <p className="text-[10px] sm:text-xs text-indigo-300/80 font-medium -mt-0.5">
              8x8 Grid Challenge
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          <button
            id="btn-help"
            onClick={() => {
              sound.playClick();
              onOpenHelp();
            }}
            title="วิธีเล่น (How to Play)"
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-150 active:scale-95 shadow-md"
          >
            <HelpCircle size={18} />
          </button>

          <button
            id="btn-sound-toggle"
            onClick={onToggleMute}
            title={isMuted ? 'เปิดเสียง (Unmute)' : 'ปิดเสียง (Mute)'}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-150 active:scale-95 shadow-md ${
              isMuted
                ? 'bg-rose-950/40 border-rose-800/50 text-rose-400 hover:bg-rose-900/50'
                : 'bg-slate-800/80 border-slate-700/60 text-emerald-400 hover:bg-slate-700/80'
            }`}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button
            id="btn-new-game"
            onClick={() => {
              sound.playClick();
              onNewGame();
            }}
            title="เริ่มเกมใหม่ (New Game)"
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-150 active:scale-95 shadow-md"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Score Card */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-2.5 px-3.5 flex flex-col justify-center relative overflow-hidden shadow-lg shadow-black/20">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            <span>คะแนน (Score)</span>
            {streak > 1 && (
              <span className="flex items-center gap-0.5 text-amber-400 bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.2 rounded-full text-[10px] font-black animate-pulse">
                <Flame size={10} className="fill-amber-400" />
                {streak}x Combo
              </span>
            )}
          </div>
          <div
            id="display-current-score"
            className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5"
          >
            {score.toLocaleString()}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        </div>

        {/* High Score Card */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-2.5 px-3.5 flex flex-col justify-center relative overflow-hidden shadow-lg shadow-black/20">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-amber-300/80 uppercase">
            <span>สูงสุด (High Score)</span>
            <Trophy size={13} className="text-amber-400 animate-trophy" />
          </div>
          <div
            id="display-high-score"
            className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight mt-0.5"
          >
            {highScore.toLocaleString()}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
        </div>
      </div>
    </header>
  );
};
