import { SyncDriver } from "./sync.types";
import * as Comlink from "comlink";
import { createSyncDriver } from "./syncDriver";

const localSyncWorker = new Worker(
  new URL("./local.worker.ts", import.meta.url)
);
export const localSync = Comlink.wrap<SyncDriver>(localSyncWorker);

const serverSyncWorker = new Worker(
  new URL("./server.worker.ts", import.meta.url)
);
export const serverSync = Comlink.wrap<SyncDriver>(serverSyncWorker);

const sync = createSyncDriver({
  createHistory: async (history) => {
    localSync.createHistory(history);
    console.log("createHistory", history);
  },
  getHistory: async () => {
    const history = await localSync.getHistory();
    return history;
  },
  deleteHistory: async (id) => {
    localSync.deleteHistory(id);
  },
  updateHistory: async (history) => {
    localSync.updateHistory(history);
  },
  createSavedQuery: async (savedQuery) => {
    localSync.createSavedQuery(savedQuery);
  },
  getSavedQueries: async () => {
    const queries = await localSync.getSavedQueries();
    return queries;
  },
  deleteSavedQuery: async (id) => {
    localSync.deleteSavedQuery(id);
  },
  updateSavedQuery: async (savedQuery) => {
    localSync.updateSavedQuery(savedQuery);
  },
  createTab: async (tab) => {
    localSync.createTab(tab);
  },
  getTabs: async () => {
    const tabs = await localSync.getTabs();
    return tabs;
  },
  deleteTab: async (id) => {
    localSync.deleteTab(id);
  },
  updateTab: async (tab) => {
    localSync.updateTab(tab);
  },
});

export default sync;
