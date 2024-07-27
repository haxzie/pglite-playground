import { useEffect } from "react";
import styles from "./Explorer.module.scss";
import SearchIcon from "../../icons/SearchIcon";
import { Panel } from "react-resizable-panels";
import { useDatabase } from "../../../store/Database";
import TableRow from "./TableRow";
import { AnimatePresence } from "framer-motion";

export default function Explorer() {
  const { loadSchema, databaseSchema } = useDatabase();

  useEffect(() => {
    loadSchema();
  }, []);

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
          <AnimatePresence>
            {databaseSchema &&
              Object.values(databaseSchema).map((table) => (
                <TableRow key={table.name} table={table.name} schema={table} />
              ))}
          </AnimatePresence>
        </div>
      </div>
    </Panel>
  );
}
