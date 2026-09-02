import { BlockShape, DeckItem, Grid } from './types';

export const BOARD_SIZE = 8;

export const SHAPE_DEFINITIONS: BlockShape[] = [
  // 4x1 Horizontal & Vertical (Straight line minimum length 4)
  {
    id: 'bar_4_h',
    name: '4-Bar H',
    label: '4x1',
    matrix: [[1, 1, 1, 1]],
    color: '#6366f1', // Indigo
    glowColor: 'rgba(99, 102, 241, 0.4)',
    accentColor: '#818cf8',
  },
  {
    id: 'bar_4_v',
    name: '4-Bar V',
    label: '1x4',
    matrix: [[1], [1], [1], [1]],
    color: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    accentColor: '#818cf8',
  },

  // 5x1 Horizontal & Vertical
  {
    id: 'bar_5_h',
    name: '5-Bar H',
    label: '5x1',
    matrix: [[1, 1, 1, 1, 1]],
    color: '#8b5cf6', // Violet
    glowColor: 'rgba(139, 92, 246, 0.4)',
    accentColor: '#a78bfa',
  },
  {
    id: 'bar_5_v',
    name: '5-Bar V',
    label: '1x5',
    matrix: [[1], [1], [1], [1], [1]],
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    accentColor: '#a78bfa',
  },

  // 2x2 Square
  {
    id: 'sq_2x2',
    name: 'Square 2x2',
    label: '2x2',
    matrix: [
      [1, 1],
      [1, 1],
    ],
    color: '#10b981', // Emerald
    glowColor: 'rgba(16, 185, 129, 0.4)',
    accentColor: '#34d399',
  },

  // 2x3 Rectangle (Width 2, Height 3)
  {
    id: 'rect_2x3',
    name: 'Rectangle 2x3',
    label: '2x3',
    matrix: [
      [1, 1],
      [1, 1],
      [1, 1],
    ],
    color: '#06b6d4', // Cyan
    glowColor: 'rgba(6, 182, 212, 0.4)',
    accentColor: '#22d3ee',
  },

  // 3x2 Rectangle (Width 3, Height 2)
  {
    id: 'rect_3x2',
    name: 'Rectangle 3x2',
    label: '3x2',
    matrix: [
      [1, 1, 1],
      [1, 1, 1],
    ],
    color: '#06b6d4', // Cyan
    glowColor: 'rgba(6, 182, 212, 0.4)',
    accentColor: '#22d3ee',
  },

  // 3x3 Square
  {
    id: 'sq_3x3',
    name: 'Square 3x3',
    label: '3x3',
    matrix: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    color: '#ec4899', // Pink
    glowColor: 'rgba(236, 72, 153, 0.4)',
    accentColor: '#f472b6',
  },

  // Small Corner L (2x2 with 3 blocks) - 4 orientations
  {
    id: 'corner_tl',
    name: 'Small Corner TL',
    label: 'L Mini',
    matrix: [
      [1, 1],
      [1, 0],
    ],
    color: '#14b8a6', // Teal
    glowColor: 'rgba(20, 184, 166, 0.4)',
    accentColor: '#2dd4bf',
  },
  {
    id: 'corner_tr',
    name: 'Small Corner TR',
    label: 'L Mini',
    matrix: [
      [1, 1],
      [0, 1],
    ],
    color: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.4)',
    accentColor: '#2dd4bf',
  },
  {
    id: 'corner_bl',
    name: 'Small Corner BL',
    label: 'L Mini',
    matrix: [
      [1, 0],
      [1, 1],
    ],
    color: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.4)',
    accentColor: '#2dd4bf',
  },
  {
    id: 'corner_br',
    name: 'Small Corner BR',
    label: 'L Mini',
    matrix: [
      [0, 1],
      [1, 1],
    ],
    color: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.4)',
    accentColor: '#2dd4bf',
  },

  // Big L-shape (3x3 with 5 blocks) - 4 orientations
  {
    id: 'l_big_1',
    name: 'Big L 1',
    label: 'L 3x3',
    matrix: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: '#f97316', // Orange
    glowColor: 'rgba(249, 115, 22, 0.4)',
    accentColor: '#fb923c',
  },
  {
    id: 'l_big_2',
    name: 'Big L 2',
    label: 'L 3x3',
    matrix: [
      [0, 0, 1],
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    accentColor: '#fb923c',
  },
  {
    id: 'l_big_3',
    name: 'Big L 3',
    label: 'L 3x3',
    matrix: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    accentColor: '#fb923c',
  },
  {
    id: 'l_big_4',
    name: 'Big L 4',
    label: 'L 3x3',
    matrix: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    accentColor: '#fb923c',
  },

  // T-Shapes (3x2 or 2x3)
  {
    id: 't_down',
    name: 'T Down',
    label: 'T-Shape',
    matrix: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: '#a855f7', // Purple
    glowColor: 'rgba(168, 85, 247, 0.4)',
    accentColor: '#c084fc',
  },
  {
    id: 't_up',
    name: 'T Up',
    label: 'T-Shape',
    matrix: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    accentColor: '#c084fc',
  },
  {
    id: 't_right',
    name: 'T Right',
    label: 'T-Shape',
    matrix: [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    accentColor: '#c084fc',
  },
  {
    id: 't_left',
    name: 'T Left',
    label: 'T-Shape',
    matrix: [
      [0, 1],
      [1, 1],
      [0, 1],
    ],
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    accentColor: '#c084fc',
  },

  // Z / S Shapes
  {
    id: 'z_shape_h',
    name: 'Z Shape H',
    label: 'Z-Shape',
    matrix: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: '#ef4444', // Red
    glowColor: 'rgba(239, 68, 68, 0.4)',
    accentColor: '#f87171',
  },
  {
    id: 's_shape_h',
    name: 'S Shape H',
    label: 'S-Shape',
    matrix: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    accentColor: '#f87171',
  },
  {
    id: 'z_shape_v',
    name: 'Z Shape V',
    label: 'Z-Shape',
    matrix: [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    accentColor: '#f87171',
  },
  {
    id: 's_shape_v',
    name: 'S Shape V',
    label: 'S-Shape',
    matrix: [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    accentColor: '#f87171',
  },
];

export function createEmptyGrid(): Grid {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => null)
  );
}

/**
 * Counts empty (null) cells on the 8x8 grid
 */
export function countEmptyCells(grid: Grid): number {
  let empty = 0;
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (grid[r][c] === null) empty++;
    }
  }
  return empty;
}

