import { useState } from "react";
import { DBTable } from "./Explorer.types";
import styles from "./TableRow.module.scss";
import TableIcon from "../../icons/TableIcon";
import ChevronRightIcon from "../../icons/ChevronRightIcon";
import ColumnIcon from "../../icons/ColumnIcon";

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
        <div className={[styles.chevron, showColumns && styles.rotate].join(" ")}>
          <ChevronRightIcon size={18} />
        </div>
        <div className={styles.icon}>
            <TableIcon size={18} /> 
        </div>
        <span>{table}</span>
      </div>
      {showColumns && (
        <div className={styles.columns}>
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
        </div>
      )}
    </div>
  );
}
