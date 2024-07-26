import React from "react";
import styles from "./EditorLayout.module.scss";
import { Panel } from "react-resizable-panels";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Panel id="editor" minSize={25} order={1}>
      <div className={styles.editorLayout}> {children}</div>
    </Panel>
  );
}
