import React, { useCallback, useEffect, useRef } from "react";
import styles from "./Editor.module.scss";
import CodeMirror, { EditorView, keymap, Prec } from "@uiw/react-codemirror";
import { sql, SQLNamespace, PostgreSQL } from "@codemirror/lang-sql";
import { tokyoNight } from "./theme";
// import PlayIcon from "../../icons/PlayIcon";
import { PanelResizeHandle } from "react-resizable-panels";
import Loader from "../../base/Loader";
import { useDatabase } from "../../../store/DB/Database";
import { DEFAULT_SCHEMA } from "../../utils/schema";
import CommandIcon from "../../icons/CommandIcon";
import EnterIcon from "../../icons/EnterIcon";
// import SaveIcon from "../../icons/SaveIcon";

export default function Editor({
  tabId,
  value,
  onChange,
  onClickRun,
  affectedRows,
  totalRows,
  isQuerying,
}: {
  tabId: string;
  value: string;
  onChange: (value: string) => void;
  affectedRows: number | undefined;
  totalRows: number | undefined;
  onClickRun: (query: string) => void;
  isQuerying: boolean;
}) {
  const editorRef = useRef<EditorView | null>(null);
  const [selectedQuery, setSelectedQuery] = React.useState<
    string | undefined
  >();
  const [schema, setSchema] = React.useState<SQLNamespace | undefined>(
    undefined
  );
  const { databaseSchema } = useDatabase();

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  useEffect(() => {
    focusEditor();
  }, [tabId]);

  const handleRunQuery = useCallback(() => {
    onClickRun(selectedQuery || value);
  }, [selectedQuery, value, onClickRun]);
  

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

  const customKeys = Prec.high(
    keymap.of([
      {
        key: "Cmd-Enter",
        run: () => {
          handleRunQuery();
          return true;
        },
      },
      {
        key: "Ctrl-Enter",
        run: () => {
          handleRunQuery();
          return true;
        },
      },
    ])
  );

  return (
    <div className={[styles.editor, "editor-config"].join(" ")}>
      <div className={styles.editorWrapper}>
        <CodeMirror
          autoFocus
          value={value}
          onChange={(value) => onChange(value)}
          onCreateEditor={(editor) => {
            editorRef.current = editor;
          }}
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
            customKeys,
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
        <div className={styles.buttons}>
          <div className={styles.queryActions}>
            {/* <button
              className={styles.iconButton}
              onClick={() => onClickRun(selectedQuery || value)}
            >
              <SaveIcon size={18} />
            </button> */}
          </div>
          <button
            className={[styles.runButton, isQuerying && styles.loading].join(
              " "
            )}
            onClick={() => onClickRun(selectedQuery || value)}
          >
            <div className={styles.content}>
              Run Query
              <div className={styles.cmdEnter}>
                <CommandIcon size={18} />
                <EnterIcon size={18} />
              </div>
            </div>
            <div className={styles.loader}>
              <Loader />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
