import { create } from "zustand";
import { canModifyDatabase } from "./DatabaseUtils";
import { DatabaseState } from "./Database.types";
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
  }: {
    query: string;
  }): Promise<QueryResult | undefined> => {
    const connection = get().connection;
    if (!connection) {
      return { error: "No connection" };
    }
    try {
      // add query to history
      useHistory.getState().addHistory({
        name: "",
        integrationId: "Postgres Lite",
        query,
      });
      
      const result = await connection.query(query);

      if (canModifyDatabase(query)) {
        console.log("Modifying database, reloading schema");
        get().loadSchema();
      }

      return result;
    } catch (error: unknown) {
      const executionError = error as string;
      return { error: executionError };
    }
  },
}));
