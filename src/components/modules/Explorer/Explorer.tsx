import { useEffect, useState } from "react";
import styles from "./Explorer.module.scss";
import { useDatabase } from "../../../store/DB/Database";
import PostgresIcon from "../../icons/Databases/Postgres";
import PGLiteDriver from "../../../drivers/pglite";
import Tables from "./Tables";
import { useEditor } from "../../../store/Editor";
import History from "./History";
import SavedQueries from "./SavedQueries";
import { shallow } from "zustand/shallow";

export default function Explorer() {
  const { databaseSchema, createConnection } = useDatabase();
  const [isSchemaLoading, setIsSchemaLoading] = useState<boolean>(true);
  const { activeMenu } = useEditor(({ activeMenu }) => ({
    activeMenu,
  }), shallow);

  const loadCurrentSchema = async () => {
    setIsSchemaLoading(true);
    await createConnection(PGLiteDriver.id, {});
    // await loadSchema();
    setIsSchemaLoading(false);
  };

  useEffect(() => {
    loadCurrentSchema();
  }, []);

  const ExplorerMenu = ({ menu }: { menu: string }) => {
    switch (menu) {
      case "/tables":
        return (
          <Tables schema={databaseSchema} isSchemaLoading={isSchemaLoading} />
        );
      case "/history":
        return <History />;
      case "/saved":
        return <SavedQueries />;
      default:
        return (
          <Tables schema={databaseSchema} isSchemaLoading={isSchemaLoading} />
        );
    }
  };

  return (
    <div className={styles.explorer}>
      <div className={styles.header}>
        <div className={styles.dbDetails}>
          <div className={styles.icon}>
            <PostgresIcon size={18} />
          </div>
          <div className={styles.texts}>
            <div className={styles.title}>Postgres Lite</div>
          </div>
          {/* <ArrowUpDownIcon size={18} /> */}
        </div>
      </div>
      <ExplorerMenu menu={activeMenu} />
    </div>
  );
}
