import React from "react";
import styles from "./ResultViewer.module.scss";
import { Results } from "@electric-sql/pglite";

export default function ResultViewer({
  result,
  error,
}: {
  result: Results<unknown> | undefined;
  error: string;
}) {
  return (
    <div className={styles.resultViewer}>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div
          className={styles.result}
          style={{
            gridTemplateColumns: `repeat(${result?.fields.length}, minmax(min-content, 300px))`,
          }}
        >
          {result?.fields && result?.fields.length > 0 ? (
            <>
              {(result?.fields || []).map((field) => (
                <div key={field.name} className={styles.field}>
                  {field.name}
                </div>
              ))}
              {(result?.rows || []).map((row, i) =>
                (result?.fields || []).map((field) => (
                  <div key={field.name} className={styles.cell}>
                    {row && field.name && row[field.name] ? `${row[field.name]}` : ""}
                  </div>
                ))
              )}
            </>
          ) : (
            <div>No results</div>
          )}
        </div>
      )}
    </div>
  );
}
