import styles from "./SideNavBar.module.scss";
import Logo from "../icons/Logo";
// import EditorIcon from "../icons/EditorIcon";
import HistoryIcon from "../icons/HistoryIcon";
import SaveIcon from "../icons/SaveIcon";
import SettingsIcon from "../icons/SettingsIcon";
import TableIcon from "../icons/TableIcon";
import { useEditor } from "../../store/Editor";

export default function SideNavBar() {
  const { activeMenu, setActiveMenu } = useEditor();

  const menuItems: Array<{
    title: string;
    icon: ({ size }: { size: number }) => JSX.Element;
    url: string;
  }> = [
    {
      title: "Editor",
      icon: TableIcon,
      url: "/tables",
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
    // {
    //   title: "Settings",
    //   icon: SettingsIcon,
    //   url: "/settings",
    // },
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
          <div
            key={menu.title}
            className={[
              styles.menuItem,
              menu.url === activeMenu && styles.active,
            ].join(" ")}
            onClick={() => setActiveMenu(menu.url)}
          >
            <menu.icon size={18} />
          </div>
        ))}
      </div>
    </div>
  );
}
