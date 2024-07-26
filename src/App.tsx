import { useState } from "react";
import AppLayout from "./components/layouts/AppLayout";
import EditorLayout from "./components/layouts/EditorLayout";
import Editor from "./components/modules/Editor/Editor";
import Explorer from "./components/modules/Explorer/Explorer";
import ResultViewer from "./components/modules/ResultViewer/ResultViewer";
import { Results } from "@electric-sql/pglite";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useDatabase } from "./store/Database";

function App() {
  const [result, setResult] = useState<Results<unknown>>();
  const [error, setError] = useState<unknown | any>();
  const { runQuery } = useDatabase();

  const run = async (query: string) => {
    const { result, error } = await runQuery({ query });
    console.log({ result, error });
    setResult(result);
    // setError(error.message);
  };

  return (
    <AppLayout>
      <PanelGroup direction="horizontal">
        <Explorer />
        <PanelResizeHandle />

        <EditorLayout>
          <PanelGroup direction="vertical">
            <Panel id="editor" minSize={25} order={1}>
              <Editor onClickRun={run} />
            </Panel>
            <Panel id="result" minSize={25} order={2}>
              <ResultViewer result={result} error={error} />
            </Panel>
          </PanelGroup>
        </EditorLayout>
      </PanelGroup>
    </AppLayout>
  );
}

export default App;
