import { AnimatePresence, motion } from "framer-motion";
import styles from "./ResultViewer.module.scss";
import { Results } from "@electric-sql/pglite";

export default function ResultViewer({
  result,
  error,
  isQuerying,
}: {
  result: Results<unknown> | undefined;
  error: string;
  isQuerying: boolean;
}) {
  return (
    <div className={styles.resultViewer}>
      <AnimatePresence>
        {isQuerying && <motion.div
        initial={{ opacity: 0.7, translateY: -2 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0.7, translateY: -2 }}
        transition={{ duration: 0.2 }}
        className={styles.nprogress} />}
      </AnimatePresence>
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
              {(result?.rows || []).map((row) =>
                (result?.fields || []).map((field) => (
                  <div key={field.name} className={styles.cell}>
                    {/* @ts-ignore */}
                    {row && field.name && row[field.name]
                      ? `${row[field.name]}`
                      : ""}
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
