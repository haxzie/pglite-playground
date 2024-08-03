import { QueryResult } from "../../drivers/driver";

export interface History {
    id: string;
    name: string;
    query: string;
    integrationId: string;
    createdAt: string;
}

export interface SavedQuery {
    id: string;
    name: string;
    query: string;
    integrationId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Tab {
    id: string;
    name: string;
    query: string;
    result: QueryResult;
}

export interface SyncDriver {
    // history
    loadHistory?: (history: Array<History>) => Promise<void>;
    createHistory: (history: History) => Promise<void>;
    getHistory: () => Promise<Array<History>>;
    deleteHistory: (id: string) => Promise<void>;
    updateHistory: (history: History) => Promise<void>;
    clearHistory?: () => Promise<void>;

    // saved queries
    loadSavedQueries?: (savedQueries: Array<SavedQuery>) => Promise<void>;
    createSavedQuery: (savedQuery: SavedQuery) => Promise<void>;
    getSavedQueries: () => Promise<Array<SavedQuery>>;
    deleteSavedQuery: (id: string) => Promise<void>;
    updateSavedQuery: (savedQuery: SavedQuery) => Promise<void>;
    clearSavedQueries?: () => Promise<void>;

    // tabs
    loadTabs?: (tabs: Array<Tab>) => Promise<void>;
    createTab: (tab: Tab) => Promise<void>;
    getTabs: () => Promise<Array<Tab>>;
    deleteTab: (id: string) => Promise<void>;
    updateTab: (tab: Tab) => Promise<void>;
    clearTabs?: () => Promise<void>;
}