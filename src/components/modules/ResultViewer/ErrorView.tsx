import { DatabaseError } from "../../../store/Database.types";
import styles from "./ErrorView.module.scss";

export default function ErrorView({ error }: { error: DatabaseError }) {
  return (
    <div className={styles.errorView}>
      <strong>
        {error.severity || "Error"}
      </strong>
      <span className={styles.error}>
        {error.message || "Something went wrong :("}
      </span>
    </div>
  );
}
