import { create } from "zustand";
import { canModifyDatabase } from "./DatabaseUtils";
import { DatabaseState } from "./Database.types";
import { DEMO_QUERIES } from "../../components/utils/queries";
import { LAST_RUN_QUERY_KEY } from "../../components/utils/constants";
import { QueryResult } from "../../drivers/driver";
import DatabaseDrivers from "../../drivers";
import { useHistory } from "../History";

export const useDatabase = create<DatabaseState>()((set, get) => ({
  connection: undefined,
  currentDatabase: "default-pgsql",
  databaseSchema: undefined,
  tables: [],
  databases: [],
  createConnection: async (
    driverId: string,
    credentials: Record<string, string>
  ) => {
    const driver = DatabaseDrivers[driverId];
    if (!driver) {
      throw new Error("Invalid driver");
    }
    const connection = await driver.connect(credentials);
    set({ connection });
    await get().loadSchema();
  },
  loadSchema: async () => {
    try {
      const connection = get().connection;
      if (get().connection) {
        const schema = await connection?.fetchSchema();
        set({ databaseSchema: schema });
      }
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  },
  runQuery: async ({
    query,
    saveQuery = false,
  }: {
    query: string;
    saveQuery?: boolean;
  }): Promise<QueryResult | undefined> => {
    const connection = get().connection;
    if (!connection) {
      return { error: "No connection" };
    }
    try {
      // add query to history
      useHistory.getState().addHistory({
        id: Date.now().toString(),
        name: "",
        integrationId: "Postgres Lite",
        query,
        createdAt: new Date().toISOString(),
      });
      
      const result = await connection.query(query);

      if (canModifyDatabase(query)) {
        console.log("Modifying database, reloading schema");
        get().loadSchema();
      }

      if (saveQuery) {
        // check if the executed query is part of the demo queries
        // if not, save it to local storage
        // use regex to check if the query is a demo query
        const isDemoQuery = DEMO_QUERIES.includes(query);
        if (!isDemoQuery) {
          localStorage.setItem(LAST_RUN_QUERY_KEY, query);
        }
      }
      return result;
    } catch (error: unknown) {
      const executionError = error as string;
      return { error: executionError };
    }
  },
}));
