import { useEditor } from "../../../store/Editor";
import EditorLayout from "../../layouts/EditorLayout";
import EditorTab from "./EditorTab";

export default function EditorView() {
  const { tabs, activeTab } = useEditor(({ tabs, activeTab }) => ({
    tabs,
    activeTab,
  }));
  return (
    <EditorLayout>
      {tabs && tabs[activeTab] ? <EditorTab id={activeTab} /> : <></>}
    </EditorLayout>
  );
}
