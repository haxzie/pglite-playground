import { create } from "zustand";
import { History } from "../modules/sync/sync.types";
import { v4 as uuid } from "uuid";

export interface HistoryState {
  history: Record<string, History>;
  addHistory: ({
    name,
    query,
    integrationId,
  }: {
    name: string;
    query: string;
    integrationId: string;
  }) => Promise<void>;
  removeHistory: (id: string) => void;
  clearHistory: () => void;
  pickHistory: (id: string) => void;
}

export const useHistory = create<HistoryState>((set) => ({
  history: {},
  addHistory: async ({
    name,
    query,
    integrationId,
  }: {
    name: string;
    query: string;
    integrationId: string;
  }) => {
    const id = uuid();
    set((state) => ({
      history: {
        ...state.history,
        [id]: {
          id,
          name,
          query,
          integrationId,
          createdAt: new Date().toISOString(),
        },
      },
    }));

    try {
      set((state) => {
        const history = { ...state.history };
        history[id].name = name;
        return { history };
      });
    } catch (error) {
      console.error(error);
    }
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
