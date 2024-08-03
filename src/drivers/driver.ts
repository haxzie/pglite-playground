import { DBSchema } from "../store/DB/Database.types";

export interface DBCredentials {
  [key: string]: string | number | boolean | undefined | null;
}

export interface QueryResult {
  rows?: Array<{ [key: string]: string | number | boolean | undefined | null }>;
  fields?: Array<{ name: string; dataTypeID?: number; }>;
  rowCount?: number;
  affectedRows?: number;
  error?: string;
}

export interface DatabaseConnection {
  query: (query: string, params?: string[]) => Promise<QueryResult>;
  createDatabase: (name: string) => Promise<void>;
  fetchDatabases: () => Promise<string[]>;
  fetchSchema: () => Promise<DBSchema|undefined>;
  close: () => Promise<void>;
}

export interface DatabaseDriver {
  id: string;
  name: string;
  description: string;
  isLocal: boolean;
  defaultDatabase: string;
  connect: (credentials: DBCredentials) => Promise<DatabaseConnection>;
  disconnect: (connection: DatabaseConnection) => Promise<void>;
}

export function createDatabaseDriver(config: {
  id: string;
  name: string;
  description: string;
  isLocal: boolean;
  defaultDatabase: string;
  connect: (credentials: DBCredentials) => Promise<{
    query: (query: string, params?: string[]) => Promise<QueryResult>;
    createDatabase: (name: string) => Promise<void>;
    fetchDatabases: () => Promise<string[]>;
    fetchSchema: () => Promise<DBSchema|undefined>;
    close: () => Promise<void>;
  }>;
}): DatabaseDriver {
  return {
    ...config,
    disconnect: async (connection: DatabaseConnection) => {
      await connection.close();
    },
  };
}
