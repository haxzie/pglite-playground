import { createDatabaseDriver, DBCredentials } from "../driver";
import { DBSchema } from "../../store/DB/Database.types";

const SQLiteDriver = createDatabaseDriver({
  id: "sqlite",
  name: "SQLite",
  description: "SQLite database driver",
  isLocal: true,
  defaultDatabase: "default-sqlite",
  connect: async (credentials: DBCredentials) => {
    // Simulating connection to PGLite
    console.log("Connecting to PGLite with credentials:", credentials);

    return {
      query: async (query: string, params?: string[]) => {
        console.log(`Executing query: ${query}, with params:`, params);
        return { rows: [], rowCount: 0 }; // Simulated result
      },
      createDatabase: async (name: string) => {
        console.log(`Creating database: ${name}`);
      },
      fetchDatabases: async () => {
        console.log("Fetching databases");
        return ["default", "test"]; // Simulated result
      },
      fetchSchema: async () => {
        console.log(`Fetching schema for database`);
        return {} as DBSchema; // Simulated result
      },
      close: async () => {
        console.log("Closing connection");
      },
    };
  },
});

export default SQLiteDriver;
