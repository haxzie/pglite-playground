import { AnimatePresence, motion } from "framer-motion";
import styles from "./ResultViewer.module.scss";
import { Results } from "@electric-sql/pglite";
import CodeIcon from "../../icons/CodeIcon";
import ErrorView from "./ErrorView";
import { DatabaseError } from "../../../store/Database.types";

export default function ResultViewer({
  result,
  error,
  isQuerying,
}: {
  result: Results<{ [key: string]: string | boolean | number }> | undefined;
  error: DatabaseError | undefined;
  isQuerying: boolean;
}) {
  return (
    <div className={styles.resultViewer}>
      <AnimatePresence>
        {isQuerying && (
          <motion.div
            initial={{ opacity: 0.7, translateY: -2 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0.7, translateY: -2 }}
            transition={{ duration: 0.2 }}
            className={styles.nprogress}
          />
        )}
      </AnimatePresence>
      {error ? (
        <ErrorView error={error} />
      ) : result ? (
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
                    {row && field.name && row[field.name]
                      ? `${row[field.name]}`
                      : ""}
                  </div>
                ))
              )}
            </>
          ) : (
            <div className={styles.noResult}></div>
          )}
        </div>
      ) : (
        <div className={styles.noQuery}>
          <div className={styles.icon}>
            <CodeIcon size={24} />
          </div>
          <div className={styles.texts}>
            <h4>Run your SQL query to see the results</h4>
            <p className={styles.description}>
              Use the editor to write your SQL query and hit "Run Query" to
              execute
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
