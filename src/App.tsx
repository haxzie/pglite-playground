import AppLayout from "./components/layouts/AppLayout";
import Explorer from "./components/modules/Explorer/Explorer";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import EditorArea from "./components/modules/EditorArea/EditorArea";

function App() {
  return (
    <AppLayout>
      <PanelGroup direction="horizontal">
        <Explorer />
        <PanelResizeHandle />
        <EditorArea />
      </PanelGroup>
    </AppLayout>
  );
}

export default App;
