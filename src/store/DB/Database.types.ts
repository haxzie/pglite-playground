import { DatabaseConnection, QueryResult } from "../../drivers/driver";

export interface DBTable {
  name: string;
  schema: string;
  columns: Array<{
    name: string;
    type: string;
  }>;
}

export type DBSchema = Record<string, DBTable>;

export interface RowSchema {
  table_name: string;
  column_name: string;
  data_type: string;
  character_maximum_length: number;
  numeric_precision: number;
  numeric_scale: number;
  is_nullable: string;
}
export interface DatabaseState {
  connection: DatabaseConnection | undefined;
  databases: string[];
  currentDatabase: string;
  databaseSchema: DBSchema | undefined;
  tables: string[];
  createConnection: (
    driverId: string,
    credentials: Record<string, string>
  ) => Promise<void>;
  loadSchema: () => Promise<void>;
  runQuery: ({
    query,
    saveQuery,
  }: {
    query: string;
    saveQuery?: boolean;
  }) => Promise<QueryResult | undefined>;
}

export interface DatabaseError {
  code: string;
  column?: string;
  columnNumber: number;
  constraint?: string;
  dataType?: string;
  detail?: string;
  file: string;
  fileName: string;
  hint?: string;
  internalPosition?: string;
  internalQuery?: string;
  length: number;
  line: string;
  lineNumber: number;
  message: string;
  name: string;
  position: string;
  routine: string;
  schema?: string;
  severity: string;
  stack: string;
  table?: string;
  where?: string;
}
