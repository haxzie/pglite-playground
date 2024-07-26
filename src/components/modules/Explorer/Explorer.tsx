import React, { useCallback, useEffect, useState } from "react";
import styles from "./Explorer.module.scss";
import SearchIcon from "../../icons/SearchIcon";
import { Panel } from "react-resizable-panels";
import { useDatabase } from "../../../store/Database";
import { DBSchema, RowSchema } from "./Explorer.types";
import TableRow from "./TableRow";

export default function Explorer() {
  const { runQuery } = useDatabase();
  const [schema, setSchema] = useState<DBSchema>({});

  const getDBSchema = useCallback(async () => {
    const query = `
      SELECT 
    t.table_name,
    c.column_name,
    c.data_type,
    c.character_maximum_length,
    c.numeric_precision,
    c.numeric_scale,
    c.is_nullable
FROM 
    information_schema.tables t
JOIN 
    information_schema.columns c 
    ON t.table_name = c.table_name
WHERE 
    t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
ORDER BY 
    t.table_name,
    c.ordinal_position;
    `;

    const { result, error } = await runQuery<RowSchema>({ query });

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
      setSchema(newSchema);
    }
    if (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getDBSchema();
  }, []);

  useEffect(() => {
    console.log({ schema });
  }, [schema]);

  return (
    <Panel id="explorer" defaultSize={25} minSize={20} order={1}>
      <div className={styles.explorer}>
        <div className={styles.header}>
          {/* <div className={styles.dbDetails}>
          <div className={styles.icon}>
            <DatabaseIcon size={18} />
          </div>
          <div className={styles.texts}>
            <div className={styles.title}>Postgres Lite</div>
          </div>
        </div> */}
          <div className={styles.searchBox}>
            <SearchIcon size={18} />
            <input type="text" placeholder="Search for a table or column" />
          </div>
        </div>

        <div className={styles.tables}>
          {Object.values(schema).map((table) => (
            <TableRow key={table.name} table={table.name} schema={table} />
          ))}
        </div>
      </div>
    </Panel>
  );
}
