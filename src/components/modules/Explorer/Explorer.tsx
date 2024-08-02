import { useEffect, useState } from "react";
import styles from "./Explorer.module.scss";
import SearchIcon from "../../icons/SearchIcon";
import { Panel } from "react-resizable-panels";
import { useDatabase } from "../../../store/Database";
import TableRow from "./TableRow";
import { AnimatePresence } from "framer-motion";
import { DBSchema } from "../../../store/Database.types";
import TableIcon from "../../icons/TableIcon";
// import DatabaseIcon from "../../icons/DatabaseIcon";
import ArrowUpDownIcon from "../../icons/ArrowUpDownIcon";
import PostgresIcon from "../../icons/Databases/Postgres";
import PGLiteDriver from "../../../drivers/pglite";

export default function Explorer() {
  const { databaseSchema, createConnection } = useDatabase();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSchemaLoading, setIsSchemaLoading] = useState<boolean>(true);

  const loadCurrentSchema = async () => {
    setIsSchemaLoading(true);
    await createConnection(PGLiteDriver.id, {});
    // await loadSchema();
    setIsSchemaLoading(false);
  };

  useEffect(() => {
    loadCurrentSchema();
  }, []);

  // filter schema based on search query
  const filteredSchema =
    databaseSchema &&
    Object.values(databaseSchema)
      .filter((table) => {
        if (searchQuery === "") return true;
        if (table.name.toLowerCase().includes(searchQuery.toLowerCase()))
          return true;
        if (
          table.columns.some((column) =>
            column.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
          return true;
        return false;
      })
      .reduce(
        (acc, table) => ({ ...acc, [table.name]: table }),
        {} as DBSchema
      );

  return (
    <Panel id="explorer" defaultSize={25} minSize={20} order={1}>
      <div className={styles.explorer}>
        <div className={styles.header}>
          <div className={styles.dbDetails}>
            <div className={styles.icon}>
              <PostgresIcon size={18} />
            </div>
            <div className={styles.texts}>
              <div className={styles.title}>Postgres Lite</div>
            </div>
            <ArrowUpDownIcon size={18} />
          </div>
          <div className={styles.searchBox}>
            <SearchIcon size={18} />
            <input
              type="text"
              placeholder="Search for a table or column"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tables}>
          <AnimatePresence>
            {filteredSchema && Object.keys(filteredSchema).length > 0
              ? Object.values(filteredSchema).map((table) => (
                  <TableRow
                    key={table.name}
                    table={table.name}
                    schema={table}
                    query={searchQuery}
                  />
                ))
              : !isSchemaLoading && (
                  <div className={styles.noTables}>
                    <div className={styles.icon}>
                      <TableIcon size={24} />
                    </div>
                    <div className={styles.texts}>
                      <h5 className={styles.title}>No tables found</h5>
                      <p className={styles.description}>
                        Try searching for a table or column or Create new table
                        using SQL query
                      </p>
                    </div>
                  </div>
                )}
          </AnimatePresence>
        </div>
      </div>
    </Panel>
  );
}
