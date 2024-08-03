import React from "react";
import styles from "./EditorLayout.module.scss";
import EditorTopBar from "../common/EditorTopBar";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.editorLayout}>
      <EditorTopBar />
      <div className={styles.editor}>{children}</div>
    </div>
  );
}
