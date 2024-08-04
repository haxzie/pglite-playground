import { useState } from "react";
import { DBTable } from "../../../store/DB/Database.types";
import styles from "./TableRow.module.scss";
import ChevronRightIcon from "../../icons/ChevronRightIcon";
import { AnimatePresence, motion } from "framer-motion";

export default function TableRow({
  table,
  schema,
  query,
}: {
  table: string;
  schema: DBTable;
  query: string;
}) {
  const [showColumns, setShowColumns] = useState<boolean>(false);

  const highlightSubstring = (name: string, query: string) => {
    if (!query) return { value: name, hasMatch: false };

    const regex = new RegExp(
      query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "gi"
    );
    // check if exists
    const hasQuery = name.match(regex);
    return {
      value: name.replace(regex, (match) => `<mark>${match}</mark>`),
      hasMatch: !!hasQuery,
    };
  };

  const highligtedColumns = schema.columns.map((column) => {
    const { value, hasMatch } = highlightSubstring(column.name, query);
    return {
      ...column,
      value,
      hasMatch,
    };
  });

  return (
    <div className={styles.tableRow}>
      <div
        className={styles.tableDetails}
        onClick={() => setShowColumns((value) => !value)}
      >
        <div
          className={[styles.chevron, showColumns && styles.rotate].join(" ")}
        >
          <ChevronRightIcon size={18} />
        </div>
        {/* <div className={styles.icon}>
          <TableIcon size={18} />
        </div> */}
        <span>{table}</span>
      </div>
      <AnimatePresence>
        {showColumns && (
          <motion.div
            initial={{ opacity: 0, height: 0, translateY: -10 }}
            animate={{ opacity: 1, height: "auto", translateY: 0 }}
            exit={{ opacity: 0, height: 0, translateY: -10 }}
            className={styles.columns}
          >
            {highligtedColumns.map((column) => (
              <div
                className={[
                  styles.column,
                  query && !column.hasMatch && styles.deHighlight,
                ].join(" ")}
                key={column.name}
              >
                <div className={styles.line}>
                  <div className={styles.dash}></div>
                </div>
                {/* <div className={styles.icon}>
                  <ColumnIcon size={18} />
                </div> */}
                <div
                  className={styles.columnName}
                  dangerouslySetInnerHTML={{
                    __html: column.value,
                  }}
                ></div>
                <div className={styles.columnType}>
                  {column.type.split(" ")[0]}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
