import styles from "./EditorTopBar.module.scss";

export default function EditorTopBar() {
  return (
    <div className={styles.topBar}>
        <p className={styles.tabName}>Untitled Query</p>
    </div>
  )
}
