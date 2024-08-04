import { useEffect } from "react";
import { useEditor } from "../../store/Editor";
import styles from "./EditorTopBar.module.scss";
import AddIcon from "../icons/AddIcon";
import ClearIcon from "../icons/ClearIcon";
import { AnimatePresence, motion } from "framer-motion";
import { shallow } from "zustand/shallow";

export default function EditorTopBar() {
  const { tabs, addTab, activeTab, removeTab, setActiveTab } = useEditor(
    ({ tabs, addTab, activeTab, removeTab, setActiveTab }) => ({
      tabs,
      addTab,
      activeTab,
      removeTab,
      setActiveTab,
    }),
    shallow
  );

  useEffect(() => {
    if (Object.keys(tabs).length === 0) {
      addTab({});
    }
  }, []);

  return (
    <div className={styles.topBar}>
      <div className={styles.tabs}>
        <div className={styles.addTabBtn} onClick={() => addTab({})}>
          <AddIcon size={20} />
        </div>
        <div className={styles.tabGroup}>
          <AnimatePresence />
          {Object.values(tabs).map((tab) => (
            <motion.div
              key={tab.id}
              layout
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.2 }}
              className={[
                styles.tab,
                activeTab === tab.id && styles.active,
              ].join(" ")}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.name}</span>
              <button
                className={styles.closeBtn}
                onClick={(event) => {
                  event.stopPropagation();
                  removeTab(tab.id);
                }}
              >
                <ClearIcon size={18} />
              </button>
            </motion.div>
          ))}
          <AnimatePresence />
        </div>
      </div>
    </div>
  );
}