/**
 * Returns a weighted random shape based on remaining board space.
 * When board space is tight, smaller/compact shapes get higher probability to help rescue the game.
 */
function getWeightedRandomShape(candidates: BlockShape[], emptyCells: number): BlockShape {
  if (candidates.length === 0) {
    return SHAPE_DEFINITIONS[Math.floor(Math.random() * SHAPE_DEFINITIONS.length)];
  }

  const weights = candidates.map((shape) => {
    const blocks = getShapeBlockCount(shape);
    const maxDim = Math.max(shape.matrix.length, shape.matrix[0].length);

    if (emptyCells >= 40) {
      // Plenty of room: balanced weights across all shapes
      if (blocks >= 9) return 6; // 3x3 square
      return 10;
    } else if (emptyCells >= 20) {
      // Moderate room: favor 3-4 block pieces, lower chance for huge shapes
      if (blocks <= 4) return 18;
      if (blocks <= 6) return 10;
      return 4; // 3x3 square
    } else {
      // Tight space (< 20 cells): strongly favor compact shapes (3-4 blocks) so player can solve and clear lines
      if (blocks <= 4 && maxDim <= 4) return 30;
      if (blocks <= 5) return 12;
      if (blocks <= 6) return 6;
      return 2; // Very low chance for 3x3
    }
  });

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let randomVal = Math.random() * totalWeight;

  for (let i = 0; i < candidates.length; i++) {
    randomVal -= weights[i];
    if (randomVal <= 0) {
      return candidates[i];
    }
  }

  return candidates[candidates.length - 1];
}

export function getRandomShape(): BlockShape {
  const index = Math.floor(Math.random() * SHAPE_DEFINITIONS.length);
  return SHAPE_DEFINITIONS[index];
}

/**
 * Smart Deck Generator:
 * 1. Guarantees at least 1-2 pieces that can actually fit into the current grid.
 * 2. Adapts probability based on free space (gives smaller/solvable blocks when space is low).
 */
