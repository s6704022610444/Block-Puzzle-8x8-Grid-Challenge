import React from 'react';
import { FloatingText } from '../types';

interface ParticlesProps {
  floatingTexts: FloatingText[];
}

export const Particles: React.FC<ParticlesProps> = ({ floatingTexts }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {floatingTexts.map((item) => (
        <div
          key={item.id}
          className="absolute font-black animate-float-score text-center select-none"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            color: item.color || '#facc15',
            textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px currentColor',
            transform: `scale(${item.scale || 1})`,
          }}
        >
          <div className="text-2xl sm:text-3xl tracking-wider font-extrabold uppercase">
            {item.text}
          </div>
          {item.subtext && (
            <div className="text-xs sm:text-sm font-semibold text-white/90 drop-shadow-md">
              {item.subtext}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
