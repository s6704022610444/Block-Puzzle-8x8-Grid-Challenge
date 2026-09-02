import React, { useMemo } from 'react';
import { BOARD_SIZE, canPlaceShape } from '../shapes';
import { BlockShape, Grid } from '../types';

interface GameBoardProps {
  grid: Grid;
  hoverPos: { row: number; col: number } | null;
  activeShape: BlockShape | null;
  clearingKeys: Set<string>;
  onCellClick: (row: number, col: number) => void;
  onCellPointerEnter: (row: number, col: number) => void;
  boardRef: React.RefObject<HTMLDivElement | null>;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  grid,
  hoverPos,
  activeShape,
  clearingKeys,
  onCellClick,
  onCellPointerEnter,
  boardRef,
}) => {
  // Compute preview cells and prospective line clears if active shape is hovering
  const { previewCells, isValidHover, prospectiveClearCells } = useMemo(() => {
    if (!activeShape || !hoverPos) {
      return { previewCells: new Map<string, string>(), isValidHover: false, prospectiveClearCells: new Set<string>() };
    }

    const { row: startR, col: startC } = hoverPos;
    const isValid = canPlaceShape(grid, activeShape.matrix, startR, startC);
    const pCells = new Map<string, string>();

    const rows = activeShape.matrix.length;
    const cols = activeShape.matrix[0].length;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (activeShape.matrix[r][c] === 1) {
          const targetR = startR + r;
          const targetC = startC + c;
          if (targetR >= 0 && targetR < BOARD_SIZE && targetC >= 0 && targetC < BOARD_SIZE) {
            pCells.set(`${targetR},${targetC}`, isValid ? activeShape.color : '#ef4444');
          }
        }
      }
    }

    // If valid, calculate what lines would be cleared
    const clearSet = new Set<string>();
    if (isValid) {
      // Simulate grid with placed shape
      const tempGrid = grid.map((row) => [...row]);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (activeShape.matrix[r][c] === 1) {
            tempGrid[startR + r][startC + c] = activeShape.color;
          }
        }
      }

      // Check full rows
      for (let r = 0; r < BOARD_SIZE; r++) {
        if (tempGrid[r].every((cell) => cell !== null)) {
          for (let c = 0; c < BOARD_SIZE; c++) {
            clearSet.add(`${r},${c}`);
          }
        }
      }

      // Check full columns
      for (let c = 0; c < BOARD_SIZE; c++) {
        let fullCol = true;
        for (let r = 0; r < BOARD_SIZE; r++) {
          if (tempGrid[r][c] === null) {
            fullCol = false;
            break;
          }
        }
        if (fullCol) {
          for (let r = 0; r < BOARD_SIZE; r++) {
            clearSet.add(`${r},${c}`);
          }
        }
      }
    }

    return { previewCells: pCells, isValidHover: isValid, prospectiveClearCells: clearSet };
  }, [grid, hoverPos, activeShape]);

  return (
    <div
      id="game-board-container"
      ref={boardRef}
      className="relative w-full max-w-md aspect-square mx-auto bg-slate-900/95 p-2 sm:p-2.5 rounded-3xl border border-slate-800 shadow-2xl shadow-black/60 touch-none select-none flex flex-col justify-center"
    >
      {/* 8x8 Grid */}
      <div className="grid grid-cols-8 grid-rows-8 gap-1 sm:gap-1.5 w-full h-full">
        {grid.map((rowArr, r) =>
          rowArr.map((cellColor, c) => {
            const key = `${r},${c}`;
            const isClearing = clearingKeys.has(key);
            const previewColor = previewCells.get(key);
            const isProspectiveClear = prospectiveClearCells.has(key);

            let contentColor = cellColor;
            let isGhost = false;

            if (previewColor && cellColor === null) {
              contentColor = previewColor;
              isGhost = true;
            }

            return (
              <div
                key={key}
                id={`cell-${r}-${c}`}
                onClick={() => onCellClick(r, c)}
                onPointerEnter={() => onCellPointerEnter(r, c)}
                className={`relative rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-100 ${
                  cellColor === null && !isGhost
                    ? 'grid-cell-empty'
                    : 'block-tile'
                } ${isClearing ? 'animate-line-clear' : ''} ${
                  isProspectiveClear ? 'ring-2 ring-white/90 brightness-125' : ''
                }`}
                style={{
                  backgroundColor: contentColor || undefined,
                  opacity: isGhost ? (isValidHover ? 0.75 : 0.45) : 1,
                  boxShadow: contentColor && !isGhost
                    ? `0 3px 6px rgba(0,0,0,0.3), inset 1.5px 1.5px 2px rgba(255,255,255,0.5), inset -1.5px -1.5px 2px rgba(0,0,0,0.4)`
                    : undefined,
                }}
              >
                {/* Inner shine reflection */}
                {contentColor && !isClearing && (
                  <div className="absolute inset-1 rounded-[6px] sm:rounded-[8px] bg-gradient-to-b from-white/30 to-transparent pointer-events-none opacity-80" />
                )}
                {/* Prospective clear shimmer */}
                {isProspectiveClear && (
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/20 animate-pulse pointer-events-none" />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Decorative ambient board frame glow */}
      <div className="absolute -inset-1 rounded-[26px] bg-gradient-to-b from-indigo-500/10 via-transparent to-purple-500/10 -z-10 blur-sm pointer-events-none" />
    </div>
  );
};
