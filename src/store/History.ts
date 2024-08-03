import { create } from "zustand";
import { History } from "../modules/sync/sync.types";

export interface HistoryState {
  history: Record<string, History>;
  addHistory: (history: History) => void;
  removeHistory: (id: string) => void;
  clearHistory: () => void;
  pickHistory: (id: string) => void;
}

export const useHistory = create<HistoryState>((set) => ({
  history: {},
  addHistory: (history) => {
    set((state) => ({
      history: {
        ...state.history,
        [history.id]: history,
      },
    }));
  },
  removeHistory: (id) => {
    set((state) => {
      // delete history with the ide
      const history = { ...state.history };
      delete history[id];
      return { history };
    });
  },
  clearHistory: () => {
    set({ history: {} });
  },
  pickHistory: (id) => {
    console.log(id);
  },
}));
