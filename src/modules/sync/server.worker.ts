import { createSyncDriver } from "./syncDriver";
import comlink from "comlink";

const serverSync = createSyncDriver({
    createHistory: async (history) => {
        console.log("createHistory", history);
    },
    getHistory: async () => {
        console.log("getHistory");
        return [];
    },
    deleteHistory: async (id) => {
        console.log("deleteHistory", id);
    },
    updateHistory: async (history) => {
        console.log("updateHistory", history);
    },
    createSavedQuery: async (savedQuery) => {
        console.log("createSavedQuery", savedQuery);
    },
    getSavedQueries: async () => {
        console.log("getSavedQueries");
        return [];
    },
    deleteSavedQuery: async (id) => {
        console.log("deleteSavedQuery", id);
    },
    updateSavedQuery: async (savedQuery) => {
        console.log("updateSavedQuery", savedQuery);
    },
    createTab: async (tab) => {
        console.log("createTab", tab);
    },
    getTabs: async () => {
        console.log("getTabs");
        return [];
    },
    deleteTab: async (id) => {
        console.log("deleteTab", id);
    },
    updateTab: async (tab) => {
        console.log("updateTab", tab);
    },
});

comlink.expose(serverSync);