import React, { useEffect } from "react";
import styles from "./Editor.module.scss";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { tokyoNight } from "./theme";
import PlayIcon from "../../icons/PlayIcon";
import { PanelResizeHandle } from "react-resizable-panels";

export default function Editor({
  onClickRun,
}: {
  onClickRun: (query: string) => void;
}) {
  const [query, setQuery] = React.useState(`SELECT 
    t.table_name,
    c.column_name,
    c.data_type,
    c.character_maximum_length,
    c.numeric_precision,
    c.numeric_scale,
    c.is_nullable
FROM 
    information_schema.tables t
JOIN 
    information_schema.columns c 
    ON t.table_name = c.table_name
WHERE 
    t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
ORDER BY 
    t.table_name,
    c.ordinal_position;`);

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

  return (
    <div className={[styles.editor, "editor-config"].join(" ")}>
      <div className={styles.editorWrapper}>
        <CodeMirror
          value={query}
          onChange={(value) => setQuery(value)}
          theme={tokyoNight}
          extensions={[sql()]}
          width="100%"
          height="100%"
        />
      </div>
      <PanelResizeHandle />
      <div className={styles.codeControls}>
        <div></div>
        <button className={styles.runButton} onClick={() => onClickRun(query)}>
          <PlayIcon size={24} />
          Run Query
        </button>
      </div>
    </div>
  );
}
