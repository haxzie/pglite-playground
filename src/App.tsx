import AppLayout from "./components/layouts/AppLayout";
import Explorer from "./components/modules/Explorer/Explorer";
import EditorView from "./components/modules/EditorArea/EditorView";

function App() {
  return (
    <AppLayout>
      <Explorer />
      <EditorView />
    </AppLayout>
  );
}

export default App;
