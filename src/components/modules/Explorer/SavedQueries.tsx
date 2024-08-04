import { useState } from "react";
import ExplorerSearchBox from "../../common/ExplorerSearchBox";
import styles from "./SavedQueries.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useSavedQueries } from "../../../store/SavedQueries";
import { shallow } from "zustand/shallow";
import { DateTime } from "luxon";

export default function SavedQueries() {
  const [searchQuery, setSearchQuery] = useState("");
  const { savedQueries, pickSavedQuery } = useSavedQueries(
    ({ savedQueries, pickSavedQuery }) => ({ savedQueries, pickSavedQuery }),
    shallow
  );

  const formatDate = (date: string) => {
    const dateTime = DateTime.fromISO(date);
    const diff = dateTime
      .diffNow()
      .shiftTo("years", "months", "days", "hours", "minutes", "seconds");
    let timeAgo = "";

    if (diff.years > 0) {
      timeAgo = `${diff.years} year${diff.years > 1 ? "s" : ""} ago`;
    } else if (diff.months > 0) {
      timeAgo = `${diff.months} month${diff.months > 1 ? "s" : ""} ago`;
    } else if (diff.days > 0) {
      timeAgo = `${diff.days} day${diff.days > 1 ? "s" : ""} ago`;
    } else if (diff.hours > 0) {
      timeAgo = `${diff.hours} hour${diff.hours > 1 ? "s" : ""} ago`;
    } else if (diff.minutes > 0) {
      timeAgo = `${diff.minutes} minute${diff.minutes > 1 ? "s" : ""} ago`;
    } else if (diff.seconds > 1) {
      timeAgo = `${diff.seconds} second${diff.seconds > 1 ? "s" : ""} ago`;
    } else {
      timeAgo = "just now";
    }

    return timeAgo;
  };

  const filteredSavedQueries = Object.values(savedQueries)
    .filter((record) => {
      return (
        record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.query.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className={styles.savedQueries}>
      <ExplorerSearchBox
        value={searchQuery}
        placeholder="Search saved queries"
        onChange={(value) => setSearchQuery(value)}
      />
      <motion.div
        key={`savedQueries`}
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className={styles.queryList}
      >
        <AnimatePresence>
          {filteredSavedQueries.map((record) => (
            <motion.div
              className={styles.queryItem}
              onClick={() => pickSavedQuery(record.id)}
            >
              <div className={styles.texts}>
                <p className={styles.query}>{record.name || record.query}</p>
                <p className={styles.timestamp}>
                  <span className={styles.success}>{record.integrationId}</span>
                  •
                  <span className={styles.time}>
                    {formatDate(record.createdAt)}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
