import { useState } from "react";
import { DBTable } from "../../../store/Database.types";
import styles from "./TableRow.module.scss";
import TableIcon from "../../icons/TableIcon";
import ChevronRightIcon from "../../icons/ChevronRightIcon";
import ColumnIcon from "../../icons/ColumnIcon";
import { AnimatePresence, motion } from "framer-motion";

export default function TableRow({
  table,
  schema,
}: {
  table: string;
  schema: DBTable;
}) {
  const [showColumns, setShowColumns] = useState<boolean>(false);

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
        <div className={styles.icon}>
          <TableIcon size={18} />
        </div>
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
            {schema.columns.map((column) => (
              <div className={styles.column}>
                <div className={styles.line}>
                  <div className={styles.dash}></div>
                </div>
                <div className={styles.icon}>
                  <ColumnIcon size={18} />
                </div>
                <div className={styles.columnName}>{column.name}</div>
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
