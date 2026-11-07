import type { Tone } from '@/data/types';

// Background colours per media tone. Shown behind photos while they load, and as a plain
// colour block if a photo is ever missing (never drawn placeholder art).
export const palettes: Record<Tone, { bg: [string, string]; ink: string; spot: string }> = {
  leaf: { bg: ['#4f5b3c', '#c9c48c'], ink: '#2f3826', spot: '#f1e7b8' },
  mist: { bg: ['#9aa39a', '#dcdcd2'], ink: '#6c766f', spot: '#f2f1ea' },
  dusk: { bg: ['#3c3a4a', '#c98f6b'], ink: '#2a2834', spot: '#f0c49a' },
  night: { bg: ['#141a1d', '#33403f'], ink: '#0b0f11', spot: '#d9b56e' },
  blossom: { bg: ['#d9b9b4', '#f4e6df'], ink: '#9b6b6a', spot: '#fff5f1' },
  maple: { bg: ['#6b2a1c', '#d9844a'], ink: '#3d150d', spot: '#f3c27a' },
  snow: { bg: ['#c9d1d4', '#f5f6f3'], ink: '#8e9aa0', spot: '#ffffff' },
  sea: { bg: ['#2f5560', '#a9c6c1'], ink: '#1c3a42', spot: '#e6f0ea' },
  stone: { bg: ['#6f6a60', '#c8c1b2'], ink: '#4a463f', spot: '#ebe5d6' },
  cedar: { bg: ['#1f2c22', '#5e6d4a'], ink: '#111a14', spot: '#c7c99a' },
  lantern: { bg: ['#2b1d16', '#a5552f'], ink: '#1a110c', spot: '#f6c26b' },
  paper: { bg: ['#e7dfcd', '#f6f1e6'], ink: '#b6ab92', spot: '#fffaf0' },
};
