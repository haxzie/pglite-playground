import React from "react";
import styles from "./AppNavBar.module.scss";
import Logo from "../icons/Logo";

export default function AppNavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.branding}>
        <div className={styles.logo}>
          <Logo size={18} />
        </div>
        <h1>pgsql<span>.sh</span></h1>
      </div>
      <div className={styles.menu}></div>
    </div>
  );
}
