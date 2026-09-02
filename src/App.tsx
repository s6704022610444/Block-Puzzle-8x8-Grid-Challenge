/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ScoreBoard } from './components/ScoreBoard';
import { GameBoard } from './components/GameBoard';
import { BlockDeck } from './components/BlockDeck';
import { GameOverModal } from './components/GameOverModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { Particles } from './components/Particles';
import { sound } from './audio';
import {
  BOARD_SIZE,
  canPlaceShape,
  checkFullLines,
  createEmptyGrid,
  generateDeck,
  hasValidMoveLeft,
} from './shapes';
import { BlockShape, DeckItem, FloatingText, Grid } from './types';
import { Sparkles, MousePointer, Smartphone } from 'lucide-react';

const HIGH_SCORE_KEY = 'block_puzzle_high_score';

export default function App() {
  // Game Board & Hand States
  const [grid, setGrid] = useState<Grid>(() => createEmptyGrid());
  const [deck, setDeck] = useState<DeckItem[]>(() => generateDeck());
  const [selectedDeckUid, setSelectedDeckUid] = useState<string | null>(null);

  // Scores and Stats
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(HIGH_SCORE_KEY);
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [streak, setStreak] = useState<number>(0);
  const [linesClearedTotal, setLinesClearedTotal] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isNewHighScore, setIsNewHighScore] = useState<boolean>(false);

  // UI / Audio / Modal states
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [clearingKeys, setClearingKeys] = useState<Set<string>>(new Set());

  // Dragging & Hover Interaction states
  const [draggingItem, setDraggingItem] = useState<DeckItem | null>(null);
  const [dragCoord, setDragCoord] = useState<{ x: number; y: number } | null>(null);
  const [hoverPos, setHoverPos] = useState<{ row: number; col: number } | null>(null);

  const boardRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const touchOffsetRef = useRef<number>(0);

  // Find currently active shape (either dragged or tap-selected)
  const activeDeckItem = draggingItem || deck.find((d) => d.uid === selectedDeckUid && !d.used) || null;
  const activeShape = activeDeckItem ? activeDeckItem.shape : null;

  // Audio Toggle
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Trigger floating score text
  const addFloatingScore = (x: number, y: number, text: string, subtext?: string, color?: string) => {
    const id = `float_${Date.now()}_${Math.random()}`;
    setFloatingTexts((prev) => [...prev, { id, x, y, text, subtext, color }]);

    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
    }, 1100);
  };

  // Check Game Over status against a given grid and deck
  const evaluateGameOver = useCallback((currentGrid: Grid, currentDeck: DeckItem[]) => {
    const canMove = hasValidMoveLeft(currentGrid, currentDeck);
    if (!canMove) {
      sound.playGameOver();
      setIsGameOver(true);
    }
  }, []);

  // Place a block at (startRow, startCol)
  const executePlacement = useCallback(
    (shape: BlockShape, startRow: number, startCol: number, sourceDeckUid: string) => {
      if (!canPlaceShape(grid, shape.matrix, startRow, startCol)) {
        return false;
      }

      // 1. Build new grid with placed shape
      const newGrid = grid.map((row) => [...row]);
      const rows = shape.matrix.length;
      const cols = shape.matrix[0].length;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (shape.matrix[r][c] === 1) {
            newGrid[startRow + r][startCol + c] = shape.color;
          }
        }
      }

      // 2. Play block place sound
      sound.playPlace();

      // 3. Mark the deck item as used
      let updatedDeck = deck.map((item) =>
        item.uid === sourceDeckUid ? { ...item, used: true } : item
      );

      // 4. Check for completed lines
      const { rows: fullRows, cols: fullCols } = checkFullLines(newGrid);
      const totalLines = fullRows.length + fullCols.length;

      let addedScore = 0;
      let newStreak = streak;

      if (totalLines > 0) {
        newStreak = streak + 1;
        setStreak(newStreak);
        setLinesClearedTotal((prev) => prev + totalLines);

        // Score formula: Base 100/line + multi-line combo + streak multiplier
        const baseLineScore = totalLines === 1 ? 100 : totalLines === 2 ? 300 : totalLines === 3 ? 600 : 1000 + (totalLines - 4) * 400;
        const streakBonus = (newStreak - 1) * 60;
        const lineScore = baseLineScore + streakBonus;
        addedScore = lineScore;

        // Collect clearing keys for flashy animation
        const keysToClear = new Set<string>();
        fullRows.forEach((r) => {
          for (let c = 0; c < BOARD_SIZE; c++) {
            keysToClear.add(`${r},${c}`);
          }
        });
        fullCols.forEach((c) => {
          for (let r = 0; r < BOARD_SIZE; r++) {
            keysToClear.add(`${r},${c}`);
          }
        });

        setClearingKeys(keysToClear);
        sound.playClear(totalLines, newStreak);

        // Floating score popup in the center of the board
        if (boardRef.current) {
          const rect = boardRef.current.getBoundingClientRect();
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const comboLabel = newStreak > 1 ? `COMBO x${newStreak}!` : totalLines > 1 ? `${totalLines} LINES CLEAR!` : 'CLEAR!';
          addFloatingScore(centerX, centerY, `+${lineScore}`, comboLabel, '#38bdf8');
        }

        // Delay clearing of actual cells so the visual flash pops
        setTimeout(() => {
          setGrid((prevGrid) => {
            const clearedGrid = prevGrid.map((rowArr, rIdx) =>
              rowArr.map((cell, cIdx) => (keysToClear.has(`${rIdx},${cIdx}`) ? null : cell))
            );

            // If all 3 blocks in deck are used, spawn 3 new blocks based on clearedGrid
            let finalDeck = updatedDeck;
            const remaining = finalDeck.filter((d) => !d.used);
            if (remaining.length === 0) {
              finalDeck = generateDeck(clearedGrid);
              setDeck(finalDeck);
            }

            // Check Game Over after clear
            evaluateGameOver(clearedGrid, finalDeck);
            return clearedGrid;
          });
          setClearingKeys(new Set());
        }, 320);
      } else {
        // No line cleared this turn, reset streak
        setStreak(0);

        // If all 3 blocks are used, generate new ones immediately based on newGrid
        const remaining = updatedDeck.filter((d) => !d.used);
        if (remaining.length === 0) {
          updatedDeck = generateDeck(newGrid);
          setDeck(updatedDeck);
        }

        // Evaluate Game Over immediately
        evaluateGameOver(newGrid, updatedDeck);
      }

      // 5. Update Grid & Score State
      setGrid(newGrid);
      setDeck(updatedDeck);
      setSelectedDeckUid(null);
      setHoverPos(null);

      // Only update score when lines were actually cleared
      if (addedScore > 0) {
        setScore((prevScore) => {
          const nextScore = prevScore + addedScore;
          if (nextScore > highScore) {
            setHighScore(nextScore);
            try {
              localStorage.setItem(HIGH_SCORE_KEY, nextScore.toString());
            } catch {}
            if (!isNewHighScore && prevScore <= highScore) {
              setIsNewHighScore(true);
              sound.playHighScore();
            }
          }
          return nextScore;
        });
      }

      return true;
    },
    [grid, deck, streak, highScore, isNewHighScore, evaluateGameOver]
  );

  // Restart / New Game Handler
  const startNewGame = () => {
    setGrid(createEmptyGrid());
    const newDeck = generateDeck();
    setDeck(newDeck);
    setSelectedDeckUid(null);
    setDraggingItem(null);
    setDragCoord(null);
    setHoverPos(null);
    setScore(0);
    setStreak(0);
    setLinesClearedTotal(0);
    setIsGameOver(false);
    setIsNewHighScore(false);
    setClearingKeys(new Set());
  };

  // Select a piece from the dock
  const handleSelectPiece = (item: DeckItem) => {
    if (selectedDeckUid === item.uid) {
      setSelectedDeckUid(null);
      setHoverPos(null);
      sound.playClick();
    } else {
      setSelectedDeckUid(item.uid);
      sound.playSelect();
    }
  };

  // Helper to calculate target row & col on the 8x8 grid based on pointer coordinates
  const calculateGridPos = useCallback(
    (clientX: number, clientY: number, shape: BlockShape): { row: number; col: number } | null => {
      if (!boardRef.current) return null;
      const rect = boardRef.current.getBoundingClientRect();

      // Check if within board region (with generous margin)
      const margin = 20;
      if (
        clientX < rect.left - margin ||
        clientX > rect.right + margin ||
        clientY < rect.top - margin ||
        clientY > rect.bottom + margin
      ) {
        return null;
      }

      const cellWidth = rect.width / BOARD_SIZE;
      const cellHeight = rect.height / BOARD_SIZE;

      const rawCol = Math.floor((clientX - rect.left) / cellWidth);
      const rawRow = Math.floor((clientY - rect.top) / cellHeight);

      // Align shape's center with hovering cell
      const offsetRow = Math.floor(shape.matrix.length / 2);
      const offsetCol = Math.floor(shape.matrix[0].length / 2);

      let targetRow = rawRow - offsetRow;
      let targetCol = rawCol - offsetCol;

      // Clamp so preview stays neatly on screen
      targetRow = Math.max(0, Math.min(BOARD_SIZE - shape.matrix.length, targetRow));
      targetCol = Math.max(0, Math.min(BOARD_SIZE - shape.matrix[0].length, targetCol));

      return { row: targetRow, col: targetCol };
    },
    []
  );

  // Start dragging a deck piece
  const handleStartDrag = (item: DeckItem, e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setDraggingItem(item);
    setSelectedDeckUid(item.uid);
    sound.playSelect();

    // If touch event, offset vertically so thumb doesn't hide the piece
    const isTouch = e.pointerType === 'touch';
    touchOffsetRef.current = isTouch ? -65 : 0;

    const posY = e.clientY + touchOffsetRef.current;
    setDragCoord({ x: e.clientX, y: posY });

    const pos = calculateGridPos(e.clientX, posY, item.shape);
    setHoverPos(pos);
  };

  // Global pointer move & up handlers for smooth drag & drop
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || !draggingItem) return;

      const posY = e.clientY + touchOffsetRef.current;
      setDragCoord({ x: e.clientX, y: posY });

      const pos = calculateGridPos(e.clientX, posY, draggingItem.shape);
      setHoverPos(pos);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDraggingRef.current || !draggingItem) return;

      isDraggingRef.current = false;
      const posY = e.clientY + touchOffsetRef.current;
      const targetPos = calculateGridPos(e.clientX, posY, draggingItem.shape);

      if (targetPos) {
        const placed = executePlacement(draggingItem.shape, targetPos.row, targetPos.col, draggingItem.uid);
        if (!placed) {
          // If couldn't place, keep selected for tap-to-place fallback
          sound.playClick();
        }
      }

      setDraggingItem(null);
      setDragCoord(null);
      setHoverPos(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [draggingItem, calculateGridPos, executePlacement]);

  // Handle cell click / tap on grid (Tap-to-Place mode)
  const handleCellClick = (row: number, col: number) => {
    if (!activeDeckItem) return;

    const shape = activeDeckItem.shape;
    const offsetRow = Math.floor(shape.matrix.length / 2);
    const offsetCol = Math.floor(shape.matrix[0].length / 2);

    // Try centered placement first
    let startRow = row - offsetRow;
    let startCol = col - offsetCol;

    if (canPlaceShape(grid, shape.matrix, startRow, startCol)) {
      executePlacement(shape, startRow, startCol, activeDeckItem.uid);
      return;
    }

    // Fallback: Try top-left alignment at exact tapped cell
    if (canPlaceShape(grid, shape.matrix, row, col)) {
      executePlacement(shape, row, col, activeDeckItem.uid);
      return;
    }

    // Not valid
    sound.playClick();
  };

  // Cell hover for desktop mouse users when a piece is tapped/selected
  const handleCellPointerEnter = (row: number, col: number) => {
    if (isDraggingRef.current || !activeShape) return;

    const offsetRow = Math.floor(activeShape.matrix.length / 2);
    const offsetCol = Math.floor(activeShape.matrix[0].length / 2);

    let startRow = Math.max(0, Math.min(BOARD_SIZE - activeShape.matrix.length, row - offsetRow));
    let startCol = Math.max(0, Math.min(BOARD_SIZE - activeShape.matrix[0].length, col - offsetCol));

    setHoverPos({ row: startRow, col: startCol });
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-2 sm:p-4 selection:bg-indigo-500/30 font-sans">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-[100px]" />
      </div>

      {/* Main Game Container */}
      <main className="w-full max-w-md mx-auto flex flex-col flex-1 justify-center my-auto relative">
        {/* Score & Controls Header */}
        <ScoreBoard
          score={score}
          highScore={highScore}
          streak={streak}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onNewGame={startNewGame}
          onOpenHelp={() => setIsHelpOpen(true)}
        />

        {/* Game 8x8 Board Container */}
        <div className="relative w-full">
          <GameBoard
            grid={grid}
            hoverPos={hoverPos}
            activeShape={activeShape}
            clearingKeys={clearingKeys}
            onCellClick={handleCellClick}
            onCellPointerEnter={handleCellPointerEnter}
            boardRef={boardRef}
          />

          {/* Floating Score and Particle FX */}
          <Particles floatingTexts={floatingTexts} />
        </div>

        {/* 3 Blocks Dock */}
        <BlockDeck
          deck={deck}
          selectedUid={selectedDeckUid}
          onSelectPiece={handleSelectPiece}
          onStartDrag={handleStartDrag}
        />

        {/* Quick Instructions & Controls Banner */}
        <footer className="w-full max-w-md mx-auto mt-3.5 px-3 py-2 bg-slate-900/60 border border-slate-800/60 rounded-2xl flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <MousePointer size={12} className="text-cyan-400" />
            <span>ลากวางด้วยเมาส์</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Smartphone size={12} className="text-pink-400" />
            <span>หรือแตะเลือกแล้วแตะตาราง</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              setIsHelpOpen(true);
            }}
            className="text-indigo-400 hover:text-indigo-300 font-bold underline cursor-pointer"
          >
            วิธีเล่น
          </button>
        </footer>
      </main>

      {/* Dragging Floating Ghost Shape */}
      {draggingItem && dragCoord && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 opacity-90 scale-95 transition-opacity"
          style={{
            left: `${dragCoord.x}px`,
            top: `${dragCoord.y}px`,
          }}
        >
          <div className="flex flex-col gap-1 drop-shadow-2xl">
            {draggingItem.shape.matrix.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-1">
                {row.map((val, cIdx) => {
                  if (val === 0) {
                    return <div key={cIdx} className="w-9 h-9 sm:w-11 sm:h-11 opacity-0" />;
                  }
                  return (
                    <div
                      key={cIdx}
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl block-tile relative shadow-lg"
                      style={{
                        backgroundColor: draggingItem.shape.color,
                        boxShadow: `0 8px 16px rgba(0,0,0,0.5), inset 2px 2px 3px rgba(255,255,255,0.7), inset -2px -2px 3px rgba(0,0,0,0.4)`,
                      }}
                    >
                      <div className="absolute inset-1 rounded-[8px] bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {isGameOver && (
        <GameOverModal
          score={score}
          highScore={highScore}
          isNewHigh={isNewHighScore}
          linesClearedTotal={linesClearedTotal}
          onRestart={startNewGame}
        />
      )}

      {/* How to Play Modal */}
      <HowToPlayModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
