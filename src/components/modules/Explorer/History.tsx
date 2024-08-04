import { useState } from "react";
import ExplorerSearchBox from "../../common/ExplorerSearchBox";
import styles from "./History.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import MoreIcon from "../../icons/MoreIcon";
import { useHistory } from "../../../store/History";
import { DateTime } from "luxon";
import { useEditor } from "../../../store/Editor";
import { shallow } from "zustand/shallow";
import { v4 as uuid } from "uuid";
import { History } from "../../../modules/sync/sync.types";

export default function QueryHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const { history } = useHistory(({ history}) => ({ history }), shallow);
  const { addTab } = useEditor(({ addTab }) => ({ addTab }), shallow);

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

  const filteredHistory = Object.values(history)
    .filter((record) => {
      return (
        record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.query.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const handleClick = (record: History) => {
    addTab({
      id: uuid(),
      name: record.name,
      query: record.query,
    });
  }

  return (
    <div className={styles.history}>
      <ExplorerSearchBox
        value={searchQuery}
        placeholder="Search query history"
        onChange={(value) => setSearchQuery(value)}
      />
      <motion.div
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className={styles.historyList}
      >
        <AnimatePresence>
          {filteredHistory.map((record) => (
            <motion.div
              layout
              transition={{ duration: 0.3 }}
              key={`${record.id}`}
              className={styles.historyItem}
              onClick={() => handleClick(record)}
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
              <div className={styles.moreIcon}>
                <MoreIcon size={18} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
