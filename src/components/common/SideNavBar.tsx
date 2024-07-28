import styles from "./SideNavBar.module.scss";
import Logo from "../icons/Logo";
import EditorIcon from "../icons/EditorIcon";
import HistoryIcon from "../icons/HistoryIcon";
import SaveIcon from "../icons/SaveIcon";
import SettingsIcon from "../icons/SettingsIcon";

export default function SideNavBar() {
  const menuItems: Array<{
    title: string;
    icon: ({ size }: { size: number }) => JSX.Element;
    url: string;
  }> = [
    {
      title: "Editor",
      icon: EditorIcon,
      url: "/",
    },
    {
      title: "History",
      icon: HistoryIcon,
      url: "/history",
    },
    {
      title: "Saved Queries",
      icon: SaveIcon,
      url: "/saved",
    },
    {
      title: "Settings",
      icon: SettingsIcon,
      url: "/settings",
    },
  ];
  return (
    <div className={styles.navbar}>
      <div className={styles.branding}>
        <div className={styles.logo}>
          <Logo size={18} />
        </div>
      </div>
      <div className={styles.menu}>
        {menuItems.map((menu) => (
          <a href={menu.url} className={[styles.menuItem, menu.title === "Editor" && styles.active].join(" ")}>
            <menu.icon size={18} />
          </a>
        ))}
      </div>
    </div>
  );
}
