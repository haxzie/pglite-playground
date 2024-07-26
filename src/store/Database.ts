import { create } from "zustand";
import { Results } from "@electric-sql/pglite";
import { getDb } from "../modules/db";

export interface DatabaseState {
  error: unknown;
  databases: string[];
  currentDatabase: string;
  result: Results<unknown> | undefined;
  tables: string[];
  runQuery: <T>({
    query,
  }: {
    query: string;
  }) => Promise<{ result: Results<T> | undefined; error: unknown }>;
}

export const useDatabase = create<DatabaseState>()(() => ({
  error: "",
  result: undefined,
  currentDatabase: "default-pgsql",
  tables: [],
  databases: [],
  runQuery: async <T>({
    query,
  }: {
    query: string;
  }): Promise<{ result: Results<T> | undefined; error: unknown }> => {
    const db = getDb("default-pgsql");
    try {
      const result = await db.query<T>(query);
      return { result: result, error: undefined };
    } catch (error) {
      return { result: undefined, error: error };
    }
  },
}));
