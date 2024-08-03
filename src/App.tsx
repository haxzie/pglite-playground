import AppLayout from "./components/layouts/AppLayout";
import Explorer from "./components/modules/Explorer/Explorer";
import EditorArea from "./components/modules/EditorArea/EditorArea";

function App() {
  return (
    <AppLayout>
      <Explorer />
      <EditorArea />
    </AppLayout>
  );
}

export default App;
