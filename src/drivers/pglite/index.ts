import { createDatabaseDriver, DBCredentials } from "../driver";
import { DBSchema, RowSchema } from "../../store/DB/Database.types";
import { PGlite } from "@electric-sql/pglite";
import { GET_DATABASE_SCHEMA_QUERY } from "./queries";

const PGLiteDriver = createDatabaseDriver({
  id: "pglite",
  name: "PGLite",
  description: "A lightweight SQL database within your browser",
  isLocal: true,
  defaultDatabase: "default-pgsql",
  connect: async (credentials: DBCredentials) => {
    // Simulating connection to PGLite
    console.log("Connecting to PGLite with credentials:", credentials);
    const db = new PGlite(`idb://default-pgsql`);

    return {
      query: async (query: string, params?: string[]) => {
        console.log(
          `Executing query: ${query}, with params:`,
          params
        );
        try {
          const result = await db.query<{
            [key: string]: string | number | boolean | undefined | null;
          }>(query, params);

          if (result) {
            console.log("Query result:", result);
          }

          return {
            rows: result.rows,
            fields: result.fields,
            rowCount: result.rows.length,
            affectedRows: result.affectedRows,
            error: undefined,
          };
        } catch (error) {
          const queryError = error as Error;
          if (queryError.message) {
            return { error: queryError.message };
          } else {
            return { error: "An error occurred while executing the query" };
          }
        }
      },
      createDatabase: async (name: string) => {
        console.log(`Creating database: ${name}`);
      },
      fetchDatabases: async () => {
        console.log("Fetching databases");
        return ["default-pgsql"]; // Simulated result
      },
      fetchSchema: async () => {
        try {
          const result = await db.query<RowSchema>(
            GET_DATABASE_SCHEMA_QUERY,
            []
          );

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
            return newSchema;
          }
        } catch (error) {
          const queryError = error as Error;
          throw new Error(queryError.message);
        }
      },
      close: async () => {
        console.log("Closing connection");
      },
    };
  },
});

export default PGLiteDriver;
