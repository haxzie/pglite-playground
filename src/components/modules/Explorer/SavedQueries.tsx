import { useState } from "react";
import ExplorerSearchBox from "../../common/ExplorerSearchBox";
import styles from "./SavedQueries.module.scss";
import { motion } from "framer-motion";

export default function SavedQueries() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className={styles.savedQueries}>
      <ExplorerSearchBox
        value={searchQuery}
        placeholder="Search saved queries"
        onChange={(value) => setSearchQuery(value)}
      />
      <motion.div
        key={`history`}
        initial={{ opacity: 0, translateX: "-10px" }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: "10px" }}
        className={styles.queryList}
      >
        <div className={styles.queryItem}>
          <div className={styles.texts}>
            <p className={styles.query}>SELECT * FROM users WHERE id = 1</p>
            <p className={styles.timestamp}>
              <span className={styles.success}>PostgresLite</span> •{" "}
              <span className={styles.time}>2 days ago</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
