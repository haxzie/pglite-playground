import SearchIcon from "../icons/SearchIcon";
import styles from "./ExplorerSearchBox.module.scss";

export default function ExplorerSearchBox({
  value,
  onChange,
  placeholder = "Search",
}: {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.searchBox}>
      <SearchIcon size={18} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
