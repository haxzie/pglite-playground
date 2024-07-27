import { create } from "zustand";
import { canModifyDatabase, getDb } from "../modules/db";
import { Results } from "@electric-sql/pglite";
import { DatabaseState, RowSchema, DBSchema } from "./Database.types";
import { GET_DATABASE_SCHEMA_QUERY } from "../components/utils/queries";

export const useDatabase = create<DatabaseState>()((set, get) => ({
  error: "",
  result: undefined,
  currentDatabase: "default-pgsql",
  databaseSchema: undefined,
  tables: [],
  databases: [],
  loadSchema: async () => {
    const { result, error } = await get().runQuery<RowSchema>({ query: GET_DATABASE_SCHEMA_QUERY });
    if (result) {
      const newSchema: DBSchema = {};
      result.rows.forEach((row: RowSchema) => {
        const tableName = row.table_name;
        if (!newSchema[tableName]) {
          newSchema[tableName] = {
            name: tableName,
            schema: "public",
            columns: [],
          };
        }
        newSchema[tableName].columns.push({
          name: row.column_name,
          type: row.data_type,
        });
      });
      set({ databaseSchema: newSchema });
    }
    if (error) {
      console.error(error);
    }
  },
  runQuery: async <T>({
    query,
  }: {
    query: string;
  }): Promise<{ result: Results<T> | undefined; error: unknown }> => {
    const db = getDb("default-pgsql");
    try {
      const result = await db.query<T>(query);
      if (canModifyDatabase(query)) {
        console.log("Modifying database, reloading schema");
        get().loadSchema();
      }
      console.log({ result });
      return { result: result, error: undefined };
    } catch (error) {
      return { result: undefined, error: error };
    }
  },
}));
