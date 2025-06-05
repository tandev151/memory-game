import { create } from 'zustand';
import { START } from './contants';

export const useStore = create((set) => ({
  stage: START,

  updateStage: (nextStage) =>
    set(() => {
      if (nextStage) {
        return { stage: nextStage };
      }
    })
}));
