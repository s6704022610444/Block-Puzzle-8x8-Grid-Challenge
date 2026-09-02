import React from 'react';
import { X, CheckCircle2, MousePointer, Smartphone, Zap, Sparkles } from 'lucide-react';
import { sound } from '../audio';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="how-to-play-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-purple-950/50 flex flex-col relative text-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="btn-close-help"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black text-white mb-1 flex items-center gap-2">
          <Sparkles className="text-indigo-400" size={22} />
          วิธีเล่นเกมพัซเซิลบล็อก
        </h2>
        <p className="text-xs text-indigo-300/80 mb-4 font-medium">
          How to Play & Scoring Guide
        </p>

        {/* Instruction list */}
        <div className="flex flex-col gap-3 text-xs sm:text-sm">
          {/* Step 1 */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3 flex gap-3 items-start">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-400 flex items-center justify-center font-black shrink-0 mt-0.5">
              1
            </div>
            <div>
              <div className="font-bold text-white mb-0.5">ลากหรือแตะเลือกบล็อก</div>
              <p className="text-slate-400 text-xs leading-relaxed">
                ระบบจะสุ่มบล็อกมาให้ครั้งละ 3 ชิ้น คุณสามารถ <strong>ใช้เมาส์ลากวาง</strong> หรือ{' '}
                <strong>แตะเลือกบล็อกแล้วแตะช่องตาราง</strong> เพื่อวางได้สะดวกบนมือถือ
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3 flex gap-3 items-start">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center font-black shrink-0 mt-0.5">
              2
            </div>
            <div>
              <div className="font-bold text-white mb-0.5">เติมเต็มแถวแนวนอนหรือแนวตั้ง</div>
              <p className="text-slate-400 text-xs leading-relaxed">
                เมื่อบล็อกถูกวางจนเต็มแถวแนวนอน (Row) หรือแนวตั้ง (Column) บล็อกในแถวนั้นจะถูกทำลายทันทีพร้อมรับคะแนน
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3 flex gap-3 items-start">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center font-black shrink-0 mt-0.5">
              3
            </div>
            <div>
              <div className="font-bold text-white mb-0.5">คอมโบ & สตรีคคะแนนพิเศษ</div>
              <p className="text-slate-400 text-xs leading-relaxed">
                ทำลายหลายแถวพร้อมกันในครั้งเดียว (Multi-clear) หรือทำลายแถวต่อเนื่องทุกตา (Streak Combo) เพื่อรับโบนัสคะแนนมหาศาล!
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3 flex gap-3 items-start">
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-400/30 text-rose-400 flex items-center justify-center font-black shrink-0 mt-0.5">
              4
            </div>
            <div>
              <div className="font-bold text-white mb-0.5">สิ้นสุดเกม (Game Over)</div>
              <p className="text-slate-400 text-xs leading-relaxed">
                เมื่อไม่มีช่องว่างบนกระดาน 8x8 พอที่จะวางบล็อกที่สุ่มมาได้อีก เกมจะจบลงและบันทึกคะแนนสูงสุดลงในเครื่องของคุณอัตโนมัติ
              </p>
            </div>
          </div>
        </div>

        {/* Controls hint */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <MousePointer size={13} className="text-indigo-400" /> เมาส์ลากวาง
          </span>
          <span className="flex items-center gap-1.5">
            <Smartphone size={13} className="text-emerald-400" /> แตะเลือก & แตะวาง
          </span>
          <span className="flex items-center gap-1.5">
            <Zap size={13} className="text-amber-400" /> เสียงสังเคราะห์ Web Audio
          </span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="mt-4 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all border border-slate-700 cursor-pointer"
        >
          เข้าใจแล้ว (Got it!)
        </button>
      </div>
    </div>
  );
};
