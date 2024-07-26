import React from "react";
import styles from "./AppLayout.module.scss";
import AppNavBar from "../common/AppNavBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <AppNavBar />
      <div className={styles.contents}>{children}</div>
    </div>
  );
}
