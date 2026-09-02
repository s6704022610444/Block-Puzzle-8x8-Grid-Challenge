export type CellColor = string; // e.g. '#3b82f6', 'emerald', etc.

export interface BlockShape {
  id: string;
  name: string;
  matrix: number[][]; // 2D array of 0 and 1
  color: string;
  glowColor: string;
  accentColor: string;
  label: string;
}

export interface DeckItem {
  uid: string; // unique instance ID for React key
  shape: BlockShape;
  used: boolean;
}

export type Grid = (string | null)[][]; // 8x8 matrix containing color string or null

export interface ClearedLineInfo {
  rows: number[];
  cols: number[];
  totalLines: number;
  pointsEarned: number;
  isCombo: boolean;
  comboCount: number;
}

export interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  color?: string;
  subtext?: string;
  scale?: number;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}
