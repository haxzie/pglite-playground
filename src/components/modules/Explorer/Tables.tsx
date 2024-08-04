import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Tables.module.scss";
import { DBSchema } from "../../../store/DB/Database.types";
import TableIcon from "../../icons/TableIcon";
import ChevronRightIcon from "../../icons/ChevronRightIcon";
import TableRow from "./TableRow";
import ExplorerSearchBox from "../../common/ExplorerSearchBox";

export default function Tables({
  schema,
  isSchemaLoading,
}: {
  schema: DBSchema | undefined;
  isSchemaLoading: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSchema =
    schema &&
    Object.values(schema)
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
    <div className={styles.tableWrapper}>
      <ExplorerSearchBox
        value={searchQuery}
        onChange={(value) => setSearchQuery(value)}
        placeholder="Search for tables or columns"
      />
      <motion.div
        key={`tables`}
        initial={{ opacity: 0, translateX: "-10px" }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: "10px" }}
        className={styles.tables}
      >
        <AnimatePresence>
          {filteredSchema && Object.keys(filteredSchema).length > 0 ? (
            Object.values(filteredSchema).map((table) => (
              <TableRow
                key={table.name}
                table={table.name}
                schema={table}
                query={searchQuery}
              />
            ))
          ) : !isSchemaLoading ? (
            <div className={styles.noTables}>
              <div className={styles.icon}>
                <TableIcon size={24} />
              </div>
              <div className={styles.texts}>
                <h5 className={styles.title}>No tables found</h5>
                <p className={styles.description}>
                  Try searching for a table or column or Create new table using
                  SQL query
                </p>
              </div>
            </div>
          ) : (
            <motion.div
              layout
              key={`loading`}
              initial={{ opacity: 0, translateY: "10px" }}
              animate={{ opacity: 1, translateY: 0 }}
              className={styles.loading}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={styles.loadingTable}>
                  <div className={styles.chevron}>
                    <ChevronRightIcon size={18} />
                  </div>
                  <div
                    className={[styles.icon, styles.skeletonLoader].join(" ")}
                  ></div>
                  <div
                    className={[styles.title, styles.skeletonLoader].join(" ")}
                  ></div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
