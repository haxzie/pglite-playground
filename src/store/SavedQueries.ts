import { create } from "zustand";
import { SavedQuery } from "../modules/sync/sync.types";
// import { v4 as uuid } from "uuid";
import { DEMO_QUERIES } from "../components/utils/queries";
import { useEditor } from "./Editor";

export interface SavedQueriesState {
  savedQueries: Record<string, SavedQuery>;
  addQuery: (query: SavedQuery) => void;
  removeQuery: (id: string) => void;
  clearSavedQueries: () => void;
  pickSavedQuery: (id: string) => void;
}

export const useSavedQueries = create<SavedQueriesState>((set) => ({
  savedQueries: {
    "demo-query": {
      id: "demo-query",
      query: DEMO_QUERIES,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      integrationId: "Postgres Lite",
      name: "Demo Queries",
    },
  },
  addQuery: (query) => {
    set((state) => ({
      savedQueries: {
        ...state.savedQueries,
        [query.id]: query,
      },
    }));
  },
  removeQuery: (id) => {
    set((state) => {
      // delete history with the ide
      const savedQueries = { ...state.savedQueries };
      delete savedQueries[id];
      return { savedQueries };
    });
  },
  clearSavedQueries: () => {
    set({ savedQueries: {} });
  },
  pickSavedQuery: (id) => {
    useEditor.getState().addTab({
      name: useSavedQueries.getState().savedQueries[id].name,
      query: useSavedQueries.getState().savedQueries[id].query,
    });
  },
}));
