import styles from "./ErrorView.module.scss";

export default function ErrorView({ error }: { error: string }) {
  return (
    <div className={styles.errorView}>
      <strong>Error</strong>
      <span className={styles.error}>{error || "Something went wrong :("}</span>
    </div>
  );
}
