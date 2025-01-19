import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useStore = create(
  immer((set) => ({
    activeCycles: {},
    dispatch(action) {
      switch (action.type) {
        case 'sync':
          set(() => ({
            lastUpdate: new Date(),
            ...action.state,
          }));
          break;
      }
    },
  }))
);
