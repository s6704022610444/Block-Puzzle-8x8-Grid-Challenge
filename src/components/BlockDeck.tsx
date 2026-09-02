import React from 'react';
import { DeckItem } from '../types';

interface BlockDeckProps {
  deck: DeckItem[];
  selectedUid: string | null;
  onSelectPiece: (item: DeckItem) => void;
  onStartDrag: (item: DeckItem, e: React.PointerEvent<HTMLDivElement>) => void;
}

export const BlockDeck: React.FC<BlockDeckProps> = ({
  deck,
  selectedUid,
  onSelectPiece,
  onStartDrag,
}) => {
  return (
    <div className="w-full max-w-md mx-auto mt-3 px-2">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {deck.map((item, idx) => {
          if (item.used) {
            return (
              <div
                key={item.uid}
                className="h-28 sm:h-32 rounded-2xl border-2 border-dashed border-slate-800/80 bg-slate-950/30 flex items-center justify-center opacity-40 transition-all"
              >
                <div className="w-3 h-3 rounded-full bg-slate-800" />
              </div>
            );
          }

          const isSelected = selectedUid === item.uid;

          return (
            <div
              key={item.uid}
              id={`deck-piece-${idx}`}
              onPointerDown={(e) => {
                onStartDrag(item, e);
              }}
              onClick={() => {
                onSelectPiece(item);
              }}
              className={`h-28 sm:h-32 rounded-2xl flex flex-col items-center justify-center p-2 cursor-pointer transition-all duration-200 select-none relative touch-none ${
                isSelected
                  ? 'bg-slate-800/95 border-2 border-cyan-400/90 shadow-xl shadow-cyan-500/20 animate-selected-card scale-105 z-10'
                  : 'bg-slate-900/85 hover:bg-slate-850 border border-slate-750 hover:border-slate-600 shadow-md active:scale-95'
              }`}
            >
              {/* Block Shape Mini Matrix */}
              <div className="flex flex-col items-center justify-center gap-1">
                {item.shape.matrix.map((row, rIdx) => (
                  <div key={rIdx} className="flex gap-1">
                    {row.map((val, cIdx) => {
                      if (val === 0) {
                        return <div key={cIdx} className="w-4 h-4 sm:w-5 sm:h-5 opacity-0" />;
                      }
                      return (
                        <div
                          key={cIdx}
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded-md block-tile relative"
                          style={{
                            backgroundColor: item.shape.color,
                            boxShadow: `0 2px 4px rgba(0,0,0,0.35), inset 1px 1px 1.5px rgba(255,255,255,0.6), inset -1px -1px 1.5px rgba(0,0,0,0.4)`,
                          }}
                        >
                          <div className="absolute inset-0.5 rounded-[4px] bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {isSelected && (
                <div className="absolute bottom-1.5 text-[9px] font-bold text-cyan-300 tracking-tight bg-cyan-950/80 px-1.5 py-0.5 rounded-md border border-cyan-700/50 animate-pulse">
                  แตะตารางเพื่อวาง
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
