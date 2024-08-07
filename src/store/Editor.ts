import { create } from "zustand";
import { QueryResult } from "../drivers/driver";
import { v4 as uuid } from "uuid";

export interface Tab {
  id: string;
  name: string;
  query: string;
  result: QueryResult | undefined;
}
export interface EditorState {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  activeTab: string;
  setActiveTab: (id: string) => void;
  tabs: Record<string, Tab>;
  addTab: ({
    id,
    name,
    query,
    result,
  }: {
    id?: string;
    name?: string;
    query?: string;
    result?: QueryResult | undefined;
  }) => string;
  removeTab: (id: string) => void;
  updateTab: ({
    id,
    name,
    query,
    result,
  }: {
    id: string;
    name?: string;
    query?: string;
    result?: QueryResult | undefined;
  }) => void;
}

export const useEditor = create<EditorState>((set) => ({
  activeMenu: "/tables",
  setActiveMenu: (menu) => set({ activeMenu: menu }),
  activeTab: "",
  setActiveTab: (id) => set({ activeTab: id }),
  tabs: {},
  addTab: ({ id, name, query, result }) => {
    const _id = id || `tab_${uuid()}`;
    const generateTabName = (tabs: Record<string, Tab>) => {
      if (Object.keys(tabs).length === 0) {
        return "Query 1";
      }
      // find all the tabs with the format `Query ${number}`
      const queryTabs = Object.values(tabs).filter((tab) =>
        tab.name.match(/^Query \d+$/)
      );

      if (queryTabs.length === 0) {
        return "Query 1";
      }
      
      // find the highest number
      const numbers = queryTabs.map((tab) => parseInt(tab.name.split(" ")[1]));
      const max = Math.max(...numbers);
      return `Query ${max + 1}`;
    }
    set((state) => ({
      tabs: {
        ...state.tabs,
        [_id]: {
          id: _id,
          name: name || generateTabName(state.tabs),
          query: query || "",
          result: result || undefined,
        },
      },
      activeTab: _id,
    }));
    return _id;
  },
  removeTab: (id) => {
    set((state) => {
      const tabs = { ...state.tabs };
      delete tabs[id];
      const activeTab =
        state.activeTab === id ? Object.keys(tabs)[0] : state.activeTab;
      return { tabs, activeTab };
    });
  },
  updateTab: ({ id, name, query, result }) => {
    set((state) => ({
      tabs: {
        ...state.tabs,
        [id]: {
          ...state.tabs[id],
          name: name || state.tabs[id].name,
          query: query || state.tabs[id].query,
          result: result || state.tabs[id].result,
        },
      },
    }));
  },
}));