export function generateDeck(grid?: Grid): DeckItem[] {
  const currentGrid = grid || createEmptyGrid();
  const emptyCells = countEmptyCells(currentGrid);

  // Find all shapes in definition that can fit in the current board
  const fittingShapes = SHAPE_DEFINITIONS.filter((shape) =>
    canShapeFitAnywhere(currentGrid, shape)
  );

  const selectedShapes: BlockShape[] = [];

  // Guarantee at least 1-2 pieces that can actually fit
  // If fitting shapes exist: guarantee 2 pieces (or 1 if fitting list is very limited)
  const guaranteedFitCount = fittingShapes.length > 0 ? (fittingShapes.length === 1 ? 1 : 2) : 0;

  for (let i = 0; i < 3; i++) {
    if (i < guaranteedFitCount && fittingShapes.length > 0) {
      // Pick from fitting shapes using space-adapted weight
      selectedShapes.push(getWeightedRandomShape(fittingShapes, emptyCells));
    } else {
      // Pick from general shape pool using space-adapted weight
      selectedShapes.push(getWeightedRandomShape(SHAPE_DEFINITIONS, emptyCells));
    }
  }

  // Shuffle selected shapes so the guaranteed fitting blocks aren't locked to the first slots
  for (let i = selectedShapes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selectedShapes[i], selectedShapes[j]] = [selectedShapes[j], selectedShapes[i]];
  }

  return [
    {
      uid: `deck_${Date.now()}_1_${Math.random().toString(36).substring(2, 7)}`,
      shape: selectedShapes[0],
      used: false,
    },
    {
      uid: `deck_${Date.now()}_2_${Math.random().toString(36).substring(2, 7)}`,
      shape: selectedShapes[1],
      used: false,
    },
    {
      uid: `deck_${Date.now()}_3_${Math.random().toString(36).substring(2, 7)}`,
      shape: selectedShapes[2],
      used: false,
    },
  ];
}

/**
 * Checks if a shape can be placed on the grid at specified top-left (r, c)
 */
export function canPlaceShape(
  grid: Grid,
  matrix: number[][],
  startRow: number,
  startCol: number
): boolean {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Boundary check
  if (
    startRow < 0 ||
    startCol < 0 ||
    startRow + numRows > BOARD_SIZE ||
    startCol + numCols > BOARD_SIZE
  ) {
    return false;
  }

  // Overlap check
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (matrix[r][c] === 1) {
        if (grid[startRow + r][startCol + c] !== null) {
          return false;
        }
      }
    }
  }

  return true;
}

/**
 * Checks if ANY cell on the board can fit this shape
 */
export function canShapeFitAnywhere(grid: Grid, shape: BlockShape): boolean {
  const numRows = shape.matrix.length;
  const numCols = shape.matrix[0].length;

  for (let r = 0; r <= BOARD_SIZE - numRows; r++) {
    for (let c = 0; c <= BOARD_SIZE - numCols; c++) {
      if (canPlaceShape(grid, shape.matrix, r, c)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Checks if there's any remaining valid move among the active deck items
 */
export function hasValidMoveLeft(grid: Grid, deck: DeckItem[]): boolean {
  const activeItems = deck.filter((item) => !item.used);
  if (activeItems.length === 0) return true; // Hand completed, will generate new

  return activeItems.some((item) => canShapeFitAnywhere(grid, item.shape));
}

/**
 * Calculates blocks count in a shape
 */
export function getShapeBlockCount(shape: BlockShape): number {
  let count = 0;
  for (let r = 0; r < shape.matrix.length; r++) {
    for (let c = 0; c < shape.matrix[r].length; c++) {
      if (shape.matrix[r][c] === 1) count++;
    }
  }
  return count;
}

/**
 * Checks completed rows and columns, returns coordinates of filled lines
 */
export function checkFullLines(grid: Grid): { rows: number[]; cols: number[] } {
  const rows: number[] = [];
  const cols: number[] = [];

  // Check rows
  for (let r = 0; r < BOARD_SIZE; r++) {
    let full = true;
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (grid[r][c] === null) {
        full = false;
        break;
      }
    }
    if (full) {
      rows.push(r);
    }
  }

  // Check columns
  for (let c = 0; c < BOARD_SIZE; c++) {
    let full = true;
    for (let r = 0; r < BOARD_SIZE; r++) {
      if (grid[r][c] === null) {
        full = false;
        break;
      }
    }
    if (full) {
      cols.push(c);
    }
  }

  return { rows, cols };
}
