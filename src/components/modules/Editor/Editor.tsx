import React, { useEffect } from "react";
import styles from "./Editor.module.scss";
import CodeMirror from "@uiw/react-codemirror";
import { sql, SQLDialect, SQLNamespace } from "@codemirror/lang-sql";
import { tokyoNight } from "./theme";
import PlayIcon from "../../icons/PlayIcon";
import { PanelResizeHandle } from "react-resizable-panels";
import Loader from "../../base/Loader";
import { useDatabase } from "../../../store/Database";
import { DEFAULT_SCHEMA } from "../../utils/schema";

export default function Editor({
  onClickRun,
  affectedRows,
  isQuerying,
}: {
  affectedRows: number | undefined;
  onClickRun: (query: string) => void;
  isQuerying: boolean;
}) {
  const [query, setQuery] = React.useState(`SELECT 'Hello World!' as MESSAGE`);
  const [schema, setSchema] = React.useState<SQLNamespace | undefined>(
    undefined
  );
  const { databaseSchema } = useDatabase();

  // add cmd + enter to run query
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "Enter") {
        onClickRun(query);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [query, onClickRun]);

  useEffect(() => {
    const defaultSchema = DEFAULT_SCHEMA["postgres"];
    const mySchema =
      databaseSchema && Object.keys(databaseSchema).length > 0
        ? Object.keys(databaseSchema).reduce(
            (acc, table) => ({
              ...acc,
              [table]: databaseSchema[table].columns.map(
                (column) => column.name
              ),
            }),
            defaultSchema
          )
        : defaultSchema;

    console.log(mySchema);
    setSchema(mySchema);
  }, [databaseSchema]);

  return (
    <div className={[styles.editor, "editor-config"].join(" ")}>
      <div className={styles.editorWrapper}>
        <CodeMirror
          value={query}
          onChange={(value) => setQuery(value)}
          theme={tokyoNight}
          extensions={[
            sql({
              schema,
              tables: Object.keys(schema || {}).map((table) => ({
                label: table,
              })),
            }),
          ]}
          width="100%"
          height="100%"
        />
      </div>
      <PanelResizeHandle />
      <div className={styles.codeControls}>
        <div className={styles.info}>
          {affectedRows !== undefined && (
            <span className={styles.affectedRows}>
              {affectedRows} rows affected
            </span>
          )}
        </div>
        <button
          className={[styles.runButton, isQuerying && styles.loading].join(" ")}
          onClick={() => onClickRun(query)}
        >
          <div className={styles.content}>
            <PlayIcon size={24} />
            Run Query
          </div>
          <div className={styles.loader}>
            <Loader />
          </div>
        </button>
      </div>
    </div>
  );
}
