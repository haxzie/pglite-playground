import React from "react";
import styles from "./AppLayout.module.scss";
import SideNavBar from "../common/SideNavBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <SideNavBar />
      <div className={styles.contents}>{children}</div>
    </div>
  );
}
