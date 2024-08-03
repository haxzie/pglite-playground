import { create } from "zustand";
import { QueryResult } from "../drivers/driver";

export interface EditorState {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  activeTab: string;
  tabs: Array<{
    id: string;
    name: string;
    query: string;
    result: QueryResult | undefined;
  }>;
  addTab: () => string;
  removeTab: (id: string) => void;
  updateTab: ({
    id,
    name,
    query,
    result,
  }: {
    id: string;
    name: string;
    query: string;
    result: QueryResult;
  }) => void;
}


export const useEditor = create<EditorState>((set) => ({
  activeMenu: "/tables",
  setActiveMenu: (menu) => set({ activeMenu: menu }),
  activeTab: "",
  tabs: [],
  addTab: () => {
    const id = Date.now().toString();
    set((state) => ({
      tabs: [
        ...state.tabs,
        {
          id,
          name: "Untitled",
          query: "",
          result: undefined,
        },
      ],
    }));
    return id;
  },
  removeTab: (id) => {
    set((state) => ({
      tabs: state.tabs.filter((tab) => tab.id !== id),
    }));
  },
  updateTab: ({ id, name, query, result }) => {
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === id ? { id, name, query, result } : tab
      ),
    }));
  },
}));