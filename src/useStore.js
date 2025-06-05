import { create } from 'zustand';
import { IN_GAME, START } from './contants';

export const useStore = create((set) => ({
  state: START,
  startGame: () =>
    set((state) => {
      if (state !== START) {
        return { state: IN_GAME };
      }
    })
}));
