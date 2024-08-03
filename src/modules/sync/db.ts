import Dexie from "dexie";

export const DB_VERSION = 1;

const db = new Dexie("xql");

db.version(DB_VERSION).stores({
  history: "id, name, query, integrationId, createdAt",
  savedQueries: "id, name, query, integrationId, createdAt, updatedAt",
  tabs: "id, name, query, result",
});

export default db;
