import React, { useEffect } from "react";
import styles from "./Editor.module.scss";
import CodeMirror, { keymap, Prec } from "@uiw/react-codemirror";
import { sql, SQLNamespace, PostgreSQL } from "@codemirror/lang-sql";
import { tokyoNight } from "./theme";
import PlayIcon from "../../icons/PlayIcon";
import { PanelResizeHandle } from "react-resizable-panels";
import Loader from "../../base/Loader";
import { useDatabase } from "../../../store/Database";
import { DEFAULT_SCHEMA } from "../../utils/schema";

export default function Editor({
  onClickRun,
  affectedRows,
  totalRows,
  isQuerying,
}: {
  affectedRows: number | undefined;
  totalRows: number | undefined;
  onClickRun: (query: string) => void;
  isQuerying: boolean;
}) {
  const [query, setQuery] = React.useState(`SELECT 'Hello World!' as MESSAGE`);
  const [selectedQuery, setSelectedQuery] = React.useState<
    string | undefined
  >();
  const [schema, setSchema] = React.useState<SQLNamespace | undefined>(
    undefined
  );
  const { databaseSchema } = useDatabase();

  // add cmd + enter to run query
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "Enter") {
        onClickRun(selectedQuery || query);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [query, selectedQuery, onClickRun]);

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

    setSchema(mySchema);
  }, [databaseSchema]);

  const customKeys = Prec.high(keymap.of([
    {
      key: "Cmd-Enter",
      run: () => {
        return false;
      },
    },
    {
      key: "Ctrl-Enter",
      run: () => {
        return false;
      },
    }
  ]));

  return (
    <div className={[styles.editor, "editor-config"].join(" ")}>
      <div className={styles.editorWrapper}>
        <CodeMirror
          value={query}
          onChange={(value) => setQuery(value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.metaKey) {
              e.preventDefault();
              return false;
            }
          }}
          theme={tokyoNight}
          onStatistics={({ selectionCode }) => setSelectedQuery(selectionCode)}
          extensions={[
            sql({
              schema,
              tables: Object.keys(schema || {}).map((table) => ({
                label: table,
              })),
              dialect: PostgreSQL,
            }),
            customKeys
          ]}
          width="100%"
          height="100%"
        />
      </div>
      <PanelResizeHandle />
      <div className={styles.codeControls}>
        <div className={styles.info}>
          {totalRows !== undefined && (
            <span className={styles.totalRows}>{totalRows} rows in result</span>
          )}
          {affectedRows !== undefined && (
            <span className={styles.affectedRows}>
              {affectedRows} rows affected
            </span>
          )}
        </div>
        <button
          className={[styles.runButton, isQuerying && styles.loading].join(" ")}
          onClick={() => onClickRun(selectedQuery || query)}
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
